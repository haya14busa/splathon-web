import { Component, Prop, Vue } from 'vue-property-decorator';
import { DefaultApi, AdminApi, RankingApi, ResultApi } from '@/lib/api_factory';
import * as api from '@/swagger/splathon-api/api';
import Match from '@/components/Admin/Splathon/Match/template.vue';

interface TeamRank {
  rank: number;
  name: string;
}

@Component({
  components: {
    Match,
  },
})
export default class Tournament extends Vue {
  @Prop() private token!: string;
  @Prop() private eventNumbering!: string;

  private result: api.Results | null = null;
  private eventData: api.Event | null = null;
  private rooms: api.SupportedRoom[] = [];
  private rankings: api.Rank[] = [];
  private tournamentRounds: api.Round[] = [];
  private tournamentSize = 8;
  private restTeamRanks: api.Rank[] = [];
  private canAddNewRound = false;

  private nextRound: api.AddTournamentRoundRequest = {
    round_name: '',
    round: 1,
    matches: [],
  };

  // TeamID => Rank.
  private teamRankMap = new Map<number, TeamRank>();

  protected async created() {

    const eventP: Promise<api.Event> = DefaultApi.getEvent(this.eventNumbering);
    const rankingP: Promise<api.Ranking> = RankingApi.getRanking(this.eventNumbering);
    const resultsP: Promise<api.Results> = ResultApi.getResult(this.eventNumbering);

    const eventData: api.Event = await eventP;
    const ranking: api.Ranking = await rankingP;
    const results: api.Results = await resultsP;

    this.eventData = eventData;
    this.rooms = eventData.rooms;
    this.tournamentRounds = results.tournament || [];

    ranking.rankings.forEach((r: api.Rank, i: number) => {
      this.teamRankMap.set(r.team.id, {rank: i + 1, name: r.team.name});
    });

    const round = this.tournamentRounds.length + 1;

    let roundName = '決勝T' + round + '回戦';
    const restTeamSize: number = Math.floor(this.tournamentSize / (2 ** (round - 1)));
    if (restTeamSize === 4) {
      roundName = '準決勝';
    } else if (restTeamSize === 2) {
      roundName = '決勝';
    }

    if (ranking.rankings.length < restTeamSize) {
      throw Error('# of ranking is below ' + restTeamSize);
    }

    let newMatches: api.NewMatchRequest[] = [];

    const tpairs: TournamentMatch[] = tournamentPairs(this.tournamentSize);

    if (this.tournamentRounds.length > 0) {
      const restTeamIDs: number[] = [];
      const lastRound = this.tournamentRounds[this.tournamentRounds.length - 1];
      lastRound.rooms.forEach((room: api.Room) => {
        room.matches.forEach((match: api.Match) => {
          if (match.winner === api.Match.WinnerEnum.Alpha) {
            restTeamIDs.push(match.teamAlpha.id);
          } else if (match.winner === api.Match.WinnerEnum.Bravo) {
            restTeamIDs.push(match.teamBravo.id);
          }
        });
      });
      if (!(restTeamIDs.length < restTeamSize || restTeamSize === 1)) {
        this.canAddNewRound = true;
        const restTeamSet = new Set(restTeamIDs);
        this.restTeamRanks = ranking.rankings.filter((r: api.Rank) => {
          return restTeamSet.has(r.team.id);
        });
        for (let i = 0; i < restTeamIDs.length / 2; i++) {
          const roomID = this.rooms[i % this.rooms.length].id;
          newMatches.push({
            alpha_team_id: restTeamIDs[i * 2],
            bravo_team_id: restTeamIDs[i * 2 + 1],
            order_in_room: Math.floor(i / this.rooms.length) + 1,
            room_id: roomID,
          });
        }
      }
    } else {
      this.canAddNewRound = true;
      this.restTeamRanks = ranking.rankings;

      newMatches = tpairs.map((pair, i) => {
        const roomID = this.rooms[i % this.rooms.length].id;
        const n: api.NewMatchRequest = {
          alpha_team_id: ranking.rankings[pair.l-1].team.id,
          bravo_team_id: ranking.rankings[pair.r-1].team.id,
          order_in_room: Math.floor(i / this.rooms.length) + 1,
          room_id: roomID,
        }
        return n;
      });
    }

    this.nextRound = {
      round: round,
      round_name: roundName,
      matches: newMatches,
    };
  }

  private onAdd(event: Event) {
    event.preventDefault();
    AdminApi.addTournamentRound(this.eventNumbering, this.token, this.nextRound)
      .then(() => {
        // TODO(haya14busa): propagate reload method instead of reloading the whole page?
        location.reload();
      }).catch(this.handleErr);
  }

  private teamSelectorName(teamID: number): string {
    if (!this.teamRankMap.has(teamID)) {
      return "INVALID TEAM ID: " + teamID;
    }
    const teamRank = this.teamRankMap.get(teamID);
    return teamRank.name + " (Rank: " + teamRank.rank + ")";
  }

  private handleErr(resp) {
    if (resp.json) {
      resp.json().then((err: api.ModelError) => {
        console.log(err.message);
      });
    } else {
      console.log(resp);
    }
  }

}

interface TournamentMatch {
  l: number; // Ranking
  r: number; // Ranking
}

// Reference: http://tournament-creators.com/abouts/
function tournamentPairs(tournamentSize: number): TournamentMatch[] {
  let matches = [{l: 1, r: 4}, {l: 3, r: 2}];
  for (let i = 0; i < Math.log2(tournamentSize) - 2; i++) {
    const next: TournamentMatch[] = [];
    matches.forEach((m: TournamentMatch, j: number) => {
      next.push({l: m.l, r: 2 ** (i + 3) - m.l + 1});
      next.push({l: 2 ** (i + 3) - m.r + 1, r: m.r});
    });
    matches = next;
  }
  return matches;
}

import { Component, Prop, Vue } from 'vue-property-decorator';
import { DefaultApi, AdminApi, RankingApi, ResultApi } from '@/lib/api_factory';
import * as api from '@/swagger/splathon-api/api';

interface NextRound {
  name?: string;
  round?: number;
  matches?: NextMatch[];
}

interface NextMatch {
  alphaTeamID: number;
  bravoTeamID: number;
  roomID?: number;
  matchOrderInRoom?: number;
}

@Component({})
export default class Tournament extends Vue {
  @Prop() private token!: string;
  @Prop() private eventNumbering!: number;

  private result: api.Results | null = null;
  private eventData: api.Event | null = null;
  private rooms: api.SupportedRoom[] = [];
  private rankings: api.Rank[] = [];
  private tournamentRounds: api.Round[] = [];
  private tournamentSize = 8;
  private restTeamRanks: api.Rank[] = [];

  private nextRound: NextRound = {};

  // TeamID => Rank.
  private teamRankMap = new Map<number, api.Rank>();

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

    ranking.rankings.forEach((r: api.Rank) => {
      this.teamRankMap.set(r.team.id, r);
    });

    const round = this.tournamentRounds.length + 1;

    let roundName = '決勝T' + round + '回戦';
    const restTeamSize: number = Math.floor(this.tournamentSize / (2 ** (round - 1)));
    if (restTeamSize === 4) {
      roundName = '準決勝';
    } else if (restTeamSize === 2) {
      roundName = '決勝';
    }

    this.nextRound = {
      round: round,
      name: roundName,
    };

    if (ranking.rankings.length < restTeamSize) {
      throw Error('# of ranking is below ' + restTeamSize);
    }

    const tpairs: TournamentMatch[] = tournamentPairs(this.tournamentSize);

    if (this.tournamentRounds.length > 0) {
      const restTeams = new Set<number>();
      const lastRound = this.tournamentRounds[this.tournamentRounds.length - 1];
      lastRound.rooms.forEach((room: api.Room) => {
        room.matches.forEach((match: api.Match) => {
          if (match.winner === api.Match.WinnerEnum.Alpha) {
            restTeams.add(match.teamAlpha.id);
          } else if (match.winner === api.Match.WinnerEnum.Bravo) {
            restTeams.add(match.teamBravo.id);
          }
        });
      });
      // TODO(haya14busa): fill in this.nextRound.matches.
    } else {
      this.restTeamRanks = ranking.rankings;

      this.nextRound.matches = tpairs.map((pair, i) => {
        console.log(i);
        const roomID = this.rooms[i % this.rooms.length].id;
        const n: NextMatch = {
          alphaTeamID: ranking.rankings[pair.l-1].team.id,
          bravoTeamID: ranking.rankings[pair.r-1].team.id,
          matchOrderInRoom: Math.floor(i / this.rooms.length) + 1,
          roomID: roomID,
        }
        return n;
      });
    }
  }

  private onAdd(event: Event) {
    event.preventDefault();
    console.log(this.nextRound);
    // debugger;
  }

  private teamSelectorName(teamID: number): string {
    // debugger;
    if (!this.teamRankMap.has(teamID)) {
      return "INVALID TEAM ID: " + teamID;
    }
    const rank = this.teamRankMap.get(teamID);
    return rank.team.name + " (Rank: " + rank.rank + ")";
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
  l: number;
  r: number;
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

import { Component, Prop, Vue } from 'vue-property-decorator';
import { DefaultApi, RankingApi } from '@/lib/api_factory';
import * as api from '@/swagger/splathon-api/api';

@Component({
  components: {},
  filters: {
    toFixed(v: number, n: number): string {
      return (v || 0).toFixed(n);
    },
  },
})
export default class Schedule extends Vue {
  @Prop() private eventNumbering!: string;

  private ranking: api.Ranking = {};

  private showTeamDetailDialog: boolean = false;
  private team: api.Team = { 'id': -1, 'name': '' };

  protected async created() {
    this.reload();
  }

  private async reload() {
    this.ranking = await RankingApi.getRanking(this.eventNumbering, /*latest=*/true);
  }

  private showTeamDetail(team: api.Team) {
    this.team = team;
    this.showTeamDetailDialog = true;
  }

}


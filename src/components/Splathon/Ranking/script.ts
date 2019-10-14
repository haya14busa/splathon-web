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
  @Prop() private eventNumbering!: number;

  private ranking: api.Ranking = {};

  // private showMemberDialog: { [userId: number]: boolean } = {};
  private showMemberDetailDialog: boolean = false;
  private member: api.Member = { 'name': '' };

  protected async created() {
    this.reload();
  }

  private async reload() {
    this.ranking = await RankingApi.getRanking(this.eventNumbering, /*latest=*/true);
  }

  private showMemberDetail(member: api.Member) {
    this.member = member;
    this.showMemberDetailDialog = true;
  }

}


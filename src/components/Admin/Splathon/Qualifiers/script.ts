import { Component, Prop, Vue } from 'vue-property-decorator';
import { DefaultApi, AdminApi, RankingApi, ResultApi } from '@/lib/api_factory';
import * as api from '@/swagger/splathon-api/api';

@Component({})
export default class Qualifiers extends Vue {
  @Prop() private token!: string;
  @Prop() private eventNumbering!: number;

  private releasedRound = -1;

  protected created() {
    AdminApi.getReleaseQualifier(this.eventNumbering, this.token)
      .then((round: number) => {
        this.releasedRound = round;
      }).catch(this.handleErr);
  }

  private onUpdateReleaseRound() {
    AdminApi.updateReleaseQualifier(this.eventNumbering, this.token, { round: this.releasedRound})
      .then(() => {
        // TODO(haya14busa): propagate reload method instead of reloading the whole page?
        location.reload();
      })
      .catch(this.handleErr);
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

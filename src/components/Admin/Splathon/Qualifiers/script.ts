import { Component, Prop, Vue } from 'vue-property-decorator';
import { DefaultApi, AdminApi, RankingApi, ResultApi } from '@/lib/api_factory';
import * as api from '@/swagger/splathon-api/api';
import Match from '@/components/Admin/Splathon/Match/template.vue';

@Component({
  components: {
    Match,
  },
})
export default class Qualifiers extends Vue {
  @Prop() private token!: string;
  @Prop() private eventNumbering!: number;

  private releasedRound = -1;
  private rooms: api.SupportedRoom[] = [];
  private qualifiers: api.Round[] = [];
  private disableNewRoundButton = false;

  protected async created() {
    AdminApi.getReleaseQualifier(this.eventNumbering, this.token)
      .then((round: number) => {
        this.releasedRound = round;
      }).catch(this.handleErr);

    const resultsP = ResultApi.getResult(this.eventNumbering, null, this.token);
    const eventP: Promise<api.Event> = DefaultApi.getEvent(this.eventNumbering);

    const eventData: api.Event = await eventP;
    const results: api.Results = await resultsP;

    this.rooms = eventData.rooms;
    this.qualifiers = results.qualifiers || [];
  }

  private onUpdateReleaseRound() {
    AdminApi.updateReleaseQualifier(this.eventNumbering, this.token, { round: this.releasedRound})
      .then(() => {
        // TODO(haya14busa): propagate reload method instead of reloading the whole page?
        location.reload();
      })
      .catch(this.handleErr);
  }

  private createNewQualifierRound() {
    this.disableNewRoundButton = true;
    AdminApi.createNewQualifier(this.eventNumbering, this.token)
      .then(() => {
        // TODO(haya14busa): propagate reload method instead of reloading the whole page?
        location.reload();
      })
      .catch(this.handleErr)
      .finally(() => {
        this.disableNewRoundButton = false;
      });
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

  private deleteRound(round: number) {
    if (!window.confirm('Round ' + round + ' を削除しますか？')) {
      return;
    }
    AdminApi.deleteQualifier(this.eventNumbering, this.token, {'round': round})
      .then(() => {
        // TODO(haya14busa): propagate reload method instead of reloading the whole page?
        location.reload();
      })
      .catch(this.handleErr);
  }

}

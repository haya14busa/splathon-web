import { Component, Prop, Vue } from 'vue-property-decorator';
import * as api from '@/swagger/splathon-api/api';
import { AdminApi } from '@/lib/api_factory';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import VueNumericInput from 'vue-numeric-input';

@Component({
  components: {
    VueNumericInput,
  },
  filters: {
    toTime(timestampSec: number): string {
      return moment(new Date(timestampSec * 1000)).format('YYYY/MM/DD HH:mm');
    },
  },
})
export default class ReceptionEntry extends Vue {
  @Prop() private token!: string;
  @Prop() private eventNumbering!: string;
  @Prop() private participant!: api.ParticipantReception;

  private entry: api.ParticipantReception;
  private complete = false;

  protected created() {
    this.entry = cloneDeep(this.participant);
    if (!this.entry.reception) {
      this.entry.reception = {memo: '', participant_id: this.entry.id};
    } else {
      this.complete = true;
    }
  }

  private onUpdate() {
    if (!window.confirm(this.entry.nickname + ' の情報を更新しますか？参加登録を取り消すとmemoも消えます。')) {
      return;
    }
    const req: api.UpdateReceptionRequest = {
      complete: this.complete,
      participant: this.entry,
    };
    AdminApi.updateReception(this.eventNumbering, this.token, req).then(() => {
      // TODO(haya14busa): propagate reload method instead of reloading the whole page?
      location.reload();
    }).catch((resp) => {
      if (resp.json) {
        resp.json().then((err: api.ModelError) => {
          console.log(err.message);
        });
      } else {
        console.log(resp);
      }
    });
  }
}

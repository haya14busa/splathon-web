import { Component, Prop, Vue } from 'vue-property-decorator';
import * as api from '@/swagger/splathon-api/api';
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
  @Prop() private eventNumbering!: number;
  @Prop() private participant!: api.ParticipantReception;

  private entry: api.ParticipantReception;
  private adminAPI = new api.AdminApi();
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
    }
    this.adminAPI.updateReception(this.eventNumbering, this.token, req).then(() => {
      this.$router.go({name: 'admin-splathon-event-home', params: {event_numbering: this.eventNumbering}});
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

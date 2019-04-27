import { Component, Prop, Vue } from 'vue-property-decorator';
import * as api from '@/swagger/splathon-api/api';
import moment from 'moment';
import { cloneDeep } from 'lodash';

@Component({
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

  protected created() {
    this.entry = cloneDeep(this.participant);
    if (!this.entry.reception) {
      this.entry.reception = {memo: ''};
    }
  }
}

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import * as api from '@/swagger/splathon-api/api';
import { AdminApi } from '@/lib/api_factory';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import VueNumericInput from 'vue-numeric-input';

@Component({
  filters: {
    toTime(timestampSec: number): string {
      return moment(new Date(timestampSec * 1000)).format('YYYY/MM/DD HH:mm');
    },
  },
})
export default class Notice extends Vue {
  @Prop() private token!: string;
  @Prop() private eventNumbering!: number;
  @Prop() private notice!: api.Notice;

  private entry: api.Notice;
  private update_confirm = false;
  private delete_confirm = false;

  protected created() {
    this.entry = cloneDeep(this.notice);
  }

  private onUpdate() {
    if (!this.entry.id) {
      this.entry.timestamp_sec = Math.floor((new Date()).getTime() / 1000);
    }
    AdminApi.writeNotice(this.eventNumbering, this.token, this.entry)
      .then(() => {
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

  private onDelete() {
    AdminApi.deleteNotice(this.eventNumbering, this.entry.id, this.token)
      .then(() => {
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

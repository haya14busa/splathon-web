import { Component, Prop, Vue } from 'vue-property-decorator';
import { DefaultApi, AdminApi } from '@/lib/api_factory';
import * as api from '@/swagger/splathon-api/api';
import DurationPicker from '@/components/Admin/Splathon/Schedule/DurationPicker/template.vue';
import TimePicker from '@/components/Admin/Splathon/Schedule/TimePicker/template.vue';

@Component({
  components: {
    DurationPicker,
    TimePicker,
  },
})
export default class Schedule extends Vue {
  @Prop() private token!: string;
  @Prop() private eventNumbering!: number;

  private schedule: api.Schedule = { 'entries': [] };
  private disableSaveButton = false;
  private showSnackbar = false;

  protected async created() {
    this.reload();
  }

  private async reload() {
    this.schedule = await DefaultApi.getSchedule(this.eventNumbering);
  }

  private addEntry(afterIndex: number) {
    let entry: api.ScheduleEntry = {};
    if (this.schedule.entries.length > afterIndex) {
      const base = this.schedule.entries[afterIndex];
      entry.start_timestamp_sec = base.start_timestamp_sec + (base.duration_sec || 0);
    }
    this.schedule.entries.splice(afterIndex+1, 0, entry);
  }

  private deleteEntry(index: number) {
    this.schedule.entries.splice(index, 1);
  }

  private save() {
    this.disableSaveButton = true;
    AdminApi.updateSchedule(this.eventNumbering, this.token, this.schedule)
      .then(() => {
        this.reload();
        this.showSnackbar = true;
      })
      .catch(this.handleErr)
      .finally(() => {
        this.disableSaveButton = false;
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

}


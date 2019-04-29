import { Component, Prop, Vue } from 'vue-property-decorator';
import { DefaultApi, AdminApi } from '@/lib/api_factory';
import * as api from '@/swagger/splathon-api/api';
import Notice from '@/components/Admin/Splathon/Notices/Notice/template.vue';

@Component({
  components: {
    Notice,
  },
})
export default class Notices extends Vue {
  @Prop() private token!: string;
  @Prop() private eventNumbering!: number;

  private notices: api.Notice[] = [];

  protected created() {
    DefaultApi.listNotices(this.eventNumbering, this.token)
      .then((res: api.ListNoticesResponse) => {
        this.notices = [{text: '', timestamp_sec: -1}].concat(res.notices);
      }).catch((resp) => {
        console.log(resp);
        resp.json().then((err: api.ModelError) => {
          console.log(err.message);
        });
      });
  }
}

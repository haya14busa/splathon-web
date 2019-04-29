import { Component, Prop, Vue } from 'vue-property-decorator';
import * as api from '@/swagger/splathon-api/api';
import { AdminApi } from '@/lib/api_factory';
import ReceptionEntry from '@/components/Admin/Splathon/Receptions/Entry/Entry.vue';

@Component({
  components: {
    ReceptionEntry,
  },
})
export default class Receptions extends Vue {
  @Prop() private token!: string;
  @Prop() private eventNumbering!: number;

  private participants: api.ParticipantReception[] = [];
  private completed: api.ParticipantReception[] = [];

  protected created() {
    AdminApi.listReception(this.eventNumbering, this.token)
      .then((res: api.ListReceptionResponse) => {
        if (!res.participants) {
          return;
        }
        this.participants = res.participants
          .filter((p) => !p.reception)
          // TODO(haya14busa): Support sorting by given column.
          .sort((a, b) =>  {
            if (a.fullname_kana < b.fullname_kana) {
              return -1;
            } else if (a.fullname_kana > b.fullname_kana) {
              return 1;
            }
            return 0;
          })
        ;
        this.completed = res.participants
          .filter((p) => p.reception)
          .sort((a, b) =>  b.reception.created_at_timestamp_sec - a.reception.created_at_timestamp_sec)
        ;
      }).catch((resp) => {
        console.log(resp);
        resp.json().then((err: api.ModelError) => {
          console.log(err.message);
        });
      });
  }
}

import { Component, Prop, Vue } from 'vue-property-decorator';
import * as api from '@/swagger/splathon-api/api';
import ReceptionEntry from '@/components/Admin/Splathon/Receptions/Entry/Entry.vue';

@Component({
  components: {
    ReceptionEntry,
  },
})
export default class Receptions extends Vue {
  @Prop() private token!: string;
  @Prop() private eventNumbering!: number;

  private adminAPI = new api.AdminApi();

  private participants: api.ParticipantReception[] = [];
  private completed: api.ParticipantReception[] = [];

  protected created() {
    this.adminAPI.listReception(this.eventNumbering, this.token)
      .then((res: api.ListReceptionResponse) => {
        if (!res.participants) {
          return;
        }
        this.participants = res.participants
          .filter((p) => !p.reception)
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

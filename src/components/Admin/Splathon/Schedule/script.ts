import { Component, Prop, Vue } from 'vue-property-decorator';
import { DefaultApi, AdminApi } from '@/lib/api_factory';
import * as api from '@/swagger/splathon-api/api';

@Component({
  components: {},
})
export default class Schedule extends Vue {
  @Prop() private token!: string;
  @Prop() private eventNumbering!: number;

  protected async created() {
    console.log('created!');
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


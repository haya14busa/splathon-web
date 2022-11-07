import { Component, Prop, Vue } from 'vue-property-decorator';
import { DefaultApi, AdminApi, RankingApi, ResultApi } from '@/lib/api_factory';
import * as api from '@/swagger/splathon-api/api';

@Component({})
export default class Match extends Vue {
  @Prop() private token!: string;
  @Prop() private eventNumbering!: string;
  @Prop() private match!: api.Match;
  @Prop() private roomID!: number;
  @Prop() private rooms!: api.SupportedRoom[];

  private nmatch: api.NewMatchRequest;

  protected created() {
    this.nmatch = {
      alpha_team_id: this.match.teamAlpha.id,
      bravo_team_id: this.match.teamBravo.id,
      room_id: this.roomID,
      order_in_room: this.match.order,
    };
  }

  private onUpdate() {
    AdminApi.updateMatch(this.eventNumbering, this.match.id, this.nmatch, this.token)
      .then(() => {
        // TODO(haya14busa): propagate reload method instead of reloading the whole page?
        location.reload();
      })
      .catch(this.handleErr);
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

import { Component, Vue } from 'vue-property-decorator';
import * as api from '@/swagger/splathon-api/api';
import * as token from '@/lib/token';
import { DefaultApi } from '@/lib/api_factory';

@Component
export default class Login extends Vue {
  private id: string = '';
  private password: string = '';
  private errmsg: string = '';

  private onSubmit() {
    this.errmsg = '';
    const eventNumbering = 'v10'; // Actually, any numbering is fine for admin login.
    const req: api.LoginRequest = {
      user_id: this.id,
      password: this.password,
    };
    DefaultApi.login(eventNumbering, req).then((res: api.LoginResponse) => {
      if (!res.is_admin) {
        this.errmsg = 'Login failed';
        return;
      }
      token.Set(res.token);
      this.$router.push({name: 'admin'});
    }).catch((resp) => {
      return resp.json().then((err: api.ModelError) => {
        this.errmsg = err.message;
      });
    });
  }
}

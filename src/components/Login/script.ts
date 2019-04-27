import { Component, Vue } from 'vue-property-decorator';
import * as api from '@/swagger/splathon-api/api';


@Component
export default class Login extends Vue {
  private id: string = '';
  private password: string = '';
  private errmsg: string = '';

  private defaultAPI = new api.DefaultApi();
  private resultAPI = new api.ResultApi();

  private onSubmit() {
    this.errmsg = '';
    const eventNumbering = 10; // Actually, any numbering is fine for admin login.
    const req: api.LoginRequest = {
      user_id: this.id,
      password: this.password,
    };
    this.defaultAPI.login(eventNumbering, req).then((res: api.LoginResponse) => {
      if (!res.is_admin) {
        this.errmsg = 'Login failed';
        return;
      }
    }).catch((err) => {
      return err.json();
    }).then((err: api.ModelError) => {
      this.errmsg = err.message;
    });
  }
}

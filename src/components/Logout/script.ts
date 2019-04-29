import { Component, Vue } from 'vue-property-decorator';
import * as token from '@/lib/token';

@Component
export default class Login extends Vue {
  private onSubmit() {
    token.Remove();
    this.$router.push({name: 'home'});
  }
}

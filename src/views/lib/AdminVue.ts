import { Component, Vue } from 'vue-property-decorator';
import * as token from '@/lib/token';

@Component
export default class AdminVue extends Vue {

  protected beforeCreate() {
    const t = token.Get();
    if (t != null) {
      return;
    }
    this.$router.push({name: 'admin-login'});
  }

  protected getAPIToken(): string {
    return token.Get() || '';
  }
}


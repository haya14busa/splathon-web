<template>
<div class="admin">
    <!-- TODO(haya14busa): List events from API? -->
    <ul>
      <li>
        <router-link
          :to="{ name: 'admin-splathon-event-home', params: { event_numbering: 10 }}">
          Splathon #10
        </router-link>
      </li>
      <li>
        <router-link
          :to="{ name: 'admin-splathon-event-home', params: { event_numbering: 11 }}">
          Splathon #11
        </router-link>
      </li>
    </ul>
    <Logout />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as token from '@/lib/token';
import Logout from '@/components/Logout/template.vue';

@Component({
  components: {
    Logout,
  },
})
export default class AdminHome extends Vue {
  private apiToken: string = '';

  protected beforeCreate() {
    const t = token.Get();
    if (t != null) {
      this.apiToken = t;
      return;
    }
    this.$router.push({name: 'admin-login'});
  }
}
</script>

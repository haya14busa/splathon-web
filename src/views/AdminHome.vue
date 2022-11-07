<template>
<div class="admin">
  <ul>
    <li v-for="event in events.events">
      <router-link
        :to="{ name: 'admin-splathon-event-home', params: { event_numbering: 'v' + event.numbering }}">
        {{ event.name }}
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
import * as api from '@/swagger/splathon-api/api';
import { DefaultApi } from '@/lib/api_factory';

@Component({
  components: {
    Logout,
  },
})
export default class AdminHome extends Vue {
  private apiToken: string = '';
  private events: api.Events = {};

  protected beforeCreate() {
    const t = token.Get();
    if (t != null) {
      this.apiToken = t;
      return;
    }
    this.$router.push({name: 'admin-login'});
  }

  protected async created() {
    this.events = await DefaultApi.listEvents();
  }
}
</script>

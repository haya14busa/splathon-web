<template>
  <div class="admin">
    <ul>
      <li>
        <!-- TODO(haya14busa): List events from API -->
        <router-link
          :to="{ name: 'admin-splathon-event-home', params: { event_numbering: 10 }}">
          Splathon #10
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as token from '@/lib/token';

@Component
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

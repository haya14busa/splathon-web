<template>
  <div class="admin">
    <p>This is an admin page</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import * as token from '@/lib/token';

@Component()
export default class AdminHome extends Vue {
  private apiToken: string = '';

  beforeCreate() {
    const t = token.Get();
    if (!t) {
      this.$router.push({name:'admin-login'});
    }
    this.apiToken = t;
  }
}
</script>

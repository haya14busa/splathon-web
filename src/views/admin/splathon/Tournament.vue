<template>
  <div>
    <Tournament :token=apiToken :eventNumbering=$route.params.event_numbering />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import AdminVue from '@/views/lib/AdminVue';
import Tournament from '@/components/Admin/Splathon/Tournament/template.vue';

@Component({
  components: {
    Tournament,
  },
})
export default class TournamentView extends AdminVue {
  private apiToken: string = '';

  protected created() {
    this.apiToken = this.getAPIToken();
  }
}
</script>


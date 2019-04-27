<template>
  <div>
    <Receptions :token=apiToken :eventNumbering=$route.params.event_numbering />
    reception end
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import AdminVue from '@/views/lib/AdminVue';
import Receptions from '@/components/Admin/Splathon/Receptions/Receptions.vue';

@Component({
  components: {
    Receptions,
  },
})
export default class Reception extends AdminVue {
  private apiToken: string = '';

  protected created() {
    this.apiToken = this.getAPIToken();
  }
}
</script>


<template>
  <div>
    <Notices :token=apiToken :eventNumbering=$route.params.event_numbering />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import AdminVue from '@/views/lib/AdminVue';
import Notices from '@/components/Admin/Splathon/Notices/Notices.vue';

@Component({
  components: {
    Notices,
  },
})
export default class Reception extends AdminVue {
  private apiToken: string = '';

  protected created() {
    this.apiToken = this.getAPIToken();
  }
}
</script>


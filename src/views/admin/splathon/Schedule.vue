<template>
  <div>
    <Schedule :token=apiToken :eventNumbering=$route.params.event_numbering />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import AdminVue from '@/views/lib/AdminVue';
import Schedule from '@/components/Admin/Splathon/Schedule/template.vue';

@Component({
  components: {
    Schedule,
  },
})
export default class ScheduleView extends AdminVue {
  private apiToken: string = '';

  protected created() {
    this.apiToken = this.getAPIToken();
  }
}
</script>


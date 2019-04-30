<template>
  <div>
    <Qualifiers :token=apiToken :eventNumbering=$route.params.event_numbering />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import AdminVue from '@/views/lib/AdminVue';
import Qualifiers from '@/components/Admin/Splathon/Qualifiers/template.vue';

@Component({
  components: {
    Qualifiers,
  },
})
export default class QualifierView extends AdminVue {
  private apiToken: string = '';

  protected created() {
    this.apiToken = this.getAPIToken();
  }
}
</script>


<template>
  <div>
    <Ranking :eventNumbering=$route.params.event_numbering />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import AdminVue from '@/views/lib/AdminVue';
import Ranking from '@/components/Splathon/Ranking/template.vue';

@Component({
  components: {
    Ranking,
  },
})
export default class RankingView extends AdminVue {
}
</script>


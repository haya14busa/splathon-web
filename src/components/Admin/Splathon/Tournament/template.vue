<template>
  <div class="tournament">
    <h3>決勝トーナメント</h3>

    <!-- {{eventData}} -->

    <!-- {{rooms}} -->

    <!-- {{rankings}} -->

    <div v-if="tournamentRounds.length == 0">
      <md-button class="md-primary md-raised">Add</md-button>
    </div>

    {{nextRound}}

    {{tournamentRounds}}
  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>

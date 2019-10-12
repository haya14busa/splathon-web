<template>
  <div class="timepicker">
    <md-field>
      <label>Year</label>
      <md-input v-model.number="year" min="1" type="number"></md-input>
    </md-field>
    <md-field>
      <label>Month</label>
      <md-input v-model.number="month" min="1" max="12" type="number"></md-input>
    </md-field>
    <md-field>
      <label>Day</label>
      <md-input v-model.number="day" min="1" max="31" type="number"></md-input>
    </md-field>
    <md-field>
      <label>Hour</label>
      <md-input v-model.number="hour" min="0" max="23" type="number"></md-input>
    </md-field>
    <md-field>
      <label>Minute</label>
      <md-input v-model.number="minute" min="0" max="59" type="number"></md-input>
    </md-field>
  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>


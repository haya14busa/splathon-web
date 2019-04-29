<template>
  <div class="notices-box">
    <h3>おしらせ</h3>
    <div v-for="notice in notices">
      <Notice :token=token :eventNumbering=eventNumbering :notice=notice />
    </div>
  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>


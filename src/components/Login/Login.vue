<template>
  <div class="login">
    <h2>Login</h2>
    <div>
      <label for="id">ID</label>
      <input v-model="id">
    </div>
    <div>
      <label for="password">Password</label>
      <input v-model="password" type="password">
    </div>
    <button @click="onSubmit">Login</button>
    <p class="err">{{ errmsg }}</p>
  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>


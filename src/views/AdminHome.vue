<template>
  <div class="admin">
    <p>This is an admin page</p>
    <Login/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Login from '@/components/Login/Login.vue';

@Component({
  components: {
    Login,
  },
})
export default class AdminHome extends Vue {}
</script>

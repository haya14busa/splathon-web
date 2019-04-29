<template>
  <div>
    <h3>Splathon #{{ $route.params.event_numbering }} Admin</h3>

    <Logout />

    <div id="admin-nav">
      <router-link
        :to="{ name: 'admin-splathon-event-reception', params: { event_numbering: $route.params.event_numbering }}">
        Reception</router-link> |
      <router-link
        :to="{ name: 'admin-splathon-event-notices', params: { event_numbering: $route.params.event_numbering }}">
        Notices</router-link> |
      <router-link
        :to="{ name: 'admin-splathon-event-tournament', params: { event_numbering: $route.params.event_numbering }}">
        Tournament</router-link>
    </div>

    <hr/>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import AdminVue from '@/views/lib/AdminVue';
import Logout from '@/components/Logout/template.vue';

@Component({
  components: {
    Logout,
  },
})
export default class Event extends AdminVue {}
</script>

<style lang="scss">
#admin-nav {
  padding: 10px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

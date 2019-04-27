<template>
  <tr>
    <td>
      <span v-if=entry.reception.created_at_timestamp_sec>
        {{ entry.reception.created_at_timestamp_sec | toTime}}
      </span>
    </td>
    <td>
      <span v-if=entry.reception>
        <textarea v-model="entry.reception.memo"></textarea>
      </span>
    </td>
    <td>{{ entry.nickname }}</td>
    <td>{{ entry.fullname_kana }}</td>
    <td>{{ entry.company_name }}</td>
    <td>
      <input type="text" v-model="entry.participant_fee">円
    </td>
    <td>同伴者: <input type="checkbox" v-model="entry.has_companion"></td>
    <td>懇親会: <input type="checkbox" v-model="entry.join_party"></td>
    <td>IsStaff: <input type="checkbox" v-model="entry.is_staff"></td>
    <td>IsPlayer: <input type="checkbox" v-model="entry.is_player"></td>
    <td>HasSwitchDock: <input type="checkbox" v-model="entry.has_switch_dock"></td>
    <td>{{ entry.slack_user_id }}</td>
  </tr>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>

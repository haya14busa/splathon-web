<template>
  <tr>
    <td>
      <span v-if=entry.reception>
        {{ entry.reception.created_at_timestamp_sec | toTime}}
      </span>
    </td>
    <td>
      <span v-if=entry.reception>
        {{ entry.reception.memo }}
      </span>
    </td>
    <td>{{ entry.nickname }}</td>
    <td>{{ entry.fullname_kana }}</td>
    <td>{{ entry.company_name }}</td>
    <td>{{ entry.participant_fee }}円</td>
    <td>同伴者: {{ entry.has_companion }}</td>
    <td>懇親会: {{ entry.join_party }}</td>
    <td>IsStaff: {{ entry.is_staff }}</td>
    <td>IsPlayer: {{ entry.is_player }}</td>
    <td>HasSwitchDock: {{ entry.has_switch_dock }}</td>
    <td>{{ entry.slack_user_id }}</td>
  </tr>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>

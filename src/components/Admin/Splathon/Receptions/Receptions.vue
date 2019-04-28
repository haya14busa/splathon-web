<template>
  <div>
    <h3>登録完了</h3>
    <table>
      <thead>
        <tr>
          <th>更新</th>
          <th>登録</th>
          <th>登録時刻</th>
          <th>memo</th>
          <th>nickname</th>
          <th>fullname_kana</th>
          <th>company_name</th>
          <th>participant_fee</th>
          <th>has_companion</th>
          <th>join_party</th>
          <th>is_staff</th>
          <th>is_player</th>
          <th>has_switch_dock</th>
          <th>slack_user_id</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="entry in completed">
          <ReceptionEntry :token=token :eventNumbering=eventNumbering :participant=entry />
        </template>
      </tbody>
    </table>

    <h3>未登録</h3>
    <table>
      <thead>
        <tr>
          <th>更新</th>
          <th>登録</th>
          <th>登録時刻</th>
          <th>memo</th>
          <th>nickname</th>
          <th>fullname_kana</th>
          <th>company_name</th>
          <th>participant_fee</th>
          <th>has_companion</th>
          <th>join_party</th>
          <th>is_staff</th>
          <th>is_player</th>
          <th>has_switch_dock</th>
          <th>slack_user_id</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="entry in participants">
          <ReceptionEntry :token=token :eventNumbering=eventNumbering :participant=entry />
        </template>
      </tbody>
    </table>
  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>

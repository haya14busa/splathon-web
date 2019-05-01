<template>
  <div>
    <h3>受付完了</h3>
    <table>
      <thead>
        <tr>
          <th>更新</th>
          <th>受付</th>
          <th>受付時刻</th>
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

    <div>合計受取金額: {{sumCompletedFee}} 円</div>

    <h3>受付未完了</h3>
    <table>
      <thead>
        <tr>
          <th>更新</th>
          <th>受付</th>
          <th>受付時刻</th>
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

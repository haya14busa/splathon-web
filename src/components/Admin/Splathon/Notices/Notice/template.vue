<template>
  <md-content class="notice-box">
    <div class="timestamp" v-if="entry.timestamp_sec != -1">{{ entry.timestamp_sec | toTime }}</div>
    <md-field>
      <label>お知らせテキスト</label>
      <md-textarea required md-autogrow v-model="entry.text"></md-textarea>
    </md-field>

    <md-button class="md-raised md-primary" @click="update_confirm = true">
      <span v-if="entry.id">
        更新
      </span>
      <span v-else="entry.id">
        追加
      </span>
    </md-button>
    <md-dialog-confirm
      :md-active.sync="update_confirm"
      md-title="お知らせを更新しますか？"
      :md-content="entry.text"
      md-confirm-text="OK"
      md-cancel-text="Cancel"
      @md-confirm="onUpdate" />

    <md-button v-if="entry.id" class="md-raised md-accent" @click="delete_confirm = true">
      削除
    </md-button>
    <md-dialog-confirm
      :md-active.sync="delete_confirm"
      md-title="お知らせを削除しますか？"
      :md-content="entry.text"
      md-confirm-text="OK"
      md-cancel-text="Cancel"
      @md-confirm="onDelete" />

  </md-content>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>

<template>
  <div class="qualifier">
    <h3>予選ラウンド</h3>

    <h4>予選ラウンドリリースフラグ</h4>
    <md-card class="release-round">
      <div class="md-layout">
        <div class="md-layout-item md-size-15">
          <md-field>
            <label>Released Round</label>
            <md-input required v-model.number="releasedRound"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item md-size-15">
          <md-button class="md-raised md-primary" @click="onUpdateReleaseRound">
            Update
          </md-button>
        </div>
      </div>
      <div class="md-layout-item">
        <p>
        この値以下のラウンドが参加者に表示されます。予選ラウンド,マッチ編集/作成後、この値を更新してリリースできます。
        -1 のとき、すべてのラウンドが返されます。
        </p>
      </div>
    </md-card>

  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>


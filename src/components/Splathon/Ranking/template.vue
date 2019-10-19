<template>
  <div class="ranking">
    <md-table v-model="ranking.rankings" md-sort="rank" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">予選ランキング</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }"
        @click="showTeamDetail(item.team)"
        class="team-row">
        <md-table-cell md-label="ランク" md-sort-by="rank" md-numeric>{{ item.rank }}位</md-table-cell>
        <md-table-cell md-label="チーム">
          <div class="team">
            <div class="md-subheading team-name"><span>{{ item.team.name }}</span></div>
            <div v-if="item.team.members && item.team.members.length > 0" class="members">
              <div v-for="member in item.team.members">
                <md-avatar class="member-icon">
                  <img :src="member.icon" alt="Avatar">
                  <md-tooltip md-direction="top">{{member.name}}</md-tooltip>
                </md-avatar>
              </div>
            </div>
          </div>
        </md-table-cell>
        <md-table-cell md-label="ポイント" md-sort-by="point" md-numeric>{{ item.point }}</md-table-cell>
        <md-table-cell md-label="OMWP" md-sort-by="omwp" md-numeric>{{ item.omwp | toFixed(4) }}</md-table-cell>
        <md-table-cell md-label="試合数" md-sort-by="num_of_matches" md-numeric>{{ item.num_of_matches || 0 }}</md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog :md-active.sync="showTeamDetailDialog" class="team-dialog">
      <md-card>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{team.name}}</div>
            <div class="md-subhead">({{team.name_kana}})</div>
            <div class="md-subhead">{{team.short_comment}}</div>
          </md-card-header-text>
        </md-card-header>
        <md-card-content>
          <md-table>
            <md-table-row>
              <md-table-head class="icon-column"></md-table-head>
              <md-table-head>名前</md-table-head>
              <md-table-head>ガチエリア</md-table-head>
              <md-table-head>ガチヤグラ</md-table-head>
              <md-table-head>ガチホコバトル</md-table-head>
              <md-table-head>ガチアサリ</md-table-head>
              <md-table-head>コメント</md-table-head>
            </md-table-row>
            <md-table-row v-for="member in team.members">
              <md-table-cell class="icon-column">
                <md-avatar class="member-icon">
                  <img :src="member.icon" alt="Avatar">
                </md-avatar>
              </md-table-cell>
              <md-table-cell>
                <span>{{member.name}}</span>
              </md-table-cell>
              <template v-if="member.detail">
                <md-table-cell>
                  <span>{{member.detail.rank_splat_zones}}</span>
                </md-table-cell>
                <md-table-cell>
                  <span>{{member.detail.rank_tower_control}}</span>
                </md-table-cell>
                <md-table-cell>
                  <span>{{member.detail.rank_rainmaker}}</span>
                </md-table-cell>
                <md-table-cell>
                  <span>{{member.detail.rank_clam_blitz}}</span>
                </md-table-cell>
                <md-table-cell>
                  <span>{{member.detail.short_comment}}</span>
                </md-table-cell>
              </template>
            </md-table-row>
          </md-table>
        </md-card-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showTeamDetailDialog = false">Close</md-button>
        </md-dialog-actions>
      </md-card>
    </md-dialog>
  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>


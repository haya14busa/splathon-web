<template>
  <div class="ranking">
    <md-table v-model="ranking.rankings" md-sort="rank" md-sort-order="asc" md-card>
      <md-table-toolbar>
        <h1 class="md-title">予選ランキング</h1>
      </md-table-toolbar>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ランク" md-sort-by="rank" md-numeric>{{ item.rank }}位</md-table-cell>
        <md-table-cell md-label="チーム">
          <div class="team">
            <div class="md-subheading team-name"><span>{{ item.team.name }}</span></div>
            <div v-if="item.team.members && item.team.members.length > 0" class="members">
              <div v-for="member in item.team.members">
                <md-avatar class="member-icon">
                  <img :src="member.icon" alt="Avatar" @click="showMemberDetail(member)">
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
    <md-dialog :md-active.sync="showMemberDetailDialog">
      <md-card>
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">{{member.name}}</div>
            <div v-if="member.detail" class="md-subhead">{{member.detail.short_comment}}</div>
          </md-card-header-text>

          <md-card-media md-big>
            <img :src="member.icon" :alt="member.name">
          </md-card-media>
        </md-card-header>
        <md-card-content v-if="member.detail">
          <md-list>
            <md-list-item>
              <span class="md-list-item-text">ガチエリア</span>
              <span class="md-list-item-text">{{member.detail.rank_splat_zones}}</span>
            </md-list-item>
            <md-list-item>
              <span class="md-list-item-text">ガチヤグラ</span>
              <span class="md-list-item-text">{{member.detail.rank_tower_control}}</span>
            </md-list-item>
            <md-list-item>
              <span class="md-list-item-text">ガチホコバトル</span>
              <span class="md-list-item-text">{{member.detail.rank_rainmaker}}</span>
            </md-list-item>
            <md-list-item>
              <span class="md-list-item-text">ガチアサリ</span>
              <span class="md-list-item-text">{{member.detail.rank_clam_blitz}}</span>
            </md-list-item>
          </md-list>
        </md-card-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showMemberDetailDialog = false">Close</md-button>
        </md-dialog-actions>
      </md-card>
    </md-dialog>
  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>


<template>
  <div class="tournament">
    <h3>決勝トーナメント</h3>

    <div v-if="tournamentRounds.length == 0">
      <md-field class="input-tournament-size">
        <label>Tournament Size (2^N)</label>
        <md-input required v-model.number="initialTournamentSize" type="number"
           @change=buildNextRound()></md-input>
      </md-field>
    </div>

    <form v-if="canAddNewRound" novalidate class="team-add-content">
      <md-button class="md-raised md-primary" @click="onAdd" type="submit">
        Add
      </md-button>
      <div class="md-layout">
        <div class="md-layout-item input-wrapper">
          <md-field>
            <label>Round Name</label>
            <md-input required v-model="nextRound.round_name"></md-input>
          </md-field>
        </div>
        <div class="md-layout-item input-wrapper">
          <md-field>
            <label>Round</label>
            <md-input required v-model.number="nextRound.round" type="number"></md-input>
          </md-field>
        </div>
      </div>
      <div v-for="(match, index) in nextRound.matches" :key="index">
        <div class="md-layout">
          <div class="md-layout-item input-wrapper">
            <md-field>
              <label>Alpha</label>
              <md-select v-model="match.alpha_team_id">
                <md-option v-for="(rank, index) in restTeamRanks" :value="rank.team.id" :key="index">
                  {{teamSelectorName(rank.team.id)}}
                </md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item input-wrapper">
            <md-field>
              <label>Bravo</label>
              <md-select v-model="match.bravo_team_id">
                <md-option v-for="(rank, index) in restTeamRanks" :value="rank.team.id" :key="index">
                  {{teamSelectorName(rank.team.id)}}
                </md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-15 input-wrapper">
            <md-field>
              <label for="room">Room</label>
              <md-select name="room" required v-model="match.room_id">
                <md-option v-for="room in rooms" :value="room.id">
                  {{room.name}}
                </md-option>
              </md-select>
            </md-field>
          </div>
          <div class="md-layout-item md-size-15 input-wrapper">
            <md-field>
              <label>Order in Room</label>
              <md-input v-model.number="match.order_in_room" type="number"></md-input>
            </md-field>
          </div>
        </div>
      </div>
    </form>

    <div class="tournament-rounds">
      <h3>Tournament Rounds</h3>
      <md-card class="round" v-for="(round, i) in tournamentRounds.slice().reverse()" :key="i">
        <md-card-header>
          <h4>{{round.name}}</h4>
        </md-card-header>
        <md-card-content>
          <div class="md-layout">
            <div class="md-layout-item input-wrapper">
              <md-field>
                <label>Round Name</label>
                <md-input required v-model="round.name"></md-input>
              </md-field>
            </div>
            <div class="md-layout-item input-wrapper">
              <md-field>
                <label>Round</label>
                <md-input required v-model.number="round.round" type="number"></md-input>
              </md-field>
            </div>
          </div>
          <div v-for="(room, j) in round.rooms" :key="j">
            <div v-for="(match, k) in room.matches" :key="k">
              <Match
                :token=token
                :eventNumbering=eventNumbering
                :match=match
                :roomID=room.id
                :rooms=rooms
                />
            </div>
          </div>
        </md-card-content>
      </md-card>
    </div>

  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>

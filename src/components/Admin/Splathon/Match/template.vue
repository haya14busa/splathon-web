<template>
  <md-table-row>
    <md-table-cell>
      <span>{{match.teamAlpha.name}}</span>
      <br v-if="match.winner">
      <span v-if="match.winner == 'alpha'" class="win">WIN</span>
      <span v-if="match.winner == 'bravo'" class="lose">LOSE</span>
    </md-table-cell>
    <md-table-cell class="vs">
      <span>v.s.</span>
      <br v-if="!match.winner || match.winner == 'draw'">
      <span v-if="!match.winner" class="upcoming">
        UPCOMING
      </span>
      <span v-if="match.winner == 'draw'" class="draw">DRAW</span>
    </md-table-cell>
    <md-table-cell>
      <span>{{match.teamBravo.name}}</span>
      <br v-if="match.winner">
      <span v-if="match.winner == 'bravo'" class="win">WIN</span>
      <span v-if="match.winner == 'alpha'" class="lose">LOSE</span>
    </md-table-cell>
    <md-table-cell class="input-wrapper room">
      <md-field>
        <label for="room">Room</label>
        <md-select name="room" required v-model="nmatch.room_id">
          <md-option v-for="room in rooms" :value="room.id">
            {{room.name}}
          </md-option>
        </md-select>
      </md-field>
    </md-table-cell>
    <md-table-cell class="input-wrapper order-in-room">
      <md-field>
        <label>Order in Room</label>
        <md-input v-model.number="nmatch.order_in_room" type="number"></md-input>
      </md-field>
    </md-table-cell>
    <md-table-cell class="input-wrapper">
      <md-button class="md-raised md-primary" @click="onUpdate">
        Update
      </md-button>
    </md-table-cell>
  </md-table-row>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<style lang="scss">
  .vs .md-table-cell-container {
    padding: 0px;
  }
</style>
<script lang="ts" src="./script.ts"></script>


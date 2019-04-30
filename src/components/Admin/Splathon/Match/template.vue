<template>
  <div>
    <div class="md-card md-layout match">
      <div class="md-layout-item">
        <span>{{match.teamAlpha.name}} v.s. {{match.teamBravo.name}}</span>
      </div>
      <div class="md-layout-item md-size-15 input-wrapper">
        <md-field>
          <label for="room">Room</label>
          <md-select name="room" required v-model="nmatch.room_id">
            <md-option v-for="room in rooms" :value="room.id">
              {{room.name}}
            </md-option>
          </md-select>
        </md-field>
      </div>
      <div class="md-layout-item md-size-15 input-wrapper">
        <md-field>
          <label>Order in Room</label>
          <md-input v-model.number="nmatch.order_in_room" type="number"></md-input>
        </md-field>
      </div>
      <div class="md-layout-item md-size-15 input-wrapper">
        <md-button class="md-raised md-primary" @click="onUpdate">
          Update
        </md-button>
      </div>
    </div>

  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>


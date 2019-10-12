<template>
  <div class="schedule">
    <md-button v-if="schedule.entries.length == 0" class="md-icon-button md-primary md-raised" @click="addEntry(0)">
      <md-icon>add</md-icon>
    </md-button>
    <div class="md-card md-layout entry" v-for="(entry, index) in schedule.entries">
      <md-field class="title">
        <label>Title</label>
        <md-textarea required md-autogrow v-model="entry.title"></md-textarea>
      </md-field>
      <time-picker v-model.number="entry.start_timestamp_sec"/>
      <duration-picker class="duration" v-model.number="entry.duration_sec"/>
      <md-button class="md-icon-button md-primary md-raised" @click="addEntry(index)">
        <md-icon>add</md-icon>
      </md-button>
      <md-button class="md-icon-button md-raised" @click="deleteEntry(index)">
        <md-icon>delete</md-icon>
      </md-button>
    </div>
    <md-button v-if="schedule.entries.length != 0" class="md-primary md-raised" @click="save()" :disabled="disableSaveButton">
      Save
    </md-button>

    <md-snackbar md-position="center" :md-active.sync="showSnackbar">
      <span>Schedule Updated!</span>
      <md-button class="md-primary" @click="showSnackbar = false">DISMISS</md-button>
    </md-snackbar>

  </div>
</template>
<style scoped lang="scss" src="./style.scss"></style>
<script lang="ts" src="./script.ts"></script>


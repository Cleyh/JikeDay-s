<template>
  <div class="passage-view-card">
    <div class="tool-bar">
      <n-float-button @click="closeView">
        <n-icon>
          <CloseRound/>
        </n-icon>
      </n-float-button>
    </div>
    <div class="header">
      <h1 class="title">
        {{ this.title }}
      </h1>
    </div>
    <n-divider/>
    <div class="passage-content" >
      <p class="content" v-html="this.content">
      </p>
    </div>
    <n-divider/>
    <div class="passage-footer">
      <div class="passage-footer-time">
        <p>
          {{ this.timeSlotA }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {CloseRound} from '@vicons/material'
export default {
  name: 'passage-view',
  components: {
    CloseRound
  },
  props: {
    content: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    timeSlotA: {
      type: String,
      required: true
    },
    timeSlotB: {
      type: String,
      required: true
    },
    timeSlotC: {
      type: String,
      required: true
    }
  },
  methods: {
    closeView() {
      this.$emit('closeView');
    }
  }
}
</script>

<style>

.passage-view-card {
  background-color: rgba(255, 255, 255, 0.5);
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.24);
  height: 100%;
}

.tool-bar {
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 30px;
}

.title {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #3d3d3d;
}

.passage-content{
  font-size: 18px;
  color: #3d3d3d;
  margin-bottom: 20px;
  line-height: 1.5;
}

.passage-footer-time {
  font-size: 24px;
}

</style>
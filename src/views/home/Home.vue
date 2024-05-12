<!-- Home.vue -->
<template>
  <div class="home">
    <DateCard :date="currentDate" fontColor="#4CAF50"/>
    <WaterfallWall :cards="cards"/>
  </div>
</template>

<script>
import DateCard from '../components/DateCard.vue';
import ScheduleCard from '../components/ScheduleCard.vue';
import WaterfallWall from "@/views/components/WaterFallWall.vue";

export default {
  name: 'Home',
  components: {
    WaterfallWall,
    DateCard,
    ScheduleCard,
  },
  data() {
    return {
      cards: [
        {
          id: 1, type: 'schedule', data: {}
        },
        {
          id: 2, type: 'schedule', data: {}
        },
        {
          id: 3, type: 'active-subscribe', data: {}
        },
      ]
    }
  }
};
</script>

<style>
/* CSS样式 */
.divider {
  height: 1px;
  background-color: #E0E0E0; /* 浅灰色分隔线 */
  margin: 10px 0;
}

</style>

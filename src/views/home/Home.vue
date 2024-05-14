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
import dataController from "@/dataController/DataController.js";
import tweetsManager from "@/subscript/TweetsManager.js";

export default {
  name: 'Home',
  components: {
    WaterfallWall,
    DateCard,
    ScheduleCard,
  },
  data() {
    return {
      currentDate: new Date(),
      page: 0,
      size: 10
    }
  },
  computed: {
    cards() {
      return dataController.tweets;
    }
  },
  created() {
    tweetsManager.getLatesTweetsFromServer(this.page, this.size);
    window.addEventListener('scroll', this.handleScroll);
    this.loadMoreData();
  },
  methods: {
    loadMoreData() {
      tweetsManager.getLatesTweetsFromServer(this.page++, this.size);
    },
    handleScroll() {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      if (nearBottom) {
        this.loadMoreData();
      }
    }
  }

}
</script>

<style>
/* CSS样式 */
.divider {
  height: 1px;
  background-color: #E0E0E0; /* 浅灰色分隔线 */
  margin: 10px 0;
}

</style>

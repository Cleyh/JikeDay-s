<template>
  <div class="waterfall-wall">
    <!-- 动态渲染卡片组件 -->

    <n-infinite-scroll class="infinite-scroll" distance="10" @load="loadMore">
      <component
          v-for="tweet in sortedCards"
          :key="tweet.id"
          :is="getComponent(tweet)"
          v-bind="tweet"
          :tweet_message="tweet"
          @cardClick="handleCardClick"
      />
      <div class="loading" v-if="loading">Loading...</div>
      <div class="no-more" v-if="noMore">No more data 🐱</div>
    </n-infinite-scroll>

  </div>
</template>

<script>
// 导入卡片组件
import ActiveSubscribeCard from './Active-SubscribeCard.vue';
import ScheduleCard from './ScheduleDetailCard.vue';
import {ref} from "vue";

export default {
  name: 'WaterfallWall',
  components: {
    ActiveSubscribeCard,
    ScheduleCard,
  },
  data() {
    return {
      loading: ref(false),
      noMore: false,
    }
  },
  props: {
    cards: {
      type: Array,
      required: true
    },
    loadFunction: {
      type: Function,
      required: true
    }
  },
  computed: {
    // 按时间排序卡片
    sortedCards() {
      //return this.cards.sort((a, b) => new Date(a.data.time) - new Date(b.data.time));
      return this.cards;
    }
  },
  methods: {
    loadMore(){
      this.loadFunction();
    },
    // 根据卡片类型返回相应的组件
    getComponent(type) {
      console.log("type:");
      console.log(type);
      const mapping = {
        'active-subscribe': ActiveSubscribeCard,
        'schedule': ScheduleCard
      };
      //return mapping[type] || null;
      return ActiveSubscribeCard;
    },
    handleCardClick(tweet_message) {
      this.$emit('cardClick', tweet_message);
    }
  }
}
</script>

<style scoped>
.waterfall-wall {
  display: flex;
  flex-direction: column;
}
.infinite-scroll{
  display: flex;
  flex-direction: column;
}
</style>
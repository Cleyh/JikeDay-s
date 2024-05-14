<template>
  <div class="waterfall-wall">
    <!-- 动态渲染卡片组件 -->
    <component
        v-for="tweet in sortedCards"
        :key="tweet.id"
        :is="getComponent(tweet)"
        v-bind="tweet"
        :tweet_message = "tweet"
    />
  </div>
</template>

<script>
// 导入卡片组件
import ActiveSubscribeCard from './Active-SubscribeCard.vue';
import ScheduleCard from './ScheduleCard.vue';

export default {
  name: 'WaterfallWall',
  components:{
    ActiveSubscribeCard,
    ScheduleCard,
  },
  props: {
    cards: {
      type: Array,
      required: true
    }
  },
  computed: {
    // 按时间排序卡片
    sortedCards() {
      //return this.cards.sort((a, b) => new Date(a.data.time) - new Date(b.data.time));
      console.log("test2");
      console.log(this.cards);
      return this.cards;
    }
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>
.waterfall-wall {
  display: flex;
  flex-direction: column;
}
</style>
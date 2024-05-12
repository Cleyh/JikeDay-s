<!-- Home.vue -->
<template>
  <div class="home">
    <DateCard :date="currentDate" fontColor="#4CAF50"/>
    <div class="divider"></div>
    <ScheduleCard
        v-for="schedule in schedules"
        :key="schedule.id"
        :schedule="schedule"
    />
    <div class="divider"></div>
    <NewsCard
        v-for="news in newsFeed"
        :key="news.id"
        :news="news"
    />
  </div>
</template>

<script>
import DateCard from '../components/HomeItems/DateCard.vue';
import ScheduleCard from '../components/HomeItems/ScheduleCard.vue';
import NewsCard from '../components/HomeItems/NewsCard.vue';

export default {
  name: 'Home',
  components: {
    DateCard,
    ScheduleCard,
    NewsCard
  },
  data() {
    return {
      currentDate: new Date(2024, 6, 24), // 月份是从0开始的，所以3月是2
      schedules: [
        {
          id: 1,
          title: '紧急报告',
          isCompleted: false,
          isReminderSet: true,
          isImportant: true
        },
        {
          id: 2,
          title: '参加小明生日',
          isCompleted: false,
          isReminderSet: true,
          isImportant: false
        },
        {
          id: 3,
          title: '参加小黄生日',
          isCompleted: false,
          isReminderSet: true,
          isImportant: false
        }
      ],
      newsFeed: [
        // 示例新闻数据，应从后端服务动态获取
        {
          id: 1,
          title: '2022年议会选举结果公布',
          summary: '近期的议会选举结果出炉，来自自由党的......',
          pushTime: '5分钟前',
          isReminderSet: true,
          isImportant: true
        },
        {
          id: 2,
          title: '2021年议会选举结果公布',
          summary: '近期的议会选举结果出炉，来自自由党的......',
          pushTime: '5分钟前',
          isReminderSet: true,
          isImportant: true
        }
        // 更多新闻项目...
      ] // 假定新闻资讯数组
    };
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

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

<script src="./Home.ts"></script>

<style>
/* CSS样式 */
.divider {
  height: 1px;
  background-color: #E0E0E0; /* 浅灰色分隔线 */
  margin: 10px 0;
}

</style>

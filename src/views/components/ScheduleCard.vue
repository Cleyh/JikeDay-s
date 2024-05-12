<template>
  <div class="schedule-card">
    <input type="checkbox" class="checkbox" :checked="schedule.isCompleted" />
    <span class="title">{{ schedule.title }}</span>
    <div class="icons">
      <i v-if="schedule.isReminderSet" class="icon alarm-icon">⏰</i> <!-- 显示闹钟图标 -->
      <i v-if="schedule.isImportant" class="icon flag-icon">🚩</i> <!-- 显示旗帜图标 -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScheduleCard',
  props: {
    schedule: {
      type: Object,
      default: () => ({
        title: '',
        isCompleted: false,
        isReminderSet: false,
        isImportant: false
      })
    }
  }
};
</script>

<!-- 省略CSS样式，可以沿用之前的样式 -->

<style scoped>
.schedule-card {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #FFFFFF;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin: 10px 0;
}

.checkbox {
  margin-right: 10px;
}

.title {
  flex-grow: 1;
}

.icons {
  display: flex;
  align-items: center;
  border-left: 2px solid #E0E0E0;
  padding-left: 10px;
}

.icon {
  margin-right: 10px;
  font-size: 16px;
}

.alarm-icon {
  color: #F0A30A; /* 橙色图标 */
}

.flag-icon {
  color: #E51400; /* 红色图标 */
}
</style>

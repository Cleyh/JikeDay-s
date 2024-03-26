<template>
  <div class="date-card" :style="{ color: fontColor }">
    <div class="month-year">{{ dateDisplay.monthYear }}</div>
    <div class="day">{{ dateDisplay.day }}</div>
  </div>
</template>

<script>
export default {
  name: 'DateCard',
  props: {
    date: {
      type: Date,
      default: () => new Date()
    },
    fontColor: {
      type: String,
      default: '#000000' // 默认颜色为黑色
    }
  },
  computed: {
    dateDisplay() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const locale = 'zh-CN'; // 假设我们显示中文日期
      return {
        monthYear: this.date.toLocaleDateString(locale, { year: 'numeric', month: 'long' }).replace('年 ', '年'),
        day: this.date.getDate().toString()
      };
    }
  }
};
</script>

<style scoped>
.date-card {
  font-size: 2em;
  text-align: center;
}

.month-year {
  font-size: 0.5em;
}

.day {
  font-size: 1.5em;
  line-height: 1em;
}
</style>

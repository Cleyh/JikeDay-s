<template>
  <div class="DateDisplay">
    <div>{{ month }}月{{ day }}日</div>
    <div class="Today">{{ day }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      events: [{id: 1, title: 'Sample Event'}]
    };
  },
  methods: {
    addEvent() {
      // 实现添加日程的逻辑
    }
  }
};
</script>

<style scoped>
.Today {
  font-size: 48px;
  color: green;
}

.DateDisplay > div:first-child {
  font-size: 20px;
}
</style>
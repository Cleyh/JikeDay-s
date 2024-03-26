<template>
    <toast-message id="1" text="2222" />

    <div>
      <ul>
        <li v-for="event in events" :key="event.id">{{ event.title }}</li>
      </ul>
      <button @click="addEvent">+</button>
    </div>
</template>

<script>
import ToastMessage from "@/components/toastMessage.vue";

export default {
  components: {ToastMessage},
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

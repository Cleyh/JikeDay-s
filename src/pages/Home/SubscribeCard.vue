<template>
  <div class="news-card">
    <div class="header">
      <i class="icon message-icon">💬</i>
      <span class="push-time">{{ news.pushTime }}</span>
    </div>
    <div class="content">
      <h2 class="title">{{ news.title }}</h2>
      <p class="summary">{{ formattedSummary }}</p>
    </div>
    <div class="footer">
      <i class="icon info-icon">ℹ️</i>
      <div class="icons">
        <i v-if="news.isReminderSet" class="icon alarm-icon">⏰</i>
        <i v-if="news.isImportant" class="icon flag-icon">🚩</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonSubCard',
  props: {

  }
}
</script>

<style scoped>

</style>
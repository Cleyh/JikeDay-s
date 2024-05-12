<template>
  <div class="news-card">

    <div class="header">
      <h2 class="title">{{ news.title }}</h2>
      <p class="subtitle">{{ formattedSummary }}</p>
    </div>

    <div class="content">
      <p class="summary">{{ formattedSummary }}</p>
    </div>

    <div class="footer">
      <div class="subsource-info">
        <i class="icon subsource-icon">💬</i>
        <span class="push-time">{{ news.pushTime }}</span>
      </div>
      <i class="icon info-icon">ℹ️</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsCard',
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  computed: {
    formattedSummary() {
      // 假设新闻摘要已经是截断并带有省略号的形式
      return this.news.summary;
    }
  }

};
</script>

<style scoped>
.news-card {
  padding: 16px;
  background: var(--color-background);
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 16px; /* 与下一个卡片的间距 */
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content {
  padding: 16px 0;
}

.title {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.summary {
  font-size: 0.875rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit text to 3 lines */
  -webkit-box-orient: vertical;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
  font-size: 1.2rem;
}

.push-time {
  font-size: 0.75rem;
  color: #999;
}
</style>

<template>
  <div class="active-subscribe-card">

    <div class="header">
      <h2 class="title">{{ this.tweet_message.title }}</h2>
      <p class="subtitle">{{ formattedSummary }}</p>
    </div>

    <div class="content">
      <p class="summary" v-html="this.tweet_message.content"></p>
    </div>

    <div class="footer">
      <div class="subsource-info">
        <i class="icon subsource-icon">💬</i>
        <span class="push-time">{{ this.tweet_message.timeSlotA }}</span>
      </div>
      <i class="icon info-icon">ℹ️</i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActiveSubscribeCard',
  props: {
    tweet_message: {
      type: Object,
      required: true
    }
  },
  created() {
    console.log("test3");
    console.log(this.tweet_message);
  },
  computed: {
    formattedSummary() {
      console.log("test4");
      console.log(this.tweet_message);

      if (this.tweet_message.content.length > 20) {
        return this.tweet_message.content.slice(0, 20) + '...';
      }
      return this.tweet_message.content;
    }
  }

};
</script>

<style scoped>
.active-subscribe-card {
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

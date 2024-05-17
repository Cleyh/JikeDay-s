<template>
  <button class="active-subscribe-card" @click="handleCardClick">
    <div class="header">
      <h1 class="title">{{ this.tweet_message.title }}</h1>
      <p class="subtitle">{{ this.formattedSummary }}</p>
    </div>

    <div class="content">
      <p class="summary">{{ this.formattedSummary }}</p>
    </div>

    <div class="footer">
      <div class="subsource-info">
        <span class="push-time">{{ this.tweet_message.timeSlotA }}</span>
      </div>
      <n-icon class="icon info-icon" :component="MessageRound"></n-icon>
    </div>
  </button>
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
  data() {
    return {
      isShowDetails: false
    };
  },
  methods: {
    formattedSummary() {
      if (this.tweet_message.summary !== null) {
        return this.tweet_message.summary;
      } else {
        return this.tweet_message.content.slice(0, 20) + '...';
      }
    },
    handleCardClick() {
      this.$emit('cardClick', this.tweet_message);
      //this.isShowDetails = !this.isShowDetails;
    }
  }

};
</script>

<style scoped>
.active-subscribe-card {
  padding: 16px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  border-color: rgba(255, 255, 255, 0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  margin-bottom: 16px; /* 与下一个卡片的间距 */
}

.active-subscribe-card:hover {
  background-color: rgba(229, 229, 229, 0.8);
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

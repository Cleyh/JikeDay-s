<template>
  <div class="card">
    <div class="subscribe-icon" @click.stop="toggleSubscription">{{ subscribed ? '➖' : '➕' }}</div>
    <h2>{{ item.title }}</h2>
    <p>{{ item.content }}</p>

    <div class="info-icon">ℹ️</div>
    <div class="likes-comments">
      <span>👍 {{ item.likes }}</span>
      <span>💬 {{ item.comments }}</span>
    </div>
  </div>
</template>

<script>
import dataController from "@/dataController/DataController.js";
import {Subscribe} from "@/dataController/Subscribe.js";
import store from "@/store/store.js";
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      subscribed: false,
    };
  },
  methods: {
    toggleSubscription() {
      this.subscribed = !this.subscribed;
      this.$emit('subscriptionToggled', this.item.id, this.subscribed);
      if (this.subscribed) {
        console.log(this.item);
        dataController.addSubscribe(new Subscribe(
            this.item.id,
            "active",
            this.item.title,
            this.item.url,
            this.item.formatRule,
            this.item.updateInterval
        ));
        this.subscribe(email, this.item.id, store.state.token);
      } else {
        console.log(this.item.id);
        dataController.deleteSubscribe(this.item.id);
        this.unsubscribe(email, this.item.id , store.state.token);
      }
      //从服务器获取id为xxx的订阅源


    },
    async subscribe(email, subscribeID, token) {
      try {
        const response = await fetch('http://localhost:8080/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token // 将 token 添加到请求头中
          },
          body: JSON.stringify({
            user: email,
            subscribe: subscribeID
          })
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message || '订阅失败');
        }

        console.log('订阅成功');
      } catch (error) {
        console.error('订阅失败:', error.message);
      }
    },
    async unsubscribe(email, subscribeID, token) {
      try {
        const response = await fetch('http://localhost:8080/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            user: email,
            subscribe: subscribeID
          })
        });

        const responseData = await response.json();

        if (!response.ok) {
          // 如果响应不成功，则抛出一个错误
          throw new Error(responseData.message || '取消订阅失败');
        }

        // 如果响应成功，则返回响应数据
        return responseData;
      } catch (error) {
        // 捕获网络错误或其他错误
        console.error('取消订阅时发生错误:', error);
        throw error;
      }
    }
  }
}
</script>

<style scoped>
.card {
  width: calc(50% - 20px); /* 减去一些边距，确保两列布局 */
  margin: 10px; /* 为两侧卡片提供间距 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  padding: 10px;
  background-color: white;
  position: relative;
  min-height: 60px; /* 一行文本的最小高度 */
  max-height: 360px; /* 六行文本的最大高度 */
  overflow: hidden;
  /* 响应式设计：如果你想在大屏幕上有更多列，你可以在这里添加媒体查询 */
}

.subscribe-icon {
  position: absolute;
  top: 10px;
  left: 10px;
  cursor: pointer;
}

.info-icon {
  position: absolute;
  bottom: 10px;
  left: 10px;
  cursor: pointer;
}

.likes-comments {
  position: absolute;
  bottom: 10px;
  right: 10px;
  cursor: pointer;
}

h2 {
  margin-top: 20px; /* 为订阅图标留出空间 */
}

p {
  margin-bottom: 40px; /* 为信息和点赞/评论图标留出空间 */
}
</style>
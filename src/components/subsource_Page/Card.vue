<template>
  <div class="card">
    <div class="subscribe-icon">➕</div> <!-- 使用emoji作为图标 -->
    <h2>{{ item.title }}</h2>
    <p>{{ item.content }}</p>
    <div class="info-icon">ℹ️</div> <!-- 使用emoji作为图标 -->
    <div class="likes-comments">
      <span>👍 {{ item.likes }}</span>
      <span>💬 {{ item.comments }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true

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
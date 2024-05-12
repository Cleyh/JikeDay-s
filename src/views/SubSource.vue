<template>
  <div class="subscriptions">
    <h1>订阅源</h1>
    <input type="text" placeholder="搜索">
    <div class="divider"></div>
    <div class="cards-container">
    <card v-for="item in items" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<script>
import Card from "../components/subsource_Page/Card.vue"; // 确保这里的路径是正确的

export default {
  components: {
    Card
  },
  data() {
    return {
      items: [
        { id: 1, title: 'Item 1', content: 'Content for Item 1',likes: 24, comments: 11 },
        { id: 2, title: 'Item 2', content: 'Content for Item 2' },
        // 在这里填充更多items数据
      ]
    }
  }
}
</script>

<style scoped>
/* CSS样式 */
.divider {
  width: 100%;
  height: 1px;
  background-color: #E0E0E0; /* 浅灰色分隔线 */
  margin: 20px 0;
}
.subscriptions {
  /* 这里添加针对订阅源页面的样式 */
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%; /* 限制订阅源容器的最大宽度，您可以根据需要进行调整 */
  margin: auto;
}
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* 两列的布局 */

  width: 100%;
  max-width: 900px; /* 设置一个最大宽度防止卡片过于分散 */
  margin:  auto; /* 居中卡片容器 */
}

</style>

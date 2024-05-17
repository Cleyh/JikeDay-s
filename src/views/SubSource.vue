<template>
  <div class="subscriptions">
    <h1>订阅源</h1>
    <input type="text" placeholder="搜索">
    <n-divider/>
    <div class="cards-container">
      <card v-for="item in items" :key="item.id" :item="item" @subscriptionToggled="handleSubscriptionToggle"/>
    </div>
  </div>
</template>

<script>
import Card from "../components/subsource_Page/Card.vue";
import globalRepository from "@/store/globalRepository.js";
import dataController from "@/dataController/DataController.js";
import tokenSave from "@/store/tokenSave.js";
import store from "@/store/store.js";
import {Subscribe} from "@/dataController/Subscribe.js"

export default {
  components: {
    Card,
  },
  props: ['itemsq'], // 使用 props 接收订阅项数组
  data() {
    return {
      items: [] // 将数据存储在组件的数据属性中
    }
  },
  mounted() {
    this.goToSubscription(); // 在组件加载后调用获取数据的方法
  },
  methods: {
    goToSubscription() {
      // 跳转到订阅源的逻辑
      this.$router.push({name: 'subscription'});
      //let url = globalRepository.actions.getJiServerUrl()+"getSubsource?page=0&size=4";
      fetch("http://localhost:8080/getSubsource?page=0&size=999", {
        method: 'GET'
      })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok.');
            }
            return response.json(); // 处理响应的JSON数据
          })
          .then(({data}) => { // 只提取data字段中的data属性
            console.log(data); // 在这里处理服务器返回的数据
            // 确保data字段是一个数组
            if (Array.isArray(data)) {
              this.item=data;
              // 更新数据属性，以在页面上显示订阅信息
              this.items = data.map(item => ({
                id: item.sid,
                title: item.tittle, // 注意：原数据中标题键是`tittle`，这里做了修正
                content: item.content,
                url: item.url,
                formatRule: item.formatRule,
                updateInterval: item.updateInterval,
                likes: 0, // 默认点赞数
                comments: 0 // 默认评论数
              }));
              console.log(this.items);
            } else {
              throw new Error('Data is not an array.');
            }
          })
          .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            // 在出现错误时清空数据，以便提供更好的用户体验
            this.items = [];
          });
    },
    handleSubscriptionToggle(id, subscribed) {
      // 在这里处理卡片的订阅状态变化
      console.log(`Card with ID ${id} is now ${subscribed ? 'subscribed' : 'unsubscribed'}`);


      // 可以根据需要更新数据或执行其他操作
    },



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
  margin: auto; /* 居中卡片容器 */
}

</style>

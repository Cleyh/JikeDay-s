<template>
  <div id="app">
    <router-view/>
    <nav class="bottom-nav">
      <router-link id="test1" @click="func" to="/">
        <a class="tapLink">首页</a>
      </router-link>
      <router-link to="/subscriptions">
        <a>订阅源</a>
      </router-link>
      <router-link to="/profile">个人</router-link>
    </nav>
  </div>
</template>

<style>
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;

  /* 根据需求添加更多样式 */
}
.tapLink {
  color: aquamarine;
}
a {
  color: aqua;
}
</style>

<script setup>

// 定义func函数
function func() {
  alert('链接被点击！');
}


</script>
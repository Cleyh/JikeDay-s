<template>
  <div class="profile-card">
    <div class="left">
      <img class="avatar" :src="avatarUrl" alt="Avatar">
    </div>
    <div class="right">
      <h2 class="nickname">{{ nickname }}</h2>
      <p class="user-id">ID: {{ userId }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const avatarUrl = ref('src/assets/logo.svg'); // 本地文件路径
const nickname = ref('JohnDoe');
const userId = ref('123456');
</script>

<style scoped>
.profile-card {
  display: flex;
  align-items: center;
}

.left {
  flex: 1;
}

.right {
  flex: 1;
  margin-left: 20px; /* 可以根据需要调整间距 */
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.nickname {
  margin: 0;
  color: #333;
}

.user-id {
  font-size: 14px;
  color: #666;
}
</style>

// 使用ref和reactive创建响应式数据
const avatarUrl = ref('src/assets/logo.svg');
const nickname = ref('JohnDoe');
const userId = ref('123456');


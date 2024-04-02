<template>
  <div class="profile-card">
    <div class="left">
      <!-- 使用label标签包裹input标签，使得点击头像时触发input的点击事件 -->
      <label for="avatarInput">
        <img class="avatar" :src="avatarUrl" alt="Avatar">
      </label>
      <!-- input标签用于选择文件 -->
      <input id="avatarInput" type="file" style="display: none;" @change="handleAvatarChange">
    </div>
    <div class="right">
      <h2 class="nickname">{{ nickname }}</h2>
      <p class="user-id">ID: {{ userId }}</p>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const avatarUrl = ref('src/assets/logo.svg'); // 本地文件路径
const nickname = ref('test');
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
  cursor: pointer; /* 添加指针样式，表示可点击 */
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

<script>
// 处理头像更换事件
const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  // 在这里处理上传的文件，可以将其发送到服务器或者进行其他处理
  console.log('Selected File:', file);
};
</script>

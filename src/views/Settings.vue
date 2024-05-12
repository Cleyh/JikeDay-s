<template>
  <div class="settings">
    <h1>设置</h1>
    <div class="grid-container">
      <!-- 账号管理 -->
      <div class="grid-item" @click="goToAccountManagement">
        <h2>账号管理</h2>
        <!-- 账号管理相关内容 -->
      </div>
      <!-- 退出登录 -->
      <div class="grid-item" @click="confirmLogout">
        <h2>退出登录</h2>
        <!-- 退出登录相关内容 -->
      </div>
    </div>
    <!-- 确认退出登录的提示框 -->
    <div v-if="showLogoutModal" class="modal">
      <div class="modal-content">
        <p>是否确定退出登录？</p>
        <button @click="logout">确定</button>
        <button @click="cancelLogout">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import subSource from "@/views/SubSource.vue";

const showLogoutModal = ref(false);

const goToAccountManagement = () => {
  // 导航到账号管理页面的逻辑
  console.log(subSource);
};

const confirmLogout = () => {
  // 显示退出登录提示框
  showLogoutModal.value = true;
};

const logout = () => {
  // 执行退出登录的逻辑，可以清除用户登录状态等
  console.log('执行退出登录');
  // 关闭提示框
  showLogoutModal.value = false;
};

const cancelLogout = () => {
  // 取消退出登录，关闭提示框
  showLogoutModal.value = false;
};
</script>

<style scoped>
.settings {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.grid-item {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.grid-item h2 {
  margin-top: 0;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.modal-content p {
  margin-bottom: 10px;
}

.modal-content button {
  padding: 8px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  margin-right: 10px;
  cursor: pointer;
}

.modal-content button:hover {
  background-color: #0056b3;
}
</style>

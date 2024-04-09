<template>
  <div class="login-container">
    <div class="login-header">
      <h1>登录</h1>
    </div>
    <div class="login-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="username">用户名:</label>
          <input type="text" id="username" v-model="username" required placeholder="请输入用户名">
        </div>
        <div class="form-group">
          <label for="password">密码:</label>
          <input type="password" id="password" v-model="password" required placeholder="请输入密码">
        </div>
        <div class="login-container_2">
          <button type="submit" class="login-button">登录</button>
        </div>
      </form>
    </div>
    <div class="login-footer">
      <router-link to="/signup" class="link">注册</router-link> |
      <a href="#" class="link" @click.prevent="handleForgotPassword">忘记密码</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      // 登录逻辑
      console.log('Logging in with:', this.username, this.password);
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white; /* 调整为浅灰色背景 */
}

.login-container_2 {
  text-align: center; /* 水平居中 */
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-form {
  width: 100%;
  max-width: 360px; /* 稍微增加宽度 */
  padding: 20px; /* 增加内边距 */
  border-radius: 10px; /* 增加圆角 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  background-color: #fff; /* 白色背景 */
}

.form-group {
  margin-bottom: 20px; /* 增加间距 */
}

.form-group label {
  font-weight: bold; /* 加粗标签 */
}

.form-group input {
  padding: 10px; /* 增加内边距 */
  border: 1px solid #ccc; /* 增加边框 */
  border-radius: 5px; /* 增加圆角 */
  width: 100%; /* 确保宽度 */
}


.login-button {
  background-color: #2196F3; /* 调整为更深的蓝色 */
  color: #fff;
  border: none;
  padding: 12px 48px; /* 增加内边距 */
  border-radius: 5px; /* 增加圆角 */
  cursor: pointer;
  transition: background-color 0.3s ease; /* 添加过渡效果 */
}

.login-button:hover {
  background-color: #1e88e5; /* 鼠标悬停时的颜色 */
}

.login-footer {
  margin-top: 30px;
  text-align: center;
}

.login-footer .link {
  text-decoration: none;
  color: #2196F3; /* 与按钮相同的蓝色 */
  margin: 0 10px; /* 增加间距 */
  transition: color 0.3s ease;
}
.login-footer .link:hover {
  color: #1e88e5; /* 鼠标悬停时的颜色 */
}
</style>


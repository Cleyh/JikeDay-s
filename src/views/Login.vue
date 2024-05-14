<template>
  <div class="login-container">
    <div class="login-header">
      <h1>登录</h1>
    </div>
    <div class="login-form">
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="email">邮箱:</label>
          <input type="email" id="email" v-model="email" required placeholder="请输入邮箱地址">
        </div>
        <div class="form-group">
          <label for="password">密码:</label>
          <input type="password" id="password" v-model="password" required placeholder="请输入密码">
        </div>
        <div class="form-group">
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
import store from "@/store/store.js";

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        let response = await fetch('http://localhost:8080/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        if (!response.ok) {
          this.errorMessage = '登录失败，请检查您的凭据';
        } else {
          let data = await response.json();
          console.log(data);
          if (data.status === 'success') {
            //  token 的存储和后续操作
            this.handleLoginSuccess(data.data);
          } else {
            this.errorMessage = data.message || '登录失败，请稍后再试';
          }
        }
      } catch (error) {
        // 处理网络错误或其他错误
        this.errorMessage = '发生错误，请检查您的网络连接';
        console.error('登录时发生错误:', error);
      }
    },
    handleLoginSuccess(data) {
      //console.log(store.state.token);
      /*console.log(data);*/
      this.$store.dispatch('setToken', data);
      this.$store.dispatch('setEmail',this.email);
      // this.$store.commit('tokenSave/SET_TOKEN');
      // this.$store.commit('tokenSave/SET_EMAIL');
      this.$store.commit('auth/login');
      this.$router.push('/profile');
    },
    handleForgotPassword() {
      // 处理忘记密码的逻辑
      console.log('处理忘记密码功能');
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


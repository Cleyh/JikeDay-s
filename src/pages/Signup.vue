<template>
  <div class="registration-container">
    <h2>邮件注册</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">电子邮件:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">注册</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
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
        // 这里假设你有一个API端点来处理注册请求
        // 你可能需要替换为你的实际API端点
        const response = await this.$http.post('/api/register', {
          email: this.email,
          password: this.password
        });

        // 处理响应...比如跳转到登录页面或者显示成功消息
        if (response.data.success) {
          this.$router.push('/login'); // 假设你有一个登录页面
        }
      } catch (error) {
        // 处理错误...比如显示错误消息
        this.errorMessage = '注册失败，请检查您的输入或稍后重试。';
      }
    }
  }
};
</script>

<style scoped>
.registration-container {
  /* 你的样式 */
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
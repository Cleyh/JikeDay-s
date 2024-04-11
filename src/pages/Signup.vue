<template>
  <div class="background-container">
    <div class="registration-container">
      <h2 class="title">邮件注册</h2>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="input-field">
          <label for="email">电子邮件:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="input-field">
          <label for="password">密码:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="submit-button">注册</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      username: '',  // 添加用户名字段
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        let response = await fetch('http://localhost:8080/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.email,  // 添加用户名
            email: this.email,
            password: this.password
          })
        });

        if (response.ok) {
          let data = await response.json();

          // let data = await response.text();
          // alert(data);

        } else {
          this.errorMessage = '注册失败';
        }
      } catch (error) {
        this.errorMessage = '网络错误，请稍后再试';
      }
    }
  }
};
</script>



<style scoped>
.background-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: white; /* 调整为浅灰色背景 */
}

.registration-container {
  width: 300px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  border-radius: 10px;
}

.title {
  text-align: center;
  color: #333;
}

.form {
  display: flex;
  flex-direction: column;
}

.input-field {
  margin-bottom: 15px;
}

.input-field label {
  display: block;
  margin-bottom: 5px;
}

.input-field input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.submit-button {
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-message {
  color: red;
  text-align: center;
}
</style>

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
      <p class="user-id">Email: {{ email }}</p>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      avatarUrl: 'src/assets/logo.svg', // 本地文件路径
      nickname: 'test',
      userId: '123456',
      email:'null'
    };
  },

  mounted() {
      this.getProfile(); // 组件挂载后获取个人信息
  },

  methods: {
    // 处理头像更换事件
    handleAvatarChange(event) {
      const file = event.target.files[0];
      // 在这里处理上传的文件，可以将其发送到服务器或者进行其他处理
      console.log('Selected File:', file);
    },

    async getProfile() {
      try {
        const email = this.$store.state.tokenSave.email;
        const token = this.$store.state.tokenSave.token;
        //console.log(token)
        const urlWithParams = `http://localhost:8080/user/getProfile?user=${encodeURIComponent(email)}`;
        const response = await fetch(urlWithParams, {
          method: 'GET',
          headers: {
            'Authorization':`${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const userData = await response.json();
        // 更新个人信息
        // this.userInfo.avatarUrl = userData.avatarUrl;
        //console.log(userData.data.name)
        this.nickname = userData.data.name;
        this.userId = userData.data.uid;
        this.email =userData.data.email;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  }
};
</script>

<style scoped>
.profile-card {
  display: flex;
  align-items: center;
  background-color: #f5f5f5; /* 添加背景色 */
  border-radius: 10px; /* 添加圆角 */
  padding: 100px; /* 添加内边距 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.left {
  flex: 1;
  display: flex; /* 使用flex布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.right {
  flex: 2;
  margin-left: 20px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  cursor: pointer;
  object-fit: cover; /* 使图片始终填充容器，但不会拉伸 */
}

.nickname {
  margin: 0;
  color: #333;
  font-size: 24px; /* 增大字体大小 */
  font-weight: bold; /* 加粗字体 */
}

.user-id {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px; /* 增加下边距 */
}
</style>

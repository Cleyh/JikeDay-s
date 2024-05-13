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

<script>
import axios from 'axios'; // 导入 Axios

export default {
  data() {
    return {
      avatarUrl: 'src/assets/logo.svg', // 本地文件路径
      nickname: 'test',
      userId: '123456'
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

    // 获取个人信息
    async getProfile() {
      try {
        const response = await axios.get('/user/getProfile', {
          headers: {
            'Authorization': `Bearer ${yourToken}` // 替换为你的 token
          },
          params: {
            user: this.userInfo.email // 传入用户邮箱
          }
        });
        // 更新控件显示用户信息
        const userData = response.data;
        this.avatarUrl = userData.avatar;
        this.nickname = userData.name;
        this.userId = userData.uid;
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

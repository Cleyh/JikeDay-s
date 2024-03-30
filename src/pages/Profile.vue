<template>
  <div class="profile">
    <!-- 引入个人信息卡片 -->
    <div class="profile-card">
      <ProfileCard :avatarUrl="userInfo.avatarUrl" :nickname="userInfo.nickname" :userId="userInfo.userId" />
      <!-- 将按钮放置在右侧 -->
      <button @click="switchUser">切换用户</button><!-- 增加退出登录按钮 -->
      <button class="logout-btn" @click="logout">退出登录</button>
    </div>

  </div>
</template>

<script>
import ProfileCard from '../components/Profile_Page/ProfileCard.vue';

export default {
  components: {
    ProfileCard
  },
  props: {
    userInfo: {
      type: Object,
      default: () => ({
        avatarUrl: 'default-avatar.jpg',
        nickname: 'Guest',
        userId: '0000'
      })
    }
  },
  methods: {
    switchUser() {
      // 在这里编写切换用户的逻辑，可以调用后端接口获取新用户信息等
      console.log('Switching user...');
    },
    logout() {
      // 在这里编写退出登录的逻辑，可以清除用户信息等
      console.log('Logging out...');
    }
  }
};
</script>

<style scoped>
.profile {
  position: fixed;
  top: 20px; /* 将 .profile 定位到页面底部 */
  left: 20px;
}

/* 调整个人信息卡片内部布局 */
.profile-card {
  display: flex;
  align-items: center;
}

.left {
  flex: 1;
}

.right {
  flex: 3; /* 调整右侧占比 */
  margin-left: 10px; /* 减小左右间距 */
  display: flex; /* 将右侧元素设为 Flex 容器 */
  justify-content: space-between; /* 元素之间均匀分布 */
  align-items: center; /* 垂直居中对齐 */
}

.avatar {
  width: 80px; /* 减小头像大小 */
  height: 80px; /* 减小头像大小 */
  border-radius: 50%;
}

.nickname {
  margin: 0;
  color: #333;
}

.user-id {
  margin: 0; /* 将用户ID的上下间距设为0 */
  font-size: 14px;
  color: #666;
}

button {
  font-size: 12px; /* 减小按钮字体大小 */
  padding: 4px 8px; /* 调整按钮大小 */
  color: #007bff; /* 添加按钮颜色 */
}

.logout-btn {
  font-size: 12px;
  padding: 4px 8px;
  color: red; /* 退出登录按钮颜色 */
}
</style>

<template>
  <div class="profile">
    <!-- 引入个人信息卡片 -->
    <div class="profile-card">
      <ProfileCard :avatarUrl="userInfo.avatarUrl" :nickname="userInfo.nickname" :userId="userInfo.userId" />
    </div>
    <button @click="switchUser">切换用户</button>
    <button @click="logout">退出登录</button>
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

</style>

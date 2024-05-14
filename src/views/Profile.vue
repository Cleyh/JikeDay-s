<template>
  <div class="profile">
    <!-- 引入个人信息卡片 -->
    <div class="profile-card">
      <ProfileCard :avatarUrl="userInfo.avatarUrl" :nickname="userInfo.nickname" :userId="userInfo.userId"/>
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
      console.log(this.$store.state.tokenSave.email); // 正确的访问方式
      console.log(this.$store.state.tokenSave.token);
    },
    async getProfile() {
      try {
        const email = this.$store.state.tokenSave.email;
        const token = this.$store.state.tokenSave.token;
        console.log(token)
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
        console.log(userData.data.name)
        this.userInfo.nickname = userData.data.name;
        this.userInfo.userId = userData.data.uid;
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    }
  },
  mounted() {
    this.getProfile();
  }
};
</script>

<style scoped>
/* 可以添加样式 */
</style>

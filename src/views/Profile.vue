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
    switchUser(){
      let a;
      a=this.store.state.email
      alert(a)
    },
    async getProfile() {
      try {
        const response = await fetch('/user/getProfile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
          params: {
            user: this.userInfo.email // 假设你的 userInfo 对象中包含了用户邮箱
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const userData = await response.json();
        // 更新个人信息
        this.userInfo.avatarUrl = userData.avatar;
        this.userInfo.nickname = userData.nickname;
        this.userInfo.userId = userData.userId;
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

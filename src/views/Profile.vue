<template>
  <div class="profile">
    <div class="profile-card">
      <ProfileCard :avatarUrl="userInfo.avatarUrl" :nickname="userInfo.nickname" :userId="userInfo.userId" />
    </div>
    <div class="buttons">
      <button @click="switchUser">切换用户</button>
      <button @click="logout">退出登录</button>
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
      this.$store.commit('auth/logout');
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setEmail',null);
      this.$router.push('/login');
    },
    logout(){
      this.$store.commit('auth/logout');
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setEmail',null);
      this.$router.push('/home');
    },
  },
  mounted() {
  }
};
</script>

<style scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #ffffff;
}

.buttons {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ddd;
}
</style>

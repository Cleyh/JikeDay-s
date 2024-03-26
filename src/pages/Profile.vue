<template>
  <div class="profile">
    <!-- 引入个人信息卡片 -->
    <ProfileCard :avatarUrl="userInfo.avatarUrl" :nickname="userInfo.nickname" :userId="userInfo.userId" />
  </div>
</template>

<script>
import ProfileCard from '../components/Profile_Page/ProfileCard.vue';

export default {
  components: {
    ProfileCard
  },
  props: {
    userInfo: { // 定义userInfo作为props接收后端传来的个人信息对象
      type: Object,
      default: () => ({ // 定义默认值为一个包含默认头像URL、昵称和用户ID的对象
        avatarUrl: 'default-avatar.jpg',
        nickname: 'Guest',
        userId: '0000'
      })
    }
  },
  // 数据和方法
};
</script>

<style scoped>
/* 样式 */
.profile {
  /* 可以添加更多的样式来美化个人信息卡片容器 */
}
</style>

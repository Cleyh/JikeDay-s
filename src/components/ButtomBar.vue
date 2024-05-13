<template>
  <div class="bottom-nav">
    <nav class="nav-card">
      <ul>
        <li @click="goToHomePage">
          <span v-if="customIcons.home">{{ customIcons.home }}</span>
          <span v-else>🗓️</span>
          <span>主页</span>
        </li>
        <li @click="goToSubscription">
          <span v-if="customIcons.subscription">{{ customIcons.subscription }}</span>
          <span v-else>📰</span>
          <span>订阅源</span>
        </li>
        <li @click="goToProfile">
          <span v-if="customIcons.profile">{{ customIcons.profile }}</span>
          <span v-else>👤</span>
          <span>个人中心</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
  props: {
    customIcons: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    goToHomePage() {
      // 跳转到主页的逻辑
  this.$router.push({name:'home'})
    },
    goToSubscription() {
      // 跳转到订阅源的逻辑
      this.$router.push({ name: 'subscription' });

    },
    goToProfile() {
      // 跳转到个人中心的逻辑
      this.$router.push({ name: 'profile' }); // 通过路由名称导航
    },
    // ... goTo methods ...
    updateNavWidth() {
      // 获取父容器的宽度并设置为.nav-card的宽度
      const parentWidth = this.$el.parentElement.offsetWidth;
      const navCard = this.$el.querySelector('.nav-card');
      if (navCard) {
        navCard.style.width = `${parentWidth}px`;
      }
    },
    // ... other methods ...
  },
  mounted() {
    this.updateNavWidth();
    window.addEventListener('resize', this.updateNavWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateNavWidth);
  }
}
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
}

.nav-card {
  width: 100vw;
  max-width: 100%; /* 确保不会超过视口宽度 */
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.5);
  border-radius: 20px 20px 0 0;
  padding: 10px 0;
  display: flex;
  justify-content: space-around;
}

.nav-card ul {
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: inherit;
  margin: 0 auto;
}

.nav-card li {
  text-align: center;
  flex-grow: 1;
  flex-basis: 0;
}

.nav-card span {
  display: block;
  margin-bottom: 5px;
}

/* 确保SVG图标显示正确 */
.nav-card span svg {
  width: 24px;
  height: 24px;
}
</style>

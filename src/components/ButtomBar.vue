<template>
  <div class="bottom-nav">
    <nav class="nav-card">
      <ul>
        <li>
          <button @click="goToHomePage" class="nav-button">
            <span v-if="customIcons.home">{{ customIcons.home }}</span>
            <span v-else>🗓️</span>
            <span>主页</span>
          </button>
        </li>
        <li>
          <button @click="goToSubscription" class="nav-button">
            <span v-if="customIcons.subscription">{{ customIcons.subscription }}</span>
            <span v-else>📰</span>
            <span>订阅源</span>
          </button>
        </li>
        <li>
          <button @click="goToProfile" class="nav-button">
            <span v-if="customIcons.profile">{{ customIcons.profile }}</span>
            <span v-else>👤</span>
            <span>个人中心</span>
          </button>
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
    updateNavWidth() {
      const parentWidth = this.$el.parentElement.offsetWidth;
      const navCard = this.$el.querySelector('.nav-card');
      if (navCard) {
        navCard.style.width = `${parentWidth}px`;
      }
    },
  },
  mounted() {
    // this.updateNavWidth();
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
  left: 30%;
  right: 30%;
  bottom: 0;
  display: flex;
  justify-content: center;
}

.nav-card {
  width: 100%;
  max-width: 100%;
  background: white;
  box-shadow: 0 4px 6px rgba(0,0,0,0.5);
  border-radius: 20px 20px 0 0;
  padding: 10px 0;
}

.nav-card ul {
  list-style: none;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin: 0; /* 移除 ul 的默认外边距 */
}

.nav-card li {
  text-align: center;
}

.nav-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s; /* 添加过渡效果 */
}

.nav-button:hover {
  background-color: #f0f0f0; /* 悬停时的背景色 */
}

.nav-button:active {
  background-color: #e0e0e0; /* 按压时的背景色 */
}

.nav-button span {
  display: block;
  margin-bottom: 5px;
}

.nav-button svg {
  width: 24px;
  height: 24px;
}
</style>


import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/views/home/Home.vue';
import SubscriptionPage from '@/views/SubSource.vue';
import ProfilePage from '@/views/Profile.vue';
import Login from "@/views/Login.vue";
import store from "@/store/store.js";
import Signup from '@/views/Signup.vue'
import PassageView from "@/views/PassageView.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/',
            name: 'home',
            component: HomePage,
            meta: { requiresAuth: true }
        },
        {
            path: '/home',
            name: 'home',
            component: HomePage,
            meta: { requiresAuth: true }
        },
        {
            path: '/subscription',
            name: 'subscription',
            component: SubscriptionPage,
            meta: { requiresAuth: true }
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfilePage,
            meta: { requiresAuth: true }
        }
    ],
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // 检查目标路由是否需要登录
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    const isLoggedIn = store.state.auth.isLoggedIn;

    if (requiresAuth && !isLoggedIn) {
        // 如果需要登录但用户未登录，重定向到登录页
        next({
            path: '/login',
            query: { redirect: to.fullPath } // 将当前路由的完整路径作为参数传递给登录页
        });
    } else {
        // 否则，继续导航
        next();
    }
});

export default router;

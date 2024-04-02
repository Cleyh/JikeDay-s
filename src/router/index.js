import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../pages/Home.vue';
import SubscriptionPage from '../pages/SubSource.vue';
import ProfilePage from '../pages/Profile.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/subscription',
            name: 'subscription',
            component: SubscriptionPage,
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfilePage,
        },
    ],
});

export default router;

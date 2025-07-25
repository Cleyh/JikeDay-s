import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/Home.vue';
import Subscriptions from '@/pages/SubSource.vue';
import Profile from '@/pages/Profile.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/subscriptions',
            name: 'Subscriptions',
            component: Subscriptions,
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile,
        },
    ],
});

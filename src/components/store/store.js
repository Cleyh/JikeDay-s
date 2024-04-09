// store.js
import { createStore } from 'vuex';

export default createStore({
    state: {
        isLoggedIn: false, // 假设初始登录状态为false
    },
    mutations: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
        // 其他与登录状态相关的mutations...
    },
    // actions, getters...
});
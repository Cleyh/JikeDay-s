const auth = {
    namespaced: true,
    state: {
        isLoggedIn: false,
    },
    mutations: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        }
    },
    actions: {
        // 可以添加异步操作，如 API 请求
    },
    getters: {
        // 获取登录状态
        isLoggedIn: state => state.isLoggedIn
    }
};

export default auth;
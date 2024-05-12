import { Module } from 'vuex';
import { AuthState } from '../types';

const auth: Module<AuthState, any> = {
    namespaced: true,
    state: {
        isLoggedIn: false,// 假设初始登录状态为false
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
        logIn({ commit }) {
            commit('login');
        },
        logOut({ commit }) {
            commit('logout');
        }
        // 其他与登录状态相关的mutations...
    },
    getters: {
        isLoggedIn: (state): boolean => state.isLoggedIn
    }
};

export default auth;

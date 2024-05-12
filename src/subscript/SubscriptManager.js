// src/services/RuleManager.js
import {ActiveSubsource} from "@/subscript/ActiveSubsource.js";
import store from "@/store/store.js";

export class SubscriptManager {
    subsource = [];
    apiUrl = "";

    constructor(apiUrl) {
        this.apiUrl = apiUrl; // 存储 API 的 URL
    }

    // 获取用户 subscribe，如果用户登陆了则从服务器获取，如果没有登陆则从本地记录获取
    async loadSubsource() {
        if (this.userLoggedIn()) {
            try {
                const response = await axios.get(`${this.apiUrl}/user-subscriptions`);
                this.subSources = response.data;
            } catch (error) {
                console.error('Failed to load subscriptions from server:', error);
            }
        } else {
            this.subSources = this.loadLocalSubscriptions(); // 从本地存储加载订阅源
        }
    }

    // 更新主动获取式的订阅源
    async updateActiveSubscribes() {
        this.subSources.filter(sub => sub.active).forEach(sub => {
            const activeSubsource = new ActiveSubsource(
                sub.id,
                sub.url,
                sub.formatRule,
                sub.updateCycle
            );
            // 存储更新的数据
            activeSubsource.fetchData().then(() => {
                localStorage.setItem(
                    sub.id,
                    JSON.stringify(activeSubsource.getFormat())
                );
            });
        });
    }


    userLoggedIn() {
        return store.state.auth.isLoggedIn;
    }

    loadLocalSubscriptions() {
        // 实现从本地存储加载订阅源的逻辑
        return [];
    }
}

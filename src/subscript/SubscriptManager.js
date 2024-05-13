// src/services/RuleManager.js
import {ActiveSubsource} from "@/subscript/ActiveSubsource.js";
import store from "@/store/store.js";
import dataController from "@/dataController/DataController.js";
import axios from "axios";

class SubscriptManager {
    subsource = [];
    activeSubsource = [];
    apiUrl = "";

    constructor(apiUrl) {
        this.apiUrl = apiUrl; // 存储 API 的 URL
    }

    // 获取用户 subscribe，如果用户登陆了则从服务器获取，如果没有登陆则从本地记录获取
    async loadSubsource() {
        if (this.userLoggedIn()) {
            try {
                const response = await axios.get(`${this.apiUrl}/user-subscriptions`);
                this.subSources = response.data.toArray();
            } catch (error) {
                console.error('Failed to load subscriptions from server:', error);
            }
        } else {
            this.subSources = this.loadLocalSubscriptions(); // 从本地存储加载订阅源
        }

        this.activeSubsource = [];

        for (let i = 0; i < this.subSources.length; i++) {
            if (this.subSources[i].subs_type === 'active') {
                const formatruleBody = subSources[i].form.slice(subSources[i].formatRule.indexOf('{') + 1, subSources[i].formatRule.lastIndexOf('}'));
                const formatruleFunction = new Function('rawData', formatruleBody);

                this.activeSubsource.push(new ActiveSubsource(
                    subSources[i].id,
                    subSources[i].url,
                    formatruleFunction,
                    subSources[i].updateInterval)
                );
            }
        }
    }

    // 更新主动获取式的订阅源
    async updateActiveSubscribes() {
        // 存储更新的数据
        for (let i = 0; i < this.activeSubsource.length; i++) {
            this.activeSubsource[i].fetchData().then(() => {
                dataController.addTweet(new Tweet(-1, activeSubsource[i].id, new Date().getTime(), activeSubsource[i].url, activeSubsource[i].rawData))
            });
        }

    }

    userLoggedIn() {
        return store.state.auth.isLoggedIn;
    }

    loadLocalSubscriptions() {
        // 实现从本地存储加载订阅源的逻辑
        return dataController.subscribes.toArray();
    }
}

const subscriptManager = new SubscriptManager(store.state.globalRepository.serverUrl);
export default subscriptManager;
// src/services/RuleManager.js
import {ActiveSubsource} from "@/subscript/ActiveSubsource.js";
import store from "@/store/store.js";
import dataController from "@/dataController/DataController.js";

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
    }

    // 更新主动获取式的订阅源
    async updateActiveSubscribes() {
        this.subSources.filter(sub => sub.subs_type === 'active')
            .forEach(sub => {
                const formatruleBody = sub.form.slice(
                    sub.formatRule.indexOf('{') + 1,
                    sub.formatRule.lastIndexOf('}')
                );
                const formatruleFunction = new Function('rawData', formatruleBody);

                const activeSubsource = new ActiveSubsource(
                    sub.id,
                    sub.url,
                    formatruleFunction,
                    sub.updateInterval
                );

                // 存储更新的数据
                activeSubsource.fetchData().then(() => {
                    dataController.addTweet(new Tweet(
                        -1,
                        activeSubsource.id,
                        new Date(),
                        activeSubsource.url,
                        activeSubsource.rawData
                    ))
                });
            });
    }


    userLoggedIn() {
        return store.state.auth.isLoggedIn;
    }

    loadLocalSubscriptions() {
        // 实现从本地存储加载订阅源的逻辑
        return dataController.subscribes.toArray();
    }
}

const subscriptManager = new SubscriptManager(dataController.getJiServerUrl());
export default subscriptManager;
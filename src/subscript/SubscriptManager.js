// src/services/RuleManager.js
import {ActiveSubsource} from "@/subscript/ActiveSubsource.js";
import store from "@/store/store.js";
import dataController from "@/dataController/DataController.js";
import axios from "axios";
import {reactive} from "vue";

class SubscriptManager {
    subsource = [];
    apiUrl = "";

    constructor(apiUrl) {
        this.apiUrl = apiUrl; // 存储 API 的 URL
    }

    // 获取用户 subscribe，如果用户登陆了则从服务器获取，如果没有登陆则从本地记录获取
    async loadSubsource() {
        if (!this.userLoggedIn()) {
            try {
                console.log("load subsource from server");
                //const response = axios.get(`${this.apiUrl}/getSubsource`);
                let response = await axios.get(`http://localhost:8080/getSubsource?page=0&size=4`);
                console.log(response.data);
                if (response.data.status === 'success') {
                    this.subsource = response.data.data.map(item => ({
                        sid: item.sid,
                        title: item.tittle, // 注意拼写修正
                        content: item.content,
                        script: item.script,
                        type: item.type,
                        url: item.url,
                        updateInterval: item.updateInerval
                    }));
                }
                console.log(this.subsource);
            } catch (error) {
                console.error('Failed to load subscriptions from server:', error);
            }
        } else {
            this.subSources = this.loadLocalSubscriptions(); // 从本地存储加载订阅源
        }
    }

    // 更新主动获取式的订阅源
    async getLatestTweets(pages, size) {
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
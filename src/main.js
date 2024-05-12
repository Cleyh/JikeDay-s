import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './PageRouter.js';
import store from "@/store/store.ts";
import './assets/base.css';
import './assets/main.css';

// let hostUrl = "http://localhost:8080";

// todo:初始化程序 (加载本地数据)

// todo: 初始化任务

// todo: 加载插件

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
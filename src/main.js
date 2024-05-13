import './assets/main.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/PageRouter.js'; // 导入 router
import store from "@/store/store.js";
import './assets/base.css';
import './assets/main.css';
import dataController from "@/dataController/DataController.js";

// todo 初始化

const app = createApp(App);
app.use(router);
app.use(store);

app.mount('#app');

dataController.initializeDB();

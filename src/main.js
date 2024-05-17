import './assets/main.css';
import {createApp} from 'vue';
import App from './App.vue';
import router from './router/PageRouter.js'; // 导入 router
import store from "@/store/store.js";
import './assets/base.css';
import './assets/main.css';
import dataController from "@/dataController/DataController.js";
import subscriptManager from "@/subscript/SubscriptManager.js";
import naive from "naive-ui";
import VCalendar, {Calendar, DatePicker, setupCalendar} from 'v-calendar';
import 'v-calendar/style.css';
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// todo 初始化

const app = createApp(App);
app.use(router);
app.use(store);
app.use(naive);
app.use(ElementPlus);
app.use(dayjs);
dayjs.extend(relativeTime);
dayjs.locale('zh-cn');

app.use(setupCalendar,{});
app.component('VCalendar', Calendar)
app.component('VDatePicker', DatePicker)

app.mount('#app');

store.state.globalRepository.serverUrl = "http://localhost:8080";

//dataController.initializeDB();
subscriptManager.loadSubsource().then(r => {

});

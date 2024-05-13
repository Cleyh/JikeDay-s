import {reactive} from "vue";
import Dexie from "dexie";

class DataController {

    apiUrl = "";
    db = new Dexie('JiBataBase');

    subscribes;
    schedules;
    tweets;
    setting;

    constructor(apiUrl) {
        this.apiUrl = apiUrl;
        this.subscribes = reactive([]);
        this.schedules = reactive([]);
        this.tweets = reactive([]);
        this.setting = reactive([]);
        this.initializeDB();
        this.loadData();
    }

    // 初始化数据库

    initializeDB() {
        this.db.version(1).stores({
            user: 'id, username, email, avater, token',
            subscribe_list: 'id, type, name, url, formatRule, updateInterval',
            schedule_list: 'id, title, content, typeData, status, createTime, startTime, endTime',
            tweet_list: 'id, source, time, title, content',
            setting: 'id, settings, value'
        });

        this.db.open().catch((error) => {
            console.error("Failed to open db: " + error.stack);
        });
    }

    // 从数据库加载

    async loadData() {
        const user = await this.db.user;
        const subscribeMap = await this.db.subscribe_list.toArray();
        const TweetMap = await this.db.tweet_list.toArray();
        const scheduleMap = await this.db.schedule_list.toArray();
        const setting = await this.db.setting.toArray();

        //this.user = reactive(new User(user));
        this.subscribes = reactive(subscribeMap.map(data => new Subscribe(
            data.id,
            data.type,
            data.name,
            data.url,
            data.formatRule,
            data.updateInterval))
        );
        this.tweets = reactive(TweetMap.map(data => new Tweet(
            data.id,
            data.source,
            data.time,
            data.title,
            data.content))
        );
        this.schedules = reactive(scheduleMap.map(data => new Schedule(
            data.id,
            data.title,
            data.content,
            data.typeData,
            data.status,
            data.createTime,
            data.startTime,
            data.endTime))
        );
        this.setting = reactive(setting.map(data => new Setting(
            setting.id,
            setting.settings,
            setting.value))
        );
    }

    async loadSubscribe() {
        const subscribeMap = await this.db.subscribe_list.toArray();
        this.subscribes = reactive(subscribeMap.map(data => new Subscribe(
            data.id,
            data.type,
            data.name,
            data.url,
            data.formatRule,
            data.updateInterval))
        );
    }

    async loadSchedule() {
        const scheduleMap = await this.db.schedule_list.toArray();
        this.schedules = reactive(scheduleMap.map(data => new Schedule(
            data.id,
            data.title,
            data.content,
            data.typeData,
            data.status,
            data.createTime,
            data.startTime,
            data.endTime))
        );
    }

    async loadAllTweet() {
        const TweetMap = await this.db.tweet_list.toArray();
        this.tweets = reactive(TweetMap.map(data => new Tweet(
            data.id,
            data.source,
            data.time,
            data.title,
            data.content))
        );
    }

    // 从内存读取

    getSubscribe(id) {
        return this.subscribes.find(subscribe => subscribe.id === id);
    }

    getAllSubscribe() {
        return this.subscribes;
    }

    getSchedule(id) {
        return this.schedules.find(schedule => schedule.id === id);
    }

    getAllSchedule() {
        return this.schedules;
    }

    getTweet(id) {
        return this.tweets.find(tweet => tweet.id === id);
    }

    // 读取第pages*int个到pages*int+size个的tweet
    getTweets(pages, size) {
        return this.tweets.slice(pages * size, pages * size + size);
    }

    getAllTweets() {
        return this.subscribes;
    }

    getUser() {
        return this.user;
    }

    getSetting(id) {
        return this.setting.find(setting => setting.id === id);
    }

    getAllSetting() {
        return this.setting;
    }

    // 修改内存数据并实时保存到数据库
    async addSubscribe(subscribe) {
        try {
            await this.db.subscribe_list.add(subscribe);
            await this.loadSubscribe(); // 重新加载订阅列表以更新内存中的数据
        } catch (error) {
            console.error('Error adding subscription:', error);
        }
    }

    async updateSubscribe(subscribe) {
        try {
            await this.db.subscribe_list.put(subscribe);
            await this.loadSubscribe(); // 重新加载订阅列表以更新内存中的数据
        } catch (error) {
            console.error('Error updating subscription:', error);
        }
    }

    async deleteSubscribe(id) {
        try {
            await this.db.subscribe_list.delete(id);
            await this.loadSubscribe(); // 重新加载订阅列表以更新内存中的数据
        } catch (error) {
            console.error('Error deleting subscription:', error);
        }
    }

    async addSchedule(schedule) {
        try {
            await this.db.schedule_list.add(schedule);
            await this.loadSchedule();
        }catch (error) {
            console.error('Error adding schedule:', error);
        }
    }

    async updateSchedule(schedule) {
        try{
            await this.db.schedule_list.put(schedule);
            await this.loadSchedule();
        }catch (error) {
            console.error('Error updating schedule:', error);
        }
    }

    async deleteSchedule(id) {
        try {
            await this.db.schedule_list.delete(id);
            await this.loadSchedule();
        }catch (error) {
            console.error('Error deleting schedule:', error);
        }
    }

    async addTweet(tweet) {
        this.tweets.push(tweet);
        this.db.tweet_list.add(tweet).catch(error => {
            console.error('Error adding tweet to DB:', error);
        });
    }

    async deleteTweet(id) {
        const index = this.tweets.findIndex(tweet => tweet.id === id);
        if (index !== -1) {
            console.error('Tweet not found');
            return;
        }
        this.tweets.splice(index, 1);
        this.db.tweet_list.delete(id).then(deleted => {
            if (deleted) {
                console.log("Tweet deleted successfully");
            } else {
                console.error("Failed to delete tweet");
            }
        }).catch(error => {
            console.error('Error deleting tweet from DB:', error);
        });
    }

    async updateSetting(setting) {
        try {
            await this.db.setting_list.put(setting);
            await this.loadSetting();
        }catch (error) {
            console.error('Error updating setting:', error);
        }
    }

    async updateUser(user) {
        try {
            await this.db.user_list.put(user);
            await this.loadUser();
        }catch (error) {
            console.error('Error updating user:', error);
        }
    }

}

const dataController = new DataController("http://localhost:8080/");

export default dataController;
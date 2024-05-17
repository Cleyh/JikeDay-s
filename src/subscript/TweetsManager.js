import axios from "axios";
import {reactive} from "vue";
import dataController from "@/dataController/DataController.js";
import {Tweet} from "@/dataController/Tweet.js";

class TweetsManager {

    page = 0;
    size = 10;

    async getLatesTweetsFromServer() {
        console.log("getLatesTweetsFromServer");
        let response = await axios.get(
            `http://localhost:8080/getLatestTweets?user=` + `123`
            + `&page=` + this.page.toString()
            + `&size=` + this.size.toString()
        );
        console.log(response.data);
        let tweets = [];
        if (response.data.status === 'success') {
            tweets = response.data.data.map(item => new Tweet(
                item.tid,
                item.sid,
                item.title,
                item.summary,
                item.content,
                item.type,
                item.timeSlotA,
                item.timeSlotB,
                item.timeSlotC
            ));
            console.log(tweets);
            dataController.addTweetList(tweets);
            dataController.refreshTweets().then(() => {

            });
        }
    }

    async getLasteTweetsFromLocal(page, size) {

    }
}

const tweetsManager = new TweetsManager();
export default tweetsManager;
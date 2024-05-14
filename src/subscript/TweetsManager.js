import axios from "axios";
import {reactive} from "vue";
import dataController from "@/dataController/DataController.js";
import {Tweet} from "@/dataController/Tweet.js";

class TweetsManager {
    async getLatesTweetsFromServer(page, size) {
        console.log("getLatesTweetsFromServer");
        let response = await axios.get(
            `http://localhost:8080/getLatestTweets?user=` + `123`
            + `&page=` + page.toString()
            + `&size=` + size.toString()
        );
        console.log(response.data);
        let tweets = [];
        if (response.data.status === 'success') {
            tweets = response.data.data.map(item => new Tweet(
                item.tid,
                item.sid,
                item.title,
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
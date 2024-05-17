<!-- Home.vue -->
<template>
  <div class="home">

    <n-back-top :right="100" :bottom="160">
      <div style="width: 40px;height: 40px;
        line-height: 40px;text-align: center;font-size: 14px;">
        <n-icon>
          <VerticalAlignTopRound/>
        </n-icon>
      </div>
    </n-back-top>

    <div class="top-bar">
      <n-button circle size="large" @click="activateLeft('left')">
        <n-icon>
          <ReadMoreRound/>
        </n-icon>
      </n-button>
      <n-drawer class="side-tools" v-model:show="active" :width="502" :placement="placement">
        <side-tool-bar @closeSideToolbar="active=false"/>
      </n-drawer>
    </div>

    <!---->
    <div class="head-calendar">
      <VDatePicker v-model="date" mode="date" view="weekly"
                   expanded transparent borderless/>

    </div>

    <n-divider/>

    <!--瀑布流-->
    <WaterfallWall :cards="cards" :load-function="loadMoreData" @cardClick="showDetails"/>

    <n-drawer class="details" v-model:show="activeBottom" :height="this.windowHeight" :placement="placementBottom">
      <PassageView
          v-if="selectedMessage"
          :title="selectedMessage.title"
          :content="selectedMessage.content"
          :timeSlotA="selectedMessage.timeSlotA"
          @closeView="closeView"
      />
    </n-drawer>
  </div>
</template>

<script>
import DateCard from '../components/DateCard.vue';
import ScheduleCard from '../components/ScheduleDetailCard.vue';
import WaterfallWall from "@/views/components/WaterFallWall.vue";
import dataController from "@/dataController/DataController.js";
import tweetsManager from "@/subscript/TweetsManager.js";
import PassageView from "@/views/PassageView.vue";
import {ref} from "vue";
import SideToolBar from "@/views/home/SideToolBar.vue";
import {ReadMoreRound, VerticalAlignTopRound} from "@vicons/material"
import ActiveSubscribeCard from "@/views/components/Active-SubscribeCard.vue";

export default {
  name: 'Home',
  components: {
    ReadMoreRound,
    SideToolBar,
    PassageView,
    WaterfallWall,
    DateCard,
    ScheduleCard,
    VerticalAlignTopRound
  },
  setup() {
    // Calendar
    const attributes = ref([
      {
        key: 'today',
        highlight: true,
        dates: [
          new Date()
        ],
      }
    ]);
    let date = ref(new Date());

    // Side Tool Bar
    const active = ref(false);
    const placement = ref("left");
    const activateLeft = (place) => {
      active.value = true;
      placement.value = place;
    };

    // passage view
    const activeBottom = ref(false);
    const placementBottom = ref('bottom');
    const activateBottom = (place) => {
      activeBottom.value = true;
      placementBottom.value = place;
    };

    // return
    return {
      active,
      activeBottom,
      placement,
      placementBottom,
      activateLeft,
      activateBottom,
      attributes,
      date,
    };
  },
  data() {
    return {
      currentDate: new Date(),
      page: 0,
      size: 10,
      selectedMessage: null,
    }
  },
  computed: {
    cards() {
      return dataController.tweets;
    },
    windowHeight() {
      return window.innerHeight;
    }
  },
  created() {
    this.loadMoreData();
  },
  methods: {
    loadMoreData() {
      tweetsManager.getLatesTweetsFromServer();
    },
    handleScroll() {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 500;
      if (nearBottom) {
        this.loadMoreData();
      }
    },
    showDetails(tweet_message) {
      this.selectedMessage = tweet_message; // 设置要显示的详情信息
      if (this.selectedMessage !== null) {
        this.activeBottom = true;
        this.placementBottom = 'bottom';
      } else {
        this.activeBottom = false;
        this.placementBottom = 'bottom';
      }
    },
    closeView() {
      this.selectedMessage = null;
      this.activeBottom = false;
      this.placementBottom = 'bottom';
    }
  }

}
</script>

<style>
.top-bar {
  /*横向排布*/
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
</style>

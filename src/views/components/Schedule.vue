<template>
  <div class="schedule-card">
    <!--标题头-->
    <n-flex class="title-head" justify="space-between" align="center">
      <n-checkbox :checked="checked" size="large" style="width: 20px;height: 20px"
                  @update:checked="checked=!checked;$emit('checkChange',id)"/>

      <n-input ref="titleInput" v-if="onEditTitle.valueOf()"
               size="small" v-model:value="title"
               @blur="handleTitleClick" :bordered="false"
               class="schedule-title-onedit" style="flex: 1;background-color: #f1f1f1">
      </n-input>

      <n-text v-else @click="handleTitleClick"
              class="schedule-title" style="flex: 1;">
        {{ title }}
      </n-text>
      <n-icon v-if="priority" size="large" color="blue" :component="PriorityHighRound"/>
      <n-icon v-if="flag" size="large" color="orange" :component="FlagRound"/>
      <n-button size="small" quaternary class="edit-button" circle
                @click="editSchedule">
        <n-icon size="large" :component="EditRound"/>
      </n-button>
    </n-flex>

    <!--备注行-->
    <n-flex class="secondary-content" justify="space-between" align="center">
      <div size="large" style="width: 20px;height: 20px"/>
      <n-text class="-schedule-sub-title" style="flex: 1;">{{ this.content }}</n-text>
    </n-flex>

    <!--时间行-->
    <n-flex class="time-content" justify="space-between" align="center">
      <div size="large" style="width: 20px;height: 20px"/>
      <n-text class="-schedule-sub-title" style="flex: 1;">
        {{ dayjs(this.timeSlotA).format('YYYY-MM-DD HH:mm') }}
        {{ this.getTimeDay(this.timeSlotA) }}
        <p v-if="schedule_message.timeSlotBisOn">到
          {{ dayjs(this.timeSlotB).format('YYYY-MM-DD HH:mm') }}</p>
      </n-text>
    </n-flex>

    <!--标签行-->
    <n-flex class="tag-content" justify="space-between" align="center">
      <div size="large" style="width: 20px;height: 20px"/>
      <div class="-schedule-sub-title" style="flex: 1;">
        <n-tag round size="small" style="margin: 2px;"
               :color="{color: '#62adfa',textColor:'#ffffff'}"
               v-for="tag in tags" :key="tag" :bordered="false"
        >{{ tag }}
        </n-tag>
      </div>
    </n-flex>
  </div>

  <n-drawer v-model:show="onEditSchedule" placement="bottom" height="100%">
    <Schedule_editer @editDone="onEditDown" @removeSchedule="onEditSchedule=false;$emit('removeSchedule', id)"
                     :create="false" :schedule_message="localSchedule"/>
  </n-drawer>

</template>

<script>
import {EditRound, PriorityHighRound, FlagRound, CheckRound} from "@vicons/material"
import {computed, ref} from "vue";
import dayjs from "dayjs";
import Schedule_editer from "@/views/components/Schedule_editer.vue";

export default {
  name: 'Schedule',
  methods: {
    dayjs,
    onEditDown(edited_scedule) {
      this.onEditSchedule = false;
      this.title = edited_scedule.title;
      this.content = edited_scedule.content;
      this.tags = edited_scedule.tags;
      this.flag = edited_scedule.flag;
      this.priority = edited_scedule.priority;
      this.timeSlotA = edited_scedule.timeSlotA;
      this.timeSlotBisOn = edited_scedule.timeSlotBisOn;
      this.timeSlotB = edited_scedule.timeSlotB;
      this.$emit('onScheduleEditDone', this.localSchedule);
    }
  },
  components: {Schedule_editer},
  props: {
    id: {
      type: Number,
      required: true,
    },
    schedule_message: {
      type: Object,
      default: () => {
        return {
          id: -1,
          title: "今天晚餐吃麦当劳安格斯牛堡",
          content: "裕和路18号",
          checked: false,
          tags: ["#工作", "#美食"],
          flag: false,
          priority: false,
          timeSlotA: "2024-05-16T10:00:00.000Z",
          timeSlotBisOn: false,
          timeSlotB: null
        }
      },
      required: true,
    }
  },
  setup(props) {
    const id = ref(props.id);
    const title = ref(props.schedule_message.title);
    const timeSlotA = ref(props.schedule_message.timeSlotA);
    const timeSlotBisOn = ref(props.schedule_message.timeSlotBisOn);
    const timeSlotB = ref(props.schedule_message.timeSlotB);
    const content = ref(props.schedule_message.content);
    const checked = ref(props.schedule_message.checked);
    const tags = ref(props.schedule_message.tags);
    const flag = ref(props.schedule_message.flag);
    const priority = ref(props.schedule_message.priority);

    const titleInput = ref(null);
    const onEditTitle = ref(false);
    const onEditSchedule = ref(false);
    const handleTitleClick = () => {
      onEditTitle.value = !onEditTitle.value;
    };

    const localSchedule = computed(() => ({
      id: props.id,
      title: title.value,
      content: content.value,
      checked: checked.value,
      tags: tags.value,
      flag: flag.value,
      priority: priority.value,
      timeSlotA: timeSlotA.value,
      timeSlotBisOn: timeSlotBisOn.value,
      timeSlotB: timeSlotB.value
    }));

    return {
      id,
      title,
      content,
      checked,
      tags,
      flag,
      priority,
      timeSlotA,
      timeSlotB,
      timeSlotBisOn,

      handleTitleClick,
      titleInput,
      onEditSchedule,
      onEditTitle,
      localSchedule,
      getTimeDay(time) {
        const timeA = dayjs(time).startOf('day');
        const inputDate = dayjs(new Date()).startOf('day');
        const diffDays = inputDate.diff(timeA, 'day');

        if (diffDays === -2) {
          return "（明天）";
        } else if (diffDays === -1) {
          return "（昨天）";
        } else if (diffDays === 0) {
          return "（今天）";
        } else if (diffDays === 1) {
          return "（明天）";
        } else if (diffDays === 2) {
          return "（后天）";
        } else {
          //return dayjs(this.timeSlotA).format("YYYY-MM-DD HH:mm");
          return "";
        }
      },
      getTime(time) {
        return dayjs(time).format("HH:mm");
      },
      editSchedule() {
        onEditSchedule.value = true;
      },


      EditRound, PriorityHighRound, FlagRound, CheckRound
    }
  },
}

</script>

<style scoped>
.schedule-title {
  font-size: 18px;
  font-weight: 500
}

.title-head {
  /*上下居中对齐*/
}

.schedule-title-onedit {
  font-size: 18px;
  font-weight: 500;
}

.secondary-content {
  margin-top: 3px;
}

.time-content {
  margin-top: 3px;
}

.tag-content {
  margin-top: 3px;
}
</style>
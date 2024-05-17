<template>
  <div>
    <n-float-button :right="20" :top="30" shape="circle" @click="editDone">
      <n-icon size="28px" :component="CheckRound"/>
    </n-float-button>
  </div>

  <div style="padding: 30px;margin-top: 0px;">
    <h1 style="font-weight: 600">编辑日程</h1>

    <n-flex vertical style="margin-top: 30px">
      <n-card>
        <n-flex justify="space-between">
          <label>标题</label>
          <n-input v-model:value="title" class="schedule-title"/>
        </n-flex>
        <n-flex justify="space-between">
          <label>备注</label>
          <n-input v-model:value="content" class="schedule-title"/>
        </n-flex>
      </n-card>

      <n-card>
        <n-flex justify="space-between">
          <n-icon size="30px" :component="FlagRound" color="orange"/>
          <label style="flex: 1;font-size: 18px;font-weight: 500">标旗</label>
          <n-switch v-model:value="flag" size="large"/>
        </n-flex>
        <n-divider/>
        <n-flex justify="space-between" style="margin-top: 10px">
          <n-icon size="30px" :component="PriorityHighRound" color="blue"/>
          <label style="flex: 1;font-size: 18px;font-weight: 500">紧急</label>
          <n-switch v-model:value="priority" size="large"/>
        </n-flex>
      </n-card>

      <n-card>
        <n-flex justify="space-between">
          <n-icon size="30px" :component="CalendarMonthRound"/>
          <label style="flex: 1;font-size: 18px;font-weight: 500">时间</label>
          <n-icon size="25px" @click="onChoseTimeA = true" :component="EditRound"/>
        </n-flex>
        <n-modal v-model:show="onChoseTimeA">
          <n-card style="width: 500px" title="选择时间" :bordered="false" @close="onChoseTimeA=false" closable>
            <VDatePicker expanded v-model="timeSlotA" mode="dateTime" is-required/>
          </n-card>
        </n-modal>
      </n-card>

      <n-card>
        <n-flex justify="space-between">
          <n-icon size="30px" :component="CalendarMonthRound"/>
          <label style="flex: 1;font-size: 18px;font-weight: 500">截止时间</label>
          <n-icon v-if="timeSlotBisOn" size="25px" @click="onChoseTimeB = true" :component="EditRound"/>
          <n-switch size="large" v-model:value="timeSlotBisOn"/>
        </n-flex>
        <n-modal v-model:show="onChoseTimeB">
          <n-card style="width: 500px" title="选择时间" :bordered="false" @close="onChoseTimeB=false" closable>
            <VDatePicker expanded v-model="timeSlotB" mode="dateTime" is-required/>
          </n-card>
        </n-modal>
      </n-card>

      <n-card>
        <n-flex>
          <n-icon size="30px" :component="TagRound"/>
          <label style="flex: 1;font-size: 18px;font-weight: 500">设置标签</label>
          <n-tag v-for="tag in tags"
                 round closable @close="closeTag(tags.indexOf(tag))">{{ tag }}
          </n-tag>
          <n-input v-model:value="inputValue" @blur="inputBlur(inputValue)"></n-input>
        </n-flex>
      </n-card>

      <n-button v-if="!create"
          secondary type="error" style="margin-top: 70px" @click="$emit('removeSchedule')">删除日程</n-button>
    </n-flex>
  </div>

</template>

<script>
import {
  CalendarMonthRound,
  CalendarMonthTwotone,
  CheckRound, EditRound,
  FlagRound,
  PriorityHighRound,
  TagRound,
  AddRound
} from "@vicons/material";
import {computed, ref} from "vue";
import {DatePicker as VDatePicker} from "v-calendar";
import dayjs from "dayjs";

export default {
  name: 'Schedule_editer',
  props: {
    create: {
      type: Boolean,
      required: true
    },
    schedule_message: {
      type: Object,
      default: () => {
        return {
          id: -1,
          title: "今天晚餐吃麦当劳安格斯牛堡",
          content: "裕和路18号",
          checked: false,
          repeat: false,
          tags: ["#工作", "#美食"],
          flag: false,
          priority: false,
          timeSlotA: "2024-05-16T10:00:00.000Z",
          timeSlotBisOn: false,
          timeSlotB: null,
        }
      }
    }
  },
  methods: {
    dayjs,
    editDone() {
      if (this.create) {
        this.$emit('editDone', this.localSchedule);
      } else {
        this.$emit('editDone', this.localSchedule);
      }
    }
  },
  components: {VDatePicker},
  computed: {
    EditRound() {
      return EditRound
    },
    TagRound() {
      return TagRound
    },
    CalendarMonthTwotone() {
      return CalendarMonthTwotone
    },
    CalendarMonthRound() {
      return CalendarMonthRound
    },
    PriorityHighRound() {
      return PriorityHighRound
    },
    FlagRound() {
      return FlagRound
    },
    CheckRound() {
      return CheckRound
    },
    AddRound() {
      return AddRound
    }
  },
  setup(props) {
    const id = ref(-1);

    const title = ref("");
    const content = ref("");

    const flag = ref(false);
    const priority = ref(false);

    const timeSlotA = ref(new Date());
    const timeSlotBisOn = ref(false);
    const timeSlotB = ref(new Date());

    const onChoseTimeA = ref(false);
    const onChoseTimeB = ref(false);

    const tags = ref(["#工作", "#吃饭"]);
    const inputValue = ref("");

    if (!props.create) {
      id.value = props.schedule_message.id;
      title.value = props.schedule_message.title;
      content.value = props.schedule_message.content;
      flag.value = props.schedule_message.flag;
      priority.value = props.schedule_message.priority;
      timeSlotA.value = props.schedule_message.timeSlotA;
      timeSlotBisOn.value = props.schedule_message.timeSlotBisOn;
      timeSlotB.value = props.schedule_message.timeSlotB;
      tags.value = props.schedule_message.tags;
    }

    const localSchedule = computed(() => ({
      id: id.value,
      title: title.value,
      content: content.value,
      tags: tags.value,
      flag: flag.value,
      priority: priority.value,
      timeSlotA: timeSlotA.value,
      timeSlotBisOn: timeSlotBisOn.value,
      timeSlotB: timeSlotB.value,
    }))


    return {
      id,
      title,
      content,
      flag,
      priority,
      timeSlotBisOn,
      timeSlotB,
      onChoseTimeB,
      tags,
      timeSlotA,
      onChoseTimeA,
      inputValue,
      localSchedule,
      inputBlur(inp) {
        if (inp !== "") {
          tags.value.push(inp);
        }
      },
      closeTag(index) {
        tags.value.splice(index, 1);
      },

    }
  }
}


</script>


<style scoped>

</style>
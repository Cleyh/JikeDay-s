<template>
  <div class="side-toolbar">
    <n-flex justify="space-between" class="top-bar">
      <n-button strong secondary circle size="medium">
        <n-icon size="large">
          <SettingsRound/>
        </n-icon>
      </n-button>

      <n-button strong secondary circle size="medium" @click="$emit('closeSideToolbar')">
        <n-icon size="large">
          <ArrowBackIosNewRound/>
        </n-icon>
      </n-button>
    </n-flex>

    <n-divider/>
    <div class="calender">
      <n-flex justify="space-between">
        <n-h2>日程列表</n-h2>
        <n-switch v-model:value="calendarModeBool" size="large">
          <template #checked>周</template>
          <template #unchecked>月</template>
        </n-switch>
      </n-flex>

      <VDatePicker :key="calendarModeBool.valueOf()" :view="calendarMode"
                   :attributes="calendarAttributes"
                   expanded title-position="left" transparent borderless
                   v-model="selectedDate" mode="date"/>

      <n-flex justify="space-between">
        <n-button round secondary strong @click="onAddSchedule=true">
          <n-icon size="large">
            <AddCircleOutlineRound/>
          </n-icon>
        </n-button>
        <label style="font-size: 16px">全部日程</label>
        <n-switch v-model:value="scheduleModeBool" size="large">
          <template #checked>是</template>
          <template #unchecked>否</template>
        </n-switch>
      </n-flex>


      <n-drawer v-model:show="onAddSchedule" placement="bottom" height="100%">
        <Schedule_editer :create="true" @editDone="addSchedule"/>
      </n-drawer>

    </div>
    <n-divider/>

    <n-list>
      <n-list-item class="schedule-item" v-for="schedule in filteredSchedules" :key="schedule.id">
        <Schedule :key="schedule.id" :schedule_message="schedule" :id="schedule.id"
                  @removeSchedule="removeSchedule" @checkChange="checkChange"
                  @onScheduleEditDone="onScheduleEditDone"/>
      </n-list-item>
    </n-list>

  </div>
</template>

<script>
import Schedule from '@/views/components/Schedule.vue'
import {computed, ref, watch} from "vue";
import {Calendar as VCalendar} from "v-calendar";
import {ArrowBackIosNewRound, SettingsRound, AddCircleOutlineRound} from "@vicons/material";
import dataController from "@/dataController/DataController.js";
import Schedule_editer from "@/views/components/Schedule_editer.vue";

export default {
  name: 'SideToolBar',
  components: {
    Schedule_editer,
    AddCircleOutlineRound,
    SettingsRound,
    ArrowBackIosNewRound,
    VCalendar,
    Schedule,
  },
  setup() {
    const scheduleModeBool = ref(false);
    const calendarModeBool = ref(false);
    const calendarMode = computed(() => {
      return calendarModeBool.value ? 'weekly' : 'monthly';
    });
    const selectedDate = ref(new Date());
    const calendarAttributes = computed(() => {
      return schedules.value.map(schedule => {
        const attribute = {
          key: schedule.id,
          dates: new Date(schedule.timeSlotA),
          dot: {style: {backgroundColor: '#0b67be'}},
          popover: {
              label: schedule.title,
          }
        }

        if (schedule.timeSlotBisOn) {
          attribute.dates = {start: new Date(schedule.timeSlotA), end: new Date(schedule.timeSlotB)}; // 截止日期范围
          attribute.highlight = {
            start: {fillMode: 'outline'},
            base: {fillMode: 'light'},
            end: {fillMode: 'outline'},
          }
        } else {
          if (schedule.priority) {
            attribute.dot.style.backgroundColor = '#d71616'; // 紧急任务为红色
          } else if (schedule.flag) {
            attribute.dot = false;
            attribute.bar = {style:{backgroundColor : '#ffc812'}}; // 标旗任务为橙色
          }
        }
        return attribute;
      })
    });

    function isDateWithinRange(checkDate, startDate, endDate) {
      const check = new Date(checkDate).setHours(0, 0, 0, 0);
      const start = new Date(startDate).setHours(0, 0, 0, 0);
      const end = endDate ? new Date(endDate).setHours(0, 0, 0, 0) : start;
      return check >= start && check <= end;
    }

// 根据选定日期过滤日程
    const filteredSchedules = computed(() => {
      if (!scheduleModeBool.value) {  // 如果用户选择显示特定日期的日程
        return schedules.value.filter(schedule => {
          if (schedule.timeSlotBisOn && schedule.timeSlotB) {
            // 日程有截止日期，检查选定日期是否在日程的开始和结束日期之间
            return isDateWithinRange(selectedDate.value, schedule.timeSlotA, schedule.timeSlotB);
          } else {
            // 日程没有截止日期，仅检查开始日期
            return isDateWithinRange(selectedDate.value, schedule.timeSlotA);
          }
        });
      }
      return schedules.value;
    });


    const onAddSchedule = ref(false);

    const schedules = ref(JSON.parse(localStorage.getItem('schedules')));

    watch(schedules, (newSchedules) => {
      localStorage.setItem('schedules', JSON.stringify(newSchedules));
    }, {deep: true});

    return {
      filteredSchedules,
      calendarAttributes,
      scheduleModeBool,
      calendarMode,
      calendarModeBool,
      selectedDate,
      schedules,
      onAddSchedule,
      addSchedule(adding_schedule) {
        onAddSchedule.value = false;
        console.log(adding_schedule);
        if (adding_schedule.title === '') return;
        schedules.value.push({
          id: schedules.value[schedules.value.length - 1].id + 1,
          title: adding_schedule.title,
          content: adding_schedule.content,
          checked: false,
          tags: adding_schedule.tags,
          flag: adding_schedule.flag,
          priority: adding_schedule.priority,
          timeSlotA: adding_schedule.timeSlotA,
          timeSlotBisOn: adding_schedule.timeSlotBisOn,
          timeSlotB: adding_schedule.timeSlotB,
        });
      },
      removeSchedule(remove_id) {
        console.log(remove_id);
        schedules.value = schedules.value.filter(schedule => schedule.id !== remove_id);
      },
      checkChange(check_id) {
        schedules.value.forEach(schedule => {
          if (schedule.id === check_id) {
            schedule.checked = !schedule.checked;
          }
        });
      },
      onScheduleEditDone(edit_schedule){
        console.log("fewr");
        schedules.value.forEach(schedule => {
          if (schedule.id === edit_schedule.id) {
            console.log(edit_schedule.timeSlotBisOn);
            schedule.title = edit_schedule.title;
            schedule.content = edit_schedule.content;
            schedule.checked = edit_schedule.checked;
            schedule.tags = edit_schedule.tags;
            schedule.flag = edit_schedule.flag;
            schedule.priority = edit_schedule.priority;
            schedule.timeSlotA = edit_schedule.timeSlotA;
            schedule.timeSlotBisOn = edit_schedule.timeSlotBisOn;
            schedule.timeSlotB = edit_schedule.timeSlotB;
          }
        })
      }
    }
  }
}
</script>

<style>
.side-toolbar {
  padding: 20px;
}

.calender {
}

.schedule-item {
  background-color: #ffffff;
  margin-top: 5px;
  margin-bottom: 5px;
}

</style>
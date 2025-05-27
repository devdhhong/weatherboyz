<template>
  <div id="TimelyView">
    <div class="scroll-area">
      <div class="timelyCard" v-for="(weather, index) in weatherTime" :key="index">
        <p class="date">{{ getCurrentTime(weather) }}</p>
        <img :src="getWeatherIcon(weatherCode[index], moment(weather).format('HHmm'))" alt="" />
        <p class="temperature">{{ Math.round(weatherTemp[index]) }}°</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as UTIL from "@/utils/UTIL.js";
import moment from "moment";
import { onBeforeMount, watch } from "vue";

let weather: Weather ;
let weatherTime = {};
let weatherCode = {};
let weatherTemp = {};

let props = defineProps(["isFetchedData"]);

watch(() => props.isFetchedData, (newValue) => {
    //데이터 모두 받은 후에 파싱 처리
    if (newValue) {
      initData();
   }
  }
);

onBeforeMount(() => {
  initData();
});

function initData(){
  if(UTIL.getLocalStorageItem('weather')){
    weather = JSON.parse(UTIL.getLocalStorageItem('weather'));
    weatherTime = weather.hourly.time;
    weatherCode = weather.hourly.weather_code;
    weatherTemp = weather.hourly.temperature;
  }
}

function getCurrentTime(weather: string){
  return moment(weather).format("MM/DD HH시");
}

function getWeatherIcon(code: number, time: any){
  return UTIL.getWeatherIcon(code, time);
}

</script>

<style lang="scss" scoped>
@import "../scss/reset.scss";
@import "../scss/common.scss";
@import "../scss/theme.scss";

#TimelyView {
  width: 100%;
  height: $timely_height;
  background-color: var(--background-color-3);
  position: fixed;
  bottom: 0;
  border-radius: 20px 20px 0 0;
  padding-bottom: calc(env(safe-area-inset-bottom) + 10px);

  .scroll-area {
    width: 100%;
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    padding-top: 3%;
    

    .timelyCard {
      text-align: center;
      flex: 0 0 25%; //기본으로 보이는 아이템 수를 설정

      //날짜
      .date {
        @include text-style-5;
        color: var(--text-color-1);
      }

      //사진
      img {
        width: 40%;
      }

      //온도
      .temperature {
        @include text-style-3;
        color: var(--text-color-1);
      }
    }
  }
}
</style>

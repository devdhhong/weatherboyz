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
import { onBeforeMount, watch, ref } from "vue";

let weather: Weather;
let weatherTime = {};
let weatherCode = {};
let weatherTemp = {};
// const timelyHeight = ref(isMobile() ? '15%' : '10%');
const timelyHeight = ref(isSmallScreen() ? '15%' : '15%');
// const timelyHeight = ref(isMobile() ? '22%' : '15%');

function isSmallScreen() {
  // 화면 크기 체크
  const isSmallScreen = window.innerWidth <= 768;
  return UTIL.getLocalStorageItem('isMobile') && isSmallScreen;
}

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
@use "../scss/common.scss" as *;
@use "../scss/reset.scss" as *;
@use "../scss/theme.scss" as *;

#TimelyView {
  width: 100%;
  height: v-bind(timelyHeight);
  background-color: var(--background-color-3);
  position: fixed;
  bottom: 0;
  left: 0;
  border-radius: 20px 20px 0 0;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 100;
  box-shadow: 0px 0px 10px var(--shadow-color-2);

  .scroll-area {
    width: 100%;
    height: 100%;
    display: flex;
    overflow-x: auto;
    white-space: nowrap;
    padding-top: 3%;
    -webkit-overflow-scrolling: touch;

    .timelyCard {
      text-align: center;
      flex: 0 0 25%;
      min-width: 80px;

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

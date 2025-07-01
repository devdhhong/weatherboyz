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
import { useI18n } from "vue-i18n"; // i18n 인스턴스 가져오기
const { t } = useI18n();

let weather: Weather;
let weatherTime = {};
let weatherCode = {};
let weatherTemp = {};
// const timelyHeight = ref(isSmallScreen() ? '15%' : '15%');

function isSmallScreen() {
  // 화면 크기 체크
  const isSmallScreen = window.innerWidth <= 768;
  return UTIL.getLocalStorageItem('isMobile') && isSmallScreen;
}

const props = defineProps(["isGetWeather"]);

watch(() => props.isGetWeather, (newValue) => {
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
	console.log(moment(weather).format('MMDDHH'));
	console.log(moment().format('MMDDHH'));
	//현재시간
	if(moment(weather).format('MMDDHH') == moment().format('MMDDHH')){
		return "지금";
	}
	else{
		return moment(weather).format("MM/DD HH") + t('시');
	}
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
  @include center-sb;
  width: 100%;
  height: $timely_height;
  position: fixed;
  top: $header_height + $current_height + $message_height;

  .scroll-area {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 0 10px;
    -webkit-overflow-scrolling: touch;

    box-sizing: border-box;
    border-radius: 15px;
    margin: 0 5%;
    background-color: var(--background-color-3);
		box-shadow: 1px 1px 20px var(--shadow-color-1);

    .timelyCard {
      text-align: center;
      width: 100%;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--shadow-color-1);
      padding: 10px 0;

      &:last-child {
        border-bottom: none;
      }

      .date {
        @include text-style-4;
        color: var(--text-color-1);
        flex: 1;
        // text-align: left;
      }

      img {
        width: 50px;
        height: 50px;
        margin: 0 20px;
      }

      .temperature {
        @include text-style-3;
        color: var(--text-color-1);
        flex: 1;
        // text-align: right;
      }
    }
  }
}
</style>

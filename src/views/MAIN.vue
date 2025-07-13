<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="MainView">
      <div id="container">
          <HeaderView :title="title" :isGetReverseGeocode="isGetReverseGeocode"/>
          <CurrentView :isGetReverseGeocode="isGetReverseGeocode" :isGetAirQuality="isGetAirQuality" :isGetWeather="isGetWeather" :isGetSpotifyToken="isGetSpotifyToken"/>             
          <ContentsView :isGetReverseGeocode="isGetReverseGeocode"/>             
          <TimelyView :isGetWeather="isGetWeather"/>             
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import HeaderView from "../components/HeaderView.vue";
import CurrentView from "../components/CurrentView.vue";
import ContentsView from "../components/ContentsView.vue";
import TimelyView from "../components/TimelyView.vue";

import * as UTIL from "@/utils/UTIL.js";

import { onBeforeMount, ref } from "vue";
const title = "MAIN";
const isGetSpotifyToken = ref(false); // 데이터 패치 여부
const isGetReverseGeocode = ref(false); // 데이터 패치 여부
const isGetWeather = ref(false); // 데이터 패치 여부
const isGetAirQuality = ref(false); // 데이터 패치 여부

onBeforeMount(() => {
  fetchData();
});

async function fetchData() {
  //가까훈 측정소 조회
  await UTIL.getNearStation();

  // 스포티파이 토큰발급 
  await UTIL.getSpotifyToken();
  isGetSpotifyToken.value = true;

  // 역지오코딩
  await UTIL.getReverseGeocode();
  isGetReverseGeocode.value = true;

  // 날씨정보 조회
  await UTIL.getWeatherNow();
  isGetWeather.value = true;

  // 대기정보 조회
  await UTIL.getAirQuality();
  isGetAirQuality.value = true;
}

</script>

<style lang="scss" scoped>
</style>
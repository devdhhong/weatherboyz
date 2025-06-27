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
import ModalView from "../components/ModalView.vue";

import * as UTIL from "@/utils/UTIL.js";

import { onMounted, onBeforeMount, ref } from "vue";

let title = "MAIN";
let isHideModal = UTIL.getLocalStorageItem("isHideModal");
const isGetSpotifyToken = ref(false); // 데이터 패치 여부
const isGetReverseGeocode = ref(false); // 데이터 패치 여부
const isGetWeather = ref(false); // 데이터 패치 여부
const isGetAirQuality = ref(false); // 데이터 패치 여부

onBeforeMount(() => {
  fetchData();
});

async function fetchData() {
  try {
		// 스포티파이 토큰발급 
		try {
      await UTIL.getSpotifyToken();
    } 
		catch (error) {
      console.warn('데이터를 불러오는 것에 실패했습니닿... 잠시만 기다려주세욯...');
    }
		isGetSpotifyToken.value = true;

    // 역지오코딩
    try {
      await UTIL.getReverseGeocode();
    } 
		catch (error) {
      console.warn('데이터를 불러오는 것에 실패했습니닿... 잠시만 기다려주세욯...');
    }
		isGetReverseGeocode.value = true;

    // 날씨정보 조회
    try {
      await UTIL.getWeather();
    } 
		catch (error) {
      console.warn('데이터를 불러오는 것에 실패했습니닿... 잠시만 기다려주세욯...');
    }
		isGetWeather.value = true;

    // 대기정보 조회
    try {
      await UTIL.getAirQuality();
    } 
		catch (error) {
      console.warn('데이터를 불러오는 것에 실패했습니닿... 잠시만 기다려주세욯...');
    }
		isGetAirQuality.value = true;


  } 
	catch (error) {
    // 최소한의 데이터라도 표시하기 위해 true로 설정
  }
}

</script>

<style lang="scss" scoped>
</style>
<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="MainView">
      <div id="container">
          <HeaderView :title="title" :isFetchedData="isFetchedData"/>
          <CurrentView :isFetchedData="isFetchedData"/>             
          <ContentsView :isFetchedData="isFetchedData"/>             
          <TimelyView :isFetchedData="isFetchedData"/>             
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
const isFetchedData = ref(false); // 상태값

onBeforeMount(() => {
  fetchData();
});

async function fetchData() {
  try {
    // 역지오코딩
    try {
      await UTIL.getReverseGeocode();
    } 
		catch (error) {
      console.warn('데이터를 불러오는 것에 실패했습니닿... 잠시만 기다려주세욯...');
    }

    // 날씨정보 조회
    try {
      await UTIL.getWeather();
    } 
		catch (error) {
      console.warn('데이터를 불러오는 것에 실패했습니닿... 잠시만 기다려주세욯...');
    }

    // 대기정보 조회
    try {
      await UTIL.getAirQuality();
    } 
		catch (error) {
      console.warn('데이터를 불러오는 것에 실패했습니닿... 잠시만 기다려주세욯...');
    }

    // 데이터 패치 여부
    isFetchedData.value = true;

  } 
	catch (error) {
    console.error('에러 발생했닿... ', error);
    // 최소한의 데이터라도 표시하기 위해 true로 설정
    isFetchedData.value = true;
  }
}

</script>

<style lang="scss" scoped>
</style>
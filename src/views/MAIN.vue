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
    await UTIL.getReverseGeocode();

    // 날씨정보 조회
    await UTIL.getWeather();

    // 대기정보 조회
    await UTIL.getAirQuality();

    // 데이터 패치 여부
    isFetchedData.value = true;

  } catch (error) {
    console.error('Error occurred:', error);
  }
}

</script>

<style lang="scss" scoped>
</style>
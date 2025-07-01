<template>
  <div id="ContentsView">
    <div class="contentsBox">
      <img :src="imgPath" alt="">
      <!-- <div class="bubbleArea bubbleArea1">
        <div class="msg">🦄</div>
      </div>
      <div class="bubbleArea bubbleArea2">
        <div class="msg">☀️</div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from "vue";
import * as UTIL from "@/utils/UTIL.js";

let weather: Weather;
let imgPath = "";
let member = "";

const props = defineProps(["isGetReverseGeocode"]);

watch(() => props.isGetReverseGeocode, (newValue) => {
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
  const TBZ = ["SY", "JC", "YH", "HJ", "JY", "KV", "NW", "QQ", "SW", "ER"];

  if(UTIL.getLocalStorageItem('weather') && UTIL.getLocalStorageItem("member")){
    member = UTIL.getLocalStorageItem("member");

    //단체 테마 선택 시 멤버 랜덤
    if (TBZ.indexOf(member) == -1) {
      member = TBZ[Math.floor(Math.random() * 11)];
    }

    weather = JSON.parse(UTIL.getLocalStorageItem('weather'));
    imgPath = UTIL.getWeatherMain(weather.current.weather_code, member);
  }
}

</script>

<style lang="scss" scoped>
@use "../scss/common.scss" as *;
@use "../scss/reset.scss" as *;
@use "../scss/theme.scss" as *;

#ContentsView {
  width: 100%;
  height: $contents_height;
  position: fixed;
  top: $header_height + $current_height + $message_height + $timely_height;

  .contentsBox {
    @include center;
    height: 100%;

    img {
      // padding-bottom: 8%;
      height: 70%;
    }
  }

}

.bubbleArea {
  position: absolute; 
  background-size: contain;
  background-repeat: no-repeat; /* 반복 방지 */
  background-position: center; /* 가운데 정렬 */
  width: 20%; 
  height: 20%;

  .msg {
    @include text-style-4;
    @include center;
    padding-bottom: 10%;
    width: 100%; 
    height: 100%;
  }
}

</style>

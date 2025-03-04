<template>
  <div id="ContentsView">
    <div class="contentsBox">
      <img :src="imgPath" alt="">
      <div class="bubbleArea bubbleArea1">
        <div class="msg">날씨좋다</div>
      </div>
      <div class="bubbleArea bubbleArea2">
        <div class="msg">☀️</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from "vue";
import * as UTIL from "@/utils/UTIL.js";

let weather: Weather;
let imgPath = "";
let member = "";

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
  let TBZ = ["SY", "JC", "YH", "HJ", "JY", "KV", "NW", "QQ", "HN", "SW", "ER"];

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
@import "../scss/common.scss";
@import "../scss/reset.scss";
@import "../scss/theme.scss";

#ContentsView {
  width: 100%;
  height: 47%;
  position: fixed;
  top: $header_height + $current_height + $message_height;

  .contentsBox {
    @include center;
    height: 100%;

    img {
      padding-bottom: 8%;
      height: 90%;
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

//상연
.SY-mode {
  //라이트 모드
  &.light-mode {
    .bubbleArea {
      background-image: var(--bubble-style-4);
      opacity: 60%;
    }

    .msg {
      color: var(--text-color-1);
    }
  }

  //다크 모드
  &.dark-mode {
    .bubbleArea {
      background-image: var(--bubble-style-3);
      opacity: 60%;
    }

    .msg {
      color: var(--text-color-2);
    }
  }

  //기본 테마
  &.default-mode {
    .bubbleArea1 {
      left: 61%; 
      bottom: 71%;
    }

    .bubbleArea2 {
      left: 63%; 
      bottom: 57%;
    }
  }

  //베이비 테마
  &.baby-mode {
    .bubbleArea1 {
      left: 61%; 
      bottom: 71%;
    }

    .bubbleArea2 {
      left: 63%; 
      bottom: 57%;
    }
  }
}

//제이콥
.JC-mode {
  //라이트 모드
  &.light-mode {
    .bubbleArea {
      background-image: var(--bubble-style-2);
      opacity: 80%;
    }

    .msg {
      color: var(--text-color-1);
    }
  }

  //다크 모드
  &.dark-mode {
    .bubbleArea {
      background-image: var(--bubble-style-1);
      opacity: 60%;
    }

    .msg {
      color: var(--text-color-2);
    }
  }
  //기본 테마
  &.default-mode {
    .bubbleArea1 {
      left: 64%; 
      bottom: 74%;
    }

    .bubbleArea2 {
      left: 16%; 
      bottom: 35%;
      transform: scale(-1, -1); //좌우 반전 상하 반전
    }
  }

  //베이비 테마
  &.baby-mode {
    .bubbleArea1 {
      left: 64%; 
      bottom: 74%;
    }

    .bubbleArea2 {
      left: 16%; 
      bottom: 35%;
      transform: scale(-1, -1); //좌우 반전 상하 반전
    }
  }
}

//영훈
.YH-mode {
  //라이트 모드
  &.light-mode {
    .bubbleArea {
      background-image: var(--bubble-style-2);
      opacity: 80%;
    }

    .msg {
      color: var(--text-color-1);
    }
  }

  //다크 모드
  &.dark-mode {
    .bubbleArea {
      background-image: var(--bubble-style-1);
      opacity: 60%;
    }

    .msg {
      color: var(--text-color-2);
    }
  }
  //기본 테마
  &.default-mode {
    .bubbleArea1 {
      left: 64%; 
      bottom: 74%;
    }

    .bubbleArea2 {
      left: 16%; 
      bottom: 35%;
      transform: scale(-1, -1); //좌우 반전 상하 반전
    }
  }

  //베이비 테마
  &.baby-mode {
    .bubbleArea1 {
      left: 58%; 
      bottom: 70%;
    }

    .bubbleArea2 {
      left: 23%; 
      bottom: 55%;
      transform: scale(-1, 1); //좌우 반전 상하 반전
    }
  }
}

//현재
.HJ-mode {
  //라이트 모드
  &.light-mode {
    .bubbleArea {
      background-image: var(--bubble-style-2);
      opacity: 80%;
    }

    .msg {
      color: var(--text-color-1);
    }
  }

  //다크 모드
  &.dark-mode {
    .bubbleArea {
      background-image: var(--bubble-style-1);
      opacity: 60%;
    }

    .msg {
      color: var(--text-color-2);
    }
  }
  //기본 테마
  &.default-mode {
    .bubbleArea1 {
      left: 64%; 
      bottom: 74%;
    }

    .bubbleArea2 {
      left: 16%; 
      bottom: 35%;
      transform: scale(-1, -1); //좌우 반전 상하 반전
    }
  }

  //베이비 테마
  &.baby-mode {
    .bubbleArea1 {
      left: 58%; 
      bottom: 70%;
    }

    .bubbleArea2 {
      left: 23%; 
      bottom: 55%;
      transform: scale(-1, 1); //좌우 반전 상하 반전
    }
  }
}




</style>

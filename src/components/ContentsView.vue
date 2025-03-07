<template>
  <div id="ContentsView">
    <div class="contentsBox">
      <img :src="imgPath" alt="">
      <div class="bubbleArea bubbleArea1">
        <div class="msg">🦄</div>
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

		console.log(weather);
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

//주연
.JY-mode {
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
      left: 67%; 
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
      left: 67%; 
      bottom: 70%;
    }

    .bubbleArea2 {
      left: 16%; 
      bottom: 25%;
      transform: scale(-1, -1); //좌우 반전 상하 반전
    }
  }
}

//케빈
.KV-mode {
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
      left: 67%; 
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
      left: 24%; 
      bottom: 42%;
      transform: scale(-1, -1); //좌우 반전 상하 반전

			// div {
			// 	transform: scale(-1, -1); //좌우 반전 상하 반전
			// }
    }

    .bubbleArea2 {
      left: 39%; 
      bottom: 26%;
      transform: scale(-1, -1); //좌우 반전 상하 반전
    }
  }
}

//뉴
.NW-mode {
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
      left: 67%; 
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
      left: 18%; 
      bottom: 42%;
      transform: scale(-1, -1); //좌우 반전 상하 반전
    }

    .bubbleArea2 {
      left: 58%; 
      bottom: 45%;
      transform: scale(1, -1); //좌우 반전 상하 반전
    }
  }
}

//큐
.QQ-mode {
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
      left: 67%; 
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
      left: 15%; 
      bottom: 44%;
      transform: scale(-1, -1); //좌우 반전 상하 반전
    }

    .bubbleArea2 {
      left: 53%; 
      bottom: 74%;
      transform: scale(1, 1); //좌우 반전 상하 반전
    }
  }
}

//학년
.HN-mode {
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
      left: 67%; 
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
      left: 19%; 
      bottom: 74%;
      transform: scale(-1, 1); //좌우 반전 상하 반전
    }

    .bubbleArea2 {
      left: 63%; 
      bottom: 58%;
      transform: scale(1, 1); //좌우 반전 상하 반전
    }
  }
}

//선우
.SW-mode {
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
      left: 67%; 
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
      left: 17%; 
      bottom: 25%;
      transform: scale(-1, -1); //좌우 반전 상하 반전
    }

    .bubbleArea2 {
      left: 63%; 
      bottom: 72%;
      transform: scale(1, 1); //좌우 반전 상하 반전
    }
  }
}

//에릭
.ER-mode {
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
      left: 67%; 
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
      left: 23%; 
      bottom: 49%;
      transform: scale(-1, 1); //좌우 반전 상하 반전
    }

    .bubbleArea2 {
      left: 64%; 
      bottom: 67%;
      transform: scale(1, 1); //좌우 반전 상하 반전
    }
  }
}

</style>

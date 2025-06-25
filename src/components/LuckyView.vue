<template>
  <div id="LuckyView">
    <div
      class="infoView"
      @click="toggleClass1"
      :class="{ flipped: isFlipped1 }"
    >
      <div class="front">🎨 행운의 컬러 🎨</div>
      <div class="back">{{ luckyColor }}</div>
    </div>
    <div
      class="infoView"
      @click="toggleClass2"
      :class="{ flipped: isFlipped2 }"
    >
      <div class="front">🍀 행운의 아이템 🍀</div>
      <div class="back">{{ luckyItem }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onIonViewDidEnter } from "@ionic/vue";
import OOTD from "@/assets/data/OOTD.js";

let isFlipped1 = false;
let isFlipped2 = false;
let luckyColor = "";
let luckyItem = "";

onIonViewDidEnter(() => {
  let luckyColor = OOTD[0].luckyColor;
  let luckyItem = OOTD[0].luckyItem;
});

function toggleClass1(){
  isFlipped1 = !isFlipped1;
}

function toggleClass2(){
  isFlipped1 = !isFlipped1;
}

</script>

<style lang="scss" scoped>
@use "../scss/common.scss" as *;
@use "../scss/reset.scss" as *;
@use "../scss/theme.scss" as *;

//행운 카드
#LuckyView {
  width: 100%;
  height: $lucky_height;
  position: fixed;
  top: $header_height + $fashion_height + $message_height;
  display: flex;

  .infoView {
    flex: 1;
    box-sizing: border-box;
    border-radius: 15px;
    margin: 0 5%;
    background-color: var(--background-color-3);
    perspective: 1000px;
    transition: transform 0.6s;
    transform-style: preserve-3d;

    &.flipped {
      transform: rotateY(180deg);
    }

    .front,
    .back {
      @include center;
      @include text-style-4;
      color : var(--text-color-1);
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
    }

    .front {
    }

    .back {
      transform: rotateY(180deg);
    }
  }

  .infoView:nth-child(2) {
    margin-left: 0;
  }
}

</style>

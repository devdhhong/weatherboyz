<template>
  <div id="FashionView">
    <img :src="fashionImgPath" alt="" />
    <div id="MessageView">
      <p class="">여기다가 뭐적지?</p>
      <!-- <p class="blinking">오늘의 필수템 ☂️</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import OOTD from "@/assets/data/OOTD.js";

let fashionImgPath = "";

onBeforeMount(() => {
  fashionImgPath = OOTD[0].imgPath;
});

</script>

<style lang="scss" scoped>
@use "../scss/common.scss" as *;
@use "../scss/reset.scss" as *;
@use "../scss/theme.scss" as *;

#FashionView {
  @include c-center-c;
  width: 100%;
  height: $fashion_height;
  position: fixed;
  top: $header_height;
  // overflow: hidden;

  img {
    max-width: 100%;
    max-height: 100%;
    padding-top: 5%
  }
}

// 이벤트 메세지
#MessageView {
  @include center;
  width: 100%;
  height: $message_height;
  position: fixed;
  top: $header_height + $fashion_height;

  p {
    @include text-style-3;
    color : var(--text-color-1);
  }
}
</style>

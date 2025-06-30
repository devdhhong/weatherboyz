<template>
  <div id="HeaderView">
    <!-- MAIN -->
    <div v-if="props.title == 'MAIN'">
			<div class="btnLeft" @click="btnPlay">
				<i class="fa-solid fa-puzzle-piece fa-xl reverse"></i>
      </div>
      <div class="title">
        <p>{{ address?.region_2depth_name || address?.region_1depth_name }}</p>
      </div>
      <div class="btnRight" @click="btnSetting">
        <i class="fa-solid fa-gear fa-lg reverse"></i>
      </div>
    </div>
    <!-- MAIN -->

    <!-- SETTING -->
    <div v-else-if="props.title == 'SETTING'">
      <div class="btnClose" @click="btnClose" style="visibility: hidden;">
        <i class="fa-solid fa-xmark fa-xl reverse"></i>
      </div>
      <div class="title">
        <p>{{ props.title }}</p>
      </div>
      <div class="btnClose" @click="btnClose">
        <i class="fa-solid fa-xmark fa-xl reverse"></i>
      </div>
    </div>
    <!-- SETTING -->

		<!-- 그 외 -->
		<div v-else>
      <div class="btnClose" @click="btnClose" style="visibility: hidden;">
        <i class="fa-solid fa-xmark fa-xl reverse"></i>
      </div>
      <div class="title">
        <p>{{ props.title }}</p>
      </div>
      <div class="btnClose" @click="btnClose">
        <i class="fa-solid fa-xmark fa-xl reverse"></i>
      </div>
    </div>
    <!-- 그 외 -->
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeMount, onMounted, watch } from "vue";
import router from "@/router";
import * as UTIL from "@/utils/UTIL.js";

let props = defineProps(["title", "isGetReverseGeocode"]);
let address: Address;

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
  if(UTIL.getLocalStorageItem('address')){
    address = JSON.parse(UTIL.getLocalStorageItem('address'));
  }
}

function btnRefresh() {
  window.Android.writeLog("FROM JS", "CLICK btnRefresh");
}

function btnPlay() {
  router.push("/PLAY");
}

function btnSetting() {
  router.push("/SETTING")
}

function btnClose() {
  router.back();
}

</script>

<style lang="scss" scoped>
// @import "../scss/reset.scss";
@use "../scss/common.scss" as *;
@use "../scss/theme.scss" as *;

#HeaderView {
  width: 100%;
  height: $header_height;
  position: fixed;
  top: 0;
  align-content: center;

  div {
    @include center-sb;

    div {
      padding: 5%;
    }

    .title {
      p {
        @include text-style-1;
        color: var(--text-color-1);
      }
    }
  }
}
</style>
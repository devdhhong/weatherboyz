<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div id="PLAYView">
          <HeaderView :title="title" />
          <div class="button-container">
            <button class="custom-button" @click="btnFortune">🍀 오늘의 운세 🍀</button>
            <button class="custom-button" @click="btnBaseball">⚾ 숫자 야구 ⚾</button>
            <button class="custom-button" @click="btnPhoca">🃏 포카 맞추기 🃏</button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import router from "@/router";
import HeaderView from "@/components/HeaderView.vue";

const title = "플레이";

function btnFortune() {
  router.push("/FORTUNE");
}

function btnBaseball() {
  router.push("/BASEBALL")
}

function btnPhoca() {
  router.push("/PHOCA")
}

</script>

<style lang="scss" scoped>
// @import "../scss/reset.scss";
@use "../scss/common.scss" as *;
@use "../scss/theme.scss" as *;

#PLAYView {
  width: 100%;
  height: $option_height;
  position: fixed;
  top: $header_height;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px;
}

.custom-button {
  @include text-style-4;
  width: 100%;
  background: var(--background-color-1);
  color: var(--text-color-2);
  border-radius: 8px;
  height: 70px;
	box-shadow: 5px 5px 10px var(--shadow-color-1);
}
</style>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div id="BASEBALLView">
          <HeaderView :title="title" />
          
          <!-- 새로운 가로 버튼 영역 -->
          <div class="top-buttons-container">
            <button class="mode-button">?</button>
            <button class="mode-button">?</button>
            <button class="mode-button">?</button>
          </div>

          <!-- 숫자 입력 및 입력 버튼 영역 -->
          <div class="number-input-container">
            <input type="number" placeholder="숫자를 입력해주세요" class="custom-input number-input">
            <button class="custom-button input-button">입력</button>
          </div>

          <div class="game-start-container">
            <img src="https://pbs.twimg.com/media/EXOOgxwUEAA6lsb.jpg:large" alt="게임 시작 이미지" class="game-intro-image" />
            <button class="custom-button start-button">시작하기 ⚾️</button>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import HeaderView from "@/components/HeaderView.vue";

const title = "숫자 야구";
</script>

<style lang="scss" scoped>
@import "@/scss/common.scss";
@import "@/scss/theme.scss";

#BASEBALLView {
  width: 100%;
  height: $option_height;
  position: fixed;
  top: $header_height;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

// 새로운 가로 버튼 컨테이너 스타일
.top-buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 48px 24px;
  gap: 15px;
  margin-bottom: 20px;
}

.mode-button {
  @include text-style-3;
  @include center;
  background: var(--background-color-1);
  color: var(--text-color-2);
  border-radius: 8px;
  width: 55px;
  height: 75px;
  box-shadow: 2px 2px 5px var(--shadow-color-1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:active {
    transform: translateY(0);
  }
}

.game-start-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  width: 100%;
  padding: 24px;
  gap: 30px;
}

.game-intro-image {
  max-width: 80%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.custom-button {
  @include text-style-4;
  width: 80%;
  background: var(--background-color-1);
  color: var(--text-color-2);
  border-radius: 8px;
  height: 55px;
  box-shadow: 5px 5px 10px var(--shadow-color-1);
}

// 숫자 입력 및 입력 버튼 컨테이너 스타일
.number-input-container {
  display: flex;
  width: 100%;
  padding: 10px 24px;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.number-input {
  @include text-style-4;
  flex: 2;
  height: 55px;
  padding: 0 16px;
  border: 1px solid var(--border-color-1);
  border-radius: 8px;
  background: var(--background-color-2);
  color: var(--text-color-1);

  &::placeholder {
    color: var(--text-color-1);
    opacity: 0.6;
  }
}

.input-button {
  flex: 1;
  height: 55px;
}

</style>

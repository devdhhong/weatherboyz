<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div id="BASEBALLView">
          <HeaderView :title="title" />
          
          <!-- 모든 주요 콘텐츠를 감싸는 래퍼 -->
          <div class="main-content-wrapper">
            <!-- 새로운 가로 버튼 영역 (모드 선택) -->
            <div class="top-buttons-container">
              <button class="mode-button">?</button>
              <button class="mode-button">?</button>
              <button class="mode-button">?</button>
              <button class="mode-button">?</button>
            </div>

            
            <!-- 히스토리 제목 -->
            <h2 class="history-title">히스토리</h2>

            <!-- 히스토리 영역 래퍼 (제목과 스크롤 가능한 목록 포함) -->
            <div class="history-section-wrapper">
              <!-- 입력한 숫자 버튼 목록 컨테이너 (스크롤 가능) -->
              <div class="entered-number-buttons-list-container">
                <!-- 각 히스토리 항목(입력된 숫자 셋트)은 이 안에 추가될 것 -->
                <div class="entered-number-buttons-row">
                  <span class="turn-label">1회</span>
                  <div class="entered-number-buttons-group">
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                  </div>
                  <span class="result-label">1S1B</span>
                </div>
                <div class="entered-number-buttons-row">
                  <span class="turn-label">2회</span>
                  <div class="entered-number-buttons-group">
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                  </div>
                  <span class="result-label">1S1B</span>
                </div>
                <div class="entered-number-buttons-row">
                  <span class="turn-label">3회</span>
                  <div class="entered-number-buttons-group">
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                  </div>
                  <span class="result-label">1S1B</span>
                </div>
                <div class="entered-number-buttons-row">
                  <span class="turn-label">4회</span>
                  <div class="entered-number-buttons-group">
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                  </div>
                  <span class="result-label">1S1B</span>
                </div>
                <div class="entered-number-buttons-row">
                  <span class="turn-label">5회</span>
                  <div class="entered-number-buttons-group">
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                  </div>
                  <span class="result-label">1S1B</span>
                </div>
                <div class="entered-number-buttons-row">
                  <span class="turn-label">6회</span>
                  <div class="entered-number-buttons-group">
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                  </div>
                  <span class="result-label">1S1B</span>
                </div>
                <div class="entered-number-buttons-row">
                  <span class="turn-label">7회</span>
                  <div class="entered-number-buttons-group">
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                  </div>
                  <span class="result-label">1S1B</span>
                </div>
                <div class="entered-number-buttons-row">
                  <span class="turn-label">8회</span>
                  <div class="entered-number-buttons-group">
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                  </div>
                  <span class="result-label">1S 1B</span>
                </div>
                <div class="entered-number-buttons-row">
                  <span class="turn-label">9회</span>
                  <div class="entered-number-buttons-group">
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                    <button class="entered-number-button">?</button>
                  </div>
                  <span class="result-label">1S 1B</span>
                </div>
              </div>
            </div>

            <!-- 숫자 입력 및 입력 버튼 영역 -->
            <div class="number-input-container">
              <input type="number" placeholder="숫자를 입력해주세요" class="custom-input number-input">
              <button class="custom-button input-button">입력</button>
            </div>

            <div class="game-start-container" style="display: none;">
              <img src="https://pbs.twimg.com/media/EXOOgxwUEAA6lsb.jpg:large" alt="게임 시작 이미지" class="game-intro-image" />
              <button class="custom-button start-button">시작하기 ⚾️</button>
            </div>
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

// 모든 주요 콘텐츠를 감싸는 래퍼 스타일
.main-content-wrapper {
  width: 100%;
  padding: 0 16px; // 좌우 여백 (fortune.vue의 .fortune-result와 유사)
  flex-grow: 1; // 남은 세로 공간을 채움
  display: flex;
  flex-direction: column;
  align-items: center;
}


// 새로운 가로 버튼 컨테이너 스타일 (모드 선택)
.top-buttons-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 48px 0 20px 0; // 좌우 패딩 제거
  gap: 10px;
}

.mode-button {
  @include text-style-3;
  @include center;
  background: var(--background-color-1);
  color: var(--text-color-2);
  border-radius: 8px;
  border: none;
  width: 50px;
  height: 70px;
  box-shadow: 2px 2px 5px var(--shadow-color-1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:active {
    transform: translateY(0);
  }
}

// 히스토리 섹션 래퍼 (제목과 스크롤 가능한 목록을 포함)
.history-section-wrapper {
  width: 100%; // main-content-wrapper 안에서 100%
  background: var(--background-color-4);
  border-radius: 16px; // 12px에서 16px로 변경
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

// 히스토리 제목 스타일
.history-title {
  @include text-style-1;
  color: var(--text-color-1);
  text-align: center;
}

// 입력한 숫자 버튼 목록 컨테이너 (스크롤 가능)
.entered-number-buttons-list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--border-color-1);
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: var(--background-color-2);
  }
}

// 히스토리 항목의 각 줄 (3개 버튼 포함)
.entered-number-buttons-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 10px;
}

.entered-number-buttons-group {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}

.turn-label,
.result-label {
  @include text-style-4;
  color: var(--text-color-1);
  flex-shrink: 0;
}

.turn-label {
  min-width: 40px;
  text-align: center;
}

.result-label {
  color: #ff0004;
  font-weight: bold;
  min-width: 60px;
  text-align: center;
  padding-right: 15px;
}

.entered-number-button {
  @include text-style-3;
  @include center;
  background: var(--background-color-2);
  color: var(--text-color-1);
  border-radius: 5px;
  border: 1px solid var(--border-color-1);
  width: 30px;
  height: 45px;
  box-shadow: 2px 2px 5px var(--shadow-color-1);
  cursor: default;
  transition: all 0.3s ease;
}

.game-start-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  width: 100%;
  padding: 24px 0; // 좌우 패딩 제거
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
  border: none;
  height: 55px;
  box-shadow: 5px 5px 10px var(--shadow-color-1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}

// 숫자 입력 및 입력 버튼 컨테이너 스타일
.number-input-container {
  display: flex;
  width: 100%;
  padding: 10px 0; // 좌우 패딩 제거
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}

.number-input {
  @include text-style-4;
  flex: 3;
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

:root {
  --color-red: #ff4d4f;
}
</style>

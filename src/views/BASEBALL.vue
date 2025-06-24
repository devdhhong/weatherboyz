<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div id="BASEBALLView">
          <HeaderView :title="title" />
          
          <!-- 모든 주요 콘텐츠를 감싸는 래퍼 -->
          <div class="main-content-wrapper scroll-area">
            <!-- 새로운 가로 버튼 영역 (모드 선택) -->
            <div class="top-buttons-container">
              <button class="mode-button">?</button>
              <button class="mode-button">?</button>
              <button class="mode-button">?</button>
              <button class="mode-button">?</button>
            </div>
            
            <!-- 히스토리 제목 -->
            <h2 class="result-title" v-if="gameResult == 'S'">🥳 성공 🥳{{ answer }}</h2>
            <h2 class="result-title" v-if="gameTurn >= 10 && gameResult != 'S'">🥺 실패 🥺{{ answer }}</h2>

            <!-- 히스토리 영역 래퍼 (제목과 스크롤 가능한 목록 포함) -->
            <div class="history-section-wrapper">
              <!-- 게임 시작 버튼 -->
              <button class="game-start-button" @click="btnGameStart" v-if="!isStartGame">
                <span>게임 시작 ⚾️</span>
              </button>

              <!-- 입력한 숫자 버튼 목록 컨테이너 (스크롤 가능) -->
              <div class="entered-number-buttons-list-container" v-if="isStartGame">
                <!-- 기존 히스토리 항목들 임시 숨김 처리 -->
                <div class="entered-number-buttons-row"  v-for="(number, index) in enteredNumberList" :key="index">
                  <span class="turn-label">{{ index+1 }}회</span>
                  <div class="entered-number-buttons-group">
                    <button class="entered-number-button" :class="{ checked : number.split('/')[0] != '?' }">{{ number.split("/")[0] }}</button>
                    <button class="entered-number-button" :class="{ checked : number.split('/')[1] != '?' }">{{ number.split("/")[1] }}</button>
                    <button class="entered-number-button" :class="{ checked : number.split('/')[2] != '?' }">{{ number.split("/")[2] }}</button>
                    <button class="entered-number-button" :class="{ checked : number.split('/')[3] != '?' }">{{ number.split("/")[3] }}</button>
                  </div>
                  <span class="result-label">{{ Number(gameTurn) > index ? markingAnswer(number) : "" }}</span>
                </div>
              </div>
            </div>

            
            <!-- 숫자 입력 및 입력 버튼 영역 -->
            <div class="number-input-container" v-if="isStartGame">
              <input type="text" placeholder="0~9 숫자를 입력해주세요 :3" class="custom-input number-input" v-model="enteredNumber">
              <button class="custom-button input-button" @click="btnEnter">입력</button>
            </div>
            
            <!-- 공유 버튼 컨테이너 -->
            <div class="share-buttons-container">
              <button class="share-button" @click="btnGameRule">
                <i class="fa-solid fa-circle-question reverse fa-sm"></i>
                <div>게임방법</div>
              </button>
              <button class="share-button" @click="btnGameRestart" v-if="isStartGame">
                <i class="fa-solid fa-rotate-right reverse fa-sm"></i>
                <div>다시시작</div>
              </button>
            </div>

            <!-- 게임 방법 -->
             <div class="game-rule-area" v-if="isRuleVisible">
                <!-- <h3>⚾️ 게임 방법 ⚾️</h3> -->
                <p>
                  1. 0~9 사이의 중복되지 않는 4개의 숫자를 맞춰보세요.<br>
                  2. 숫자는 맞지만 위치가 다르면 볼(B)입니다.<br>
                  3. 숫자와 위치가 모두 맞으면 스트라이크(S)입니다.<br>
                  4. 4S를 기록하면 게임에서 승리합니다!<br>
                  5. 총 10번의 기회가 주어집니다.<br>
                </p>
             </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import HeaderView from "@/components/HeaderView.vue";

const title = "숫자 야구";
const answer = ref('');
const enteredNumber = ref('');
const enteredNumberList = ref<string[]>([]);
const isStartGame = ref(false);
const gameTurn = ref(0);
const gameResult = ref("");
const isRuleVisible = ref(false);

onMounted(() => {
  console.log(getRandomNumbers());
});

function btnEnter(){
  //앞뒤 공백제거
  enteredNumber.value = enteredNumber.value.trim();

  //유효성 검증
  if(!isValidNumberPattern(enteredNumber.value)){
    alert("올바른 형태로 입력해주세요. 예) 1/2/0/6")
    return;
  }
  else if(enteredNumber.value == answer.value){
    gameResult.value = "S";
  }
  else {
    //이력에 추가    
    enteredNumberList.value[gameTurn.value] = enteredNumber.value;

    gameTurn.value++;
    
    //인풋창 초기화
    enteredNumber.value = "";
  }
  
}

//게임시작 버튼
function btnGameStart(){
  //숫자 뽑기
  answer.value = getRandomNumbers();

  //이력 초기화
  enteredNumberList.value = Array.from({ length: 10 }, () => "?/?/?/?"); 

  isStartGame.value = true;
}

//게임 다시시작 버튼
function btnGameRestart(){
  alert("게임을 다시 시작합니다!");
  isStartGame.value = false;
}

//랜덤 숫자 뽑기
function getRandomNumbers(): string {
  const pool = Array.from({ length: 10 }, (_, i) => i + 1); // [1, 2, ..., 11]
  const result: number[] = [];

  while (result.length < 4) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    const number = pool.splice(randomIndex, 1)[0]; // 꺼내고 제거
    result.push(number);
  }

  return result.join("/");
}

//입력값 체크 (숫자/숫자/숫자/숫자 형태로만 입력가능/숫자는 0~9만 입력 가능)
function isValidNumberPattern(input: string): boolean {
  const regex = /^[0-9]\/[0-9]\/[0-9]\/[0-9]$/;
  return regex.test(input);
}

//입력한 값 채점
function markingAnswer(input: string): string{
  const guessList = input.split("/");
  const answerList = answer.value.split("/");


  let strike = 0;
  let ball = 0;

  for (let i = 0; i < 4; i++) {
    if (guessList[i] === answerList[i]) {
      strike++;
    } else if (answerList.includes(guessList[i])) {
      ball++;
    }
  }

  return `${strike}S${ball}B`;
}

//게임방법
function btnGameRule(){
  isRuleVisible.value = !isRuleVisible.value;
}

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
  @include c-center;
  width: 100%;
  padding: 0 24px; // 좌우 여백 (fortune.vue의 .fortune-result와 유사)
  flex-grow: 1; // 남은 세로 공간을 채움
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
  @include c-center;
  width: 100%;
  background: var(--background-color-4);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 25px;
  margin: 20px 0;
  // 버튼과 리스트를 세로로 배치하기 위한 스타일 추가
  display: flex;
  flex-direction: column;
  gap: 20px;
}

// 히스토리 제목 스타일
.result-title {
  @include text-style-1;
  color: var(--alert-color-1);
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
  @include center-sb;
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
  color: var(--alert-color-2);
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
  width: 35px;
  height: 50px;
  box-shadow: 2px 2px 5px var(--shadow-color-1);
  cursor: default;
  transition: all 0.3s ease;

  &.checked {
    background: var(--background-color-1);
    color: var(--text-color-2);
  }
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
  padding: 10px 0;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
  min-height: 55px;
}

.number-input {
  @include text-style-4;
  width: calc(75% - 5px);
  height: 55px;
  padding: 0 16px;
  border: 1px solid var(--border-color-1);
  border-radius: 8px;
  background: var(--background-color-2);
  color: var(--text-color-1);
  min-width: 0;
  box-sizing: border-box;

  &::placeholder {
    color: var(--text-color-1);
    opacity: 0.6;
  }
}

.input-button {
  width: calc(25% - 5px);
  height: 55px;
  min-width: 0;
  box-sizing: border-box;
}

// 공유 버튼 컨테이너 스타일
.share-buttons-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 20px;
}

.share-button {
  @include center;
  color: var(--text-color-1);
  width: 85px;
  height: 35px;
  border-radius: 8px; // 원형으로 변경
  background: var(--alert-color-3);
  cursor: pointer;
  transition: all 0.3s ease;
  gap: 5px;
  
  div {
    @include text-style-5;
  }

  &:active {
    transform: translateY(0);
  }
}

// 게임 시작 버튼 스타일
.game-start-button {
  @include center;
  background: var(--background-color-1);
  color: var(--text-color-2);
  border-radius: 12px;
  border: none;
  padding: 16px 32px;
  margin: 36px 0px;
  min-width: 150px;
  height: 60px;
  box-shadow: 0 4px 12px var(--shadow-color-1);
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: center; // 버튼을 중앙에 배치

  span {
    @include text-style-3;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px var(--shadow-color-1);
  }
}

.game-rule-area {
  width: 100%;
  background: var(--alert-color-4);
  border-radius: 16px;
  padding: 20px;
  color: var(--text-color-1);

  h3 {
    @include text-style-3;
    font-weight: 600;
    text-align: center;
    margin-bottom: 15px;
  }

  p {
    @include text-style-5;
    white-space: pre-wrap;
    text-align: left;
    line-height: 1.8;
  }
}

</style>

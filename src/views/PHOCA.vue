<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div id="PHOCAView" class="scroll-area">
          <HeaderView title="포카 맞추기" />
          <div class="main-content" v-if="!isStartGame">
            <div class="option-area">
              <select name="" class="custom-select" v-model="setTheme">
                <option value="" disabled>테마를 선택해주세요</option>
                <option value="1">코구마</option>
                <option value="2">포챠코</option>
                <option value="3">커비</option>
              </select>
            </div>
            <div class="button-container">
              <button class="custom-button" @click="btnGameStart">게임 시작</button>
            </div>
          </div>

          <div class="game-content" v-else>
            <!-- <h2 class="result-title">🧸</h2> -->
            <div class="cnt-area">
              <span>시도 횟수: {{ attempts }}</span>
            </div>
            <div class="card-grid">
              <div v-for="(card, index) in cards" :key="index" class="card-container" @click="flipCard(card, index)">
                <div class="card-flipper" :class="{ 'flipped': card.isFlipped }">
                  <div class="card-face card-front">{{ card.text }}</div>
                  <template v-if="card.member != '-'">
                    <img :src="`/images/PHOCA/${setTheme}/${setTheme}_${card.member}.png`" class="card-face card-back" alt="Card back">
                  </template>
                  <template v-else>
                    <div class="card-face card-back">❤️</div>
                  </template>
                </div>
              </div>
            </div>
          </div>

          <!-- 공유하기 버튼 영역 -->
          <div class="share-buttons-container" v-show="isStartGame && isDoneGame">
            <div class="share-icon-circle">
              <i class="fa-brands fa-x-twitter" @click="btnShareX"></i>
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

interface Card {
  text: string;
  isFlipped: boolean;
  member: string;
  index: number;
}

const isStartGame = ref(false);
const isDoneGame = ref(false);
const setTheme = ref("");
const cards = ref<Card[]>([]);
const firstCard = ref<Card | null>(null);
const attempts = ref(0);
const isFlipping = ref(false);
const answerCnt = ref(0);

onMounted(() => {
  setTheme.value = ""; // 초기화

  attempts.value = 0; // 시도 횟수 초기화

  // 20개의 카드 데이터 생성
  cards.value = Array.from({ length: 20 }, () => ({ text: '?', isFlipped: false, member: "", index: 0 }));
});

//게임시작 버튼
function btnGameStart(){
  if (!setTheme.value) {
    alert("테마를 선택해주세요!");
    return;
  }
  
  isStartGame.value = true;

  //캬드 섞기
  setCards();
}

// 카드 뒤집기
function flipCard(card: Card, index: number) {
  //과도하게 빠르게 뒤집는거 방지
  if(isFlipping.value){
    return;
  }
  
  //이미 뒤집어진 카드
  if(cards.value[index].isFlipped){
    return;
  }

  //뒤집는중
  isFlipping.value = true;

  //첫번째 카드
  if(!firstCard.value?.member){
    firstCard.value = card;
    cards.value[index].isFlipped = true;
    isFlipping.value = false;
  }
  //두번째 카드
  else{
    cards.value[index].isFlipped = true;

    //정답
    if(firstCard.value?.member == card.member){
      //초기화
      firstCard.value = { text: '?', isFlipped: false, member: "", index: 0 };
      attempts.value++;
      isFlipping.value = false;
      answerCnt.value++;
    }
    //오답
    else{
      const firstCardIndex = firstCard.value?.index;
      setTimeout(function(){
        cards.value[index].isFlipped = false;
        if (firstCardIndex !== undefined) {
          cards.value[firstCardIndex].isFlipped = false;
        }

        //초기화
        firstCard.value = null;
        attempts.value++;
        isFlipping.value = false;
      }, 1000);
    }

    //성공 여부
    if(answerCnt.value == 10){
      alert("성공");

      isDoneGame.value = true;
    }

  }
}

//카드 섞기
function setCards(){
  const member = [
    "jacob", "younghoon", "hyunjae", "juyeon", "kevin", "new", "q", "sunwoo", "eric",
    "jacob", "younghoon", "hyunjae", "juyeon", "kevin", "new", "q", "sunwoo", "eric",
    "-", "-"
  ];

  // 피셔-예이츠 셔플 알고리즘
  for (let i = 0; i < member.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [member[i], member[j]] = [member[j], member[i]]; // 값 교환
  }

  for (let i = 0; i < member.length; i++) {
    cards.value[i].member = member[i];
    cards.value[i].index = i;
  }
}

//트위터 공유하기
function btnShareX() {
  const text = encodeURIComponent(answerCnt.value + '회 만에 포카맞추기 성공!\n');
  const url = encodeURIComponent('https://weatherboyz.netlify.app/' + '\n\n');
  const hashtags = encodeURIComponent('더보이즈,THEBOYZ'); // 해시태그 추가 가능
  const via = 'tbz_weatherboyz'; // 트위터 사용자 이름 (@ 없이)

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}&via=${via}`;

  // 트위터 공유 URL로 이동
  window.open(twitterShareUrl, '_blank');
}


</script>

<style lang="scss" scoped>
@use "../scss/common.scss" as *;
@use "../scss/theme.scss" as *;

#PHOCAView {
  width: 100%;
  height: $option_height;
  position: fixed;
  top: $header_height;
  display: flex;
  flex-direction: column;
}

.main-content, .game-content {
  @include c-center;
  flex-direction: column; /* 자식 요소를 세로로 정렬 */
  // flex-grow: 1;
  padding: 24px;
  gap: 24px;
  width: 100%;
}

.cnt-area {
  width: 90%;
  max-width: 400px;
  text-align: right;
  padding-bottom: 10px;
  @include text-style-4;
  color: var(--text-color-1);
  font-weight: 600;
}

.option-area,
.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 400px;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3px;
  width: 90%;
  max-width: 400px;
  perspective: 1000px; /* 3D 효과를 위한 원근감 */
}

.card-container {
  aspect-ratio: 3 / 4; /* 카드의 가로:세로 비율 */
  @include center;
  cursor: pointer;
}

.card-flipper {
  width: 85%;
  height: 85%;
  position: relative;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.card-flipper.flipped {
  transform: rotateY(180deg);
}

.card-face {
  @include text-style-3;
  @include center;
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--background-color-2);
  color: var(--text-color-1);
  border-radius: 5px;
  border: 1px solid var(--border-color-1);
  box-shadow: 2px 2px 5px var(--shadow-color-1);
  backface-visibility: hidden;
}

.card-front {
  // 기본 앞면 스타일 (변경 없음)
}

.card-back {
  background: var(--background-color-4);
  transform: rotateY(180deg);
}

.custom-select {
  @include text-style-4;
  width: 100%;
  height: 55px;
  padding: 0 16px;
  background: var(--background-color-2);
  color: var(--text-color-1);
  border: 1px solid var(--border-color-1);
  border-radius: 8px;
  box-shadow: 2px 2px 5px var(--shadow-color-1);
  appearance: none; // 기본 화살표 제거
  // background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.custom-button {
  width: 100%;
  background: var(--background-color-1);
  color: var(--text-color-2);
  border-radius: 8px;
  height: 55px;
  font-weight: 500;
  box-shadow: 5px 5px 10px var(--shadow-color-1);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:active {
    transform: translateY(0);
  }
}

// 공유 버튼 컨테이너 스타일
.share-buttons-container {
  display: flex;
  justify-content: center;
  gap: 16px;
  width: 100%;
  padding-top: 20px;
}

.share-icon-circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--background-color-1);
  @include center;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: all 0.3s ease;

  i {
    color: var(--text-color-2);
  }
}
</style>


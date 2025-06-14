<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div id="container">
        <div id="FORTUNEView" class="scroll-area">
          <HeaderView :title="title" />
          <div class="input-container">
            <div class="input-group">
              <label>이름</label>
              <input type="text" v-model="name" placeholder="노래하는펭귄" class="custom-input">
							<span class="error-message" v-if="nameError">{{ nameError }}</span>
            </div>
            
            <div class="input-group birthdate-group">
              <label>생년월일</label>
							<div class="birthdate-input-container">
								<input type="number" v-model="birthdate" placeholder="19980426" class="custom-input birthdate-input">
								<button class="calendar-button" :class="{ 'active': !isLunar }" @click="btnCalendar('lunarN')">양력</button>
								<button class="calendar-button" :class="{ 'active': isLunar }" @click="btnCalendar('lunarY')">음력</button>
							</div>
							<span class="info-message" v-if="isLunar && birthdateInfo">{{ birthdateInfo }}</span>
							<span class="error-message" v-else-if="birthdateError">{{ birthdateError }}</span>
            </div>
            
            <div class="input-group birthtime-group">
              <label>출생시간</label>
							<div class="birthtime-input-container">
								<button class="time-button time-type-button" :class="{ 'active': isAM }" :disabled="isUnknown" @click="btnAMPM('AM')">AM</button>
								<button class="time-button time-type-button" :class="{ 'active': !isAM }" :disabled="isUnknown" @click="btnAMPM('PM')">PM</button>
								<input type="text" v-model="birthtime" :disabled="isUnknown" placeholder="1626" class="custom-input birthtime-input">
								<button class="time-button" :class="{ active : isUnknown }" @click="btnUnknown">모름</button>
							</div>
							<span class="error-message" v-if="birthtimeError">{{ birthtimeError }}</span>
            </div>

						<div class="input-group">
							<div class="remember-info">
								<input type="checkbox" id="rememberInfo" v-model="isRememberInfo" class="remember-checkbox">
								<label for="rememberInfo"> 지금 입력한 정보 기억하기</label>
							</div>
						</div>

          </div>
					
					<div class="button-container">
            <button class="custom-button" v-if="fortuneResultCnt < 3" @click="btnGetFortune" :disabled="isLoading">운세 확인하기 {{ fortuneResultCnt }}/3</button>
            <button class="custom-button" v-else :disabled="isLoading">내일 다시 확인하기</button>
          </div>

          <!-- 결과지 영역 -->
          <div class="fortune-result" v-if="showResult">
            <h2 class="fortune-result-title" ref="fortuneResultTitleRef">결과보기</h2>
            <div class="result-container">
              <div class="result-image">
                <!-- <img src="https://img.freepik.com/free-vector/thermometers-hot-cold_78370-2406.jpg?semt=ais_items_boosted&w=740" alt="운세 결과 이미지" /> -->
                <img src="../../public/images/FORTUNE/YH01.png" alt="운세 결과 이미지" />
                <!-- <img :src="resultImage" alt="운세 결과 이미지" /> -->
              </div>
              <div class="result-text">
                <h3 class="result-title">🍀 덕질 운세 🍀</h3>
                <p class="result-description">{{ resultInfo[5] }}</p>
              </div>
              <div class="result-text">
                <h3 class="result-title">🍀 총 운세 🍀</h3>
                <p class="result-description">{{ resultInfo[7] }}</p>
              </div>
              <div class="result-text">
                <h3 class="result-title">🍀 최고의 궁합 🍀</h3>
                <p class="result-description">{{ resultInfo[1] }} {{ resultInfo[3] }}점</p>
              </div>
              <!-- 공유하기 버튼 영역 -->
              <div class="share-buttons-container">
                <div class="share-icon-circle">
                  <i class="fa-solid fa-copy" @click="btnCopy"></i>
                </div>
                <div class="share-icon-circle">
                  <i class="fa-brands fa-x-twitter" @click="btnShareX"></i>
                </div>
                <div class="share-icon-circle">
                  <i class="fa-solid fa-share-nodes" @click="btnShare"  :class="{ 'disabled': isSharing }"></i>
                </div>
              </div>
            </div>
          </div>
          

        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from "vue";
import HeaderView from "@/components/HeaderView.vue";
import * as UTIL from "@/utils/UTIL.js";
import moment from "moment";

const title = "오늘의 운세";
const name = ref("");
const birthdate = ref("");
const birthtime = ref("");
const isUnknown = ref(false); //모름 버튼 
const nameError = ref('');
const birthdateError = ref('');
const birthdateInfo = ref('');
const birthtimeError = ref('');
const isLunar = ref(false);
const isAM = ref(true);
const isLoading = ref(false);
const fortuneResultCnt = ref(0);
const isRememberInfo = ref(false); //다음에 기억하기
const showResult = ref(false);
let fortuneInfo = {
	name: "",
	birthdate: "",
	birthtime: "",
	birthtimeType: "",
};
const resultInfo = ref<string[]>([]);
const fortuneResultTitleRef = ref<HTMLElement | null>(null);
const isSharing = ref(false); // 공유 진행 중 상태

onMounted(() => {
  const fortuneResultDate = UTIL.getLocalStorageItem('fortuneResultDate') || "";

  //운세 확인 가능 횟수 초기화
  if(moment().format("YYYYMMDD") != fortuneResultDate){
    UTIL.setLocalStorageItem('fortuneResultCnt', "0");
  }
  fortuneResultCnt.value = Number(UTIL.getLocalStorageItem('fortuneResultCnt')) || 0;

	//저장해둔 정보가 있다면 초기셋팅
	fortuneInfo = JSON.parse(UTIL.getLocalStorageItem('fortuneInfo') || "{}");

	//이름
	if(fortuneInfo.name){
		name.value = fortuneInfo.name;
	}

	//생년월일
	if(fortuneInfo.birthdate){
		birthdate.value = fortuneInfo.birthdate;
	}

	//출생시간
  console.log(fortuneInfo);
	if(fortuneInfo.birthtime){
		birthtime.value = fortuneInfo.birthtime;
	}

	isUnknown.value = fortuneInfo.birthtime == "";
	isAM.value = fortuneInfo.birthtimeType == "AM";

});

const btnGetFortune = async function() {
	console.log("===========================================");
	console.log("이름: "+ name.value);
	console.log("생년월일: "+ birthdate.value);
	console.log("출생시간: "+ birthtime.value);
	console.log("모름여부: "+ isUnknown.value);
	console.log("기억하기: "+ isRememberInfo.value);
	console.log("===========================================");


	//에러메세지 초기화
	nameError.value = "";
	birthdateError.value = "";
	birthdateInfo.value = "";
	birthtimeError.value = "";

	//이름 체크
	if(!name.value.trim().length){
		nameError.value = "이름 또는 닉네임을 입력해주세요 ㅠㅠㅠ";
		return;
	}
	//생년월일 체크
	else if(!isValidBirthdate(birthdate.value)){
		birthdateError.value = "유효한 생년월일을 입력해주세요 ㅠㅠ";
		return;
	}
	//출생시간 체크
	else if(!isUnknown.value && !isValidBirthtime(birthtime.value)){
		birthtimeError.value = "유효한 시간을 입력해주세요 ㅠㅠ";
		return;
	}

	//다음에 기억하기 설정 
	if(isRememberInfo.value){
		fortuneInfo = {
			name: name.value,
			birthdate: String(birthdate.value),
			birthtime: isUnknown.value ? "" : birthtime.value,
			birthtimeType: isAM.value ? "AM" : "PM",
		};
	}

	UTIL.setLocalStorageItem("fortuneInfo", JSON.stringify(fortuneInfo));
	
	isLoading.value = true;

  const dateTypeInfo = isLunar.value ? "음력" : "양력";
  const timeInfo = isUnknown.value ? "모름" : birthtime.value;
  const timeTypeInfo = isAM.value ? "오전" : "오후";

  const memberInfo = `
  1. 상연: 1996년 11월 4일 (양력) 2. 제이콥: 1997년 5월 30일 (양력) 3. 영훈: 1997년 8월 8일 (양력)  
  4. 현재: 1997년 9월 13일 (양력) 5. 주연: 1998년 1월 15일 (양력) 6. 케빈: 1998년 2월 23일 (양력) 
  7. 뉴: 1998년 4월 26일 (양력) 8. 큐: 1998년 11월 5일 (양력) 9. 주학년: 1999년 3월 9일 (양력)
  10. 선우: 2000년 4월 12일 (양력) 11. 에릭: 2000년 12월 22일 (양력)`;

	const prompt = `
  [내 정보]
	이름: ${name.value}
	생년월일: ${dateTypeInfo} ${birthdate.value}
	출생시간: ${timeTypeInfo} ${timeInfo}

  [멤버 정보]
  ${memberInfo}

  1. 내 정보와 멤버정보를 바탕으로, 오늘 기준 나와 가장 궁합이 좋은 멤버를 알려줘.
  2. 궁합이 좋은 멤버와의 점수가 100점만점 기준으로 몇점인지 알려줘.
  3. 내 정보를 바탕으로 금전운과 애정운을 총합하여, 나의 덕질운세를 150자~180자로 알려줘. (멤버와의 내 정보의 궁합을 기반으로 해석한 풀이가 필요)
  4. 내 정보를 바탕으로 나의 오늘 하루의 총 운세를 150자~180자로 알려줘. (멤버 정보와 관계없이 내 정보만을 기반으로 해석한 풀이가 필요)
  
  단, 출력형태는 아래와 같이 해줘.
  
  [멤버]***###멤버이름###***
  [점수]***###점수###***
  [덕질운세]***###내용(반드시 150자~180자로 작성할 것)###***
  [총운세]***###내용(반드시 150자~180자로 작성할 것)###***

  예시) 덕질운세, 총운세는 단순 예시이며 결과에 맞게 그때 그때 새롭게 작성 필요/문장 끝의 *** 는 문단의 시작과 끝남을 알려주는 용도이므로 필수로 포함할 것.
  [멤버]***영훈***
  [점수]***88***
  [덕질운세]***더비님과 영훈은 서로를 보완해주는 존재입니다. 더비님은 책임감이 강하고 현실적이며, 영훈은 창의적이고 감성적인 면을 보유하고 있습니다. 
  함께하면 더욱 완벽한 결과물을 만들어낼 수 있는데, 이는 덕질을 하며 새로운 아이디어나 창의적인 방법을 발견하는 데 도움이 될 것입니다. 
  서로를 이해하고 존중하는 관계를 유지하는 것이 중요합니다.*** 
  [총운세]***오늘은 더비님에게 조금 새로운 도전이 기다리고 있을 것으로 예상됩니다. 현재의 상황에서 새로운 아이디어거나 시도를 통해 문제를 해결하는 것이 좋을 것입니다. 
  갑작스럽고 예상치 못한 일이 생길 수 있으니 융통성을 가지고 대처하는 것이 중요합니다. 
  긍정적인 마음가짐을 유지하고 자신의 재능을 믿으면 좋은 결과를 얻을 수 있을 것입니다. 지금은 변화와 도전의 기회를 잡는 것이 중요합니다.***
	`;

	const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'user', content: prompt }
      ]
    })
  })

  
  //결과 
  const data = await response.json();
  const result = data?.choices[0]?.message?.content || "";
  resultInfo.value = result.split("***");

  console.log("=============================");
  console.log(resultInfo.value[1]);
  console.log(resultInfo.value[3]);
  console.log(resultInfo.value[5]);
  console.log(resultInfo.value[7]);
  console.log("=============================");

  fortuneResultCnt.value++;
  UTIL.setLocalStorageItem('fortuneResultDate', moment().format("YYYYMMDD"));
  UTIL.setLocalStorageItem('fortuneResultCnt', String(fortuneResultCnt.value));

  isLoading.value = false;
  showResult.value = true;

  await nextTick();

  if (fortuneResultTitleRef.value) {
    fortuneResultTitleRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

//모름 버튼 
function btnUnknown(){
	//버튼 active 토글
	isUnknown.value = !isUnknown.value;

	if(isUnknown.value){
		birthtime.value = "";
	}
}

//음력/양력
function btnCalendar(type: string){
	//음력
	if(type == "lunarY"){
		isLunar.value = true;
		birthdateInfo.value = "일반적으로 주민등록증에는 양력 생일을 기재해요!"
	}
	else{
		isLunar.value = false;
	}
}

//오전/오후
function btnAMPM(type: string){
	//오전전
	if(type == "AM"){
		isAM.value = true;
	}
	else{
		isAM.value = false;
	}
}

//생년월일 검증
function isValidBirthdate(input: string): boolean {
	// 형식 체크: yyyymmdd
  const regex = /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
	
	const yyyymmdd = String(input).replace(/[^0-9]/g, '').trim();
  if (!regex.test(yyyymmdd)) return false;

  const year = parseInt(yyyymmdd.slice(0, 4), 10);
  const month = parseInt(yyyymmdd.slice(4, 6), 10) - 1; // JS는 0~11
  const day = parseInt(yyyymmdd.slice(6, 8), 10);

  const date = new Date(year, month, day);

  // 날짜 유효성 + 입력값과 동일한지 확인
  const isSameDate =
    date.getFullYear() === year &&
    date.getMonth() === month &&
    date.getDate() === day;

  if (!isSameDate) return false;

  // 미래 날짜인지 확인
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간 무시
  if (date > today) return false;

  return true;
}

function isValidBirthtime(input: string): boolean {
	// 형식 체크: yyyymmdd
	const regex = /^(0[1-9]|1[0-2])[0-5][0-9]$/;

	const hhmm = String(input).replace(/[^0-9]/g, '').trim();
	if (!regex.test(hhmm)) return false;

  return true;
}

// 클립보드 복사 함수
async function btnCopy() {
  try {
    const textToCopy = `
    [오늘의 운세 결과]\n\n
    🍀 덕질 운세 🍀\n
    ${resultInfo.value[5]}\n\n
    🍀 총 운세 🍀\n
    ${resultInfo.value[7]}\n\n
    🍀 최고의 궁합 🍀\n
    ${resultInfo.value[1]} ${resultInfo.value[3]}점\n
    `;

    await navigator.clipboard.writeText(textToCopy);
    alert('운세 결과가 클립보드에 복사되었습니다!');
  } catch (err) {
    console.error('클립보드 복사 실패:', err);
    alert('운세 결과를 복사하는 데 실패했습니다.');
  }
}

//공유하기 버튼
async function btnShare() {
  if (isSharing.value) { // 이미 공유 중이면 함수 종료
    return;
  }

  isSharing.value = true; // 공유 시작

  const isAppYn = UTIL.getLocalStorageItem("isAppYn");
  const isAosYn = UTIL.getLocalStorageItem("isAosYn");

  try {
    //안드로이드
    if (isAppYn == "Y" && isAosYn == "Y") {
      window.Android.btnShare("weatherboyz! @tbz_weatherboyz");
    }
    //웹
    else {
      if (navigator.share) {
        await navigator.share({
          title: 'weatherboyz!',
          text: '오늘 나와 가장 궁합이 좋은 멤버는',
          url: "https://weatherboyz.netlify.app/",
        });
      } else {
        // Web Share API를 지원하지 않는 경우
        alert('공유하기가 지원되지 않는 브라우저입니다.');
      }
    }
  } catch (error) {
    console.error('공유하기 실패:', error);
  } finally {
    isSharing.value = false; // 공유 완료 (성공/실패 무관)
  }
}

//트위터 공유하기
function btnShareX() {
  const text = encodeURIComponent('weatherboyz!\n');
  const url = encodeURIComponent('https://weatherboyz.netlify.app/' + '\n\n');
  const hashtags = encodeURIComponent('더보이즈,THEBOYZ'); // 해시태그 추가 가능
  const via = 'tbz_weatherboyz'; // 트위터 사용자 이름 (@ 없이)

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}&via=${via}`;

  // 트위터 공유 URL로 이동
  window.open(twitterShareUrl, '_blank');
}



</script>

<style lang="scss" scoped>
// @import "../scss/reset.scss";
@import "../scss/common.scss";
@import "../scss/theme.scss";

#FORTUNEView {
  width: 100%;
  height: $option_height;
  position: fixed;
  top: $header_height;
}

.input-container, .button-container {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

	//에러메세지
  .error-message, .info-message {
    @include text-style-5;
    color: #ff4d4f;  // 빨간색
    margin: 4px 0 0 16px;  // 위쪽 여백과 왼쪽 여백
    display: block;
    min-height: 16px;  // 에러 메시지가 없을 때도 공간 유지

		&.info-message {
			color: var(--border-color-2);  // 빨간색
		}
  }

	//생년월일
	&.birthdate-group {
    .birthdate-input-container {
      display: flex;
      gap: 8px;
    }

    .birthdate-input {
      flex: 3;  
    }

    .calendar-button {
      flex: 1;  
      background: var(--background-color-2);
      color: var(--text-color-1);
			border: 1px solid var(--border-color-1);
      border-radius: 8px;
      height: 48px;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active {
				color: var(--text-color-2);
        background: var(--background-color-1); // 활성화된 상태의 배경색
      }

      &:active {
        transform: translateY(0);
      }
    }
	}

	//출생시간
	&.birthtime-group {
    .birthtime-input-container {
      display: flex;
      gap: 8px;
    }

		.error-message, .info-message {
      margin-left: 0;  // birthtime-group의 경우 왼쪽 여백 제거
    }

    .birthtime-input {
      flex: 3; /* 4:1 비율을 위해 flex: 4 */

			&.disabled {
        background: var(--background-color-3);
        color: var(--text-color-3);
        cursor: not-allowed;
        opacity: 0.7;
        
        &::placeholder {
          color: var(--text-color-3);
        }
      }
    }

		//모름 버튼
    .time-button {
      flex: 1; /* 4:1 비율을 위해 flex: 1 */
      background: var(--background-color-2);
      color: var(--text-color-1);
			border: 1px solid var(--border-color-1);
      border-radius: 8px;
      height: 48px; /* input과 동일한 높이 */
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;

			&.time-type-button {
				flex: 0.6; /* 4:1 비율을 위해 flex: 1 */
				font-size: 0.7rem;
			}
			&.active {
				color: var(--text-color-2);
        background: var(--background-color-1); // 활성화된 상태의 배경색
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
	
}

label {
  color: var(--text-color-1);
  font-weight: 500;
  font-size: 0.9rem;
  margin-left: 4px;
}

.custom-input {
  width: 100%;
  height: 48px;
  background: var(--background-color-2);
  color: var(--text-color-1);
  border: 1px solid var(--border-color-1);
  border-radius: 8px;
  padding: 0px 16px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: var(--text-color-1);
    opacity: 0.6;
  }

  &:focus {
    box-shadow: 0 0 0 1px var(--background-color-1);
  }

  &[type="date"],
  &[type="time"] {
    cursor: pointer;
    
    &::-webkit-calendar-picker-indicator {
      filter: invert(1);
      opacity: 0.6;
    }
  }
}

//운세확인하기 버튼튼
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

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
}

//결과지
.fortune-result {
  margin-top: 24px;
  margin-bottom: 48px;
  padding: 0 16px;

  .fortune-result-title {
    @include text-style-1;
    color: var(--text-color-1);
    text-align: center;
    margin-bottom: 24px;
  }

  .result-container {
    background: var(--background-color-4);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .result-image {
      width: 100%;
      aspect-ratio: 1;  // 정사각형 이미지
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 36px;
      display: flex; // 이미지 중앙 정렬을 위해 추가
      align-items: center; // 이미지 중앙 정렬을 위해 추가
      justify-content: center; // 이미지 중앙 정렬을 위해 추가

      img {
        width: 100%;
        height: 100%;
        object-fit: contain; // cover에서 contain으로 변경
        padding: 8px; // 이미지 주변 여백 추가
      }
    }

    .result-text {
      margin-top: 36px;

      .result-title {
        @include text-style-1;
        color: var(--text-color-1);
        margin-bottom: 16px;
        font-weight: 600;
      }

      .result-description {
        @include text-style-4;
        color: var(--text-color-1);
        line-height: 1.6;
        white-space: pre-line;  // 줄바꿈 유지
      }
    }
  }
}

// 공유 버튼 컨테이너 스타일
.share-buttons-container {
  padding: 48px 16px 16px; // 상단 24px, 하단 48px 여백
  display: flex;
  justify-content: center; // 중앙 정렬
  gap: 15px; // 아이콘 사이 간격

  .share-icon-circle {
    width: 50px;   // 원의 크기
    height: 50px;  // 원의 크기
    border-radius: 50%; // 원형으로 만듦
    background-color: var(--background-color-1); // 원의 배경색
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2); // 그림자 효과
    cursor: pointer; // 클릭 가능하게
    transition: all 0.3s ease; // 호버 효과 부드럽게

    &:hover {
      transform: translateY(-2px); // 살짝 위로 이동
      box-shadow: 0 6px 12px rgba(0,0,0,0.3); // 그림자 진하게
    }

    i {
      color: var(--text-color-2); // 아이콘 색상
      font-size: 1.5rem; // 아이콘 크기 (fa-xl 대신 직접 지정)
    }
  }
}
</style>


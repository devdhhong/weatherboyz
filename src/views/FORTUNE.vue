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
								<input type="number" v-model="birthtime" :disabled="isUnknown" placeholder="1626" class="custom-input birthtime-input">
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
            <button class="custom-button" @click="btnGetFortune" :disabled="isLoading">결과보기</button>
          </div>

					  <!-- 결과지 영역 -->
						<div class="fortune-result" v-if="showResult">
							<div class="result-container">
								<div class="result-image">
									<img src="https://img.freepik.com/free-vector/thermometers-hot-cold_78370-2406.jpg?semt=ais_items_boosted&w=740" alt="운세 결과 이미지" />
									<!-- <img :src="resultImage" alt="운세 결과 이미지" /> -->
								</div>
								<div class="result-text">
									<h3 class="result-title">결과지</h3>
									<!-- <h3 class="result-title">{{ resultTitle }}</h3> -->
									<p class="result-description">안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요</p>
									<!-- <p class="result-description">{{ resultDescription }}</p> -->
								</div>
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
import * as UTIL from "@/utils/UTIL.js";

let title = "오늘의 운세";
let name = "";
let birthdate = "";
let birthtime = "";
let isUnknown = ref(false); //모름 버튼 
let nameError = ref('');
let birthdateError = ref('');
let birthdateInfo = ref('');
let birthtimeError = ref('');
let isLunar = ref(false);
let isAM = ref(true);
let isLoading = ref(false);
let isRememberInfo = ref(false); //다음에 기억하기
let fortuneInfo = {
	name: "",
	birthdate: "",
	birthtime: "",
	birthtimeType: "",
};
let showResult = ref(true);


onMounted(() => {
	//저장해둔 정보가 있다면 초기셋팅
	fortuneInfo = JSON.parse(UTIL.getLocalStorageItem('fortuneInfo') || "{}");

	//이름
	if(fortuneInfo.name){
		name = fortuneInfo.name;
	}

	//생년월일
	if(fortuneInfo.birthdate){
		birthdate = fortuneInfo.birthdate;
	}

	//출생시간
	if(fortuneInfo.birthtime){
		birthtime = fortuneInfo.birthtime;
	}

	isUnknown.value = fortuneInfo.birthtime == "";
	isAM.value = fortuneInfo.birthtimeType == "AM";

});

const btnGetFortune = async function() {
	console.log("이름: "+ name);
	console.log("생년월일: "+ birthdate);
	console.log("출생시간: "+ birthtime);
	console.log("모름여부: "+ isUnknown.value);
	console.log("기억하기: "+ isRememberInfo.value);

	//에러메세지 초기화
	nameError.value = "";
	birthdateError.value = "";
	birthdateInfo.value = "";
	birthtimeError.value = "";

	//이름 체크
	if(!name.trim().length){
		nameError.value = "이름 또는 닉네임을 입력해주세요 ㅠㅠㅠ";
		return;
	}
	//생년월일 체크
	else if(!isValidBirthdate(birthdate)){
		birthdateError.value = "유효한 생년월일을 입력해주세요 ㅠㅠ";
		return;
	}
	//출생시간 체크
		else if(!isValidBirthtime(birthtime)){
		birthtimeError.value = "유효한 시간을 입력해주세요 ㅠㅠ";
		return;
	}

	//다음에 기억하기 설정 
	if(isRememberInfo.value){
		fortuneInfo = {
			name: name,
			birthdate: birthdate,
			birthtime: isUnknown ? "" : birthtime,
			birthtimeType: isAM ? "AM" : "PM",
		};
	}

	UTIL.setLocalStorageItem("myInfo", JSON.stringify(fortuneInfo));
	

	isLoading.value = true;

	setTimeout(() => {
		isLoading.value = false;
	}, 3000);

	// const prompt = `
	// 이름: ${name.value}
	// 생년월일: ${birthdate.value}
	// 출생시간: ${birthtime.value}
	
	// 위 정보를 바탕으로 오늘 하루의 운세를 3문단으로 알려줘. 건강, 인간관계, 행운 포인트도 포함해줘.
	// `;

	// console.log(import.meta.env.VITE_OPENAI_API_KEY)
	// const test = "안녕지피티 하이이";

	// const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
  //   },
  //   body: JSON.stringify({
  //     model: 'gpt-3.5-turbo',
  //     messages: [
  //       { role: 'user', content: test }
  //     ]
  //   })
  // })

  // const data = await response.json();
	// console.log(data.choices[0].message.content)
}

//모름 버튼 
function btnUnknown(){
	//버튼 active 토글
	isUnknown.value = !isUnknown.value;

	console.log(isUnknown.value)
	if(isUnknown.value){
		birthtime = "";
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
	
	let yyyymmdd = String(input).replace(/[^0-9]/g, '').trim();
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

	let hhmm = String(input).replace(/[^0-9]/g, '').trim();
	if (!regex.test(hhmm)) return false;

  return true;
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
  padding: 0 16px;

  .result-container {
    background: var(--background-color-3);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    .result-image {
      width: 100%;
      aspect-ratio: 1;  // 정사각형 이미지
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 16px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .result-text {
      .result-title {
        @include text-style-3;
        color: var(--text-color-1);
        margin-bottom: 8px;
        font-weight: 600;
      }

      .result-description {
        @include text-style-4;
        color: var(--text-color-2);
        line-height: 1.6;
        white-space: pre-line;  // 줄바꿈 유지
      }
    }
  }
}
</style>


<template>
  <div id="OptionView" class="scroll-area">
    <li class="settingItem">
      <div class="title" @click="isDownMemberTab = !isDownMemberTab">{{ $t('멤버') }} {{ $t('설정') }}<i class="fa-solid" :class="{ 'fa-caret-up' : !isDownMemberTab, 'fa-caret-down' : isDownMemberTab  }"></i></div>
      <select name="" class="" v-model="setMember" @change="changeSetting" v-show="isDownMemberTab">
        <option value="TBZ">{{ $t('랜덤') }} 📢</option>
        <option value="SY">{{ $t('상연') }} 🐶</option>
        <option value="JC">{{ $t('제이콥') }} 🍐</option>
        <option value="YH">{{ $t('영훈') }} 🍞</option>
        <option value="HJ">{{ $t('현재') }} 🎁</option>
        <option value="JY">{{ $t('주연') }} 🐱</option>
        <option value="KV">{{ $t('케빈') }} 🌙</option>
        <option value="NW">{{ $t('뉴') }} 🐧</option>
        <option value="QQ">{{ $t('큐') }} 🐿️</option>
        <option value="HN">{{ $t('학년') }} 🍊</option>
        <option value="SW">{{ $t('선우') }} ☀️</option>
        <option value="ER">{{ $t('에릭') }} 🦄</option>
      </select>
    </li>
    <li class="settingItem">
      <div class="title" @click="isDownThemeTab = !isDownThemeTab">{{ $t('테마') }} {{ $t('설정') }}<i class="fa-solid" :class="{ 'fa-caret-up' : !isDownThemeTab, 'fa-caret-down' : isDownThemeTab  }"></i></div>
      <select name="" class="" v-model="setTheme" @change="changeSetting" v-show="isDownThemeTab">
        <option value="default">🅱️ ver.</option>
        <option value="baby">🍼 ver.</option>
      </select>
    </li>
    <li class="settingItem">
      <div class="title" @click="isDownDisplayTab = !isDownDisplayTab">{{ $t('화면') }} {{ $t('설정') }}<i class="fa-solid" :class="{ 'fa-caret-up' : !isDownDisplayTab, 'fa-caret-down' : isDownDisplayTab  }"></i></div>
      <ul class="" v-show="isDownDisplayTab">
        <li> 
          <input id="r1" type="radio" name="display" value="light" v-model="setDisplay" @change="changeSetting"/>
          <label for="r1">{{ $t('라이트 모드') }}</label>
        </li>
        <li>
          <input id="r2" type="radio" name="display" value="dark" v-model="setDisplay" @change="changeSetting"/>
          <label for="r2">{{ $t('다크 모드') }}</label>
        </li>
      </ul>
    </li>
    <li class="settingItem">
      <div class="title" @click="isDownLanguageTab = !isDownLanguageTab">{{ $t('언어') }} {{ $t('설정') }}<i class="fa-solid" :class="{ 'fa-caret-up' : !isDownLanguageTab, 'fa-caret-down' : isDownLanguageTab  }"></i></div>
      <ul class="" v-show="isDownLanguageTab">
        <li> 
          <input id="r3" type="radio" name="language" value="ko" v-model="setLanguage" @change="changeSetting"/>
          <label for="r3">한국어</label>
        </li>
        <li>
          <input id="r4" type="radio" name="language" value="en" v-model="setLanguage" @change="changeSetting"/>
          <label for="r4">ENGLISH</label>
        </li>
        <li>
          <input id="r5" type="radio" name="language" value="jp" v-model="setLanguage" @change="changeSetting"/>
          <label for="r5">日本語</label>
        </li>
      </ul>
    </li>
    <li class="settingItem">
      <div class="title" @click="isDownShareTab = !isDownShareTab">{{ $t('공유 하기') }}<i class="fa-solid" :class="{ 'fa-caret-up' : !isDownShareTab, 'fa-caret-down' : isDownShareTab  }"></i></div>
      <ul class="" v-show="isDownShareTab">
        <li>
          <div class=""><i id="btnShareX" class="fa-solid fa-brands fa-xmark reverse" @click="btnShareX"></i></div>
          <div class=""><i id="btnShare" class="fa-solid fa-arrow-up-from-bracket reverse" @click="btnShare"></i></div>
        </li>
      </ul>
    </li>
    <li class="settingItem">
      <div class="title" @click="isDownQnaTab = !isDownQnaTab">{{ $t('문의 사항') }}<i class="fa-solid" :class="{ 'fa-caret-up' : !isDownQnaTab, 'fa-caret-down' : isDownQnaTab  }"></i></div>
      <ul class="" v-show="isDownQnaTab">
        <li>
          <div class="qna">이용하면서 가장 큰 불편함이 뭐야? 어디가서 말안할게..;;<br><span id="btnOpenX" @click="btnOpenX">@tbz_weatherboyz</span> 여기로 연락줘...</div> 
        </li>
      </ul>
    </li>
    <li class="settingItem">
      <div class="title" @click="isDownLicenseTab = !isDownLicenseTab">License<i class="fa-solid" :class="{ 'fa-caret-up' : !isDownLicenseTab, 'fa-caret-down' : isDownLicenseTab  }"></i></div>
      <ul class="" v-show="isDownLicenseTab">
        <li>
          <a href="https://www.flaticon.com/kr/free-icons/" title="메시지 아이콘">메시지 아이콘 제작자: winnievinzence - Flaticon</a>
        </li>
        <li>
          <a href="https://www.flaticon.com/kr/free-icons/" title="메시지 아이콘">메시지 아이콘 제작자: Freepik - Flaticon</a>
        </li>
        <li>
          <a href="http://osm.org/copyright">Data © OpenStreetMap contributors, ODbL 1.0.</a>
        </li>
      </ul>
    </li>
    <li class="settingItem copyRight">
      <p>© 2025 @tbz_weatherboyz. All rights reserved. {{ version }}</p>
    </li>
  </div>
</template>

<script setup lang="ts">

import * as UTIL from "@/utils/UTIL.js";
import { onBeforeMount, ref } from "vue";
import { useI18n } from "vue-i18n"; // i18n 인스턴스 가져오기

let setLanguage = UTIL.getLocalStorageItem('language') || "ko"; //ko or en
let setMember = UTIL.getLocalStorageItem('member') || "TBZ";
let setTheme = UTIL.getLocalStorageItem('theme') || "default";
let setDisplay = UTIL.getLocalStorageItem('display') || "dark"; //Light or Dark

let isDownMemberTab = ref(true); // 반응형 상태로 선언
let isDownThemeTab = ref(true); 
let isDownDisplayTab = ref(true);
let isDownLanguageTab = ref(true);
let isDownShareTab = ref(true);
let isDownQnaTab = ref(true); 
let isDownLicenseTab = ref(false);

let version = import.meta.env.VITE_DEPLOY_VERSION || "버전 정보 없음";

const { locale } = useI18n(); // i18n에서 locale을 가져옴

onBeforeMount(() => {
});

//옵션 변경
function changeSetting() {
  UTIL.setLocalStorageItem('language', setLanguage);
  UTIL.setLocalStorageItem('display', setDisplay);
  UTIL.setLocalStorageItem('member', setMember);
  UTIL.setLocalStorageItem('theme', setTheme);

  // 설정 초기화
  document.documentElement.classList.remove('dark-mode','light-mode'); //display
  document.documentElement.classList.remove('ko-mode', 'en-mode'); //language
  document.documentElement.classList.remove('default-mode', 'baby-mode'); //theme
  document.documentElement.classList.remove('TBZ-mode', 'SY-mode', 'JC-mode', 'YH-mode', 'HJ-mode', 'JY-mode', 'KV-mode', 'NW-mode', 'QQ-mode', 'HN-mode', 'SW-mode', 'ER-mode'); //member

  document.documentElement.classList.add(setDisplay + '-mode');
  document.documentElement.classList.add(setLanguage + '-mode');
  document.documentElement.classList.add(setMember + '-mode');
  document.documentElement.classList.add(setTheme + '-mode');

  locale.value = setLanguage; // 언어 변경
}

//공유하기 버튼
function btnShare() {
  let isAppYn = UTIL.getLocalStorageItem("isAppYn");
  let isAosYn = UTIL.getLocalStorageItem("isAosYn");

  //안드로이드
  if (isAppYn == "Y" && isAosYn == "Y") {
    window.Android.btnShare("weatherboyz! @tbz_weatherboyz");
  }
  //웹
  else {
    //Web Share API는 HTTPS 환경에서만 동작
    const btnShare = document.getElementById('btnShare');

    btnShare?.addEventListener('click', function () {
      if (navigator.share) {
        navigator.share({
          title: 'weatherboyz!',
          text: 'https://weatherboyz.netlify.app/',
          url: "https://weatherboyz.netlify.app/",
        });
      }
    });
  }
}

//트위터 공유하기
function btnShareX() {
  const btnShareX = document.getElementById('btnShareX');

  btnShareX?.addEventListener('click', function () {
    const text = encodeURIComponent('weatherboyz!\n');
    const url = encodeURIComponent('https://weatherboyz.netlify.app/' + '\n\n');
    const hashtags = encodeURIComponent('더보이즈,THEBOYZ'); // 해시태그 추가 가능
    const via = 'tbz_weatherboyz'; // 트위터 사용자 이름 (@ 없이)

    const twitterShareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}&via=${via}`;

    // 트위터 공유 URL로 이동
    window.open(twitterShareUrl, '_blank');
  });
}

//트위터 열기
function btnOpenX() {
  const btnOpenX = document.getElementById('btnOpenX');

  btnOpenX?.addEventListener('click', function () {
    // 연결하고 싶은 트위터 계정
    const twitterProfileUrl = "https://twitter.com/tbz_weatherboyz";

    // 새 창에서 트위터 프로필로 이동
    window.open(twitterProfileUrl, '_blank');
  });
}

</script>

<style lang="scss" scoped>
// @import "../scss/reset.scss";
@import "../scss/common.scss";
@import "../scss/theme.scss";

#OptionView {
  width: 100%;
  height: $option_height;
  position: fixed;
  top: $header_height;

  .settingItem {
    padding: 5% 7%;

    .title {
      @include left;
      @include text-style-1;
      color: var(--text-color-2);
      width: 100%;
      height: 40px;
      background-color: var(--background-color-1);
      padding-left: 4%;
      border-radius: 5px;
    }

    //라디오 버튼
    ul {
      margin: 16px;

      li {
        @include left;
        margin: 3% 0;

        .qna {
          @include text-style-5;
          color: var(--text-color-1);
        }

        span {
          @include text-style-5;
        }

        div {
          padding-right: 5%;
        }

        a {
          @include text-style-5;
          color: var(--text-color-1);
        }
      }
    }
  }

  //저작권 표기
  .copyRight {
    p {
      @include text-style-99;
      color: var(--text-color-1);
      text-align: right;
      margin-bottom: 5%;
    }
  }

  .fa-caret-down, .fa-caret-up {
    margin-left: 2%;
  }
}
</style>

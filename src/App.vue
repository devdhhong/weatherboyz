<template>
  <ion-app>
    <router-view/>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp } from '@ionic/vue';
import router from "@/router"; // 라우터 가져오기
import * as UTIL from "@/utils/UTIL.js";
// import ToastView from '@/components/ToastView.vue';

let isHideModal = UTIL.getLocalStorageItem('isHideModal') == "true";

setInit();

function setInit() {
  // 디바이스 정보
  if (window?.Android) {
    UTIL.setLocalStorageItem("isAppYn", "Y");
    UTIL.setLocalStorageItem("isAosYn", "N");

    window.Android.receiveLocation = function (latitude: Number, longitude: Number) {
    // window.receiveLocation = function (latitude, longitude) {
      //위치 정보 저장
      if (latitude && longitude) {
        UTIL.setLocalStorageItem("latitude", latitude);
        UTIL.setLocalStorageItem("longitude", longitude);
      }
      else {
        UTIL.setLocalStorageItem("latitude", 37.5276364);
        UTIL.setLocalStorageItem("longitude", 127.0344407);
      }

      writeLog("Lat: " + latitude + "Lon: " + longitude); // Vue 인스턴스의 메서드를 호출
    };
  }
  //테스트용
  else {
    UTIL.setLocalStorageItem("isAppYn", "N");
    UTIL.setLocalStorageItem("isAosYn", "N");

    UTIL.setLocalStorageItem("latitude", 37.5276364);
    UTIL.setLocalStorageItem("longitude", 127.0344407);
  }

  // 뷰포트 높이를 CSS 변수에 할당
  document.documentElement.style.setProperty('--viewport-height', getViewportHeight() + 'px');

  let setLanguage = UTIL.getLocalStorageItem('language') || "ko"; //ko or en
  let setDisplay = UTIL.getLocalStorageItem('display') || "light"; //Light or Dark
  let setMember = UTIL.getLocalStorageItem('member') || "TBZ";
  let setTheme = UTIL.getLocalStorageItem('theme') || "default";

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
}

// Android 인터페이스로 메세지 받기
function showToastFromAndroid(message: string) {
  window.Android.showToast(message); // Android 인터페이스 메서드 호출
}

// function showToast(message, type){
//   $refs.toast.showToast(message, type);
// }

function writeLog(message : string) {
  window.Android.writeLog("FROM JS", message);
}

/**
 * 아이폰 하단의 도구 막대때문에 뷰포트가 정상적으로 보이지 않는 현상 방지 
 */
// 뷰포트 높이 계산
function getViewportHeight() {
  var viewportHeight = window.innerHeight;

  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    let layoutRatio = window.outerHeight / window.innerHeight;
    let taskBarHeight = window.outerHeight - viewportHeight;
    viewportHeight = window.innerHeight * layoutRatio - taskBarHeight;
  }

  return viewportHeight;
}

</script>

<style lang="scss">
@import "./scss/reset.scss";
@import "./scss/common.scss";
@import "./scss/theme.scss";

html {
  // background-color: #aa3030;
}

.ion-page {
	background-color: #a07777;

	overflow-x: hidden; /* 기본적으로 가로 스크롤 방지 */
	display: flex;
	justify-content: center;
	align-items: flex-start;

	/* PC 및 태블릿에서 컨텐츠를 480px로 고정 */
	
	// /* 특정 크기 이하(375px 이하)에서 가로 스크롤 생성 */
	// @media (max-width: 375px) {
	// body {
	// 		overflow-x: auto;
	// }

	// .ion-page {
	// 		min-width: 375px;
	// }
	// }
}

@media (min-width: 540px) {
	.ion-page {
		max-width: 540px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}

	#MainView {
		background-color: #dfdfdf;
	}

}	

/* ✅ 특정 크기 이하(375px 이하)에서 가로 스크롤 생성 */
@media (max-width: 375px) {
    html, body {
        overflow-x: auto;
    }

    .ion-page {
        min-width: 375px;
    }
}

#MainView,
#SettingView,
#OOTDView {
  height: var(--viewport-height); // CSS 변수 사용
}
</style>

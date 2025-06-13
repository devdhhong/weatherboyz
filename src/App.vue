<template>
  <div class="app-container">
    <div class="mobile-frame">
      <ion-app>
        <router-view/>
      </ion-app>
    </div>
  </div>
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

#app {
  width: 100%;
  height: 100vh;
  height: -webkit-fill-available;
  background-color: var(--background-color-2);
  position: relative;
  overflow: hidden;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}

.app-container {
  width: 100%;
  height: 100vh;
  height: -webkit-fill-available;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-color-4);
}

.mobile-frame {
  width: 100%;
  max-width: 350px;
  // max-width: 414px;
  height: 100%;    
  height: -webkit-fill-available;
  margin: 0 auto;
  position: relative;
  background-color: var(--background-color-4);
	overflow: hidden;
  box-shadow: 0 0 20px var(--shadow-color-2);
  border-radius: 20px;
}

@media screen and (max-width: 768px) {
  .app-container {
    padding: 0;
  }
  
  .mobile-frame {
    max-width: none;
    border-radius: 0;
    box-shadow: none;
    background-color: var(--background-color-2);
  }
}

ion-app {
  width: 100%;
  height: 100%;
  height: -webkit-fill-available;
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--background-color-2);
}

#MainView,
#SettingView,
#OOTDView {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

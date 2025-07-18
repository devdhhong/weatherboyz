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
import { onMounted } from "vue";
import { IonApp } from '@ionic/vue';
import * as UTIL from "@/utils/UTIL.js";
import proj4 from "proj4";

onMounted(() => {
  //초기화
	setInit();

	//카카오 SDK 로드
  if (window.kakao && window.kakao.maps) return;

  const script = document.createElement('script');
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_API_KEY}&libraries=services&autoload=false`;
  script.async = true;
	script.onload = (res) => {
		console.log("KAKAO SDK LOADED !");
	}
  document.head.appendChild(script);
});

function setInit() {
	// 디바이스 정보
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const isAPP = (/\bwv\b/.test(userAgent) && /Android/.test(userAgent)) ||  // Android WebView
  (/iPhone|iPad|iPod/.test(userAgent) && !/Safari/.test(userAgent));  // iOS WebView 추정
	const isAOS = /android/i.test(userAgent);
	const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
	const isMobile = userAgent && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

	UTIL.setLocalStorageItem("isAppYn", isAPP ? "Y" : "N");
	UTIL.setLocalStorageItem("isAosYn", isAOS ? "Y" : "N");
	UTIL.setLocalStorageItem("isIosYn", isIOS ? "Y" : "N");
	UTIL.setLocalStorageItem("isMobileYn", isMobile ? "Y" : "N");
 
	//웹
	if(!isAPP){
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const lat = position.coords.latitude;
					const lon = position.coords.longitude;

          // 대한민국 위경도 범위: 위도 33~39, 경도 124~132
          const isKorea = lat >= 33 && lat <= 39 && lon >= 124 && lon <= 132;
          if (isKorea) {
            UTIL.setLocalStorageItem("latitude", lat);
            UTIL.setLocalStorageItem("longitude", lon);
          } else {
            //서울시청
            UTIL.setLocalStorageItem("latitude", "37.5665");
            UTIL.setLocalStorageItem("longitude", "126.9780");
          }
				},
				(error) => {
          console.log(error);
				}
			);
		} 
		else {
			console.error("⭐⭐⭐⭐⭐ 위치 정보 제공안함");

      //서울시청
      UTIL.setLocalStorageItem("latitude", "37.5665");
      UTIL.setLocalStorageItem("longitude", "126.9780");
		}
	}
	//앱
	else{
    //AOS
		if (isAOS) {
			window.Android.receiveLocation = function (latitude: Number, longitude: Number) {
				//위치 정보 저장
				if (latitude && longitude) {
					UTIL.setLocalStorageItem("latitude", latitude);
					UTIL.setLocalStorageItem("longitude", longitude);
				}
				else {
          //완주고등학교
          UTIL.setLocalStorageItem("latitude", "35.9412417");
					UTIL.setLocalStorageItem("longitude", "127.1672728");
				}

				writeLog("Lat: " + latitude + "Lon: " + longitude); // Vue 인스턴스의 메서드를 호출
			};
		}
    //IOS
		else if (isIOS) {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const lat = position.coords.latitude;
						const lon = position.coords.longitude;

            // 대한민국 위경도 범위: 위도 33~39, 경도 124~132
            const isKorea = lat >= 33 && lat <= 39 && lon >= 124 && lon <= 132;
            if (isKorea) {
              UTIL.setLocalStorageItem("latitude", lat);
              UTIL.setLocalStorageItem("longitude", lon);
            } else {
              //서울시청
              UTIL.setLocalStorageItem("latitude", "37.5665");
              UTIL.setLocalStorageItem("longitude", "126.9780");
            }
          },
					(error) => {
            console.log(error);
          }
				);
			} 
			else {
				console.error("⭐⭐⭐⭐⭐ 위치 정보를 제공안함");
        
        //서울시청
        UTIL.setLocalStorageItem("latitude", "37.5665");
        UTIL.setLocalStorageItem("longitude", "126.9780");
			}
		}
	}

  // 뷰포트 높이를 CSS 변수에 할당
  document.documentElement.style.setProperty('--viewport-height', getViewportHeight() + 'px');

  const setLanguage = UTIL.getLocalStorageItem('language') || "ko"; //ko or en
  const setDisplay = UTIL.getLocalStorageItem('display') || "light"; //Light or Dark
  const setMember = UTIL.getLocalStorageItem('member') || "TBZ";
  const setTheme = UTIL.getLocalStorageItem('theme') || "default";

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

function writeLog(message : string) {
  window.Android.writeLog("FROM JS", message);
}

/**
 * 아이폰 하단의 도구 막대때문에 뷰포트가 정상적으로 보이지 않는 현상 방지 
 */
// 뷰포트 높이 계산
function getViewportHeight() {
  let viewportHeight = window.innerHeight;

  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    const layoutRatio = window.outerHeight / window.innerHeight;
    const taskBarHeight = window.outerHeight - viewportHeight;
    viewportHeight = window.innerHeight * layoutRatio - taskBarHeight;
  }

  return viewportHeight;
}

</script>

<style lang="scss">
@use "./scss/common.scss" as *;
@use "./scss/reset.scss" as *;
@use "./scss/theme.scss" as *;

#app {
  width: 100%;
  height: 100vh;
  height: -webkit-fill-available;
  background-color: var(--background-color-2);
  position: relative;
  overflow: hidden;
  padding: env(safe-area-inset-top) 0 0 0;
  // padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
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
#SettingView {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

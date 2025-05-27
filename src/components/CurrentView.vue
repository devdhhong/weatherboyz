<template>
  <div id="CurrentView">
    <div class="infoView">
        <div class="temperature">
          <img :src="weatherIcon" alt="" />
          <p>{{ temperature }}{{ $t('도') }}</p>
        </div>
        <div class="weatherInfo">
          <div class="feelTemp">{{ $t('체감온도') }} : {{ apparent_temperature }}도</div>
          <div class="fineDust">{{ $t('미세먼지') }}: {{ pm10 }}</div>
          <div class="ultraFineDust">{{ $t('초미세먼지') }}: {{ pm2_5 }}</div>
        </div>
    </div>
    <div class="infoView" @click="openYoutubeMusic">
      <div>{{ $t('오늘의 노래') }} 🎹</div>
      <div class="songCover">
        <img :src="todayMusicData?.coverImgPath" alt=""/>
      </div>
      <!-- <div class="songTitle">{{ todayMusicData?.musicTitle }}</div> -->
    </div>
  </div>
  <div id="MessageView">
    <p class="blinking">{{ mainMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from "vue";
import * as UTIL from "@/utils/UTIL.js";
import { onMounted } from "vue";
import moment from "moment";

let weatherIcon = "";          //날씨 아이콘
let temperature = 0;           //온도
let apparent_temperature = 0;  //체감온도
let pm10 = "";                 //미세먼지
let pm2_5 = "";                //초미세먼지
let mainMsg = "";              //메인화면 메세지
let todayMusicData: Music;
let airQuality: AirQuality;
let weather: Weather;

let props = defineProps(["isFetchedData"]);

watch(() => props.isFetchedData, (newValue) => {
    //데이터 모두 받은 후에 파싱 처리
    if (newValue) {
      initData();
   }
  }
);

onMounted(() => {
  // onBeforeMount(() => {
  initData();
});

function initData(){
  if(UTIL.getLocalStorageItem('weather') && UTIL.getLocalStorageItem('airQuality')){
    //날씨 정보
    weather = JSON.parse(UTIL.getLocalStorageItem('weather'));
    temperature = Math.round(weather.current.temperature);
    apparent_temperature = Math.round(weather.current.apparent_temperature);
    weatherIcon = UTIL.getWeatherIcon(weather.current.weather_code, moment(new Date()).format("HHmm"));

    //미세먼지 정보
    airQuality = JSON.parse(UTIL.getLocalStorageItem('airQuality'));
    pm10 = UTIL.getAirQualityStatus(airQuality.current.pm10, airQuality.current.pm2_5)[0];
    pm2_5 = UTIL.getAirQualityStatus(airQuality.current.pm10, airQuality.current.pm2_5)[1];
    
    //오늘의 정보
    todayMusicData = UTIL.getTodayMusic();
    
    //메세지
    mainMsg = UTIL.getMainMsg();
  }
}


function openYoutubeMusic() {
  let isAppYn = localStorage.getItem("isAppYn");
  let isAosYn = localStorage.getItem("isAosYn");

  //안드로이드
  if (isAppYn == "Y" && isAosYn == "Y") {
    window.Android.openOtherApp("youtube-music://song?id=" + todayMusicData.songId, "market://details?id=com.google.android.apps.youtube.music");
  }
  //웹
  else {
    const url = "https://music.youtube.com/watch?v=" + todayMusicData.songId;
    window.open(url, '_blank');
  }
}

</script>

<style lang="scss" scoped>
@import "../scss/common.scss";
@import "../scss/reset.scss";
@import "../scss/theme.scss";

// 정보 영역
#CurrentView {
  @include center-sb;
  width: 100%;
  height: $current_height;
  position: fixed;
  top: $header_height;

  .infoView {
    padding: 3%;
    height: 100%;
    flex: 1;
    box-sizing: border-box;
    border-radius: 15px;
    margin: 0 5%;
    background-color: var(--background-color-3);
  }

  // 날씨
  .infoView:nth-child(1) {
    .temperature {
      @include left;
      width: 100%;
      height: 30%;

      img {
        height: 100%;
      }

      p {
        @include text-style-2;
        color: var(--text-color-1);
      }
    }

    .weatherInfo {
      width: 100%;
      height: 70%;
      padding-top: 5%;

      div {
        @include text-style-4;
        color: var(--text-color-1);
        padding-left: 3%;
      }
    }
  }

  // 오늘의 추천곡
  .infoView:nth-child(2) {
    margin-left: 0%;

    div {
      @include center;
    }

    //타이틀
    div:nth-child(1) {
      @include text-style-3;
      color: var(--text-color-1);
      width: 100%;
      height: 10%;
    }

    //앨범커버
    div:nth-child(2) {
      width: 100%;
      height: 80%;
      padding: 5% 0%;
			margin-top: 10%;

      img {
        height: 100%;
        border-radius: 5%;
      }
    }

    //노래명
    .songTitle {
      @include text-style-4;
      color: var(--text-color-1);
      width: 100%;
      height: auto;
      min-height: 10%;
      word-wrap: break-word;
      text-align: center;
      padding: 0 5%;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  }
}

@media screen and (max-width: 344px) {
  #CurrentView {
    .infoView:nth-child(1) {
      .temperature {
        p {
          font-size: 1.6rem !important;
        }
      }
    }
  }
}

// 이벤트 메세지
#MessageView {
  @include center;
  width: 100%;
  height: $message_height;
  position: fixed;
  top: $header_height + $current_height;

  p {
    @include text-style-3;
    color: var(--text-color-1);
  }
}
</style>

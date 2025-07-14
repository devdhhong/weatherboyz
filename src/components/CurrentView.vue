<template>
  <div id="CurrentView">
    <!-- 스켈레톤 UI -->
    <div class="infoView" v-show="props.isGetReverseGeocode && props.isGetWeather && props.isGetAirQuality">
      <div class="temperature">
        <img :src="weatherIcon" alt="" />
        <p>{{ weatherNow?.temperature }}{{ $t('도') }}</p>
      </div>
      <div class="weatherInfo">
        <!-- <div class="feelTemp">{{ $t('체감온도') }} : {{ apparent_temperature }}{{ $t('도') }}</div> -->
        <div class="fineDust">{{ $t('습도') }}: {{ weatherNow?.humidity }}%</div>
        <div class="fineDust">{{ $t('미세먼지') }}: {{ pm10Grade }}</div>
        <!-- <div class="ultraFineDust">{{ $t('초미세먼지') }}: {{ $t(pm2_5) }}</div> -->
      </div>
    </div>
    <div class="infoView loading" v-show="!(props.isGetReverseGeocode && props.isGetWeather && props.isGetAirQuality)">
      <img src="../../public/images/loading_circle_small.gif" alt="">
    </div>

    <div class="infoView" v-show="props.isGetSpotifyToken && isAlbumImageLoaded" @click="openSpotify">
      <div>{{ $t('오늘의 노래') }} 🎹</div>
      <div class="songCover">
        <img :src="musicData?.album?.images[0].url" alt="" @load="albumImageLoaded"/>
      </div>
      <!-- <div class="songTitle">{{ todayMusicData?.musicTitle }}</div> -->
    </div>
    <div class="infoView loading" v-show="!props.isGetSpotifyToken || !isAlbumImageLoaded">
      <img src="../../public/images/loading_circle_small.gif" alt="">
    </div>
  </div>
  <div id="MessageView">
    <p>{{ mainMsg }}</p>
    <!-- <p class="blinking">{{ mainMsg }}</p> -->
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import * as UTIL from "@/utils/UTIL.js";
import { onMounted } from "vue";
import moment from "moment";

const weatherIcon = ref(""); //날씨 아이콘
const weatherNow = ref<WeatherNow | null>(null);
const airQuality = ref<AirQuality | null>(null);
const pm10Grade = ref(""); 

const musicData = ref<SpotifyMusic | null>(null);
const isAlbumImageLoaded = ref(false); // 앨범 이미지 로드 상태
const props = defineProps(["isGetReverseGeocode", "isGetWeather", "isGetAirQuality", "isGetSpotifyToken"]);

watch(() => props.isGetReverseGeocode && props.isGetWeather && props.isGetAirQuality && props.isGetSpotifyToken, (newValue) => {
    //데이터 모두 받은 후에 파싱 처리
    if (newValue) {
      initData();
    }
  }
);

onMounted(() => {
  //데이터 초기화
  initData();

	//플레이리스트 정보 조회
  getPlaylist();
});

//초기화
function initData(){
  //날씨 정보
  weatherNow.value = JSON.parse(UTIL.getLocalStorageItem('weatherNow')) || {};
  
  weatherIcon.value = UTIL.getWeatherIcon();
  
  //대기 정보
  airQuality.value = JSON.parse(UTIL.getLocalStorageItem('airQuality')) || {};

  pm10Grade.value = UTIL.getAirQualityStatus();

  //메세지
  // mainMsg = UTIL.getMainMsg();
}

//스포티파이 앱 실행
function openSpotify() {
  const isAppYn = localStorage.getItem("isAppYn");
  const isAosYn = localStorage.getItem("isAosYn");

  //안드로이드
  if (isAppYn == "Y" && isAosYn == "Y") {
    // window.Android.openOtherApp("youtube-music://song?id=" + todayMusicData.songId, "market://details?id=com.google.android.apps.youtube.music");
  }
  //웹
  else {
    const url = "https://open.spotify.com/playlist/7zSjrTEw9wkuIB24dr0I6V?si=hw6b_ZmlQUmoTBUaiyVCdQ";
    window.open(url, '_blank');
  }
}

//플레이리스트 정보 조회
async function getPlaylist() {	
	// 스포티파이 토큰발급 
	await UTIL.getSpotifyToken();

  const playlistId = "7zSjrTEw9wkuIB24dr0I6V";

  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${UTIL.getLocalStorageItem('access_token')}`, // 유효한 토큰
      },
    }
  );

  const data = await response.json();
  musicData.value = data.items[0].track;
}

//이미지 로드 완료
function albumImageLoaded(){
  isAlbumImageLoaded.value = true;
}

</script>

<style lang="scss" scoped>
@use "../scss/common.scss" as *;
@use "../scss/reset.scss" as *;
@use "../scss/theme.scss" as *;

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
		box-shadow: 1px 1px 20px var(--shadow-color-1);
  }

  // 날씨
  .infoView:not(.loading):nth-child(1) {
    .temperature {
      @include left;
      width: 100%;
      height: 30%;

      img {
				width: 55px;
        height: 55px;
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
  .infoView:not(.loading):nth-child(3) {
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
    @include text-style-4;
    color: var(--text-color-1);
  }
}
</style>

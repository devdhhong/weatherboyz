import moment from "moment";
import * as CONST from "@/utils/CONST";
import MUSIC_LIST from "@/assets/data/MUSIC";
import axios from "axios";

const getLocalStorageItem = function(key: string): string {
  const value = localStorage.getItem(key);
  return value !== null ? value : "";
}

const setLocalStorageItem = function(key: string, value: any) {
  if(typeof value == "object"){
    localStorage.setItem(key, JSON.stringify(value) || ""); 
  }
  else{
    localStorage.setItem(key, value || ""); 
  }
}

// 날씨 아이콘 이미지 경로 조회
const getWeatherIcon = function (code: number, time: string) {
  let weather = JSON.parse(getLocalStorageItem("weather"));
  let sunrise = Number(moment(weather.daily.sunrise[0]).format("HHmm")); //일출시간
  let sunset = Number(moment(weather.daily.sunset[0]).format("HHmm")); //일몰시간
  let hhmm = Number(time); //현재시간
  
  let url = ""; //아이콘 이미지 경로
  const pad = 0; //시간 허용 범위

  //맑음
  if ([0, 1].indexOf(code) > -1) {
    if (hhmm < (sunrise - pad) || hhmm > (sunset + pad)) {
      //밤
      url = "SUNNY_NIGHT";
    }
    else if (Math.abs(sunrise - hhmm) < pad) {
      //일출
      url = "SUNNY_SUNRISE";
    }
    else if (Math.abs(sunset - hhmm) < pad) {
      //일몰
      url = "SUNNY_SUNSET";
    }
    else {
      //낮
      url = "SUNNY_DAY";
    }
  }
  //흐림
  else if ([2, 3].indexOf(code) > -1) {
    url = "CLOUDY";
  }
  //약한 비
  else if ([51, 56, 61, 80].indexOf(code) > -1) {
    url = "RAINY_LIHGT";
  }
  //보통 비
  else if ([53, 63, 81].indexOf(code) > -1) {
    url = "RAINY_NORMAL";
  }
  //강한 비
  else if ([55, 57, 65, 67, 82].indexOf(code) > -1) {
    url = "RAINY_HEAVY";
  }
  //천둥번개
  else if ([95, 96, 99].indexOf(code) > -1) {
    url = "THUNDER";
  }
  //눈
  else if ([71, 73, 77, 85].indexOf(code) > -1) {
    url = "SNOWY_LIGHT";
  }
  //폭설
  else if ([75, 86].indexOf(code) > -1) {
    url = "SNOW_HEAVY";
  }
  //안개
  else if ([45, 48].indexOf(code) > -1) {
    url = "FOGGY";
  }
  //그 외
  else {
    url = "SUNNY_DAY";
  }

  return "/images/WEATHER/"+ url + ".png";
};

//미세먼지 상태 조회 
const getAirQualityStatus = function (degree1: number, degree2: number) {
  let pm10 = ""; //미세먼지
  let pm2_5 = ""; //초미세먼지

  //대한민국 기준
  if (degree1 <= 30) { pm10 = "좋음"; }
  else if (degree1 <= 80) { pm10 = "보통"; }
  else if (degree1 <= 150) { pm10 = "나쁨"; }
  else { pm10 = "매우나쁨"; }

  if (degree2 <= 15) { pm2_5 = "좋음"; }
  else if (degree2 <= 35) { pm2_5 = "보통"; }
  else if (degree2 <= 75) { pm2_5 = "나쁨"; }
  else { pm2_5 = "매우나쁨"; }

  return [pm10, pm2_5];
};

//메인화면 메세지 조회
const getMainMsg = function () {
  let msg = "";
  let MMDD = moment().format("MMDD");
  let hhmm = moment().format("hhmm");
  let hhmm24 = moment().format("HHmm");

  let birthday = ["1104", "0530", "0808", "0917", "0115", "0223", "0426", "1105", "0309", "0412", "1222", "1206", "0403"];
  let weather = JSON.parse(getLocalStorageItem("weather"));
  let airQuality = JSON.parse(getLocalStorageItem("airQuality"));

  //평균량
  let rain_6hours = (weather.hourly.rain.slice(0, 6).reduce((acc: number, num: number) => acc + num, 0)) / 6;
  let showers_6hours = (weather.hourly.showers.slice(0, 6).reduce((acc: number, num: number) => acc + num, 0)) / 6;
  let snowfall_6hours = (weather.hourly.snowfall.slice(0, 6).reduce((acc: number, num: number) => acc + num, 0)) / 6;
  let temp_6hours = (weather.hourly.temperature.slice(0, 6).reduce((acc: number, num: number) => acc + num, 0)) / 6;

  let pm10 = airQuality.current.pm10;
  let pm2_5 = airQuality.current.pm2_5;

  //날짜 관련
  //시간
  if (birthday.indexOf(hhmm) > -1) {
    if (hhmm == "1104") {
      msg = "🐶 상연시 🐶";
    }
    else if (hhmm == "0530") {
      msg = "🍐 제이콥시 🍐";
    }
    else if (hhmm == "0808") {
      msg = "🍞 영훈시 🍞";
    }
    else if (hhmm == "0917") {
      msg = "🎁 현재시 🎁";
    }
    else if (hhmm == "0115") {
      msg = "🐱 주연시 🐱";
    }
    else if (hhmm == "0223") {
      msg = "🌙 케빈시 🌙";
    }
    else if (hhmm == "0426") {
      msg = "🐧 차니시 🐧";
    }
    else if (hhmm == "1105") {
      msg = "🐿️ 창민시 🐿️";
    }
    else if (hhmm == "0309") {
      msg = " 🍊 학년시 🍊";
    }
    else if (hhmm == "0412") {
      msg = "☀️ 선우시 ☀️";
    }
    else if (hhmm == "1222") {
      msg = "🦄 영재시 🦄";
    }
  }
  //생일
  else if (birthday.indexOf(MMDD) > -1) {
    if (MMDD == "1104") {
      msg = "🎉 🎂 🥳 HAPPY 상연 BIRTHDAY 🥳 🎂 🎉";
    }
    else if (MMDD == "0530") {
      msg = "🎉 🎂 🥳 HAPPY 제이콥 BIRTHDAY 🥳 🎂 🎉";
    }
    else if (MMDD == "0808") {
      msg = "🎉 🎂 🥳 HAPPY 영훈 BIRTHDAY 🥳 🎂 🎉";
    }
    else if (MMDD == "0917") {
      msg = "🎉 🎂 🥳 HAPPY 현재 BIRTHDAY 🥳 🎂 🎉";
    }
    else if (MMDD == "0115") {
      msg = "🎉 🎂 🥳 HAPPY 주연 BIRTHDAY 🥳 🎂 🎉";
    }
    else if (MMDD == "0223") {
      msg = "🎉 🎂 🥳 HAPPY 케빈 BIRTHDAY 🥳 🎂 🎉";
    }
    else if (MMDD == "0426") {
      msg = "🎉 🎂 🥳 HAPPY 뉴 BIRTHDAY 🥳 🎂 🎉";
    }
    else if (MMDD == "1105") {
      msg = "🎉 🎂 🥳 HAPPY 큐 BIRTHDAY 🥳 🎂 🎉";
    }
    else if (MMDD == "0309") {
      msg = "🎉 🎂 🥳 HAPPY 학년 BIRTHDAY 🥳 🎂 🎉";
    }
    else if (MMDD == "0412") {
      msg = "🎉 🎂 🥳 HAPPY 선우 BIRTHDAY 🥳 🎂 🎉";
    }
    else if (MMDD == "1222") {
      msg = "🎉 🎂 🥳 HAPPY 에릭 BIRTHDAY 🥳 🎂 🎉";
    }
    else if (MMDD == "1206") {
      msg = "🎉 🎂 🥳 HAPPY 더보이즈 BIRTHDAY 🥳 🎂 🎉";
    }
    else if (MMDD == "0403") {
      msg = "🎉 🎂 🥳 HAPPY 더비 BIRTHDAY 🥳 🎂 🎉";
    }
  }
  //정기 이벤트
  else if (MMDD == "0101") {
    msg = "Happy New Year 🧧";
  }
  else if (MMDD == "1225") {
    msg = "Merry Christmas 🎄 🎅🏻 ⛄️";
  }
  //날씨 관련
  else if (rain_6hours || showers_6hours) {
    msg = "☔️ 더러분 우산 챙기세요 ☔️";
  }
  else if (snowfall_6hours) {
    msg = "❄️ 더러분 우산 챙기세요 ❄️";
  }
  else if (pm10 > 80 || pm2_5 > 35) {
    msg = "😷 더러분 마스크 챙기세요 😷";
  }
  else if (temp_6hours > 28) {
    msg = "🌀 더러분 손풍기 챙기세요 🌀";
  }
  else if (temp_6hours > 33) {
    msg = "🔥 폭 염 주 의 🔥";
  }
  else if (temp_6hours < 0) {
    msg = "🧣 더러분 목도리 챙기세요 🧣";
  }
  else if (temp_6hours < -10) {
    msg = "🥶 한 파 주 의 🥶";
  }
  else if (weather.current.uv_index > 5) {
    msg = " ☀️ 더러분 양산 챙기세요 ☀️";
  }
  //기타
  else {
    // msg = "🕯️";
		const targetDate = moment("2025-03-17", "YYYY-MM-DD");
		const diffDay = targetDate.diff(moment(), "days");

		if(Number(diffDay) > 0){
			msg = "⭐ 정규 3집 Unexpected 컴백 D-" + diffDay + " ⭐";
		}
		else if(Number(diffDay) == 0){
			msg = "⭐ 정규 3집 Unexpected 컴백 D-DAY ⭐";
		} 
		else{
			msg = "⭐ 정규 3집 Unexpected 컴백 D+" + diffDay + " ⭐";
		}
    // msg = "🐶 🍐 🍞 🎁 🐱 🌙 🐧 🐿️ 🍊 ☀️ 🦄";
  }

  return msg;
};

// 날씨 메인 이미지 경로 조회
const getWeatherMain = function (code: number, member: string) {
  let theme = getLocalStorageItem("theme") || "";

  // //맑음
  // if ([0, 1].indexOf(code) > -1) {
  //   status = "CLEAR";
  // }
  // //흐림
  // else if ([2, 3].indexOf(code) > -1) {
  //   status = "CLOUD";
  // }
  // //약한 비
  // else if ([51, 56, 61, 80].indexOf(code) > -1) {
  //   status = "LIGHT_RAIN";
  // }
  // //보통 비
  // else if ([53, 63, 81].indexOf(code) > -1) {
  //   status = "LIGHT_RAIN";
  // }
  // //강한 비
  // else if ([55, 57, 65, 67, 82].indexOf(code) > -1) {
  //   status = "HEAVY_RAIN";
  // }
  // //그 외
  // else {
  //   status = "CLOUD";
  // }

  return "/images/THEME/" + theme + "/" + member + ".jpg";
}

// 오늘의 노래 조회
const getTodayMusic = function () {
  let mmdd = moment().format("MMDD");
  let mm = moment().format("MM");
  let dd = moment().format("DD");

  // let minTemp = weather.daily.temperature_2m_min;
  // let maxTemp = weather.daily.temperature_2m_max;
  // let dailyTemp = [...minTemp, ...maxTemp];
  // let avgDailyTemp = dailyTemp.reduce((acc, cur) => acc + cur, 0) / (minTemp.length + maxTemp.length);

  let season = "";
  //봄 (3,4,5)
  if ([3, 4, 5].indexOf(Number(mm)) > -1) {
    season = "spring";
  }
  //여름(6,7,8)
  else if ([6, 7, 8].indexOf(Number(mm)) > -1) {
    season = "summer";
  }
  //가을(9,10,11)
  else if ([9, 10, 11].indexOf(Number(mm)) > -1) {
    season = "autumn";
  }
  //겨울(10,11,12)
  else {
    season = "winter";
  }

  //특정 일자 
  if (MUSIC_LIST[mmdd]) {
    return MUSIC_LIST[mmdd][0];
  }
	else {
		let list = MUSIC_LIST[season] || [];
    let index = (Number(dd) - 1) % list.length;
    return list[index];
  }
};

// 역지오코딩
const getReverseGeocode = async function () {
  try {
    // axios.get()는 Promise를 반환
    const response = await axios.get(`${CONST.NOMINATIM_BASE_URL}reverse`, {
      params: {
        latitude: getLocalStorageItem('latitude'),
        longitude: getLocalStorageItem('longitude'),
        lat: getLocalStorageItem('latitude'),
        lon: getLocalStorageItem('longitude'),
        format: "json",
        // addressdetails: 1,
      }
    });

    setLocalStorageItem("address", response.data); // 성공적으로 받아온 데이터 저장

  } catch (error) {
    console.error('Error occurred while fetching air quality:', error);
    throw error; // 상위 호출부로 에러 전달
  }
};

// 날씨정보 조회
const getWeather = async function () {
  try {
    // axios.get()는 Promise를 반환
    const response = await axios.get(`${CONST.NOW_FORECAST_URL}`, {
      params: {
        latitude: getLocalStorageItem('latitude'),
        longitude: getLocalStorageItem('longitude'),
        hourly: "temperature,showers,rain,snowfall,weather_code",
        current: "rain,temperature,apparent_temperature,weather_code",
        daily: "sunrise,sunset,temperature_2m_max,temperature_2m_min",
        forecast_hours: "25",
        timezone: "auto"
      }
    });

    setLocalStorageItem("weather", response.data); // 성공적으로 받아온 데이터 저장

  } catch (error) {
    console.error('Error occurred while fetching air quality:', error);
    throw error; // 상위 호출부로 에러 전달
  }
};

// 대기정보 조회
const getAirQuality = async function () {
  try {
    // axios.get()는 Promise를 반환
    const response = await axios.get(`${CONST.NOW_AIRQUALITY_URL}`, {
      params: {
        latitude: getLocalStorageItem('latitude'),
        longitude: getLocalStorageItem('longitude'),
        current: "pm10,pm2_5,uv_index"
      }
    });

    setLocalStorageItem("airQuality", response.data); // 성공적으로 받아온 데이터 저장

  } catch (error) {
    console.error('Error occurred while fetching air quality:', error);
    throw error; // 상위 호출부로 에러 전달
  }
};

export {
  getLocalStorageItem,
  setLocalStorageItem,
  getWeatherIcon,
  getAirQualityStatus,
  getMainMsg,
  getWeatherMain,
  getTodayMusic,
  getReverseGeocode,
  getWeather,
  getAirQuality
};

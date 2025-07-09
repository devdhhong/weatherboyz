import moment from "moment";
import * as CONST from "@/utils/CONST";
import axios from "axios";

//로컬스토리지 GET
const getLocalStorageItem = function(key: string): string {
  const value = localStorage.getItem(key);
  return value !== null ? value : "";
}

//로컬스토리지 SET
const setLocalStorageItem = function(key: string, value: any) {
  if(typeof value == "object"){
    localStorage.setItem(key, JSON.stringify(value) || ""); 
  }
  else{
    localStorage.setItem(key, value || ""); 
  }
}

// 날씨 아이콘 이미지 경로 조회
const getWeatherIcon = function () {
  const weatherNow = JSON.parse(getLocalStorageItem("weatherNow"));
  const sunrise = Number("0600"); //일출시간
  const sunset = Number("1800"); //일몰시간
  const HHmm = Number(moment().format("HHmm")); //현재시간
  
  let url = ""; //아이콘 이미지 경로

  const precipType = weatherNow.precipType;
  const skyCondition = weatherNow.skyCondition;

  //비
  if(precipType == '1'){
    url = "rainy_normal";
  }
  // 눈비
  else if(precipType == '2'){
    url = "rainy_normal";
  }
  // 눈
  else if(precipType == '3'){
    url = "snowy_normal";
  }
  // 소나기
  else if(precipType == '4'){
    url = "rainy_normal";
  }
  // 맑음
  else if(skyCondition == '1'){
    //밤
    if(HHmm > (sunset + 100) || HHmm < (sunrise - 100)){
      url = "sunny_night";
    }
    //일출
    else if(HHmm > (sunrise - 100) && HHmm < (sunrise + 100)){
      url = "sunny_sunrise";
    }
    //일몰
    else if(HHmm > (sunset - 100) && HHmm < (sunset + 100)){
      url = "sunny_sunset";
    }
    //낮
    else {
      url = "sunny_day";
    }
  }
  else {
    url = "cloudy";
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
  const MMDD = moment().format("MMDD");
  const hhmm = moment().format("hhmm");
  // const hhmm24 = moment().format("HHmm");

  const birthday = ["1104", "0530", "0808", "0917", "0115", "0223", "0426", "1105", "0412", "1222", "1206", "0403"];
  const weather = JSON.parse(getLocalStorageItem("weather"));
  const airQuality = JSON.parse(getLocalStorageItem("airQuality"));

  //평균량
  const rain_6hours = (weather.hourly.rain.slice(0, 6).reduce((acc: number, num: number) => acc + num, 0)) / 6;
  const showers_6hours = (weather.hourly.showers.slice(0, 6).reduce((acc: number, num: number) => acc + num, 0)) / 6;
  const snowfall_6hours = (weather.hourly.snowfall.slice(0, 6).reduce((acc: number, num: number) => acc + num, 0)) / 6;
  const temp_6hours = (weather.hourly.temperature.slice(0, 6).reduce((acc: number, num: number) => acc + num, 0)) / 6;

  const pm10 = airQuality.current.pm10;
  const pm2_5 = airQuality.current.pm2_5;

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
		const targetDate = moment("2025-08-08", "YYYY-MM-DD");
		const diffDay = targetDate.diff(moment(), "days");

		if(Number(diffDay) > 0){
			msg = "🔥〈THE BLAZE WORLD TOUR in SEOUL D-" + diffDay + " 🔥";
		}
		else if(Number(diffDay) == 0){
			msg = "🔥〈THE BLAZE WORLD TOUR in SEOUL D-DAY" + diffDay + " 🔥";
		} 
		else{
			msg = "🔥〈THE BLAZE〉WORLD TOUR in SEOUL D+" + diffDay + " 🔥";
		}
    // msg = "🐶 🍐 🍞 🎁 🐱 🌙 🐧 🐿️ ☀️ 🦄";
  }

  return msg;
};

// 날씨 메인 이미지 경로 조회
const getWeatherMain = function (code: number, member: string) {
  const theme = getLocalStorageItem("theme") || "";

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

// 역지오코딩
const getReverseGeocode = async function () {
	//SDK 로드여부 체크
	const waitingLoad = () => {
		return new Promise<void>((resolve) => {
			const isLoaded = function(){
				if(window.kakao && window.kakao.maps){
					resolve();
				}
				else{
					setTimeout(isLoaded, 100);
				}
			}
			isLoaded();
		});
	}
	waitingLoad();

	window.kakao.maps.load(() => {
		const geocoder = new window.kakao.maps.services.Geocoder();
		const lon = getLocalStorageItem('longitude')
		const lat = getLocalStorageItem('latitude');

		geocoder.coord2Address(lon, lat, (result: any, status: any) => {
			if (status === window.kakao.maps.services.Status.OK) {
				//도로명주소  
				if(result[0].road_address){
					setLocalStorageItem("address", result[0].road_address); 
				}
				//구주소
				else{
					setLocalStorageItem("address", result[0].address); 
				}
			} 
			else {
				//실패할 경우 가데이터 노출
				const fakeData = {
					"address_name": "",
					"region_1depth_name": "",
					"region_2depth_name": "위치조회 실패",
					"region_3depth_name": "",
					"road_name": "",
					"underground_yn": "",
					"main_building_no": "",
					"sub_building_no": "",
					"building_name": "",
					"zone_no": ""
				}
				setLocalStorageItem("address", fakeData); 
			}
		});
	});
};

// 실시간 날씨정보 조회
const getWeatherNow = async function () {
  const { base_date, base_time } = getKmaBaseDateTime();

	// 서울 격자 좌표
  const nx = 60;
  const ny = 127;

  //초단기실황조회 (기온, 습도 조회용)
  let url = `${CONST.GODATA_WEATHER_URL}`;
  url += `?serviceKey=${import.meta.env.VITE_GODATA_API_KEY}`;
  url += `&pageNo=1&numOfRows=10&dataType=JSON`;
  url += `&base_date=${base_date}`;
  url += `&base_time=${base_time}`;
  url += `&nx=${nx}`;
  url += `&ny=${ny}`;

	const res = await axios.get(url);
  const items = res.data.response.body.items.item;

	const data = {
		temperature: "", 
		humidity: "",
		precipType: "",
		precipProbability: "",
		skyCondition: "",
		windSpeed: "",
		minumumTemp: "",
		maximumTemp: "",
	};

  data.temperature = items.find((i: any) => i.category === 'TMP')?.fcstValue; //기온
  data.humidity = items.find((i: any) => i.category === 'REH')?.fcstValue; //습도
  data.precipType = items.find((i: any) => i.category === 'PTY')?.fcstValue; //강수 형태 (비/눈 등)
  data.precipProbability = items.find((i: any) => i.category === 'POP')?.fcstValue; //강수 확률 (%)
  data.skyCondition = items.find((i: any) => i.category === 'SKY')?.fcstValue; //하늘 상태 (맑음/흐림 등)
  data.windSpeed = items.find((i: any) => i.category === 'WSD')?.fcstValue; //	풍속 (m/s)
  data.minumumTemp = items.find((i: any) => i.category === 'TMN')?.fcstValue; //	일 최저기온
  data.maximumTemp = items.find((i: any) => i.category === 'TMX')?.fcstValue; // 일 최대기온

  console.log(data);
	//데이터 저장
	setLocalStorageItem("weatherNow", data); 
	console.log("✅ 날씨 정보 조회 완료!");
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

		//데이터 저장
    setLocalStorageItem("airQuality", response.data); // 성공적으로 받아온 데이터 저장

		console.log("✅ 대기 정보 조회 완료!");
  } 
	catch (error) {
    console.error('[ERROR]', error);
    throw error; 
  }
};

// 스포티파이 토큰 발급
const getSpotifyToken = async function () {
	const now = Number(moment().format("YYYYMMDDHHmm"));
	const token_expires_in = Number(getLocalStorageItem('token_expires_in') || "");
	const access_token = Number(getLocalStorageItem('access_token') || "");

	//저장된 토큰이 없거나 만료된 경우에만, 재발급
	//50분에 한번 발급하도록해서 불필요한 호출 방지
  if(access_token && token_expires_in && (token_expires_in > now)){
		return;
	}

  const result = await fetch(`${CONST.SPOTIFY_TOKEN_URL}`, {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + btoa(`${import.meta.env.VITE_SPOTIFY_CLIENT_ID}:${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await result.json();
	
	//토근값은 1시간 동안만 유효
	setLocalStorageItem("token_expires_in", moment().add(50, "minutes").format("YYYYMMDDHHmm"));
	setLocalStorageItem("access_token", data.access_token); 

	console.log("✅ 스포티파이 토근 발급 완료!");
};

const getKmaBaseDateTime = function() {
  const now = new Date();

  // 기상청 base_time 목록 (정해진 값만 가능)
  const baseTimes = ["0200", "0500", "0800", "1100", "1400", "1700", "2000", "2300"];

  // 현재 시각을 HHMM 형식으로
  const currentHHMM = now.getHours().toString().padStart(2, '0') + 
    now.getMinutes().toString().padStart(2, '0');

  // base_time 중 현재 시각보다 작은 가장 마지막 값 찾기
  let selectedTime = baseTimes.findLast(bt => bt <= currentHHMM);

  // 자정 이후(00:00~01:59)엔 base_time = "2300", base_date는 전날로
  if (!selectedTime) {
    selectedTime = "2300";
    now.setDate(now.getDate() - 1); // 전날로 이동
  }

  // base_date: YYYYMMDD 형식
  const baseDate = now.getFullYear().toString() +
    (now.getMonth() + 1).toString().padStart(2, '0') +
    now.getDate().toString().padStart(2, '0');

  return {
    base_date: baseDate,
    base_time: selectedTime
  };
}

export {
  getLocalStorageItem,
  setLocalStorageItem,
  getWeatherIcon,
  getAirQualityStatus,
  getMainMsg,
  getWeatherMain,
  getReverseGeocode,
  getWeatherNow,
  getAirQuality,
	getSpotifyToken,
  getKmaBaseDateTime
};

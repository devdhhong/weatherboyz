import moment from "moment";
import * as CONST from "@/utils/CONST";
import axios from "axios";
import proj4 from "proj4";

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
const getAirQualityStatus = function () {
  const airQuality = JSON.parse(getLocalStorageItem("airQuality"));
  let pm10Grade = ""; //미세먼지

  //대한민국 기준
  if (airQuality.pm10Grade == "1") { 
    pm10Grade = "좋음"; 
  }
  else if (airQuality.pm10Grade == "2") {
    pm10Grade = "보통"; 
  }
  else if (airQuality.pm10Grade == "3") {
    pm10Grade = "나쁨"; 
  }
  else { 
    pm10Grade = "매우나쁨"; 
  }

  return pm10Grade;
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
  let url1 = `${CONST.GODATA_WEATHER_URL}`;
  url1 += `?serviceKey=${import.meta.env.VITE_GODATA_API_KEY}`;
  url1 += `&pageNo=1&numOfRows=100&dataType=JSON`;
  url1 += `&base_date=${base_date}`;
  url1 += `&base_time=${base_time}`;
  url1 += `&nx=${nx}`;
  url1 += `&ny=${ny}`;
  
	const res1 = await axios.get(url1);
  const items1 = res1.data.response.body.items.item;

  //초단기실황조회 (기온, 습도 조회용)
  let url2 = `${CONST.GODATA_USN_WEATHER_URL}`;
  url2 += `?serviceKey=${import.meta.env.VITE_GODATA_API_KEY}`;
  url2 += `&pageNo=1&numOfRows=10&dataType=JSON`;
  url2 += `&base_date=${base_date}`;
  url2 += `&base_time=${base_time}`;
  url2 += `&nx=${nx}`;
  url2 += `&ny=${ny}`;

	const res2 = await axios.get(url2);
  const items2 = res2.data.response.body.items.item;

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

  data.temperature = items1.find((i: any) => i.category === 'TMP')?.fcstValue; //기온
  data.precipType = items1.find((i: any) => i.category === 'PTY')?.fcstValue; //강수 형태 (비/눈 등)
  data.precipProbability = items1.find((i: any) => i.category === 'POP')?.fcstValue; //강수 확률 (%)
  data.skyCondition = items1.find((i: any) => i.category === 'SKY')?.fcstValue; //하늘 상태 (맑음/흐림 등)
  data.windSpeed = items1.find((i: any) => i.category === 'WSD')?.fcstValue; //	풍속 (m/s)
  data.minumumTemp = items1.find((i: any) => i.category === 'TMN')?.fcstValue; //	일 최저기온
  data.maximumTemp = items1.find((i: any) => i.category === 'TMX')?.fcstValue; // 일 최대기온
  data.humidity = items2.find((i: any) => i.category === 'REH')?.obsrValue; //습도

	//데이터 저장
	setLocalStorageItem("weatherNow", data); 
	console.log("✅ 날씨 정보 조회 완료!");

  let fixedData: WeatherList = {};
  // let tempObj = {
  //   temperature: "", 
  //   humidity: "",
  //   precipType: "",
  //   precipProbability: "",
  //   skyCondition: "",
  //   windSpeed: "",
  //   minumumTemp: "",
  //   maximumTemp: "",
  // };

  for(let i=0; i<items1.length; i++){
    console.log(items1[i]);


    const baseDate = fixedData[items1[i].baseDate];

    // if(!fixedData[baseDate]){
    //   fixedData
    //   const baseTime = baseDate[items1[i].baseTime];

    //   if(!baseTime){
    //     fixedData[items1[i].baseTime] = Object.assign({}, ...{ [baseTime.category] : baseTime.fcstValue });
    //     // baseTime = Object.assign({}, ...{ [baseTime.category] : baseTime.fcstValue });
    //   }
    //   // else{

    //   // }
    // }
    // else{
    //   const baseTime = baseDate[items1[i].baseTime];

    //   if(!baseTime){
    //     fixedData[items1[i].baseTime] = Object.assign({}, ...{ [baseTime.category] : baseTime.fcstValue });
    //     // baseTime = Object.assign({}, ...{ [baseTime.category] : baseTime.fcstValue });
    //   }
    //   else{

    //   }
    // }

    console.log(fixedData);


  }





};

//가까훈 측정소 조회
const getNearStation = async function () {
  const latitude = Number(localStorage.getItem("latitude"));
  const longitude = Number(localStorage.getItem("longitude"));
  const tm = wgs84ToTM(latitude, longitude);

  let url = `${CONST.GODATA_NEARSTATION_URL}`;
  url += `?serviceKey=${import.meta.env.VITE_GODATA_API_KEY}`;
  url += `&returnType=JSON`;
  url += `&tmX=${tm.tmX}`;
  url += `&tmY=${tm.tmY}`;

	const res = await axios.get(url);
  //데이터 저장
  setLocalStorageItem("nearStation", res.data.response.body.items[0]); // 성공적으로 받아온 데이터 저장
	console.log("✅ 측정소 정보 조회 완료!");
}

// 대기정보 조회
const getAirQuality = async function () {
  const stationName = JSON.parse(getLocalStorageItem("nearStation")).stationName;

  console.log(stationName);
  let url = `${CONST.GODATA_AIRQUALITY_URL}`;
  url += `?serviceKey=${import.meta.env.VITE_GODATA_API_KEY}`;
  url += `&pageNo=1&numOfRows=10&returnType=JSON`;
  url += `&stationName=${stationName}`;
  url += `&dataTerm=DAILY`;

	const res = await axios.get(url);
  const item = res.data.response.body.items[0];

  //데이터 저장
  setLocalStorageItem("airQuality", item); // 성공적으로 받아온 데이터 저장

  console.log("✅ 대기 정보 조회 완료!");
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

//가장 근사한 측정시간 추출
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

//위경도 -> TM 변환 
const wgs84ToTM = function(lat: number, lon: number) {

  // WGS84 정의 명시적으로 등록
  const src = {
    projName: "longlat",
    datum: "WGS84"
  };

  const dst = {
    projName: "tmerc",
    lat0: 38,
    long0: 127.5,
    k0: 1,
    x0: 400000,
    y0: 600000,
    ellps: "GRS80",
    units: "m",
    no_defs: true
  };

  // 위경도 → TM 직접 변환
  const [tmX, tmY] = proj4(
    src, dst,
    [lon, lat]
  );

  return { tmX, tmY };
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
  getKmaBaseDateTime,
  wgs84ToTM,
  getNearStation
};

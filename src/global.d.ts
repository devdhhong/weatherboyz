declare global {
  interface Window {
    Android?: any; // window에 포함될 전역 변수 declare
    opera?: any; // window에 포함될 전역 변수 declare
    BMCManager?: any; // window에 포함될 전역 변수 declare
    webkit?: any; // window에 포함될 전역 변수 declare
    MSStream?: any;
		kakao?: any;
  }

  type Weather = {
    current: {
      weather_code: number,
      temperature: number,
      apparent_temperature: number,
    },
    hourly: Hourly,
  };

  type Hourly = {
    time: [key: string],
    temperature: [key: string],
    weather_code: [key: string],
  };

  type Music = {
    musicTitle: string,
    coverImgPath: string,
    songId: string,
  };

  type Address = {
    address_name?: string,
    region_1depth_name?: string
    region_2depth_name?: string
    region_3depth_name?: string
    road_name?: string
    underground_yn?: string
    main_building_no?: string
    sub_building_no?: string
    building_name?: string
    zone_no?: string
    mountain_yn?: string
    main_address_no?: string
    sub_address_no?: string
    zip_code?: string
  }

	type SpotifyMusic = {
		album: {
			images: Array<{
				url: string;
				height: number;
				width: number;
			}>;
			name: string;
		};
		name: string;
		id: string;
		external_urls: {
			spotify: string;
		};
	}

  type WeatherNow = {
    humidity: string;
    precipType: string;
    temperature: string;
    windSpeed: string;
  }

  type AirQuality = {
    pm10Grade: string;
  }

  type WeatherItem = {
    baseDate: string;
    baseTime: string;
    temperature?: string;
    humidity?: string;
    precipType?: string;
    precipProbability?: string;
    skyCondition?: string;
    windSpeed?: string;
    minumumTemp?: string;
    maximumTemp?: string;
  };
  
  type WeatherList = {
    [fcstDate: string]: {
      [fcstTime: string]: ForecastItem;
    };
  };
  
}

export {} 

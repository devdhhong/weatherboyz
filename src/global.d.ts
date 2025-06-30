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

  type Ootd = {
    memberId: string;
    imgDesc: string;
    imgPath: string;
    linkUrl: string;
    weatherCode: string;
    luckyColor: string;
    luckyItem: string;
  };

  type AirQuality = {
    current: {
      pm10: number,
      pm2_5: number,
    },
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
}

export {} 

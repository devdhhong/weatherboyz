declare global {
  interface Window {
    Android?: any; // window에 포함될 전역 변수 declare
    opera?: any; // window에 포함될 전역 변수 declare
    BMCManager?: any; // window에 포함될 전역 변수 declare
    webkit?: any; // window에 포함될 전역 변수 declare
    MSStream?: any;
  }
  //----------------------------
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

  type MusicList = {
    [key: string]: Music[]; // 문자열 키에 MusicItem 배열 매핑
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
    borough: string,
    county: string
  };
}

export {} 

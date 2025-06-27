/* API URL */
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/';
const NOW_FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const NOW_AIRQUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";
const OPEN_AI_CHAT_URL = "https://api.openai.com/v1/chat/completions";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

/* WMO 기상 해석코드 (weather code) */
const WEATHER_CODE = {
    WEATHER_CODE_0: "맑은 하늘",
    WEATHER_CODE_1: "대체로 맑음",
    WEATHER_CODE_2: "부분적으로 흐림",
    WEATHER_CODE_3: "흐림",
    WEATHER_CODE_45: "안개",
    WEATHER_CODE_48: "안개",

    WEATHER_CODE_51: "약한 비",
    WEATHER_CODE_53: "비",
    WEATHER_CODE_55: "강한 비",

    WEATHER_CODE_56: "약한 비",
    WEATHER_CODE_57: "강한 비",

    WEATHER_CODE_61: "약한 비",
    WEATHER_CODE_63: "비",
    WEATHER_CODE_65: "강한 비",

    WEATHER_CODE_66: "약한 눈비",
    WEATHER_CODE_67: "강한 눈비",
    WEATHER_CODE_71: "약한 눈",
    WEATHER_CODE_73: "눈",
    WEATHER_CODE_75: "강한 눈",

    WEATHER_CODE_77: "",
    WEATHER_CODE_80: "약한 소나기",
    WEATHER_CODE_81: "소나기",
    WEATHER_CODE_82: "강한 소나기",
    WEATHER_CODE_85: "눈",
    WEATHER_CODE_86: "강한 눈",
};

const MEMBER_NM_ENG_LONG: { [key: string]: string } = {
	"상연" : "sangyeon",
	"제이콥" : "jacob",
	"영훈" : "younghoon",
	"현재" : "hyunjae",
	"주연" : "juyeon",
	"케빈" : "kevin",
	"뉴" : "new",
	"큐" : "q",
	"선우" : "sunwoo",
	"에릭" : "eric",
};

const MEMBER_NM_ENG_SHORT: { [key: string]: string } = {
	"상연" : "sy",
	"제이콥" : "jc",
	"영훈" : "yh",
	"현재" : "hj",
	"주연" : "jy",
	"케빈" : "kv",
	"뉴" : "nw",
	"큐" : "q",
	"선우" : "sw",
	"에릭" : "er",
};

const MEMBER_NM_KOR_LONG: { [key: string]: string } = {
	"sangyeon" : "상연",
	"jacob" : "제이콥",
	"younghoon" : "영훈",
	"hyunjae" : "현재",
	"juyeon" : "주연",
	"kevin" : "케빈",
	"new" : "뉴",
	"q" : "큐",
	"sunwoo" : "선우",
	"eric" : "에릭",
};

const MEMBER_NM_KOR_SHORT: { [key: string]: string } = {
	"sy" : "상연",
	"jc" : "제이콥",
	"yh" : "영훈",
	"hj" : "현재",
	"jy" : "주연",
	"kv" : "케빈",
	"nw" : "뉴",
	"q" : "큐",
	"sw" : "선우",
	"er" : "에릭",
};

export {
	NOMINATIM_BASE_URL,
	NOW_FORECAST_URL,
	NOW_AIRQUALITY_URL,
	OPEN_AI_CHAT_URL,
	WEATHER_CODE,
	MEMBER_NM_ENG_LONG,
	MEMBER_NM_ENG_SHORT,
	MEMBER_NM_KOR_LONG,
	MEMBER_NM_KOR_SHORT,
	SPOTIFY_TOKEN_URL
}
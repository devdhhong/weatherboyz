/*
    [🎹 한국앨범 🎹]
    171206_소년
    180403_기디업
    180905_라잇히어
    181109_노에어
    190429_블룸블룸
    190819_드림라이크
    191206_화이트
    200220_리빌
    200921_더스틸러
    201207_크리스마씨
    210809_스릴라이드
    211101_매버릭
    211206_캔들스
    220816_위스퍼
    221206_올어바웃유
    230220_로어
    230807_립글로즈
    231120_워치잇
    231206_디어
    240318_넥타
    241028_도화선
    241202_라스트키스

    [ 🎹일본앨범 🎹]
    191106_타투
    210317_브레이킹던
    220527_쉬더보
    230613_딜리셔스

    [🎹 싱글앨범 🎹]
    210107_우선순위
    210601_지금처럼
    231111_우리는
    240509_넌어떻게생각해
    220617_스윗
    240719_지버리쉬
 */

interface MusicItem {
	musicTitle: string;
	coverImgPath: string;
	songId: string;
}

// 계절별 음악 데이터를 포함하는 객체 타입 정의
interface SeasonalMusic {
	// spring?: MusicItem[];
	// summer?: MusicItem[];
	// autumn?: MusicItem[];
	// winter?: MusicItem[];
	[key: string]: MusicItem[] | undefined;  // ← 요게 핵심!
}
		
const getCoverImgPath = function(yymmdd: string){
    return "/images/ALBUM_COVER/" + yymmdd + ".png";
}

const MUSIC_LIST: SeasonalMusic = {
    //3,4,5월
    "spring": [
        {
            "musicTitle": "Hurt Me Less (환상통)",
            "coverImgPath": getCoverImgPath("240318"),
            "songId": "wjWYFrvNGpg",
        },
        {
            "musicTitle": "넥타",
            "songId": "9MlsWnHy3Zk",
            "coverImgPath": getCoverImgPath("240318")
        },
        {
            "musicTitle": "Hurt Me Less (환상통)",
            "coverImgPath": getCoverImgPath("240318"),
            "songId": "wjWYFrvNGpg",
        }
    ],
    //6,7,8월
    "summer": [
        {
            "musicTitle": "Square one",
            "coverImgPath": getCoverImgPath("240318"),
            "songId": "th0cCyxGmKU",
        }
    ],
    //9,10,11월
    "autumn": [
        {
            "musicTitle": "Hurt Me Less (환상통)",
            "coverImgPath": getCoverImgPath("240318"),
            "songId": "wjWYFrvNGpg",
        },
        {
            "musicTitle": "넥타",
            "coverImgPath": getCoverImgPath("240318"),
            "songId": "9MlsWnHy3Zk",
        },
        {
            "musicTitle": "Hurt Me Less (환상통)",
            "coverImgPath": getCoverImgPath("240318"),
            "songId": "wjWYFrvNGpg",
        }
    ],
    //12,1,2월
    "winter": [
        {
            "musicTitle": "Christmassy!",
            "coverImgPath": getCoverImgPath("201207"),
            "songId": "bZS34g39zYE",
        },
        {
            "musicTitle": "화이트 (White)",
            "coverImgPath": getCoverImgPath("191206"),
            "songId": "Wi8ItBPSBs0",
        },
        {
            "musicTitle": "겨울잠",
            "coverImgPath": getCoverImgPath("241202"),
            "songId": "lDzf-NS7Ghk",
        },
        {
            "musicTitle": "Candle Light",
            "coverImgPath": getCoverImgPath("241202"),
            "songId": "NQHftH1ppGY",
        },
        {
            "musicTitle": "Last Kiss",
            "coverImgPath": getCoverImgPath("241202"),
            "songId": "rh2tvsLyOUs",
        },
        {
            "musicTitle": "All About You",
            "coverImgPath": getCoverImgPath("221206"),
            "songId": "NheP5prQyqs",
        },

        {
            "musicTitle": "Dear.",
            "coverImgPath": getCoverImgPath("231206"),
            "songId": "NKj7watheVQ",
        },
        {
            "musicTitle": "Candles",
            "coverImgPath": getCoverImgPath("211206"),
            "songId": "zTyByEFnw2U",
        },
        {
            "musicTitle": "Spring Snow",
            "coverImgPath": getCoverImgPath("200220"),
            "songId": "jF-H3j8-gIw",
        },
        // {
        //     "musicTitle": "Nothing Without You",
        //     "coverImgPath": getCoverImgPath("240719"),
        //     "songId": "YKK8Eqqab9U",
        // },
        {
            "musicTitle": "숨바꼭질 (Slip Away)",
            "coverImgPath": getCoverImgPath("240719"),
            "songId": "th0cCyxGmKU",
        },
        {
            "musicTitle": "숨바꼭질 (Slip Away)",
            "coverImgPath": getCoverImgPath("241028"),
            "songId": "IJ9w0S5aEco",
        },
        {
            "musicTitle": "They See Me Dream",
            "coverImgPath": getCoverImgPath("241028"),
            "songId": "OMkKC1bNQy8",
        },
        {
            "musicTitle": "Re-Wind",
            "coverImgPath": getCoverImgPath("241028"),
            "songId": "xy5YuBcY2NA",
        },
        {
            "musicTitle": "Bite Back",
            "coverImgPath": getCoverImgPath("241028"),
            "songId": "4Oc4b_KO-ec",
        },
        {
            "musicTitle": "TRIGGER (導火線)",
            "coverImgPath": getCoverImgPath("241028"),
            "songId": "azNgN-Alj7M",
        },
        {
            "musicTitle": "bAd",
            "coverImgPath": getCoverImgPath("241028"),
            "songId": "7G5nHNSMibo",
        },
    ],
    //특정날짜
    "1209": [
        {
            "musicTitle": "겨울잠",
            "coverImgPath": getCoverImgPath("241202"),
            "songId": "lDzf-NS7Ghk",
        }
    ],
    "0223": [
        {
            "musicTitle": "Square one",
            "coverImgPath": getCoverImgPath("241028"),
            "songId": "th0cCyxGmKU",
        }
    ],
};

export default MUSIC_LIST; 
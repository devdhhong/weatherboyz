/*
		"memberId" : "",  //멤버 코드
		"imgDesc" : "",    //이미지 설명
		"imgPath" : "",    //이미지 경로
		"linkUrl" : "",    //출처 링크
		"weatherCode" : "" //날씨 코드
		"luckyColor" : "" //행운의 색깔
		"luckyItem" : ""  //행운의 아이템
 */
interface OOTDItem {
	memberId: string;
	imgDesc: string;
	imgPath: string;
	linkUrl: string;
	weatherCode: string;
	luckyColor: string;
	luckyItem: string;
}

const OOTD: OOTDItem[] = [
	{
		"memberId": "",
		"imgDesc": "",
		"imgPath": "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FBj6Nw%2FbtsH2kIOK4a%2FWjoi46iPJHGmtKy2sAoFQk%2Fimg.jpg",
		"linkUrl": "",
		"weatherCode": "",
		"luckyColor": "블루",
		"luckyItem": "가방",
	}
];

export default OOTD;
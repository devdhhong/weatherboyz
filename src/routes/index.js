import { createRouter, createWebHashHistory } from "vue-router";
import SETTING from "../pages/SETTING.vue";
import OOTD from "../pages/OOTD.vue";
import MAIN from "../pages/MAIN.vue";

export default createRouter({
    //hash모드 : 특정 페이지에서 새로고침했을 때, '페이지를 찾을 수 없음'과 같은 메세지 알림을 방지
    history: createWebHashHistory(),

    //pages : page를 구분해주는 개념
    routes: [
        {
        //페이지 경로
        path: "/",
        name: MAIN,
        component: MAIN,
    },
    {
        //페이지 경로
        path: "/SETTING",
        name: SETTING,
        component: SETTING,
    },
    {
        //페이지 경로
        path: "/OOTD",
        name: OOTD,
        component: OOTD,
    },
    // 정의 되지 않은 화면에 접속 시도 시 자동으로 홈화면으로 리다이렉션
    {
        path: '/:pathMatch(.*)*',
        redirect: '/'
    }
],

});
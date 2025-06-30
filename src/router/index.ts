import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import SETTING from "../views/SETTING.vue";
import MAIN from "../views/MAIN.vue";
import PLAY from "../views/PLAY.vue";
import FORTUNE from "../views/FORTUNE.vue";
import BASEBALL from "../views/BASEBALL.vue";
import PHOCA from "../views/PHOCA.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "MAIN",
    component: MAIN,
  },
  {
    path: "/SETTING",
    name: "SETTING",
    component: SETTING,
  },
	{
    path: "/PLAY",
    name: "PLAY",
    component: PLAY,
  },
	{
    path: "/FORTUNE",
    name: "FORTUNE",
    component: FORTUNE,
  },
	{
    path: "/BASEBALL",
    name: "BASEBALL",
    component: BASEBALL,
  },
  {
    path: "/PHOCA",
    name: "PHOCA",
    component: PHOCA,
  },
  // 정의 되지 않은 화면에 접속 시도 시 자동으로 홈화면으로 리다이렉션
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

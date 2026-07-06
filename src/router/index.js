import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Countdown from "../views/Countdown.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/countdown",
    name: "countdown",
    component: Countdown
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;

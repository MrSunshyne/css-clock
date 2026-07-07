import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import './assets/tailwind.css'
import './assets/theme.css'
import VueConfetti from 'vue-confetti'

createApp(App)
  .use(router)
  .use(VueConfetti)
  .mount("#app");

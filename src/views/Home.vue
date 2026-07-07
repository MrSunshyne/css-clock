<template>
  <div
    class="home items-center grid justify-center"
    v-if="time"
    role="img"
    aria-label="A clock made of tiny analog clock faces, showing the current time"
    :style="{ '--speed': settings.travelSeconds + 's' }"
  >
    <div
      class="clock-frame grid grid-cols-2 justify-center items-center"
      :class="settings.showSeconds ? 'lg:grid-cols-6' : 'lg:grid-cols-4'"
    >
      <number :digit="time.h0" />
      <number :digit="time.h1" />
      <number :digit="time.m0" />
      <number :digit="time.m1" />
      <template v-if="settings.showSeconds">
        <number :digit="time.s0" />
        <number :digit="time.s1" />
      </template>
    </div>
  </div>
</template>

<script>
import Number from "../components/number.vue";
import { settings } from "../settings";

export default {
  name: "home",
  data() {
    return {
      time: {
        h0: 0,
        h1: 0,
        m0: 0,
        m1: 0,
        s0: 0,
        s1: 0,
      },
    };
  },
  components: {
    Number,
  },
  computed: {
    settings: () => settings,
  },
  methods: {
    now() {
      // Aim for the time it will be once the hands finish travelling, so the
      // clock reads correct the moment they settle.
      const target = new Date(Date.now() + settings.travelSeconds * 1000);
      let h = target.getHours();
      if (!settings.hourFormat24) {
        h = h % 12 || 12;
      }
      const m = target.getMinutes();
      const s = target.getSeconds();
      this.time = {
        h0: Math.floor(h / 10),
        h1: h % 10,
        m0: Math.floor(m / 10),
        m1: m % 10,
        s0: Math.floor(s / 10),
        s1: s % 10,
      };
    },
    restartTicker() {
      clearInterval(this.timer);
      this.now();
      this.timer = setInterval(this.now, settings.tickSeconds * 1000);
    },
  },
  watch: {
    "settings.tickSeconds": "restartTicker",
    "settings.travelSeconds": "restartTicker",
    "settings.hourFormat24": "restartTicker",
  },
  mounted() {
    this.restartTicker();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

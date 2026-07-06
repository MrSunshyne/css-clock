<template>
  <div class="home items-center grid justify-center" v-if="time" role="img" aria-label="A clock made of tiny analog clock faces, showing the current time">
    <div
      class="clock-frame grid grid-cols-2 lg:grid-cols-6 justify-center items-center"
    >
      <number :digit="time.h0" />
      <number :digit="time.h1" />
      <number :digit="time.m0" />
      <number :digit="time.m1" />
      <number :digit="time.s0" />
      <number :digit="time.s1" />
    </div>
  </div>
</template>

<script>
import Number from "../components/number.vue";

// The hands take 5s to travel (see --speed in number.vue), so we aim for the
// time it will be once they get there.
const HAND_TRAVEL_MS = 5000;
const TICK_MS = 7000;

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
  methods: {
    now() {
      const target = new Date(Date.now() + HAND_TRAVEL_MS);
      const h = target.getHours();
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
  },
  mounted() {
    this.now();
    this.timer = setInterval(this.now, TICK_MS);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<template>
  <div class="home items-center grid justify-center" v-if="time">
    <div
      class="clock-frame grid grid-cols-2 lg:grid-cols-6 justify-center items-center"
    >
      <number :digit="time.m0" />
      <number :digit="time.m1" />
      <number :digit="time.h0" />
      <number :digit="time.h1" />
      <number :digit="time.s0" />
      <number :digit="time.s1" />
    </div>
  </div>
</template>

<script>
import Number from "../components/number.vue";
export default {
  name: "home",
  data() {
    return {
      time: {
        m0: 0,
        m1: 0,
        h0: 0,
        h1: 0,
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
      let myDate = new Date()
        .toTimeString()
        .replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");

      let [mm, hh, ss] = myDate.split(":");
      this.time = {
        m0: parseInt(mm[0]),
        m1: parseInt(mm[1]),
        h0: parseInt(hh[0]),
        h1: parseInt(hh[1]),
        s0: parseInt(ss[0]),
        s1: parseInt(ss[1]),
      };
      //   return { hh, ss };
    },
  },
  mounted() {
    // this.now();
    setTimeout(() => {
      this.now();
    }, 1000);
    setInterval(() => {
      this.now();
    }, 7000);
  },
};
</script>

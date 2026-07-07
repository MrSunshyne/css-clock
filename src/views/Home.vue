<template>
  <div
    class="home items-center grid justify-center"
    role="img"
    :aria-label="label"
    :style="{ '--speed': settings.travelSeconds + 's' }"
  >
    <div
      v-if="settings.mode === 'clock'"
      class="clock-frame grid grid-cols-2 justify-center items-center"
      :class="colsClass"
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

    <!-- Keyed by the run's end time: every fresh run remounts the countdown,
         while a refresh mid-run resumes from wherever the clock really is. -->
    <VueCountdown
      v-else-if="timerRemaining > 0"
      :key="settings.timerEndsAt"
      :time="timerRemaining"
      v-slot="props"
      @end="celebrate"
    >
      <div
        class="clock-frame grid grid-cols-2 justify-center items-center"
        :class="colsClass"
      >
        <number :digit="digitOf(props.hours, 0)" />
        <number :digit="digitOf(props.hours, 1)" />
        <number :digit="digitOf(props.minutes, 0)" />
        <number :digit="digitOf(props.minutes, 1)" />
        <template v-if="settings.showSeconds">
          <number :digit="digitOf(props.seconds, 0)" />
          <number :digit="digitOf(props.seconds, 1)" />
        </template>
      </div>
    </VueCountdown>

    <!-- The run already finished (e.g. it ended while the page was closed) -->
    <div
      v-else
      class="clock-frame grid grid-cols-2 justify-center items-center"
      :class="colsClass"
    >
      <number :digit="0" />
      <number :digit="0" />
      <number :digit="0" />
      <number :digit="0" />
      <template v-if="settings.showSeconds">
        <number :digit="0" />
        <number :digit="0" />
      </template>
    </div>
  </div>
</template>

<script>
import VueCountdown from "@chenfengyuan/vue-countdown";
import Number from "../components/number.vue";
import { settings } from "../settings";

const CONFETTI_MS = 8000;

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
    VueCountdown,
  },
  computed: {
    settings: () => settings,
    timerRemaining() {
      return Math.max(0, settings.timerEndsAt - Date.now());
    },
    colsClass() {
      return settings.showSeconds ? "lg:grid-cols-6" : "lg:grid-cols-4";
    },
    label() {
      return settings.mode === "clock"
        ? "A clock made of tiny analog clock faces, showing the current time"
        : "A countdown timer made of tiny analog clock faces";
    },
  },
  methods: {
    digitOf(value, index) {
      // careful: `Number` is the digit component in this file, not the global
      return parseInt(String(value).padStart(2, "0")[index], 10);
    },
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
      if (settings.mode !== "clock") {
        return;
      }
      this.now();
      this.timer = setInterval(this.now, settings.tickSeconds * 1000);
    },
    celebrate() {
      this.$confetti.start();
      clearTimeout(this.confettiTimer);
      this.confettiTimer = setTimeout(() => this.$confetti.stop(), CONFETTI_MS);
    },
    stopConfetti() {
      clearTimeout(this.confettiTimer);
      this.$confetti.stop();
    },
  },
  watch: {
    "settings.tickSeconds": "restartTicker",
    "settings.travelSeconds": "restartTicker",
    "settings.hourFormat24": "restartTicker",
    "settings.mode"() {
      this.stopConfetti();
      this.restartTicker();
    },
    "settings.timerEndsAt"() {
      this.stopConfetti();
    },
  },
  mounted() {
    this.restartTicker();
  },
  beforeUnmount() {
    clearInterval(this.timer);
    this.stopConfetti();
  },
};
</script>

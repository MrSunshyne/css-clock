<template>
  <div
    class="home relative items-center grid justify-center"
    :class="{ 'finale-active': finale }"
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
        :class="[colsClass, { exploding: finale }]"
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

    <div v-if="finale === 'done'" class="times-up" role="status" aria-label="Time's up!">
      <span
        v-for="(letter, i) in letters"
        :key="i"
        class="letter"
        :style="{ '--i': i }"
        aria-hidden="true"
      >{{ letter === ' ' ? ' ' : letter }}</span>
    </div>
  </div>
</template>

<script>
import VueCountdown from "@chenfengyuan/vue-countdown";
import Number from "../components/number.vue";
import { settings } from "../settings";

// The pieces are off screen well before the full animation ends, so the
// reveal can start a little early for the overlap drama.
const REVEAL_AFTER_MS = 1200;

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
      finale: null, // null | "exploding" | "done"
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
    letters() {
      return "TIME’S UP".split("");
    },
    label() {
      if (this.finale === "done") {
        return "Time's up!";
      }
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
      // Every little clock face gets its own blast trajectory, handed to the
      // CSS keyframes as custom properties.
      this.$el.querySelectorAll(".clock-frame .digit > div").forEach((cell) => {
        const drift = (Math.random() * 2 - 1) * (120 + Math.random() * 320);
        const lift = -(30 + Math.random() * 140);
        const spin = (Math.random() * 2 - 1) * (180 + Math.random() * 540);
        cell.style.setProperty("--drift", `${Math.round(drift)}px`);
        cell.style.setProperty("--lift", `${Math.round(lift)}px`);
        cell.style.setProperty("--spin", `${Math.round(spin)}deg`);
        cell.style.setProperty("--blast-delay", `${Math.round(Math.random() * 150)}ms`);
      });
      this.finale = "exploding";
      this.finaleTimer = setTimeout(() => {
        this.finale = "done";
      }, REVEAL_AFTER_MS);
    },
    resetFinale() {
      clearTimeout(this.finaleTimer);
      this.finale = null;
    },
  },
  watch: {
    "settings.tickSeconds": "restartTicker",
    "settings.travelSeconds": "restartTicker",
    "settings.hourFormat24": "restartTicker",
    "settings.mode"() {
      this.resetFinale();
      this.restartTicker();
    },
    "settings.timerEndsAt"() {
      this.resetFinale();
    },
  },
  mounted() {
    this.restartTicker();
  },
  beforeUnmount() {
    clearInterval(this.timer);
    clearTimeout(this.finaleTimer);
  },
};
</script>

<style lang="scss" scoped>
/* While the finale plays, clip so the falling pieces exit cleanly instead of
   growing the page. */
.finale-active {
  overflow: clip;
}

.clock-frame.exploding :deep(.digit > div) {
  animation: cell-explode 1.6s forwards;
  animation-delay: var(--blast-delay, 0ms);
}

/* Pop up and outwards, then gravity wins. Trajectory comes from the per-cell
   custom properties set when the countdown ends. */
@keyframes cell-explode {
  0% {
    translate: 0 0;
    rotate: 0deg;
    animation-timing-function: cubic-bezier(0.2, 0.9, 0.35, 1);
  }
  25% {
    translate: calc(var(--drift) * 0.35) var(--lift);
    animation-timing-function: cubic-bezier(0.55, 0.05, 0.8, 0.4);
  }
  100% {
    translate: var(--drift) 110vh;
    rotate: var(--spin);
  }
}

.times-up {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: clamp(2.5rem, 11vw, 7rem);
  letter-spacing: 0.04em;
  user-select: none;

  .letter {
    display: inline-block;
    animation: letter-drop 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) both;
    animation-delay: calc(var(--i) * 55ms);
  }
}

@keyframes letter-drop {
  from {
    opacity: 0;
    translate: 0 -0.7em;
  }
  to {
    opacity: 1;
    translate: 0 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .clock-frame.exploding :deep(.digit > div) {
    animation: cell-vanish 0.4s forwards;
  }

  .times-up .letter {
    animation: none;
  }
}

@keyframes cell-vanish {
  to {
    opacity: 0;
  }
}
</style>

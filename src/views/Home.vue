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

// The reveal starts while the last pieces are still bouncing, for the
// overlap drama.
const REVEAL_AFTER_MS = 1600;

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
      // A shockwave ripples out from a blast point near the centre of the
      // clock: pieces further out detonate later, pieces closer get kicked
      // harder, and everything flies radially away from the blast. Each
      // cell's trajectory is handed to the CSS keyframes as custom props.
      const frame = this.$el.querySelector(".clock-frame");
      const frameRect = frame.getBoundingClientRect();
      const homeRect = this.$el.getBoundingClientRect();
      const originX = frameRect.left + frameRect.width * (0.4 + Math.random() * 0.2);
      const originY = frameRect.top + frameRect.height * (0.4 + Math.random() * 0.2);
      const maxDist = Math.hypot(
        Math.max(originX - frameRect.left, frameRect.right - originX),
        Math.max(originY - frameRect.top, frameRect.bottom - originY)
      );

      frame.querySelectorAll(".digit > div").forEach((cell) => {
        const rect = cell.getBoundingClientRect();
        const dx = rect.left + rect.width / 2 - originX;
        const dy = rect.top + rect.height / 2 - originY;
        const dist = Math.hypot(dx, dy) || 1;
        const angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.6;

        // wave front + a little per-piece fuse jitter
        const delay = (dist / maxDist) * 380 + Math.random() * 90;
        // the blast hits nearby pieces hardest
        const power = 220 + 420 * Math.max(0, 1 - dist / maxDist) + Math.random() * 120;
        const drift = Math.cos(angle) * power;
        // radial vertical kick blended with an upward pop
        const lift = Math.sin(angle) * power * 0.4 - (30 + Math.random() * 90);
        // how far this piece falls before hitting the "floor" (page bottom)
        const floor = Math.max(40, homeRect.bottom - rect.bottom);
        const bounce = 30 + Math.random() * 70 + power * 0.08;
        // spin follows the direction of travel, like a rolling shard
        const spin = drift * (0.8 + Math.random() * 0.8);

        cell.style.setProperty("--drift", `${Math.round(drift)}px`);
        cell.style.setProperty("--lift", `${Math.round(lift)}px`);
        cell.style.setProperty("--floor", `${Math.round(floor)}px`);
        cell.style.setProperty("--bounce", `${Math.round(bounce)}px`);
        cell.style.setProperty("--spin", `${Math.round(spin)}deg`);
        cell.style.setProperty("--blast-delay", `${Math.round(delay)}ms`);
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
/* While the finale plays, clip so the flying pieces exit cleanly instead of
   growing the page, and give the whole stage a jolt at detonation. */
.finale-active {
  overflow: clip;
  animation: home-shake 0.45s linear;
}

@keyframes home-shake {
  0%,
  100% {
    translate: 0 0;
  }
  20% {
    translate: 5px -3px;
  }
  40% {
    translate: -6px 2px;
  }
  60% {
    translate: 4px 3px;
  }
  80% {
    translate: -3px -2px;
  }
}

.clock-frame.exploding :deep(.digit > div) {
  animation: cell-explode 2.1s forwards;
  animation-delay: var(--blast-delay, 0ms);
}

/* Launch away from the blast, arc under gravity, hit the floor, one damped
   bounce, then slide to rest and fade. Trajectory comes from the per-cell
   custom properties set when the countdown ends. */
@keyframes cell-explode {
  0% {
    translate: 0 0;
    rotate: 0deg;
    opacity: 1;
    animation-timing-function: cubic-bezier(0.2, 0.9, 0.35, 1);
  }
  /* peak of the launch arc */
  22% {
    translate: calc(var(--drift) * 0.3) var(--lift);
    animation-timing-function: cubic-bezier(0.45, 0.05, 0.85, 0.4);
  }
  /* first floor hit */
  55% {
    translate: calc(var(--drift) * 0.65) var(--floor);
    animation-timing-function: cubic-bezier(0.2, 0.8, 0.5, 1);
  }
  /* damped bounce */
  72% {
    translate: calc(var(--drift) * 0.82) calc(var(--floor) - var(--bounce));
    animation-timing-function: cubic-bezier(0.6, 0, 0.9, 0.5);
  }
  86% {
    translate: calc(var(--drift) * 0.93) var(--floor);
    opacity: 1;
  }
  /* slide to rest and fade out */
  100% {
    translate: var(--drift) var(--floor);
    rotate: var(--spin);
    opacity: 0;
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

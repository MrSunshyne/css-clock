<template>
  <div class="control-panel fixed bottom-4 right-4 text-sm">
    <transition name="panel">
      <div v-if="open" class="panel rounded-lg p-4 mb-3 shadow-lg space-y-3">
        <label class="row">
          <span>Mode</span>
          <select v-model="settings.mode">
            <option value="clock">
              <svg class="opt-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
              <span>Clock</span>
            </option>
            <option value="timer">
              <svg class="opt-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2.5h12M6 21.5h12M7.5 2.5v3c0 3 3 4 3 6.5s-3 3.5-3 6.5v3M16.5 2.5v3c0 3-3 4-3 6.5s3 3.5 3 6.5v3" /></svg>
              <span>Countdown</span>
            </option>
          </select>
        </label>

        <template v-if="settings.mode === 'timer'">
          <label class="row">
            <span>Duration</span>
            <input type="number" min="0.1" step="0.5" v-model.number="settings.timerMinutes" />
            <span class="val">min</span>
          </label>

          <button class="btn rounded w-full py-1" @click="restartTimer">
            Restart countdown
          </button>
        </template>

        <label class="row" v-if="settings.mode === 'clock'">
          <span>Refresh every</span>
          <input type="range" min="1" max="15" step="1" v-model.number="settings.tickSeconds" />
          <span class="val">{{ settings.tickSeconds }}s</span>
        </label>

        <label class="row">
          <span>Hand travel</span>
          <input type="range" min="0.5" max="10" step="0.5" v-model.number="settings.travelSeconds" />
          <span class="val">{{ settings.travelSeconds }}s</span>
        </label>

        <label class="row">
          <span>Easing</span>
          <select v-model="settings.easing">
            <option value="linear">
              <svg class="opt-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20 20 4" /></svg>
              <span>Steady</span>
            </option>
            <option value="ease-in-out">
              <svg class="opt-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20C10 20 14 4 20 4" /></svg>
              <span>Smooth</span>
            </option>
            <option value="cubic-bezier(0.34, 1.56, 0.64, 1)">
              <svg class="opt-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20C8 20 8 4 12 4c3 0 2.5 6 5 6 2 0 2-4 3-4" /></svg>
              <span>Springy</span>
            </option>
          </select>
        </label>

        <label class="row">
          <span>Theme</span>
          <select v-model="settings.theme">
            <option value="auto">
              <svg class="opt-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor" stroke="none" /></svg>
              <span>Auto</span>
            </option>
            <option value="light">
              <svg class="opt-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" /><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" /></svg>
              <span>Light</span>
            </option>
            <option value="dark">
              <svg class="opt-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 13.5A8.5 8.5 0 1 1 10.5 3.5a7 7 0 0 0 10 10z" /></svg>
              <span>Dark</span>
            </option>
          </select>
        </label>

        <label class="row" v-if="settings.mode === 'clock'">
          <span>24-hour time</span>
          <input type="checkbox" v-model="settings.hourFormat24" />
        </label>

        <label class="row">
          <span>Show seconds</span>
          <input type="checkbox" v-model="settings.showSeconds" />
        </label>

        <label class="row">
          <span>Show clock faces</span>
          <input type="checkbox" v-model="settings.showFaces" />
        </label>

        <button class="btn rounded w-full py-1" @click="resetSettings">
          Reset to defaults
        </button>
      </div>
    </transition>

    <button
      class="gear rounded-full shadow-lg flex items-center justify-center ml-auto"
      :aria-expanded="open"
      aria-label="Clock settings"
      @click="open = !open"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    </button>
  </div>
</template>

<script>
import { settings, resetSettings, restartTimer } from "../settings";

export default {
  data() {
    return { open: false };
  },
  computed: {
    settings: () => settings,
  },
  methods: {
    resetSettings,
    restartTimer,
  },
};
</script>

<style lang="scss" scoped>
.panel {
  background: var(--panel);
  border: 1px solid var(--face-outline);
  width: 16rem;

  .row {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    span:first-child {
      flex: 1;
    }

    input[type="range"] {
      width: 6rem;
      accent-color: var(--ink);
    }

    input[type="checkbox"] {
      accent-color: var(--ink);
      width: 1rem;
      height: 1rem;
    }

    input[type="number"] {
      background: var(--bg);
      color: inherit;
      border: 1px solid var(--face-outline);
      border-radius: 0.25rem;
      padding: 0.15rem 0.3rem;
      width: 4.5rem;
      text-align: right;
    }

    .val {
      width: 2.5rem;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
  }

  .btn {
    border: 1px solid var(--face-outline);

    &:hover {
      background: var(--bg);
    }
  }
}

/* Selects: pill triggers, and where the browser supports customizable
   selects (appearance: base-select) a fully styled, animated picker. */

.panel select {
  appearance: none;
  background-color: var(--bg);
  color: inherit;
  border: 1px solid var(--face-outline);
  border-radius: 999px;
  padding: 0.25rem 1.7rem 0.25rem 0.75rem;
  cursor: pointer;
  transition: border-color 0.15s;

  /* fallback chevron for browsers without base-select */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath d='M2.5 4.5 6 8l3.5-3.5' fill='none' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.6rem center;
  background-size: 0.7em;

  &:hover,
  &:focus-visible {
    border-color: var(--ink);
  }
}

@supports (appearance: base-select) {
  .panel select {
    appearance: base-select;
    background-image: none;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    /* the wide right padding only exists to clear the fallback
       background-image chevron; here the icon is a real element */
    padding-inline-end: 0.75rem;
  }

  .panel select::picker-icon {
    color: var(--face-outline);
    transition: rotate 0.25s;
  }

  .panel select:open::picker-icon {
    rotate: 180deg;
  }

  .panel select::picker(select) {
    appearance: base-select;
    background: var(--panel);
    color: var(--ink);
    border: 1px solid var(--face-outline);
    border-radius: 0.75rem;
    padding: 0.3rem;
    margin-block-start: 0.35rem;
    box-shadow: 0 12px 32px rgb(0 0 0 / 0.25);
    opacity: 1;
    transform: none;
    transition:
      opacity 0.18s ease,
      transform 0.18s ease,
      overlay 0.18s ease allow-discrete,
      display 0.18s ease allow-discrete;
  }

  /* closing animation */
  .panel select:not(:open)::picker(select) {
    opacity: 0;
    transform: translateY(-6px) scale(0.97);
  }

  /* opening animation */
  @starting-style {
    .panel select:open::picker(select) {
      opacity: 0;
      transform: translateY(-6px) scale(0.97);
    }
  }

  .panel option {
    display: flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.4rem 0.6rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.12s;

    &:hover,
    &:focus-visible {
      background: var(--bg);
    }

    /* move the checkmark to the far right */
    &::checkmark {
      order: 1;
      margin-inline-start: auto;
      color: var(--ink);
    }
  }
}

.opt-icon {
  width: 1.1em;
  height: 1.1em;
  flex: none;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0.85;
}

.gear {
  background: var(--panel);
  color: var(--ink);
  border: 1px solid var(--face-outline);
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: rotate(45deg);
  }
}

.panel-enter-active,
.panel-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.panel-enter-from,
.panel-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>

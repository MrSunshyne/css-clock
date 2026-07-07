<template>
  <div class="control-panel fixed bottom-4 right-4 text-sm">
    <transition name="panel">
      <div v-if="open" class="panel rounded-lg p-4 mb-3 shadow-lg space-y-3">
        <label class="row">
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
            <option value="linear">Steady</option>
            <option value="ease-in-out">Smooth</option>
            <option value="cubic-bezier(0.34, 1.56, 0.64, 1)">Springy</option>
          </select>
        </label>

        <label class="row">
          <span>Theme</span>
          <select v-model="settings.theme">
            <option value="auto">Auto</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </label>

        <label class="row">
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

        <button class="reset rounded w-full py-1" @click="resetSettings">
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
import { settings, resetSettings } from "../settings";

export default {
  data() {
    return { open: false };
  },
  computed: {
    settings: () => settings,
  },
  methods: {
    resetSettings,
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

    select {
      background: var(--bg);
      color: inherit;
      border: 1px solid var(--face-outline);
      border-radius: 0.25rem;
      padding: 0.15rem 0.3rem;
    }

    .val {
      width: 2.5rem;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }
  }

  .reset {
    border: 1px solid var(--face-outline);

    &:hover {
      background: var(--bg);
    }
  }
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

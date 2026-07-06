import { reactive, watch } from "vue";

// Everything the control panel can change, with the values the site ships with.
export const DEFAULTS = {
  mode: "clock", // clock | timer
  tickSeconds: 7, // how often the clock refreshes
  travelSeconds: 5, // how long the hands take to reach their new positions
  easing: "linear", // timing function for hand travel
  hourFormat24: true,
  showSeconds: true,
  showFaces: true, // the faint circle outlines behind the hands
  theme: "auto", // auto | light | dark
  timerMinutes: 10,
  // The countdown stores its absolute end time (epoch ms) rather than the
  // remaining time, so a running countdown survives page refreshes and
  // resumes exactly on schedule. 0 means "no run yet".
  timerEndsAt: 0,
};

const STORAGE_KEY = "css-clock-settings";

function load() {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return { ...DEFAULTS };
  }
}

export const settings = reactive(load());

export function resetSettings() {
  Object.assign(settings, DEFAULTS);
}

// Starts a fresh countdown run from the configured duration.
export function restartTimer() {
  const minutes = parseFloat(settings.timerMinutes);
  if (minutes > 0) {
    settings.timerEndsAt = Date.now() + minutes * 60 * 1000;
  }
}

// Changing the duration starts a new run (only while actually in timer mode,
// so a settings reset doesn't leave a phantom run behind); switching into
// timer mode starts one only when there isn't already a run in progress
// (a refresh mid-run resumes instead).
watch(
  () => settings.timerMinutes,
  () => {
    if (settings.mode === "timer") {
      restartTimer();
    }
  }
);
watch(
  () => settings.mode,
  (mode) => {
    if (mode === "timer" && settings.timerEndsAt <= Date.now()) {
      restartTimer();
    }
  }
);

function applyTheme(theme) {
  if (theme === "auto") {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = theme;
  }
}

watch(
  settings,
  (value) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    applyTheme(value.theme);
  },
  { deep: true }
);

applyTheme(settings.theme);

import { reactive, watch } from "vue";

// Everything the control panel can change, with the values the site ships with.
export const DEFAULTS = {
  tickSeconds: 7, // how often the clock refreshes
  travelSeconds: 5, // how long the hands take to reach their new positions
  easing: "linear", // timing function for hand travel
  hourFormat24: true,
  showSeconds: true,
  showFaces: true, // the faint circle outlines behind the hands
  theme: "auto", // auto | light | dark
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

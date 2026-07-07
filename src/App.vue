<template>
  <div
    class="app-shell flex min-h-screen flex-col"
    :class="{ 'hide-faces': !settings.showFaces }"
    :style="{ '--easing': settings.easing }"
  >
    <main-menu></main-menu>
    <router-view class="container mx-auto flex-grow" />
    <footer-section />
    <control-panel />
  </div>
</template>

<script>
import MainMenu from "./components/main-menu.vue";
import FooterSection from "./components/footer-section.vue";
import ControlPanel from "./components/control-panel.vue";
import { settings } from "./settings";

export default {
  components: {
    MainMenu,
    FooterSection,
    ControlPanel
  },
  computed: {
    settings: () => settings
  }
};
</script>

<style lang="scss">
* {
  padding: 0;
  border: 0;
  margin: 0;
}

.app-shell {
  background: var(--bg);
  color: var(--ink);
  transition: background-color 0.3s, color 0.3s;
}
</style>

<template>
  <div class="app-shell flex min-h-screen flex-col">
    <main-menu></main-menu>
    <router-view class="container mx-auto flex-grow" />
    <footer-section />
  </div>
</template>

<script>
import MainMenu from "./components/main-menu.vue";
import FooterSection from "./components/footer-section.vue";

export default {
  components: {
    MainMenu,
    FooterSection
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

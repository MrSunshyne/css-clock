<template>
  <div
    class="container mx-auto text-sm  px-8 md:px-0 space-y-10 md:space-y-0 text-center md:text-left tracking-wide py-10 md:flex justify-center md:justify-between"
  >
    <div>
      <p class="font-bold">What is this?</p>
      <p>
        A css-based clock animation inspired by a real-life clock.
        <a
          class="underline hover:text-gray-800"
          target="_blank"
          href="https://www.humanssince1982.com/"
          >See the original here</a
        >
      </p>
    </div>
    <ul class="menu">
      <li class="w-full">
        <a class="block" href="https://github.com/MrSunshyne/css-clock" target="_blank"
          >View the code on GitHub</a
        >
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.menu {
  display: flex;

  a {
    // @apply pl-2;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>

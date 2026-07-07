<template>
  <div class="digit">
    <div
      v-for="(hands, i) in angles"
      :key="i"
      :style="{ '--before-angle': hands[0] + 'deg', '--after-angle': hands[1] + 'deg' }"
    ></div>
  </div>
</template>

<script>
// Each digit is drawn on a 4x6 grid of tiny clocks. Every cell has two hands,
// listed here as [beforeAngle, afterAngle] in degrees — one source line per
// grid row. 0deg points right, 90deg down, and [135, 135] stacks both hands
// on the diagonal to "hide" a cell.
const DIGITS = {
  0: [
    [0, 90], [0, 180], [0, 180], [90, 180],
    [90, 270], [0, 90], [90, 180], [90, 270],
    [90, 270], [90, 270], [90, 270], [90, 270],
    [90, 270], [90, 270], [90, 270], [90, 270],
    [90, 270], [270, 0], [270, 180], [90, 270],
    [270, 0], [0, 180], [0, 180], [270, 180],
  ],
  1: [
    [0, 90], [0, 180], [90, 180], [135, 135],
    [270, 0], [90, 180], [270, 90], [135, 135],
    [135, 135], [270, 90], [270, 90], [135, 135],
    [135, 135], [270, 90], [270, 90], [135, 135],
    [0, 90], [270, 180], [270, 0], [90, 180],
    [270, 0], [0, 180], [0, 180], [270, 180],
  ],
  2: [
    [0, 90], [0, 180], [0, 180], [90, 180],
    [270, 0], [0, 180], [90, 180], [270, 90],
    [0, 90], [0, 180], [270, 180], [270, 90],
    [270, 90], [0, 90], [0, 180], [270, 180],
    [270, 90], [270, 0], [0, 180], [90, 180],
    [270, 0], [0, 180], [0, 180], [270, 180],
  ],
  3: [
    [0, 90], [0, 180], [0, 180], [90, 180],
    [270, 0], [0, 180], [90, 180], [270, 90],
    [135, 135], [0, 90], [270, 180], [270, 90],
    [135, 135], [270, 0], [90, 180], [270, 90],
    [0, 90], [0, 180], [270, 180], [270, 90],
    [270, 0], [0, 180], [0, 180], [270, 180],
  ],
  4: [
    [0, 90], [90, 180], [0, 90], [90, 180],
    [270, 90], [270, 90], [270, 90], [270, 90],
    [270, 90], [270, 0], [270, 180], [270, 90],
    [270, 0], [0, 180], [90, 180], [270, 90],
    [135, 135], [135, 135], [270, 90], [270, 90],
    [135, 135], [135, 135], [270, 0], [270, 180],
  ],
  5: [
    [0, 90], [0, 180], [0, 180], [90, 180],
    [270, 90], [0, 90], [0, 180], [270, 180],
    [270, 90], [270, 0], [0, 180], [90, 180],
    [270, 0], [0, 180], [90, 180], [270, 90],
    [0, 90], [0, 180], [270, 180], [270, 90],
    [270, 0], [0, 180], [0, 180], [270, 180],
  ],
  6: [
    [0, 90], [0, 180], [0, 180], [90, 180],
    [270, 90], [0, 90], [0, 180], [270, 180],
    [270, 90], [270, 0], [0, 180], [90, 180],
    [270, 90], [0, 90], [90, 180], [270, 90],
    [270, 90], [270, 0], [270, 180], [270, 90],
    [270, 0], [0, 180], [0, 180], [270, 180],
  ],
  7: [
    [0, 90], [0, 180], [0, 180], [90, 180],
    [270, 0], [0, 180], [90, 180], [270, 90],
    [135, 135], [135, 135], [270, 90], [270, 90],
    [135, 135], [135, 135], [270, 90], [270, 90],
    [135, 135], [135, 135], [270, 90], [270, 90],
    [135, 135], [135, 135], [270, 0], [270, 180],
  ],
  8: [
    [0, 90], [0, 180], [0, 180], [90, 180],
    [270, 90], [0, 90], [90, 180], [270, 90],
    [270, 90], [270, 0], [270, 180], [270, 90],
    [270, 90], [0, 90], [90, 180], [270, 90],
    [270, 90], [270, 0], [270, 180], [270, 90],
    [270, 0], [0, 180], [0, 180], [270, 180],
  ],
  9: [
    [0, 90], [0, 180], [0, 180], [90, 180],
    [270, 90], [0, 90], [90, 180], [270, 90],
    [270, 90], [270, 0], [270, 180], [270, 90],
    [270, 0], [0, 180], [90, 180], [270, 90],
    [0, 90], [0, 180], [270, 180], [270, 90],
    [270, 0], [0, 180], [0, 180], [270, 180],
  ],
};

// Smallest signed turn (in degrees) that takes a hand from one angle to another.
function shortestTurn(from, to) {
  return ((((to - from) % 360) + 540) % 360) - 180;
}

export default {
  props: {
    digit: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // Cumulative angles per cell. The CSS transition follows the numeric
      // value, so by only ever moving each hand by its shortest turn we avoid
      // hands spinning the long way round (e.g. 270deg -> 0deg used to travel
      // backwards through 270deg instead of forwards through 90deg).
      angles: (DIGITS[this.digit] || DIGITS[0]).map(hands => hands.slice())
    };
  },
  watch: {
    digit(value) {
      const target = DIGITS[value] || DIGITS[0];
      this.angles = this.angles.map((hands, i) =>
        hands.map((angle, j) => angle + shortestTurn(angle, target[i][j]))
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.digit {
  --size: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: calc(var(--size) * 4);

  div {
    position: relative;
    border: 1px solid var(--face-outline, gray);
    height: var(--size);
    width: var(--size);
    border-radius: 100%;
    transition: border-color 0.3s;

    &:after,
    &:before {
      position: absolute;
      content: " ";
      width: calc(var(--size) / 2);
      height: calc(var(--size) / 10);
      background: var(--ink, black);
      top: 50%;
      left: 50%;
      transform-origin: left center;
      transition: transform var(--speed, 5s) linear;
    }

    &:before {
      transform: rotate(var(--before-angle, 135deg));
    }

    &:after {
      transform: rotate(var(--after-angle, 135deg));
    }
  }
}

@media screen and (max-width: 640px) {
  .digit {
    --size: 20px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .digit div:before,
  .digit div:after {
    transition: none;
  }
}
</style>

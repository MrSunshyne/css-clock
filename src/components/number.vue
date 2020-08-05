<template>
  <div>
    <div id="clock" :class="num">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    digit: {
      type: Number,
      default: 0
    }
  },
  computed: {
    num() {
      switch (this.digit) {
        case 0:
          return "zero";
        case 1:
          return "one";
        case 2:
          return "two";
        case 3:
          return "three";
        case 4:
          return "four";
        case 5:
          return "five";
        case 6:
          return "six";
        case 7:
          return "seven";
        case 8:
          return "eight";
        case 9:
          return "nine";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#clock {
  --size: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: calc(var(--size) * 4);

  div {
    border: 1px solid gray;
    height: var(--size);
    width: var(--size);
    border-radius: 100%;
    // box-shadow: -5px 5px 3px #494949, 5px -5px 3px #5b5b5b;
  }
}

@media screen and (max-width: 640px) {
  #clock {
    --size: 20px;
  }
}

#clock div {
  position: relative;

  &:after,
  &:before {
    position: absolute;
    content: " ";
    width: calc(var(--size) / 2);
    height: calc(var(--size) / 10);
    background: black;
    top: 50%;
    left: 50%;
    transform-origin: left center;
    transition: 5s linear;
  }

  &:before {
    // background: red;
    // transform: rotate(180deg);
  }
}

#clock div.x0 {
  &:before {
    transform: rotate(135deg);
  }
  &:after {
    transform: rotate(135deg);
  }
}

#clock div.x1 {
  &:before {
    transform: rotate(0deg);
  }
  &:after {
    transform: rotate(90deg);
  }
}

#clock div.x2 {
  &:before {
    transform: rotate(0deg);
  }
  &:after {
    transform: rotate(180deg);
  }
}

#clock div.x3 {
  &:before {
    transform: rotate(90deg);
  }
  &:after {
    transform: rotate(180deg);
  }
}

#clock div.x4 {
  &:before {
    transform: rotate(270deg);
  }
  &:after {
    transform: rotate(90deg);
  }
}

#clock div.x5 {
  &:before {
    transform: rotate(270deg);
  }
  &:after {
    transform: rotate(0deg);
  }
}

#clock div.x6 {
  &:before {
    transform: rotate(270deg);
  }
  &:after {
    transform: rotate(180deg);
  }
}

.zero {
  div:nth-child(1) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(2) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(3) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(4) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(5) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(270deg);
    }
  }
  div:nth-child(6) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(7) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(8) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(270deg);
    }
  }
  div:nth-child(9) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(270deg);
    }
  }
  div:nth-child(10) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(270deg);
    }
  }
  div:nth-child(11) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(270deg);
    }
  }
  div:nth-child(12) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(270deg);
    }
  }
  div:nth-child(13) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(270deg);
    }
  }
  div:nth-child(14) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(270deg);
    }
  }
  div:nth-child(15) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(270deg);
    }
  }
  div:nth-child(16) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(270deg);
    }
  }
  div:nth-child(17) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(270deg);
    }
  }
  div:nth-child(18) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(19) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(20) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(270deg);
    }
  }
  div:nth-child(21) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(22) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(23) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(24) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
}

.one {
  div:nth-child(1) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(2) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(3) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(4) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(5) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(6) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(7) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(8) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(9) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(10) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(11) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(12) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(13) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(14) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(15) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(16) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(17) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(18) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(19) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(20) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(21) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(22) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(23) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(24) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
}

.two {
  div:nth-child(1) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(2) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(3) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(4) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(5) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(6) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(7) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(8) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(9) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(10) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(11) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(12) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(13) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(14) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(15) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(16) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(17) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(18) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(19) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(20) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(21) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(22) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(23) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(24) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
}

.three {
  div:nth-child(1) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(2) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(3) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(4) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(5) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(6) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(7) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(8) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(9) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(10) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(11) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(12) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(13) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(14) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(15) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(16) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(17) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(18) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(19) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(20) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(21) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(22) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(23) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(24) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
}

.four {
  div:nth-child(1) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(2) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(3) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(4) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(5) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(6) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(7) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(8) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(9) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(10) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(11) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(12) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(13) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(14) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(15) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(16) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(17) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(18) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(19) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(20) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(21) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(22) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(23) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(24) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
}

.five {
  div:nth-child(1) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(2) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(3) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(4) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(5) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(6) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(7) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(8) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(9) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(10) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(11) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(12) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(13) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(14) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(15) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(16) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(17) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(18) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(19) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(20) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(21) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(22) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(23) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(24) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
}

.six {
  div:nth-child(1) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(2) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(3) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(4) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(5) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(6) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(7) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(8) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(9) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(10) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(11) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(12) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(13) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(14) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(15) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(16) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(17) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(18) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(19) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(20) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(21) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(22) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(23) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(24) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
}

.seven {
  div:nth-child(1) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(2) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(3) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(4) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(5) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(6) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(7) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(8) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(9) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(10) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(11) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(12) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(13) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(14) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(15) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(16) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(17) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(18) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(19) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(20) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(21) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(22) {
    &:before {
      transform: rotate(135deg);
    }
    &:after {
      transform: rotate(135deg);
    }
  }
  div:nth-child(23) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(24) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
}

.eight {
  div:nth-child(1) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(2) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(3) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(4) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(5) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(6) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(7) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(8) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(9) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(10) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(11) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(12) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(13) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(14) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(15) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(16) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(17) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(18) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(19) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(20) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(21) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(22) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(23) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(24) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
}

.nine {
  div:nth-child(1) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(2) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(3) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(4) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(5) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(6) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(7) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(8) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(9) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(10) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(11) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(12) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(13) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(14) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(15) {
    &:before {
      transform: rotate(90deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(16) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(17) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(18) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(19) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(20) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(90deg);
    }
  }
  div:nth-child(21) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(0deg);
    }
  }
  div:nth-child(22) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(23) {
    &:before {
      transform: rotate(0deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
  div:nth-child(24) {
    &:before {
      transform: rotate(270deg);
    }
    &:after {
      transform: rotate(180deg);
    }
  }
}
</style>
<template>
  <div class="countdown items-center grid justify-center relative">
    <div class="absolute top-0 left-0">
      <input type="text" inputmode="numeric" v-model.number="countdownDuration" class="border rounded-full text-3xl  w-24 text-center" @click="stop()" />
    </div>
    <VueCountdown v-if="countdown > 0" :time="countdown" @end="start()" >
      <template slot-scope="props">
        <div
             role="img" aria-label="A countdown timer made of tiny analog clock faces"
             class="clock-frame grid grid-cols-2 lg:grid-cols-6 justify-center items-center">
          <number :digit="parseInt(pad(props.hours)[0])" />
          <number :digit="parseInt(pad(props.hours)[1])" />
          <number :digit="parseInt(pad(props.minutes)[0])" />
          <number :digit="parseInt(pad(props.minutes)[1])" />
          <number :digit="parseInt(pad(props.seconds)[0])" />
          <number :digit="parseInt(pad(props.seconds)[1])" />
        </div>

      </template>
    </VueCountdown>
  </div>
</template>

<script>
import Number from "../components/number.vue";
import VueCountdown from '@chenfengyuan/vue-countdown';

export default {
  name: "home",
  data() {
    return {
      countdownDuration: 10, // minutes
    };
  },
  components: {
    Number,
    VueCountdown
  },
  computed: {
    countdown() {
      // careful: `Number` is the digit component in this file, not the global
      const minutes = parseFloat(this.countdownDuration);
      return minutes > 0 ? minutes * 60 * 1000 : 0;
    }
  },
  methods: {
    // padd digit to be 2 digits
    pad(digit) {
      return digit < 10 ? ["0", digit.toString()] : ("" + digit).split("");
    },
    start() {
      this.$confetti.start(); 
    },

    stop() {
      this.$confetti.stop();
    }
  },
}
</script>

<style scoped>
.countdown {
  --speed : 0.5s;
}
</style>
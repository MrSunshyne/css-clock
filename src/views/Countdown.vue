<template>
  <div class="countdown items-center grid justify-center relative">
    <div class="absolute top-0 left-0">
      <input type="text" v-model="countdownDuration" class="border rounded-full text-3xl  w-24 text-center" @click="stop()" />
    </div>
    <VueCountdown :time="countdown" @end="start()" >
      <template slot-scope="props">
        <div
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
      return this.countdownDuration * 60 * 1000;
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
    },

    love() {
      this.$confetti.update({
        particles: [
          {
            type: 'heart',
          },
          {
            type: 'circle',
          },
        ],
        defaultColors: [
          'red',
          'pink',
          '#ba0000'
        ],
      });
    }
  },
}
</script>

<style scoped>
.countdown {
  --speed : 0.5s;
}
</style>
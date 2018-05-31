<template>
  <div class="bg-gray viewport">
    <div :class="css.wrapper">
      <transition :enter-class="css.enter" :leave-to-class="css.leave">
        <img :src="activeSlide" :key="activeSlide">
      </transition>
    </div>
  </div>
</template>
<script>
import A from '../images/slider/A.png'
import B from '../images/slider/B.png'
import C from '../images/slider/C.png'
export default {
  name: 'slides',
  props: {
    speed: {
      type: Number,
      default: 3000
    }
  },
  data () {
    return {
      list: [A, B, C],
      activeIndex: 0,
      timerId: null
    }
  },
  computed: {
    size () {
      return this.list.length
    },
    simplified () {
      return this.size === 1
    },
    activeSlide () {
      return this.list[this.activeIndex]
    }
  },
  mounted () {
    if (!this.simplified) {
      this.timerId = setInterval(this.forward, this.speed)
    }
  },
  beforeDestroy () {
    if (!this.simplified) {
      clearInterval(this.timerId)
    }
  },
  methods: {
    forward () {
      this.activeIndex = this.projection(this.activeIndex + 1)
    },
    back () {
      this.activeIndex = this.projection(this.activeIndex - 1)
    },
    // 投影回数组，正常范围 >= 0, < size
    projection (index) {
      const {size} = this
      return index < 0 ? index + size : (index >= size ? index % size : index)
    }
  }
}
</script>
<style module="css" lang="scss">
  @import "../styles/index";

  .wrapper {
    position: relative;

    img {
      position: absolute;
      display: block;
      width: 100%;
      transition: transform 0.8s ease-in-out;
    }
  }

  .enter {
    transform: translateX(100%);
  }

  .leave {
    transform: translateX(-100%);
  }
</style>

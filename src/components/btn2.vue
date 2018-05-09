<!--
 单图展示零件.
 更完备的placeholder处理; 更好的图片替换机制和更好的加载体验.
 注意，overflow熟悉可能会影响3d动画效果，导致3d动画变2d
-->
<template>
  <div :class="css.default">
    <div :class="[css.body, {[css.flip]: flip, [css.loaded]: loaded}]" :style="perspectiveStyle">
      <div :class="[placeholder || css.placeholder, css.front]"></div>
      <div :class="[css.wrap, css.back, {[css.clip]: !skew}]">
        <img :src="src"  @load="onLoad" :class="skew ? css.LichKing : css.Arthas">
        <slot :class="css.slot"/>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Img3',
    props: {
      src: String,
      placeholder: String,
      // 是否启用翻转效果
      simple: Boolean,
      // 为了保持较佳的3d翻转效果， perspective 与 盒子宽度需要保持一个较佳的比例，然后仍然可以通过 ratio 参数来进一步调整
      ratio: Number,
      // 图片必须有尺寸，要么允许底部溢出时被裁剪部分，要么拉伸铺满
      skew: Boolean // 图片扭曲(skew === true)的话，则水平垂直方向兼平铺, 否则水平方向平铺垂直方向溢出
    },
    data () {
      return {
        loaded: false,
        perspective: null
      }
    },
    computed: {
      flip () {
        return !this.simple
      },
      perspectiveStyle () {
        const {ratio = 1, perspective, flip} = this
        return (flip && ratio && perspective) ? {
          '-webkit-perspective': `${perspective.toFixed()}px`,
          perspective: `${perspective.toFixed()}px`
        } : null
      }
    },
    mounted () {
      const {ratio = 1, flip} = this
      if (!flip) return
      const width = this.$el.clientWidth
      const height = this.$el.clientHeight
      this.perspective = Math.sqrt(width * width + height * height) * ratio * 1.8
    },
    methods: {
      onLoad (event) {
        const Terenas = event.target.parentNode
        const Menethil = Terenas.parentNode
        Terenas.style.height = Menethil.clientHeight + 'px'
        this.loaded = true
        this.$emit('load', event)
      }
    }
  }
</script>
<style module="css" lang="scss">
  @import "../styles/var";

  .default {
    min-width: 40px;
    min-height: 40px;
  }

  .body {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .front,
  .back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .front {
    width: 100%;
    height: 100%;
  }

  .back {
    transform: rotateY(180deg);
  }

  .flip {
    .front,
    .back {
      transition: 1.2s ease-in-out;
      transform-style: preserve-3d;
    }
  }

  .loaded {
    .front {
      transform: rotateY(-180deg);
    }

    .back {
      transform: rotateY(0deg);
    }
  }

  // 默认使用的占位图片(一个灰色的camera图标)
  .placeholder {
    // background: url(../images/icon-camera-disabled.png) no-repeat center center $bg-placeholder;
    // background-size: 29.5px 24px;
    background: $bg-placeholder;
  }

  .wrap {
    width: 100%;
  }

  .clip {
    overflow: hidden;
  }

  .Arthas,
  .LichKing {
    display: block;
    width: 100%;
  }

  .Arthas {
    height: auto;
  }

  .LichKing {
    height: 100%;
  }

  .slot {
    //
  }
</style>

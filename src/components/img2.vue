<!--
 单图展示零件，
 它有一个默认尺寸，图片拉伸填满，同时右上角有一个删除图标
 如果readonly,则删除图标不显示
 图片放大预览功能不应在这里显示，而是在图片列表中处理
-->
<template>
  <div :class="[css.wrap, large ? css.large : css.normal]">
    <div :class="[css.box, {[css.border]: loaded}]">
      <span :class="css.placeholder" v-if="!loaded"></span>
      <img :src="uri" :class="[css.image, {[css.opacity]: loading}]" @click="enlarge" @load="onLoad" @error="reset">
    </div>
    <hq-icon x :class="large ? css.x2 : css.x" v-if="loaded && !readonly" @click.native="remove"/>
  </div>
</template>
<script>
import HqIcon from './hq-icon'
import {isURL} from '../util/URL.js'
export default {
  name: 'hq-image',
  model: {
    prop: 'src',
    event: 'remove'
  },
  components: {
    HqIcon
  },
  props: {
    src: String,
    readonly: Boolean,
    scalable: Boolean,
    placeholder: String,
    large: Boolean
  },
  data () {
    return {
      loaded: false,
      uri: this.src
    }
  },
  computed: {
    loading () {
      return isURL(this.uri) && !this.loaded
    }
  },
  watch: {
    src () {
      this.uri = this.src
    }
  },
  methods: {
    onLoad (event) {
      if (isURL(this.src) && !this.loaded) {
        this.loaded = true
        this.$emit('load')
      }
    },
    reset (event) {
      this.$emit('reset')
    },
    // 移除当前图片
    remove () {
      this.$emit('remove', null)
    },
    enlarge () {
      if (this.scalable) {
        window.articleDetail(this.src)
      } else {
        this.$emit('enlarge')
      }
    }
  }
}
</script>
<style module="css" lang="scss">
  @import "../styles/index";

  // 放组件的盒子
  .wrap {
    display: block;
    position: relative;
  }

  .border {
    border: 1px solid $bg-gray;
  }

  .normal {
    width: 54px;
    height: 54px;
  }

  .large {
    width: 68.5px;
    height: 68.5px;
  }

  // 放图片的盒子
  .box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
  }

  // 图片
  .image {
    display: block;
    margin: 0;
    border: 0 none;
    width: 100%;
    height: 100%;
  }

  .opacity {
    opacity: 0;
  }

  // 删除图片
  .x {
    width: 15px;
    height: 15px;
    display: block;
    position: absolute;
    top: -7.5px;
    right: -7.5px;
  }

  .x2 {
    width: 18px;
    height: 18px;
    display: block;
    position: absolute;
    top: -3px;
    right: -4px;
  }

  .placeholder {
    display: block;
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    background: url(../images/icon-camera-dashed.png) no-repeat center center #f5f5f5;
    background-size: contain;
  }
</style>

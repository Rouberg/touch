<!--
  一个可使用占位图的，加强了的`img`标签
  和hq-image.vue相比，当前组件更简练，并且当前组件是它的原型，当前组件并不假定任何条件，仅处理占位符逻辑。用谁视情况选定

  占位图通过参数`placeholder`指定

  `placeholder`应是一个已有的css类名，它定义了一个背景图样式，并且有一个固定的长宽
  `placeholder`无默认值
-->
<template>
  <img :src=uri :class=clz @load=onLoad @error=reset>
</template>
<script>
import {isURL} from '../util/URL.js'
export default {
  name: 'img',
  props: {
    src: String,
    placeholder: String
  },
  data () {
    return {
      backup: '',
      loaded: false,
      uri: this.src
    }
  },
  computed: {
    clz () {
      return {[this.placeholder]: !this.loaded}
    }
  },
  watch: {
    src () {
      this.uri = this.src
    }
  },
  methods: {
    //  从一个元素中摘取它在CSS渲染树中对应的背景图
    getBgImage (element) {
      return document.defaultView.getComputedStyle(element, null).backgroundImage
        .replace(/^url\(('|")?/, '')
        .replace(/('|")?\)$/, '')
    },
    onLoad (event) {
      if (isURL(this.src) && !this.loaded) {
        this.loaded = true
      }
    },
    reset (event) {
      if (!this.backup) {
        this.backup = this.getBgImage(event.target)
      }
      if (this.uri !== this.backup) {
        this.uri = this.backup
      }
    }
  }
}
</script>

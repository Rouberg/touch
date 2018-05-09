<!--请使用update事件，该事件更可靠-->
<template>
  <div :class="[css.wrap, {[css.breath]: breath}]">
    <slot name="title">
      <label v-if="title" :class="[css.title]">{{ title }}</label>
    </slot>
    <input :class="[css.input, {['color-warn']: dynamicWarn}]" :readonly="readonly || disabled" :type="type" :maxlength="maxLength"
           :value="value" @keyup="keyup" @change="$emit('change',$event)"
           :placeholder="computedPlaceholder" ref="input">
    <slot/>
  </div>
</template>
<script>
import {isRegExp} from '../util'
export default {
  name: 'hq-input',
  model: {
    event: 'update',
    prop: 'value'
  },
  props: {
    value: {
      type: [String, Number],
      default: () => null
    },
    type: {
      type: String,
      default: () => 'text'
    },
    breath: {
      type: Boolean,
      default: () => true
    },
    readonly: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    maxLength: {
      type: Number,
      default: () => null
    },
    // 有使用模式校验输入过程的话，自动动态提示
    pattern: {
      type: RegExp,
      default: () => null
    },
    // pattern校验的过程是是否忽略空格，默认忽略空格
    ignoreSpace: {
      type: Boolean,
      default: () => true
    },
    title: String,
    placeholder: String
  },
  computed: {
    // 自动补全的占位提示
    computedPlaceholder () {
      const {title, placeholder} = this
      return placeholder || (title ? `请输入${title}` : null)
    },
    dynamicWarn () {
      const {pattern, value, ignoreSpace} = this
      if (value === null) return false
      return isRegExp(pattern) ? !pattern.test(ignoreSpace ? value.replace(/\s/g, '') : value) : false
    }
  },
  // 修正Vue框架在input输入框中删除后光标跑位的问题
  updated () {
    const {selectionStart, selectionEnd, deleteMode} = this
    const value = this.value || ''
    const input = this.$refs.input
    if (deleteMode && selectionStart !== 0 && selectionStart !== value.length && selectionStart === selectionEnd) {
      input.selectionStart = selectionStart
      input.selectionEnd = selectionEnd
    }
  },
  data () {
    return {
      selectionStart: 0,
      selectionEnd: 0,
      deleteMode: false
    }
  },
  methods: {
    keyup (event) {
      const target = event.target
      const onDelete = event.keyCode === 8
      this.deleteMode = onDelete
      if (onDelete) {
        this.selectionStart = target.selectionStart
        this.selectionEnd = target.selectionEnd
      }
      this.$emit('update', target.value)
    }
  }
}
</script>
<style module="css" lang="scss">
  @import "../styles/index";

  .wrap {
    @extend %flex-justify;
    line-height: 45px;
    position: relative;
    z-index: 1;
  }

  .breath {
    padding-left: $breath;
    padding-right: $breath;
  }

  .title {
    font-size: 15px;
    color: #666;
    margin-right: 15px;
    word-break: keep-all;
  }

  .input {
    flex: 1;
    line-height: 30px;
    box-sizing: border-box;
    text-align: right;
    margin-right: -10px;
    color: #666;
    font-size: 13px;
    transition: color .4s ease-in-out;

    & + span,
    & + div,
    & + button {
      margin-left: 15px;
    }

    &::placeholder {
      color: #ccc;
    }

    &:not(.free) {
      padding: 0 10px;
    }

    &.free {
      padding: 7.5px 10px;
      height: 45px;
    }
  }
</style>

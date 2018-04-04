<!-- 按钮，修饰符间： disabled可与其它混用，但一般只和primary混用， block一般也只与primary按需混用，其它基本互斥
e.g.
    <hq-btn primary>确定</hq-btn>
    <hq-btn block />确定</hq-btn>
    <hq-btn primary :disabled="submitDisabled">确定</hq-btn>
    <hq-btn arrow />
    <hq-btn camera/>
-->

<template>
  <button :is="tag" :class="[css.default, {
          [css.arrow]: arrow,
          [css.label]: label,
          [css.iconification]: iconification,
          [css.primary]: primary,
          [css.disabled]: disabled,
          [css.block]: block,
          [css.border]: border,
        }]" type="button" :disabled="disabled" @click="!readonly && $emit('click',$event)">
    <hq-icon v-if="camera" camera><slot/></hq-icon>
    <hq-icon v-else-if="sign" sign><slot/></hq-icon>
    <hq-icon v-else-if="scan" scan><slot/></hq-icon>
    <slot v-else/>
  </button>
</template>
<script>
import hqIcon from './hq-icon'

export default {
  name: 'hq-btn',
  components: { hqIcon },
  props: {
    readonly: {
      type: Boolean,
      default: () => false
    },
    // primary 代表白色字蓝色背景的主要按钮
    primary: {
      type: Boolean,
      default: () => false
    },
    // 按钮不可用
    disabled: {
      type: Boolean,
      default: () => false
    },
    // 单独占一行，会渲染额外的外边距
    block: {
      type: Boolean,
      default: () => false
    },
    // 描边按钮
    border: {
      type: Boolean,
      default: () => false
    },
    // 向右的箭头按钮，它被抽象并被归类到按钮中，它也应该是一个按钮。这是为了更好地控制行为方式
    arrow: {
      type: Boolean,
      default: () => false
    },
    // 标签风格的按钮
    label: {
      type: Boolean,
      default: () => false
    },
    none: {
      type: Boolean,
      default: () => false
    },
    camera: {
      type: Boolean,
      default: () => false
    },
    sign: {
      type: Boolean,
      default: () => false
    },
    scan: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    // 图标化
    iconification () {
      return this.none || this.arrow || this.camera || this.sign || this.scan
    },
    tag () {
      return this.arrow ? 'span' : 'button'
    }
  }
}
</script>
<style module="css" lang="scss">
  @import "../styles/index";

  $color-primary: #00a4ff;
  $border-radius: 5px;

  .border {
    color: $color-primary;
    background-color: white;
    border-color: currentColor;

    &::after {
      @extend %pseudo-scale-half;
      border: 1px solid;
      border-radius: $border-radius * 2;
    }

    &.disabled {
      color: #ccc;
    }
  }

  .primary {
    color: white;
    background-color: $color-primary;
    border-color: $color-primary;

    &.disabled {
      background-color: #ccc;
      color: white;
    }
  }

  .block {
    font-size: 17px;
    display: block;
    margin: $breath $breath ($breath * 2);
    width: calc(100% - #{$breath * 2});
    line-height: $line-height * 2;
  }

  .arrow {
    @extend %flex-center;
    min-width: 30px;
    min-height: 20px;

    &::after {
      content: ' ';
      box-sizing: border-box;
      border-width: 1px;
      border-style: solid;
      border-color: transparent #999 #999 transparent;
      width: 10px;
      height: 10px;
      transform: rotate(-45deg);
      margin-left: -6px;
    }
  }

  .label:not(.primary) {
    background-color: #ccc;
    color: white;
  }

  // 图标化
  .iconification {
    box-sizing: border-box;
    background-color: white;
    padding: 0 8px;
    margin: 0 7px;
  }

  .default {
    position: relative;
    box-sizing: border-box;
    border-radius: $border-radius;

    &:not(.border) {
      overflow: hidden;
    }

    &:not(.iconification) {
      padding: 5px 8px;
    }
  }
</style>

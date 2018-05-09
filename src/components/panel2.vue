<!-- 一个面板，处理翻页逻辑、占位符的自动显示与否 -->
<template>
  <div :class="css.component">
    <slot v-if="confirmNoData" name="placeholder"/>
    <template v-else>
      <slot/>
      <template v-if="this.list !== null">
        <p v-if="end || unfulfilled" :class="css.tips">已经到底啦～</p>
        <a v-else @click="next" :class="css.link">加载更多</a>
      </template>
    </template>
  </div>
</template>
<script>
import router from '../router'
import {toast} from 'antools/util/currying'
export default {
  name: 'hq-panel',
  props: {
    /**
     * @prop bluebird 由父组件组装进当前组件的一个函数
     * 它可以接收一个对象，该对象一般是ajax请求的参数的一部分，
     * 它需要返回一个promise, 该promise如果resolved, 需要resolved一个数据列表
     */
    bluebird: {
      type: Function,
      required: true
    },
    /**
     * 默认情况下是懒惰的，页面加载时不会主动加载数据，
     * 设置为false时，页面一加载就会主动加载数据
     */
    lazy: {
      type: Boolean,
      default: () => true
    },
    /**
     * list用于正确更新面板状态
     */
    list: {
      type: Array,
      default: () => null
    },
    keyPs: {
      type: String,
      default: () => 'pageSize'
    },
    keyPn: {
      type: String,
      default: () => 'pageNum'
    },
    valuePs: {
      type: [String, Number],
      default: () => 10,
      validator: value => !isNaN(parseInt(value, 10))
    }
  },
  data () {
    return {
      end: false,
      ps: null,
      pn: null
    }
  },
  computed: {
    // 确认没有数据(通过调用服务器端的接口确认)
    confirmNoData () {
      return Array.isArray(this.list) && this.list.length === 0
    },
    unfulfilled () {
      return Array.isArray(this.list) && (this.list.length % this.valuePs) < this.ps && ((this.list.length % this.valuePs)) > 0
    }
  },
  created () {
    const route = router.currentRoute
    this.ps = Number(route.query[this.keyPs] || this.valuePs)
    this.pn = Number(route.query[this.keyPn] || 1)
    !this.lazy && this.next()
  },
  methods: {
    next () {
      let {bluebird, ps, pn, keyPs, keyPn} = this
      pn++
      bluebird({
        [keyPn]: pn,
        [keyPs]: ps
      }, {append: true}).then(list => {
        list = list || []
        if (list.length > 0) {
          const query = {...router.currentRoute.query, [keyPn]: pn, [keyPs]: ps}
          this.pn = pn
          router.replace({query})
        }
        this.end = list.length === 0
      }, toast).catch(console.error)
    }
  }
}
</script>
<style module="css" lang="scss">
  @import "../styles/index";

  .component {
    border-top: 1px solid transparent;
  }

  .tips {
    color: #999;
  }

  .link {
    color: $color-primary;
    display: block;
  }

  .tips,
  .link {
    font-size: 13px;
    text-align: center;
    line-height: 28px;
    margin: -0.5em 0 1.5em;
  }
</style>

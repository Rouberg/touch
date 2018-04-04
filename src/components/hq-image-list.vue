<template>
  <div :class="[css.wrap, {[css.breath]: breath, [css.tiny]: !ellipsis}]">
    <template v-if="list" v-for="(it, index) in richList">
      <hq-image :src="getURI(it)"
                :class="[css.item, {[css.largeSize]: !ellipsis}]" :large="!ellipsis"
                :key="it.src" v-if="!ellipsis || (ellipsis && index < 4)"
                :readonly="readonly" @remove="remove(index)" @enlarge="enlarge(it.src, index)"
                @load="onLoad(it)" @reset="onLoad(it)"/>
    </template>
    <span :class="[css.item, css.tips]" v-if="showTip" @click="viewAll">查看全部</span>
  </div>
</template>
<script>
import HqImage from './hq-image'
import {chain} from '../util'

export default {
  name: 'hq-list-image',
  model: {
    event: 'update',
    prop: 'list'
  },
  components: {
    HqImage
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    // 查看全部前的guard函数，一个promise函数
    bluebird: {
      type: Function,
      default () {
        return Promise.resolve()
      }
    },
    // 允许同时加载的图片数量
    parallel: {
      type: Number,
      default () {
        return 9
      }
    },
    // 是否启用lazyLoad
    lazy: Boolean,
    // 是否在两边渲染点内边距空间
    breath: Boolean,
    // 是否开启缩略显示
    ellipsis: Boolean,
    readonly: Boolean
  },
  data () {
    return {
      // 加载队列
      queue: []
    }
  },
  computed: {
    showTip () {
      const list = this.list || []
      return this.ellipsis && list.length >= 4
    },
    // 延迟加载队列
    richList: {
      get () {
        const list = this.list || []
        return this.lazy ? list.map(it => {
          if (!it.meta) {
            it.meta = {
              loaded: false,
              loading: false,
              id: Math.random().toString()
            }
          }
          return it
        }) : list
      },
      set (list) {
        this.list = list
      }
    }
  },
  methods: {
    chain,
    remove (index) {
      let {list} = this
      list.splice(index, 1)
      this.$emit('update', list)
      this.chain(this.bluebird)
      this.$emit('remove')
    },
    enlarge (src, index) {
      window.articleDetail(src)
    },
    viewAll () {
      const query = {...this.$route.query}
      this.bluebird().then(() => {
        this.$router.push({query, name: 'materials'})
      })
    },
    flash ({meta}) {
      if (!this.lazy) return
      const {queue, parallel} = this
      if (queue.length < parallel) {
        if (!meta.loading && !meta.loaded) {
          meta.loading = true
          queue.push(meta.id)
        }
        this.queue = queue
      }
    },
    onLoad ({meta}) {
      if (!this.lazy) return
      const {queue, richList} = this
      const index = queue.indexOf(meta.id)
      console.assert(index > -1, 'error index')
      const next = richList.find(it => it.meta && !it.meta.loaded && !it.meta.loading)
      if (next) {
        queue.splice(index, 1, next.meta.id)
        next.meta.loaded = false
        next.meta.loading = true
      } else {
        queue.splice(index, 1)
      }
      this.queue = queue
      meta.loaded = true
      meta.loading = false
    },
    getURI ({src, meta}) {
      this.flash({meta})
      return (this.lazy && !meta.loaded && !meta.loading) ? null : src
    }
  }
}
</script>
<style module="css" lang="scss">
  @import "../styles/index";

  .wrap {
    overflow: hidden;
  }

  .tiny {
    padding-left: 4px;
    padding-right: 4px;
  }

  .breath:not(.tiny) {
    padding-left: $breath;
    padding-right: $breath;
  }

  .item:not(.largeSize) {
    margin-top: 12px;
    margin-bottom: 12px;
    float: left;

    & + & {
      margin-left: 18px;
    }
  }

  .largeSize {
    float: left;
    margin: 8px 11px;
  }

  .tips {
    color: #666;
    text-align: center;
    font-size: 11px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    width: 54px;
    height: 54px;
    line-height: 50px;
  }
</style>

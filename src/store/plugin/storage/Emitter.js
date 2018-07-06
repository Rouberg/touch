const HANDLERS = Symbol('Handlers')

export default class Emitter {
  /**
   * this[HANDLERS]存放了各种事件的处理函数
   *
   * 通过使用一个symbol作为对象的key的方式，兼顾了调试和安全两个方面，
   * 因为打印时可以看见，当前文件中是可以访问这个，所以调试是方便的
   * 但是因为这个key是'protected'的，当前文件外无法访问，所以这是安全的
   */
  [HANDLERS] = {}

  /**
   * 主动触发一个事件
   * @param event {string|symbol} 事件名
   * @param [payload=] {object} 负荷，会捎带给事件的处理函数
   */
  emit (event, payload) {
    let handlers = this[HANDLERS][event] // handlers是以事件名分组的，每个组是一个数组
    if (Array.isArray(handlers)) { // 如果某种事件有监听的处理函数，那么一定在事件名组成的数组里
      for (let it of handlers) { // 遍历当前事件的处理函数
        if (!it.invalid && typeof it.handler === 'function') { // 如果被标记为不合法的，或者说当前项内没有有效的函数，则跳过
          it.handler(payload) // 一一调用对应的处理函数，并把负荷捎带给它们
          if (it.once) { // 如果一个处理函数被声明为只调用一次，那么先标记为不合法，稍后处理。
            // 为什么不在这儿处理？因为遍历数组的过程中，一边遍历一边更新数组不是一个好的实践
            it.invalid = true
          }
        }
      }
      // 重新归并当前事件的处理函数数组，去掉刚才遍历时标记为不合法的项
      this[HANDLERS][event] = this[HANDLERS][event].reduce((pub, it) => { // pub即为reduce函数的第二个参数，在这里最开始时是[]
        if (!it.invalid) { // 如果是合法的，则收集它们
          pub.push(it)
        }
        return pub
      }, [])
      //  如果当前事件的处理函数数组为空，则把空集合清理掉
      if (this[HANDLERS][event].length === 0) {
        delete this[HANDLERS][event]
      }
    }
  }

  /**
   * 向jsBridge注册一个事件处理函数，当该事件发生时该函数会反复发生
   * @param event {string|symbol} 事件类型
   * @param handler {function} 处理函数
   * @param [once = false] {boolean} 标记当前处理函数是否是只执行一次就移除
   */
  on (event, handler, {once} = {}) {
    // 如果当前集合中没有事件x的事件队列，则以事件为作为key声明一个空数组作为事件x的事件队列
    if (!this[HANDLERS][event] || !Array.isArray(this[HANDLERS][event])) {
      this[HANDLERS][event] = []
    }
    // 在当前的事件队列中放入当前事件处理函数（以及其它标志信息）
    this[HANDLERS][event].push({handler, once})
  }

  /**
   * 向jsBridge注册一个事件处理函数
   * 和on函数注册的事件相比，当前函数注册的事件只会发生一次
   * @param event {string|symbol} 事件类型
   * @param handler {function} 处理函数
   */
  once (event, handler) {
    this.on(event, handler, {once: true}) // 委托on函数绑定事件
  }
}

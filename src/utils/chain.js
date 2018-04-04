import isFunction from './isFunction'

const isFunctionIncluded = it => (Array.isArray(it) && it.length > 0) ? it.some(isFunctionIncluded) : isFunction(it)

// 判断一段调用链的首位置是否是一份数据，不是函数则视作数据
const hasHeadData = function (list) {
  return list.length > 1 && !isFunctionIncluded(list[0])
}

// 为一个promise(或者一份数据) 与 一个函数建立调用关系
const invoke = function (promiseOrData, fn) {
  if (!isFunction(fn)) throw new Error(`${JSON.stringify(fn)}不是函数`)
  const reject = value => Promise.reject(value)
  return promiseOrData instanceof Promise ? promiseOrData.then(fn, reject) : fn(promiseOrData)
}

const _chain = function (...list) {
  const resolve = value => Promise.resolve(value)
  const source = hasHeadData(list) ? list.shift() : resolve()
  return list.reduce((promiseOrData, fn) => {
    return invoke(promiseOrData, (Array.isArray(fn) && fn.length > 0)
      ? value => Promise.all(
        fn.map(
          atom => Array.isArray(atom)
            ? _chain.apply(this, atom)
            : atom.call(this, value)
        )
      )
      : value => fn.call(this, value))
  }, source)
}

/**
 * 链式调用一串ajax请求(接受串行、并行或者进一步组合)，并在调用链结尾自动调用toast和捕获错误
 * 当前函数需要直接挂载到Vue对应的viewModel上(这一方面限制了调用条件，同时也是为了简化了调用时的API)
 * 当前函数接受任意个实参。
 * 除了第一个位置允许有数据外，其它位置均应是函数。
 * 第一个位置包含任意数组中的第一项。
 * 函数如果是异步的，应该返回一个promise。函数如果是同步的，可以返回promise也可以正常return.
 * 第一个参数如果不是函数，则直接作为参数扔给链上的第二个promise函数
 * @param [list = []] {Array<Function>} 调用链列表
 */
export const chain = function chain (...list) {
  const toast = alert
  return _chain.apply(this, list).then(value => Promise.resolve(value), toast).catch(console.error)
}

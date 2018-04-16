import isArray from './isArray'

/**
 * 一个深克隆函数
 * 期望的应用场景是数据克隆，而非对象克隆
 * [边际问题]：对于类型Date，Function，Symbol，RegExp以及prototype该怎么处理比较合适?
 * 现在的克隆策略：
 * 1. Date，RegExp会重新初始化一个对象
 * 2. 对于Symbol, Function会继续保持相同的引用
 * 3. 对于原型会忽略
 * 除了对象和数组外，都归类为"原子类型" (isAtom(it) => true)
 * @param source {*} <required> 要克隆的源数据
 * @returns {*} 克隆后的数据
 */
export default function clone (source) {
  if (source === null || typeof source !== 'object') {
    return source
  } else if (source instanceof Date) {
    return new Date(source)
  } else if (source instanceof RegExp) {
    return new RegExp(source.source, source.flags)
  }
  let target = isArray(source) ? [] : {}
  for (let key in source) {
    if (!source.hasOwnProperty(key)) { //  忽略原型
      break
    }
    target[key] = clone(source[key])
  }
  return target
}

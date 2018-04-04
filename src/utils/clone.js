import isAtom from './isAtom'
import isArray from './isArray'

/**
 * 一个深克隆函数
 * 默认会忽略原型中的内容（如果有）
 * @param obj {*} <required> 要克隆的源数据
 * @param ignore  {Array} <option>  克隆过程中要忽略的类型的列表
 * @returns {*} 克隆后的数据
 */
export default function clone (obj) {
  if (isAtom(obj)) {
    return obj
  }
  let re = isArray(obj) ? [] : {}
  for (let i in obj) {
    if (!obj.hasOwnProperty(i)) { //  忽略原型
      break
    }
    re[i] = clone(obj[i])
  }
  return re
}

import isArray from './isArray'
import isRegExp from './isRegExp'
import isDate from './isDate'
import isObject from './isObject'

// 判断两个对象是否"相等"
export default function equals (a, b) {
  // null, undefined, number, boolean, symbol, string, function
  if (typeof a !== 'object' || a === null) {
    return Object.is(a, b)
  } else if (isRegExp(a)) {
    return isRegExp(b) && a.source === b.source && a.flags === b.flags
  } else if (isDate(a)) {
    return isDate(b) && a.getTime() === b.getTime()
  } else if (isArray(a)) {
    return isArray(b) && a.length === b.length && a.every((datum, index) => datum === b[index])
  } else {
    if (!isObject(b) || Object.keys(a).length !== Object.keys(b).length) return false
    for (let i in a) {
      // if (!a.hasOwnProperty(i)) { //  忽略原型
      //   break
      // }
      if (!equals(a[i], b[i])) return false
    }
    return true
  }
}

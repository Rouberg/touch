import {isDescriptor} from './isDescriptor'

/**
 * decorator(装饰器)的装盒函数
 * 它有两个功能：
 * 1. 使decorator可以通用调用的方式使用，或者通过声明的方式使用
 * 例如，有一个叫deprecated的decorator，
 * 它装盒后可以像"@deprecated"这样用也可以像"@deprecated('deprecated message')"这样用
 * 2. 将decorator currying,使decorator可以接受和处理调用时传递进来的参数
 * @param handleDescriptor {Function} 描述符的处理函数
 * @param [entryArgs] {Array<*>} 额外捎带的参数(通过decorator调用注入进来)
 * @returns {Function} 真正传递给js引擎的decorator函数
 */
export function decorate (handleDescriptor, entryArgs) {
  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
    return handleDescriptor(...entryArgs, [])
  } else {
    return function (...args) {
      return handleDescriptor(...args, entryArgs)
    }
  }
}

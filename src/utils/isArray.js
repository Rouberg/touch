import is from './is'

/**
 * 判断一个数据是否是一个数组
 * 对一个数组使用typeof运算会返回object
 */
export default Array.isArray || is('array')

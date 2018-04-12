import is from './is'

/**
 * 判断一个数据是否是一个正则表达式
 * 对一下正则表达式使用typeof运算会返回object
 */
const isRegExp: (it: any) => boolean = is('regExp')
export default isRegExp

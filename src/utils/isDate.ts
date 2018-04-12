import is from './is'

/**
 * 判断一个数据是否是一个日期
 * 对一个日期使用typeof运算会返回object
 */
const isDate: (args: any) => boolean = is('date')

export default isDate

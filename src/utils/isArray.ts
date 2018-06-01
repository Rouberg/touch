import is from './is';

/**
 * 判断一个数据是否是一个数组
 * 对一个数组使用typeof运算会返回object
 */
const isArray: (args: any) => boolean = Array.isArray || is('array');
export default isArray;

/**
 * 判断一个数据是否是布尔类型
 * @param args {*} 要判断的数据
 * @returns {boolean} 是否是布尔类型
 */
export default function isBoolean (args: any): boolean {
  return typeof args === 'boolean'
}

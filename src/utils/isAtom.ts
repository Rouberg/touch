/**
 * 判断一个数据是否是否是"原子"类型
 * 原子类型这里是一系列类型的简称，如果一个类型在clone时不需要再拆分为更细小的粒度去克隆，则这里称它为原子类型。
 * @param it {*} 源数据
 * @returns {boolean} 是否为"原子"类型
 */
export default function isAtom (it: any): boolean {
  return (typeof it !== 'object' || it === null)
}

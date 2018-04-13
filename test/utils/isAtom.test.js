import isAtom from 'src/utils/isAtom'
import {testData} from '../typeTestData'

describe('#utils/isAtom', () => {
  testData.forEach(item => {
    // expected 为 true 表示原子类型
    const expected = item.type !== 'object' && item.type !== 'array'
    it(`isAtom(${item.name}) === ${expected}`, () => {
      expect(isAtom(item.value)).toBe(expected)
    })
  })
})

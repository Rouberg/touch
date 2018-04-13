import isObject from 'src/utils/isObject'
import {testData} from '../typeTestData'

describe('#utils/isObject', () => {
  testData.forEach(item => {
    const expected = item.type === 'object'
    test(`isObject(${item.name}) === ${expected}`, () => {
      expect(isObject(item.value)).toBe(expected)
    })
  })
})

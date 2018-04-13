import isString from 'src/utils/isString'
import {testData} from '../typeTestData'

describe('#utils/isString', () => {
  testData.forEach(item => {
    const expected = item.type === 'string'
    test(`isString(${item.name}) === ${expected}`, () => {
      expect(isString(item.value)).toBe(expected)
    })
  })
})

import isBoolean from 'src/utils/isBoolean'
import {testData} from '../typeTestData'

describe('#utils/isBoolean', () => {
  testData.forEach(item => {
    const expected = item.type === 'boolean'
    test(`isBoolean(${item.name}) === ${expected}`, () => {
      expect(isBoolean(item.value)).toBe(expected)
    })
  })
})

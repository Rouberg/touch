import isDate from 'src/utils/isDate'
import {testData} from '../typeTestData'

describe('#utils/isDate', () => {
  testData.forEach(item => {
    const expected = item.type === 'date'
    test(`isDate(${item.name}) === ${expected}`, () => {
      expect(isDate(item.value)).toBe(expected)
    })
  })
})

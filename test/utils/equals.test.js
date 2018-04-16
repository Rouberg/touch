import equals from 'src/utils/equals'
import {testData} from '../typeTestData'

describe('#utils/equals', () => {
  testData.forEach(datum => {
    it(`${datum.name} equals itself`, () => {
      expect(equals(datum.value, datum.value)).toBeTruthy()
    })
  })

  testData.forEach((item, k) => {
    testData.forEach((another, j) => {
      if (k !== j && !(item.equals && item.equals.includes(another.groupId)) && !(another.equals && another.equals.includes(item.groupId))) {
        it(`${item.name} not equals ${another.name}`, () => {
          expect(equals(item.value, another.value)).toBeFalsy()
        })
      }
    })
  })
})

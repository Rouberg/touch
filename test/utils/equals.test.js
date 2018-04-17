import equals from 'src/utils/equals'
import {testData} from '../typeTestData'

describe('#utils/equals', () => {
  testData.forEach(datum => {
    // 原子数据项相等测试
    it(`${datum.name} equals itself`, () => {
      expect(equals(datum.value, datum.value)).toBeTruthy()
    })
  })

  testData.forEach((item, k) => {
    testData.forEach((another, j) => {
      if (k !== j && !(item.equals && item.equals.includes(another.groupId)) && !(another.equals && another.equals.includes(item.groupId))) {
        // 原子数据项不相等测试
        it(`${item.name} not equals ${another.name}`, () => {
          expect(equals(item.value, another.value)).toBeFalsy()
          expect(equals(another.value, item.value)).toBeFalsy()
        })
      }
    })
  })

  // 复合equals
  testData.forEach((item, k) => {
    testData.forEach((another, j) => {
      if (k !== j && !(item.equals && item.equals.includes(another.groupId)) && !(another.equals && another.equals.includes(item.groupId))) {
        // 原子数据项不相等测试
        it(`{a: ${item.name},b: ${another.name}} not equals part of it`, () => {
          expect(equals({a: item.value, b: another.value}, item.value)).toBeFalsy()
          expect(equals({a: item.value, b: another.value}, another.value)).toBeFalsy()
          expect(equals({a: item.value, b: another.value}, {a: item.value})).toBeFalsy()
          expect(equals({a: item.value, b: another.value}, {b: another.value})).toBeFalsy()
          expect(equals({a: item.value, b: another.value}, {a: another.value, b: item.value})).toBeFalsy()
          expect(equals({a: item.value, b: another.value}, {b: another.value, a: item.value})).toBeTruthy()
        })
      }
    })
  })
})

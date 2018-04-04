import isBoolean from 'src/utils/isBoolean'

describe('#utils/isBoolean', () => {
  const list = [
    {
      value: 0,
      expect: false
    },
    {
      value: -0,
      expect: false
    },
    {
      value: 1,
      expect: false
    },
    {
      value: null,
      expect: false
    },
    {
      value: void 0,
      expect: false
    },
    {
      value: true,
      expect: true
    },
    {
      value: false,
      expect: true
    },
    {
      value: [],
      expect: false
    },
    {
      value: [1, 2, 3],
      expect: false
    },
    {
      value: {},
      expect: false
    },
    {
      value: /abc/,
      expect: false
    }
  ]

  Object.keys(list).forEach(key => {
    const item = list[key]
    test(`isBoolean(${item.value}) expect ${item.expect}`, () => {
      expect(isBoolean(item.value)).toBe(item.expect)
    })
  })
})

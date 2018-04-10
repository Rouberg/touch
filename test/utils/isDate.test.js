import isDate from 'src/utils/isDate'

describe('#utils/isDate', () => {
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
      expect: false
    },
    {
      value: false,
      expect: false
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
      value: {h: 1},
      expect: false
    },
    {
      value: /abc/,
      expect: false
    },
    {
      value: new Date(),
      expect: true
    },
    {
      value: '2017-06-31',
      expect: false
    },
    {
      value: '',
      expect: false
    },
    {
      value: function () {},
      expect: false
    }
  ]

  Object.keys(list).forEach(key => {
    const item = list[key]
    test(`isBoolean(${item.value}) expect ${item.expect}`, () => {
      expect(isDate(item.value)).toBe(item.expect)
    })
  })
})

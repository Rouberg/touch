export default {
  plugins: {
    autoprefixer: {
      browsers: ["> 1%", "last 2 versions", "not ie <= 8"]
    },
    'postcss-pxtorem': {
      rootValue: 14,
      unitPrecision: 5,
      propList: ['*', '!letter-spacing', '!border-radius', '!box-shadow'],
      selectorBlackList: [],
      replace: true,
      mediaQuery: false,
      minPixelValue: 5
    }
  }
}

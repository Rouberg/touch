// postCSS 配置文件
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    autoprefixer: {
      browsers: ['iOS >= 7', 'Android >= 4.1']
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

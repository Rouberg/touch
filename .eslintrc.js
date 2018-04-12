module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'standard',
  plugins: ['jest'],
  rules: {
    modules: true,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    amd: true,
    'jest/globals': true
  },
};

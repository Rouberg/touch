module.exports = {
  extends: 'standard',
  plugins: ['jest'],
  rules: {
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

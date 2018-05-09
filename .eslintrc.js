module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  env: {
    es6: true,
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  plugins: ['vue'],
  rules: {
    "indent": ["warn", 2, {"SwitchCase": 1}],
    "prefer-promise-reject-errors": 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
};

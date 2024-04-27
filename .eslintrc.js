/*
 * Eslint config file
 * Documentation: https://eslint.org/docs/user-guide/configuring/
 * Install the Eslint extension before using this feature.
 */
module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  globals: {
    wx: true,
    App: true,
    Page: true,
    getCurrentPages: true,
    getApp: true,
    Component: true,
    requirePlugin: true,
    requireMiniProgram: true,
  },
  plugins: ['prettier'],
  extends: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'no-tabs': 'error',
    'no-var': 'error',
    'no-debugger': 'warn',
  },
}

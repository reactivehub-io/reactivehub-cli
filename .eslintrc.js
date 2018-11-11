module.exports = {
  parser: 'babel-eslint',
  env: { es6: true, node: true, jest: true },
  extends: 'airbnb-base',
  parserOptions: { sourceType: 'module', ecmaVersion: 2017 },
  rules: {
    indent: ['error', 2],
    "linebreak-style": 0,
    semi: ['error', 'never'],
    'no-console': 0,
    'no-useless-escape': 0,
    'class-methods-use-this': 'off',
    'max-len': ['error', { code: 150, ignoreStrings: true }],
    'object-curly-newline': 'off',
    'prefer-destructuring': ['error', { object: true, array: false }],
    'import/no-unresolved': 0,
    'import/extensions': 0,
  }
}
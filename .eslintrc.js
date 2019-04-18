module.exports = {
  extends: [
    "airbnb-base",
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    "strict": "off",
    "func-names": "off",
    "global-require": "off",
    "no-plusplus": "off",
    "consistent-return": "off",
    "import/no-dynamic-require": "off",
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  }
}

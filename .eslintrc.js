// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  // 0表示不不处理，1表示警告，2表示错误并退出 {代码...}
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    "no-console": 2, // 禁止console
    "quotes": [0, "double", "avoid-escape"], // 单双引号
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    // 函数前面的空格 always总是需要- never 不需要  
    // 网址： https://eslint.org/
    "space-before-function-paren": ["error", "never"],
    
    'indent': [2, 4, { "SwitchCase": 1 }]
  },
  // 变量设置为 true 将允许变量被重写，或 false 将不允许被重写
  "globals": {
    "request": false,
    "var2": false
}
}

module.exports = {
  printWidth: 80, // 每行最多多少个字符换行
  tabWidth: 2, // tab缩进大小
  useTabs: false, // tab缩进
  semi: false, // 使用分号
  singleQuote: true, // 单引号
  quoteProps: 'as-needed', // 对象字面值属性名称是否需要引号
  bracketSpacing: true, // 对象前后的空格
  trailingComma: 'none', // 未尾逗号
  jsxSingleQuote: false, // JSX 属性中一致使用单引号。
  arrowParens: 'avoid', // 箭头函数参数括号
  insertPragma: false, // 是否插入@format的特殊注释，标识该文件已被格式化
  requirePragma: false,
  proseWrap: 'never', // 针对折行敏感的渲染器（Github comment），是否折行
  htmlWhitespaceSensitivity: 'strict', // 是否空格敏感
  endOfLine: 'lf' // 设置统一的行结尾样式
}

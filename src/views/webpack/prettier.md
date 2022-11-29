

## prettire文档配置

基础配置文件如下，默认以此文件为准不修改配置

```js

module.exports = {
  arrowParens: "avoid", //在单独的箭头函数参数周围包含括号
  endOfLine: "lf",
  insertPragma: false,
  bracketSameLine: false,
  jsxSingleQuote: false,
  printWidth: 80, //一行的字符数，如果超过会进行换行，默认为80
  proseWrap: "preserve",
  quoteProps: "as-needed",
  vueIndentScriptAndStyle: false, //是否缩进Vue文件中<script>和<style>标记内的代码
  requirePragma: false, //注释是否格式化
  tabWidth: 2, //一个tab代表几个空格数，默认为80
  useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
  singleQuote: false, //字符串是否使用单引号，默认为false，使用双引号
  semi: true, //行位是否使用分号，默认为true
  trailingComma: "none", //是否使用尾逗号，有三个可选值"<none|es5|all>"
  bracketSpacing: true //对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
};

```
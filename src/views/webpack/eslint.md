## eslint文档配置

基础配置文件如下，默认以此文件为准不修改配置

```js

module.exports = {
  root: true,
  env: {
    node: true
  },
  // 继承prettier的语法格式配置
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  // 主要是进行规则的配置
  rules: {
    // 可选值 warn\off\error
    // 不检测缩进 使用 prettier 检测
    // indent: ["error", 2],
    // "linebreak-style": ["warn", "unix"],
    // 引号要求双引号，支持模板语法 
    quotes: [
      "warn",
      "double",
      { avoidEscape: true, allowTemplateLiterals: true }
    ],
    semi: ["warn", "always"],   // 末尾逗号 一直有
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "error",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "error",
    "vue/multi-word-component-names": "off", 
    "no-await-in-loop": "warn", // 不允许 await在函数内部
    "no-alert": "warn", // 不允许 alert
    "no-empty-function": "error", // 不允许空函数
    "no-control-regex": 0, // 允许 正则使用控制字符
    complexity: ["error", 10], // 圈复杂度 10 
    "prettier/prettier": "warn" // prettier 格式检测
  },
  globals: {
    defineProps: "readonly",
    defineEmits: "readonly",
    defineExpose: "readonly",
    withDefaults: "readonly",
    process: "readonly",
    document: true,
    window: true,
    console: true,
    _: true
  }
};

```
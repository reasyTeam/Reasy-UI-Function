module.exports = {
  root: true,
  env: {
    node: true
  },
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
    quotes: [
      "warn",
      "double",
      { avoidEscape: true, allowTemplateLiterals: true }
    ],
    semi: ["warn", "always"],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "error",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "error",
    "vue/multi-word-component-names": "off",
    "no-await-in-loop": "warn",
    "no-alert": "warn",
    "no-empty-function": "error",
    "no-control-regex": 0,
    complexity: ["error", 10],
    "prettier/prettier": "warn"
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
    _: true,
    transCompText: true
  }
};

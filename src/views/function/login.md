## 登录

用于登录页面配置项，支持配置用户名，密码，语言选择等。

## 按需引用

```js
import { Base, Login } from "@reasy-team/reasy-ui-function";

Vue.use(Base);
Vue.use(Login);
```

## 基本示例

主要通过 formConfig 配置选项的处理。

示例如下
::: demo

```html
<Login
  name="login"
  text="login"
  is-first
  is-lang
  autofocus
  :formData="formData"
  :formConfig="formConfig"
  action="loginAuth"
  :beforeSubmit="beforeSubmit"
>
</Login>

<script>
  export default {
    data() {
      return {
        formData: {
          user: "admin"
        },
        formConfig: {
          username: {
            field: "user",
            placeholder: "请输入您的用户名",
            maxlength: 5,
            valid: { type: "byteLen", args: [3, 5] },
            icon: "v-icon-add"
          },
          password: {
            field: "pwd",
            valid: [{ type: "byteLen", args: [3, 5] }]
          }
        }
      };
    },

    methods: {
      beforeSubmit(data) {
        console.log(data);
      }
    }
  };
</script>
```

:::

## Props

| 参数         | 说明                                                                    | 类型                             | 可选值 | 默认值 |
| ------------ | ----------------------------------------------------------------------- | -------------------------------- | ------ | ------ |
| name         | 组件 ID                                                                 | `String`                         | -      | login  |
| isName       | 是否需要用户名                                                          | `Boolean`                        | -      | true   |
| isFirst      | 是否首次登陆，是则显示确认密码框                                        | `Boolean`                        | -      | false  |
| text         | 登录按钮文本                                                            | `String`                         | -      | 登录   |
| isLang       | 是否支持语言切换                                                        | `Boolean`                        | -      | false  |
| langLabel    | 语言选择框的 label                                                      | `String`                         | -      | 语言   |
| formData     | 用户名密码对象                                                          | `Object`                         | -      | {}     |
| formConfig   | 表单组件相关配置,                                                       | `Object`                         | -      | {}     |
| size         | -                                                                       | `String`                         | -      | M      |
| action       | -                                                                       | `String`                         | -      | -      |
| encrypt      | 登录请求地址 密码加密算法，默认提供 MD5 和 BASE64，支持自定义传空不加密 | `Function` / `Object` / `String` | -      | -      |
| beforeSubmit | -                                                                       | `Function`                       | -      | -      |

### formConfig 对象参数说明

对象中默认包含 username,password,passwordCfm 的配置。

username 配置
| 参数        | 说明         | 类型           | 可选值 | 默认值       |
| ----------- | ------------ | -------------- | ------ | ------------ |
| field       | 登录的字段名 | `String`       | -      | username     |
| label       | 标题文本     | `String`       | -      | 用户名       |
| placeholder | 输入框提示   | `String`       | -      | 请输入用户名 |
| maxlength   | 标题文本     | `Number`       | -      | 63           |
| valid       | 数据校验     | `Object/Array` | -      | -            |
| icon        | 前缀图标     | `String`       | -      | -            |
| disabled    | 是否禁用     | `Boolean`      | -      | false        |
| autofocus   | 是否聚焦     | `Boolean`      | -      | false        |

password 配置
| 参数        | 说明         | 类型           | 可选值 | 默认值     |
| ----------- | ------------ | -------------- | ------ | ---------- |
| field       | 登录的字段名 | `String`       | -      | password   |
| label       | 标题文本     | `String`       | -      | 密码       |
| placeholder | 输入框提示   | `String`       | -      | 请输入密码 |
| maxlength   | 标题文本     | `Number`       | -      | 63         |
| valid       | 数据校验     | `Object/Array` | -      | -          |
| icon        | 前缀图标     | `String`       | -      | -          |
| disabled    | 是否禁用     | `Boolean`      | -      | false      |
| autofocus   | 是否聚焦     | `Boolean`      | -      | false      |

passwordCfm 配置
| 参数        | 说明         | 类型           | 可选值 | 默认值         |
| ----------- | ------------ | -------------- | ------ | -------------- |
| field       | 登录的字段名 | `String`       | -      | passwordCfm    |
| label       | 标题文本     | `String`       | -      | 确认密码       |
| placeholder | 输入框提示   | `String`       | -      | 请确认输入密码 |
| maxlength   | 标题文本     | `Number`       | -      | 63             |
| valid       | 数据校验     | `Object/Array` | -      | -              |
| icon        | 前缀图标     | `String`       | -      | -              |
| disabled    | 是否禁用     | `Boolean`      | -      | false          |
| autofocus   | 是否聚焦     | `Boolean`      | -      | false          |

## Events

<!-- @vuese:login:events:start -->

| 事件名   | 说明     | 参数 |
| -------- | -------- | ---- |
| submited | 提交处理 | -    |

<!-- @vuese:login:events:end -->

## Slots

<!-- @vuese:login:slots:start -->

| slot 名称 | 说明                       | 默认 slot 内容 |
| --------- | -------------------------- | -------------- |
| default   | 保存按钮上面密码下面的位置 | -              |

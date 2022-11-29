## 备份下载

用于备份或导出或下载，点击按钮即进行下载的处理。

## 按需引用

```js
import { Base,Backup } from "@reasy-team/reasy-ui-function";

Vue.use(Base);
Vue.use(Backup);
```

## 基本示例

只需要配置 action 就可以下载。

示例如下
::: demo

```html
<backup no-id action="cgi-bin/DownloadCfg/RouterCfm.cfg" text="备份"></backup>
```

:::

## 配置数据

可以配置相应的下发数据

示例如下
::: demo

```html
<backup
  no-id
  action="cgi-bin/DownloadCfg/RouterCfm.cfg"
  text="备份"
  :data="data"
></backup>

<script>
  export default {
    data() {
      return {
        data: {
          upload: true,
          ip: "192.168.2.2"
        }
      };
    }
  };
</script>
```

:::

## 按钮类型配置

通过`btnType`,`size`,`icon`改变按钮的显示, disabled 禁用按钮。<br/>
`btnType` 同按钮的类型。参考组件按钮的类型。
`size`,按钮的大小，同组件的大小选项。
`icon`,按钮的图标。

::: demo

```html
<backup
  no-id
  action="cgi-bin/DownloadCfg/RouterCfm.cfg"
  text="备份"
  size="L"
  btn-type="primary"
  icon="v-icon-add"
  disabled
></backup>
```

:::

## Props

| 参数     | 说明             | 类型      | 可选值   | 默认值   |
| -------- | ---------------- | --------- | -------- | -------- |
| noId     | 组件是否没有 id  | `Boolean` | -        | -        |
| name     | 组件 id          | `String`  | -        | -        |
| action   | 备份下载地址     | `String`  | -        | -        |
| text     | 配置备份按钮文本 | `String`  | -        | 备份配置 |
| data     | 备份附带的数据   | `Object`  | -        | -        |
| type     | 备份的下载方式   | `String`  | get/post | get      |
| size     | 按钮大小         | `String`  | S/M/L    | M        |
| btnType  | 按钮类型         | `String`  | -        | info     |
| icon     | 按钮图标         | `String`  | -        | -        |
| disabled | 是否禁用         | `Boolean` | -        | false    |

## Slots

| slot 名称 | 说明 | 默认 slot 内容 |
| --------- | ---- | -------------- |
| default   | -    | -              |

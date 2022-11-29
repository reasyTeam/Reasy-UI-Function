## 上传

用于需要选择文件上传的功能，例如升级，导入等功能。

## 按需引用

```js
import { Base, Upgrade } from "@reasy-team/reasy-ui-function";

Vue.use(Base);
Vue.use(Upgrade);
```

## 基本示例

导入升级有两种类型，默认类型是只显示操作按钮，点击操作按钮后，调用浏览器的文件选择后，自动上传文件。
::: demo

```html
<upgrade
  ref="upload"
  no-id
  action="/cgi-bin/upgrade"
  accept=".cfg"
  size="L"
  :type="0"
  ><template #browse>选择文件</template>升级</upgrade
>
```

:::

### 支持两种类型

通过`type`配置类型，0 表示纯按钮类型， 1 表示输入框选择和提交按钮分开的类型

::: demo

```html
<upgrade
  ref="upload"
  no-id
  action="/cgi-bin/upgrade"
  accept=".cfg"
  size="S"
  :type="type"
  ><template #browse>选择文件</template>升级</upgrade
>
<div class="margin-top">
  <v-form-item label="组件类型">
    <v-radio name="radio" v-model="type" :options="[0, 1]"></v-radio>
  </v-form-item>
</div>
<script>
  export default {
    data() {
      return {
        type: 0
      };
    }
  };
</script>
```

:::

## 按钮类型配置

通过`btnType`,`size`,`icon`改变按钮的显示。
`btnType` 同按钮的类型。参考组件按钮的类型。
`icon`,按钮的图标， 默认为`icon-upload`，为空时不显示按钮。
`size`,按钮的大小，同组件的大小选项。

## 上传成功自动显示进度条

`success-progress`为`true`时可以提交文件成功后自动显示进度条。注意，使用进度条需手动引入进度条功能组件。
::: demo

```html
<upgrade
  ref="upload"
  no-id
  action="/cgi-bin/upgrade"
  accept=".cfg"
  size="L"
  :type="type"
  success-progress
  :progress-cfg="progressCfg"
  ><template #browse>选择文件</template>升级</upgrade
>
<script>
  export default {
    data() {
      return {
        type: 0,
        progressCfg: {
          time: 5
        }
      };
    }
  };
</script>
```

:::

## 手动显示进度条

通过修改`show-progress` 为`true`可以手动显示进度条
::: demo

```html
<upgrade
  ref="upload"
  no-id
  action="/cgi-bin/upgrade"
  accept=".cfg"
  size="L"
  :type="type"
  :before-upload="beforeUpload"
  :on-success="onSuccess"
  :show-progress="showProgress"
  :progress-cfg="progressCfg"
  >升级</upgrade
>
<script>
  export default {
    data() {
      return {
        type: 0,
        showProgress: false,
        progressCfg: {
          time: 5
        }
      };
    },
    methods: {
      beforeUpload() {
        this.showProgress = true;
        return true;
      },
      onSuccess() {
        setTimeout(() => {
          this.$set(this.progressCfg, "status", "success");
        }, 2000);
      }
    }
  };
</script>
```

:::

## 进度条配置

`progressCfg` 可以配置进度条相关的参数。具体配置项和用法参考 progress-bar 功能组件
::: demo

```html
<upgrade
  ref="upload"
  no-id
  action="/cgi-bin/upgrade"
  accept=".cfg"
  size="L"
  :type="0"
  success-progress
  :progressCfg="progressCfg"
  >升级</upgrade
>
<script>
  export default {
    data() {
      return {
        progressCfg: {
          dialogTitle: "升级",
          dialogWidth: 640,
          topTitle: "正在升级",
          leftTitle: "进度",
          tip: "升级过程中，请勿操作设备",
          time: 5,
          autoStart: true,
          startTime: 60
        }
      };
    }
  };
</script>
```

:::

## Props

| 参数            | 说明                                             | 类型       | 可选值 | 默认值 |
| --------------- | ------------------------------------------------ | ---------- | ------ | ------ |
| noId            | 组件是否没有 id                                  | `Boolean`  | -      | -      |
| name            | 组件 id                                          | `String`   | -      | -      |
| action          | 文件上传地址                                     | `String`   | -      | -      |
| accept          | 接受上传的文件类型                               | `String`   | -      | .cfg   |
| type            | 0:只显示按钮，1：显示附件浏览组件 2:弹窗预留显示 | `Number`   | 0/1    | 0      |
| disabled        | 是否禁用                                         | `Boolean`  | -      | -      |
| icon            | 按钮图标                                         | `String`   | -      | -      |
| size            | 按钮大小                                         | `String`   | -      | M      |
| btnType         | 按钮类型                                         | `String`   | -      | info   |
| isInline        | type 为 1 时，上传按钮显示在行内 or 下方         | `Boolean`  | -      | true   |
| limitSize       | 文件限制大小                                     | `Number`   | -      | 0      |
| data            | 上传时附带的数据，                               | `Object`   | -      | -      |
| onSuccess       | 上传成功                                         | `Function` | -      | -      |
| onChange        | 切换文件                                         | `Function` | -      | -      |
| beforeUpload    | 上传前处理事件，返回 false 不会上传文件          | `Function` | -      | -      |
| showProgress    | 是否显示进度条                                   | `Boolean`  | -      | false  |
| successProgress | 文件上传成功后自动显示进度条                     | `Boolean`  | -      | false  |
| progressCfg     | 进度条参数配置                                   | `Object`   | -      | {}     |

### progressCfg 参数

参考进度条组件 progress-bar

### Events

| 事件名  | 说明             | 参数           |
| ------- | ---------------- | -------------- |
| success | 进度条成功后处理 | toUrl:跳转 URL |

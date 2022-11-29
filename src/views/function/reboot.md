
## 重启/恢复出厂
用于重启和恢复出厂功能，自带进度条处理。


## 按需引用

```js
import { Base, RebootBtn, ProgressBar } from "@reasy-team/reasy-ui-function";

Vue.use(Base);
Vue.use(RebootBtn);
Vue.use(ProgressBar);
```

## 基本示例

可以提交处理，并成功时显示进度条。

默认需要配置接口和传输数据
::: demo
``` html
<reboot-btn action="goform/setModules" :postData="postData"  confirmContent="你确认重启吗" name="reboot"></reboot-btn>
<script>
export default {
  data() {
    return {
      postData: {
        reboot: true
      }
    };
  }
};
</script>
```
:::

## 按钮文字
::: demo
``` html
<reboot-btn 
 action="goform/setModules" 
 :postData="postData"
 btnText="恢复出厂"
 confirmContent="你确认恢复出厂吗"
 name="reset"
></reboot-btn>
<script>
export default {
  data() {
    return {
      postData: {
        reboot: true
      }
    };
  }
};
</script>
```
:::

## 弹窗显示
可以配置确认弹窗的显示文字。
`confirmTitle` 可以配置弹窗的标题，默认'确认'；
`confirmContent` 可以配置内容;
`confirmOkText `可以配置确认弹窗确定按钮文字;
`confirmCancelText` 可以配置确认弹窗取消按钮文字。
::: demo
``` html
<reboot-btn 
 action="goform/setModules" 
 :postData="postData"
 confirmTitle="确认重启"
 confirmContent="你确认重启吗"
 confirmOkText="重启"
 confirmCancelText="取消重启"
 name="reboot1"
></reboot-btn>
<script>
export default {
  data() {
    return {
      postData: {
        reboot: true
      }
    };
  }
};
</script>
```
:::

## 进度条配置
progressProp 可以配置进度条相关的参数。
::: demo
``` html
<reboot-btn 
 action="goform/setModules" 
 :postData="postData"
 confirmContent="你确认重启吗"
 :progressProp="progressProp"
 name="reboot2"
></reboot-btn>
<script>
export default {
  data() {
    return {
      postData: {
        reboot: true
      },
      progressProp:{
        leftTitle:"重启中",
        tip:"重启中，请不要关机"
      }
    };
  }
};
</script>
```
:::

## Props

| 参数              | 说明                 | 类型       | 可选值  | 默认值               |
| ----------------- | -------------------- | ---------- | ------- | -------------------- |
| action            | 操作接口调用         | `String`   | `false` | -                    |
| postData          | 操作传输数据         | `Object`   | `false` | {}                   |
| btnText           | 操作按钮文字         | `String`   | `false` | _("重启")            |
| confirmTitle      | 确认弹窗标题         | `String`   | `false` | _("确认标题")        |
| confirmContent    | 确认弹窗内容         | `String`   | `false` | _("确认内容")        |
| confirmOkText     | 确认弹窗确定按钮文字 | `String`   | `false` | _("确定")            |
| confirmCancelText | 确认弹窗取消按钮文字 | `String`   | `false` | _("取消")            |
| successHandle     | 成功处理             | `Function` | `false` | () => {return true;} |
| errorHandle       | 错误处理             | `Function` | `false` | () => {return true;} |
| progressProp      | 进度条的prop         | `Object`   | `false` | {}                   |

### progressProp参数

参考进度条组件progress-bar

## Events

| 事件名 | 说明     | 参数 |
| ------ | -------- | ---- |
| error  | 触发失败 | -    |
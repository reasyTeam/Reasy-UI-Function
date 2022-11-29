## 进度条

用于展示弹窗进度条，自动获取数据，并完成跳转操作，多用于重启，恢复出厂等功能。


## 按需引用

```js
import { Base, ProgressBar } from "@reasy-team/reasy-ui-function";

Vue.use(Base);
Vue.use(ProgressBar);
```


## 基本示例

可以配置进度条的显示，和进度条时间，以及部分跳转配置。
使用 `v-if` 控制进度条。
::: demo

``` html

<v-button @click="showProgress = !showProgress" name="button">显示进度条</v-button>

<progress-bar
  v-if="showProgress"
  name="progress"
></progress-bar>

<script>
export default {
  data() {
    return {
      showProgress: false,
    };
  }
};
</script>
```
:::

### 配置默认开始进度条
`autoStart`默认组件开始的时候启用，关闭后可以自行控制组件的进度条开始和结束。
startProgress 控制开始。
stopProgress 控制结束。
closeDialog 控制关闭弹窗。

::: demo

``` html

<v-button @click="startProgress"  name="button1">显示进度条, 3秒后停止</v-button>

<progress-bar
  ref="progress"
  :autoStart="false"
  name="progress1"
></progress-bar>

<script>
export default {
  data() {
    return {
      showProgress: false,
    };
  },
  methods:{
    startProgress(){
      this.$refs.progress.startProgress();

      setTimeout(()=>{
        this.$refs.progress.stopProgress();
        setTimeout(()=>{
          this.$refs.progress.closeDialog();
        },3000)
      },3000)
    }
  }
};
</script>
```
:::
### 配置弹窗信息的显示
支持配置弹窗标题和宽度，进度条左侧，上方，和下方的文字信息，根据使用自行配置。

`dialogTitle`：配置弹窗的标题，为空时不显示标题，
`dialogWidth`：配置弹窗的标题，
`leftTitle`：配置进度条左侧的信息，
`topTitle`：配置进度条上方的信息，
`tip`：配置进度条下方的信息。

示例如下
::: demo

``` html
<v-form>
  <v-form-item
    label="dialogTitle弹窗标题"
    :required="false"
    description="为空时不显示标题"
  >
    <v-input v-model="data.dialogTitle" name="dialogTitle"></v-input>
  </v-form-item>
  <v-form-item label="dialogWidth弹窗宽度" :required="false">
    <v-input v-model="data.dialogWidth" name="dialogWidth"></v-input>
  </v-form-item>
  <v-form-item label="leftTitle左边标题" :required="false">
    <v-input v-model="data.leftTitle" name="leftTitle"></v-input>
  </v-form-item>
  <v-form-item label="tip下面描述信息" :required="false">
    <v-input v-model="data.tip" name="tip"></v-input>
  </v-form-item>
  <v-form-item label="topTitle上边标题" :required="false">
    <v-input v-model="data.topTitle" name="topTitle"></v-input>
  </v-form-item>
</v-form>

<v-button @click="showProgress = !showProgress" name="showProgress">显示进度条</v-button>

<progress-bar
  v-if="showProgress"
  :leftTitle="data.leftTitle"
  :topTitle="data.topTitle"
  :tip="data.tip"
  :dialogTitle="data.dialogTitle"
  :dialogWidth="+data.dialogWidth"
  :time="+data.time"
  :startTime="+data.startTime"
  :status="data.status"
  :ip="data.ip"
  :domain="data.domain"
  :protocol="data.protocol"
  name="progress2"
></progress-bar>

<script>
export default {
  data() {
    return {
      showProgress: false,
      data: {
        leftTitle: "左边标题",
        topTitle: "",
        tip: "描述信息",
        dialogTitle: "重启进度",
        dialogWidth: "",
        time: "60",
        startTime: "60",
        status: "success",
        ip: "",
        domain: "",
        protocol: ""
      }
    };
  }
};
</script>
```

:::

### 配置进度条相关配置
支持配置时间，开始请求百分比，状态，以及跳转配置。

::: demo

``` html
<v-form>
  <v-form-item label="time总时间 单位s" :required="false">
    <v-input v-model="data.time" name="time"></v-input>
  </v-form-item>

  <v-form-item label="startTime 开始请求百分比" :required="false">
    <v-input v-model="data.startTime" name="startTime"></v-input>
  </v-form-item>

  <v-form-item label="status状态" :required="false">
    <v-radio
      v-model="data.status"
      :options="['loading', 'success', 'error']"
      name="status"
    ></v-radio>
  </v-form-item>

  <v-form-item label="ip跳转ip">
    <v-input v-model="data.ip" name="ip"></v-input>
  </v-form-item>

  <v-form-item label="domain跳转域名">
    <v-input v-model="data.domain" name="domain"></v-input>
  </v-form-item>
  <v-form-item label="protocol跳转协议">
    <v-radio v-model="data.protocol" :options="['http', 'https']" name="protocol"></v-radio>
  </v-form-item>
</v-form>

<v-button @click="showProgress = !showProgress" name="showProgress1">显示进度条</v-button>

<progress-bar
  v-if="showProgress"
  :leftTitle="data.leftTitle"
  :topTitle="data.topTitle"
  :tip="data.tip"
  :dialogTitle="data.dialogTitle"
  :dialogWidth="+data.dialogWidth"
  :time="+data.time"
  :startTime="+data.startTime"
  :status="data.status"
  :ip="data.ip"
  :domain="data.domain"
  :protocol="data.protocol"
  name="progress3"
></progress-bar>

<script>
export default {
  data() {
    return {
      showProgress: false,
      data: {
        leftTitle: "左边标题",
        topTitle: "",
        tip: "描述信息",
        dialogTitle: "重启进度",
        dialogWidth: "",
        time: "60",
        startTime: "60",
        status: "success",
        ip: "",
        domain: "",
        protocol: ""
      }
    };
  }
};
</script>
```

:::

### 配置成功后不默认跳转
`isAutoJump`配置是否默认跳转，默认为`true`。若自动跳转，会跳转到获取对应的ip或域名或当前`host`的`login`页面。若为`false`，则不自动跳转，但弹窗会关闭，并触发emit`success`。

::: demo

``` html
<v-button @click="showProgress = !showProgress" name="showProgress2">显示进度条</v-button>

<progress-bar
  v-if="showProgress"
  :leftTitle="data.leftTitle"
  :topTitle="data.topTitle"
  :tip="data.tip"
  :isAutoJump="false"
   :time="10"
  @success="success"
   name="progress4"
></progress-bar>

<script>
export default {
  data() {
    return {
      showProgress: false,
      data: {
        leftTitle: "左边标题",
        topTitle: "",
        tip: "描述信息",
      }
    };
  },
  methods:{
    success(){
      this.$message.success("成功了")
    }
  }
};
</script>
```

:::


## Props

| 参数         | 说明                                                                                             | 类型      | 可选值                  | 默认值  |
| ------------ | ------------------------------------------------------------------------------------------------ | --------- | ----------------------- | ------- |
| dialog-title | 弹窗标题                                                                                         | `String`  | -                       | 进度    |
| dialog-width | 弹窗宽度                                                                                         | `Number`  | -                       | 640     |
| top-title    | 进度条上面标题                                                                                   | `String`  | -                       | -       |
| left-title   | 进度条左边标题                                                                                   | `String`  | -                       | -       |
| tip          | 进度条提示语                                                                                     | `String`  | -                       | -       |
| time         | 进度条总时间，单位秒                                                                             | `Number`  | -                       | 60      |
| autoStart    | 是否自动启动进度条                                                                               | `Boolean` | -                       | true    |
| start-time   | 进度 stratTime% 时开始获取是否重启                                                               | `Number`  | -                       | 60      |
| status       | 进度条状态：success, error, loading                                                              | `String`  | success, error, loading | loading |
| ip           | 获取和跳转ip，配置ip后，只获取配置ip后的                                                         | `String`  | -                       | -       |
| domain       | 配置跳转域名， 若配置域名 则和ip同时获取，但是优先ip，因为域名可能不生效，所以域名是备选有限方案 | `String`  | -                       | -       |
| is-auto-jump | 是否成功自动跳转，默认是自动跳转                                                                 | `Boolean` | -                       | true    |
| protocol     | 协议 可以配置http 或 https                                                                       | `String`  | -                       | -       |



## Events

| 事件名  | 说明             | 参数          |
| ------- | ---------------- | ------------- |
| success | 进度条成功后处理 | toUrl:跳转URL |





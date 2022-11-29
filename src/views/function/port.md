


## 端口展示
用于展示端口信息和状态。

## 按需引用

```js
import {Base, Port } from "@reasy-team/reasy-ui-function";

Vue.use(Base);
Vue.use(Port);
```


## 基本示例
可以直接配置端口的数据`list`。

`list`的个数，就是端口的个数，`list`的每一项就是端口的配置。

`list`中每一个都可以配置如下几项

`status`是端口的状态，
`name`是端口的名称，
`icon`是端口的图标。

::: demo

``` html
<v-form>
  <v-form-item label="端口个数">
    <v-input v-model="formData.portNums" name="portNums1"></v-input>
  </v-form-item>
</v-form>

<port
  :list="list"
></port>

<script>
export default {
  data() {
    return {
      formData: {
        portNums: 5,
      }
    };
  },
  computed: {
    list() {
      return Array.from({ length: this.formData.portNums }, () => {
        return { status: Math.random() > 0.5 };
      });
    }
  }
};
</script>

```
:::

## 支持配置wan的数据生成名称
可以根据配置的数据自动计算名称。

`startPortIndex`： 可以配置端口的序号，
`hasIPTV`： 判断最后一个是不是iptv，
`minWanNum`：最小的wan的个数，默认1个。
`maxWanNum`：最大的wan的个数，默认3个。
`wanNum`：当前wan的个数，默认0个。

::: demo

``` html
<v-form>
  <v-form-item label="端口个数">
    <v-input v-model="formData.portNums" name="portNums"></v-input>
  </v-form-item>

  <v-form-item label="startPortIndex">
    <v-input v-model="formData.startPortIndex" name="startPortIndex"></v-input>
  </v-form-item>
  <v-form-item label="是否有iptv" description="iptv默认在最后一个">
    <v-radio v-model="formData.hasIPTV" :options="[true, false]" name="hasIPTV"></v-radio>
  </v-form-item>
  <v-form-item label="最小wan的个数">
    <v-input v-model="formData.minWanNum" name="minWanNum"></v-input>
  </v-form-item>
  <v-form-item label="最大wan的个数">
    <v-input v-model="formData.maxWanNum" name="maxWanNum"></v-input>
  </v-form-item>
    <v-form-item label="当前wan的个数">
    <v-input v-model="formData.wanNum" name="wanNum"></v-input>
  </v-form-item>
</v-form>

<port
  :list="list"
  :icon="formData.icon"
  :startPortIndex="formData.startPortIndex"
  :hasIPTV="formData.hasIPTV"
  :minWanNum="+formData.minWanNum"
  :maxWanNum="+formData.maxWanNum"
  :wanNum="+formData.wanNum"
></port>

<script>
export default {
  data() {
    return {
      formData: {
        portNums: 5,
        icon: "icon-port",
        startPortIndex: 1,
        hasIPTV: true,
        minWanNum: 1,
        maxWanNum: 4,
        wanNum:2,
      }
    };
  },
  computed: {
    list() {
      return Array.from({ length: this.formData.portNums }, () => {
        return { status: Math.random() > 0.5 };
      });
    }
  }
};
</script>
```

:::

## 支持统一配置所有端口的图标
可以统一配置端口图标等，端口内部的配置优先。
icon：所有的端口的图标。

示例如下
::: demo

``` html
<v-form>
  <v-form-item label="icon">
    <v-radio
      v-model="formData.icon"
      :options="['icon-port', 'icon-port2']"
      name="icon1"
    ></v-radio>
  </v-form-item>
</v-form>

<port
  :list="list"
  :icon="formData.icon"
></port>

<script>
export default {
  data() {
    return {
      formData: {
        portNums: 5,
        icon: "icon-port",
        startPortIndex: 1,
        hasIPTV: true,
        minWanNum: 1,
        maxWanNum: 4
      }
    };
  },
  computed: {
    list() {
      return Array.from({ length: this.formData.portNums }, () => {
        return { status: Math.random() > 0.5 };
      });
    }
  }
};
</script>
```

:::


## Props

| 参数           | 说明                                   | 类型      | 可选值 | 默认值    |
| -------------- | -------------------------------------- | --------- | ------ | --------- |
| startPortIndex | 开始的序号值                           | `Number`  | -      | 1         |
| icon           | 通用的端口图标                         | `String`  | -      | icon-port |
| list           | 端口详细配置项，数组对象，参考配置说明 | `Array`   | -      | []        |
| has-iptv       | 是否有iptv ，如果有就放在最后一位      | `Boolean` | -      | false     |
| min-wan-num    | 最小的wan的个数                        | `Number`  | -      | 1         |
| max-wan-num    | 最大的wan的个数                        | `Number`  | -      | 3         |
| wan-num        | 当前wan的个数 wanNum                   | `Number`  | -      | 0         |

### list 数组对象参数说明
| 参数   | 说明         | 类型      | 可选值 | 默认值    |
| ------ | ------------ | --------- | ------ | --------- |
| name   | 当前端口名称 | `String`  | -      | -         |
| icon   | 当前端口图标 | `String`  | -      | icon-port |
| status | 当前端口状态 | `Boolean` | -      | false     |
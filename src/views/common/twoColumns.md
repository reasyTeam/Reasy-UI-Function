
## 两列布局
用于单行或多行的两列布局展示。多行时，左侧信息等宽。

## 按需引用
引入后，支持`v-col-layout`组件以及`col-list`组件。
```js
import { Base, Vcol } from "@reasy-team/reasy-ui-function";

Vue.use(Base);
Vue.use(Vcol);
```

## 单行两列布局
右侧的值可以设置数组进行换行显示；
`color`用来设置右侧值的文字颜色；
`gap`用来设置右侧值距离左侧的间距；
`align`设置对齐方式；
`labelWidth`和`valueWidth`用来设置宽度。

::: demo

``` html

  <v-col-layout>
    <template #label> 使用 label slot </template>
    <div>我的描述</div>
  </v-col-layout>

  <v-col-layout color="pink" :value="value">
    <template #label> 配置颜色 </template>
  </v-col-layout>

  <v-col-layout label="姓名" value="配置了gap" :gap="20"></v-col-layout>

  <v-col-layout
    :labelWidth="80"
    :valueWidth="200"
    align="top"
    label="个性签名"
    value="我聆听沉寂已久的心情清晰透明 就像美丽的风景"
  ></v-col-layout>

<script>
export default {
  data() {
    return {
      value: ["a pretty girl", "a kind people", "good man"],
      introduce: "is life always this hard or is it just when you are a kid"
    };
  }
};
</script>
```
::: 

## 多行两列布局
和单行布局一样；
`color`用来设置右侧值的文字颜色；
`gap`用来设置右侧值距离左侧的间距；
`align`设置对齐方式；
`labelWidth`和`valueWidth`用来设置宽度。
::: demo

``` html

<col-list :valueWidth="100" :space="20">
  <v-col-layout
    label="姓名"
    value="玛蒂尔达"
    color="purple"
  ></v-col-layout>
  <v-col-layout color="pink" :value="value">
    <template #label>
      <strong>兴趣爱好</strong>
    </template>
  </v-col-layout>
  <v-col-layout
    label="一句话介绍自己"
    :value="introduce"
    color="green"
  ></v-col-layout>
</col-list>
<script>
export default {
  data() {
    return {
      value: ["a pretty girl", "a kind people", "good man"],
      introduce: "is life always this hard or is it just when you are a kid"
    };
  }
};
</script>


::: 
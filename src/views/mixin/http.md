## http

用于封装 http 请求的处理，主要封装了设置和获取请求的一些通用处理。

## 按需引入

引入配置的时候，可以传入配置项，修改一些项目通用的基础配置。

```js
import Http from "@reasy-team/reasy-ui-function/dist/http.js";

Vue.use(Http，{
  // 错误的信息对象
  commonErrMsg: {},
  // 获取的数据的接口
  getModulesUrl: "/goform/getModules",
  // 设置的统一的数据接口
  setModulesUrl: "/goform/setModules",
  // 设置返回的字段名
  errorCodeKey: "errCode",
  // 成功的状态码
  successCode: 0,
  // 信息的提示方式，此配置必须是挂载在vue上的，而且必须拥有成功和失败的错方法
  msgHintType: "$notify",
  // 失败的默认提示
  defaultErrMsg: _("保存失败"),
  // 成功的默认提示
  defaultSuccessMsg: _("保存成功")
});

```

## 使用配置

http 的相关方法，都挂在在 `vue.prototype` 上面，支持`$getModules`,`$setModules`,`$get`,`$post`,`$setHttpConfig` 方法。
使用时，直接使用`this.xxx`即可。

::: demo

```html
<v-form>
  <v-form-item label="getModules">
    <v-checkbox-group v-model="modules" :options="options"  name="modules"></v-checkbox-group>
    <v-button @click="getModule" size="S"  name="getModule">获取</v-button>
  </v-form-item>
  <v-form-item label="结果"> {{ res }} </v-form-item>
  <v-form-item label="setModules">
    <v-radio v-model="setModuleName" :options="options" name="setModuleName"></v-radio>
  </v-form-item>

  <v-form-item label="successMsg">
    <v-radio v-model="successMsg" :options="successMsgOptions" name="successMsg"></v-radio>
  </v-form-item>

  <v-form-item
    label="successCode"
    description="一般不用单独配置，可以整个项目全局配置"
  >
    <v-radio v-model="successCode" :options="[0, 1]" name="successCode"></v-radio>
  </v-form-item>

  <v-form-item label="errorMsg">
    <v-radio v-model="errorMsg" :options="errorMsgOptions" name="errorMsg"></v-radio>
  </v-form-item>

  <v-form-item label="0时候的失败的词条" description="自定义错误对象">
    <v-input v-model="costomError0" name="costomError0"></v-input>
  </v-form-item>

  <v-form-item label="setModules">
    <v-button @click="setModule" size="S" name="setModule">设置</v-button>
  </v-form-item>
  <v-form-item label="结果"> {{ resSet }} </v-form-item>
</v-form>

<script>
  export default {
    data() {
      return {
        modules: ["wanRate"],
        setModuleName: "wanRate",
        res: "",
        resSet: "",
        successMsg: false,
        errorMsg: false,
        costomError0: "0也可以是失败啦",
        successCode: 0,
        successMsgOptions: [
          "成功啦",
          "是的成功了",
          { value: false, label: "不提示成功哦" }
        ],
        errorMsgOptions: [
          "失败啦",
          "是的失败了",
          { value: false, label: "不提示失败哦" }
        ],
        options: ["wanRate", "workMode", "apStatus"]
      };
    },
    methods: {
      getModule() {
        this.$getModules(this.modules).then(res => {
          // 获取数据
          this.res = res;
        });
      },
      setModule() {
        let { successMsg, errorMsg, costomError0 } = this;
        this.$setModules(
          { [this.setModuleName]: {} },
          {
            successMsg,
            errorMsg,
            costomErrorObj: { 0: costomError0 }
          }
        ).then(res => {
          // 获取数据
          this.resSet = res;
        });
      }
    },
    watch: {
      successCode(val) {
        this.$setHttpConfig({ successCode: val });
      }
    }
  };
</script>
```

:::

## 获取模块数据 getModule

使用 $getModules 获取多模块数据，同时返回多个模块的数据。适配模块化接口。
参数支持对象或数组，如果是对象则不进行转换，直接调用 post 方式获取
若是数据是数组则，对数组进行转换成可用的对象。

::: demo

```html
<v-form>
  <v-form-item label="对象形式">
    <v-button @click="getObjectModule" size="S" name="getObjectModule">获取</v-button>
  </v-form-item>
  <v-form-item label="数组形式">
    <v-button @click="getArrModule" size="S" name="getArrModule">获取</v-button>
  </v-form-item>
  <v-form-item label="数组中对象形式">
    <v-button @click="getArrObjModule" size="S" name="getArrObjModule">获取</v-button>
  </v-form-item>
  <v-form-item label="结果"> {{ res }} </v-form-item>
</v-form>

<script>
  export default {
    data() {
      return {
        res: null
      };
    },
    methods: {
      getObjectModule() {
        let modules = {
          wanRate: "",
          workMode: ""
        };
        this.$getModules(modules).then(res => {
          // 获取数据
          this.res = res;
        });
      },

      getArrModule() {
        let modules = ["wanRate", "workMode"];
        this.$getModules(modules).then(res => {
          // 获取数据
          this.res = res;
        });
      },
      getArrObjModule() {
        let modules = [
          {
            module: "wanRate",
            arg1: ""
          },
          "workMode"
        ];
        this.$getModules(modules).then(res => {
          // 获取数据
          this.res = res;
        });
      }
    }
  };
</script>
```

:::

## 设置模块数据 setModules

可以使用`$setModules`设置模块数据，参数包含两项，`submitdata`配置提交数据，和 options 对象。
`options`中可以包含以下几项。
`successMsg` 字符串格式，成功词条，为 false 时不提示成功，
`errorMsg` 字符串格式，失败词条，为 false 时不提示失败，
`costomErrorObj` 对象格式 错误提示对象，不配置时使用通用的。

::: demo

```html
<v-form>
  <v-form-item label="对象形式">
    <v-button @click="getObjectModule" size="S" name="getObjectModule1">获取</v-button>
  </v-form-item>
  <v-form-item label="数组形式">
    <v-button @click="getArrModule" size="S" name="getArrModule1">获取</v-button>
  </v-form-item>
  <v-form-item label="数组中对象形式">
    <v-button @click="getArrObjModule" size="S" name="getArrObjModule1">获取</v-button>
  </v-form-item>
  <v-form-item label="结果"> {{ res }} </v-form-item>
</v-form>

<script>
  export default {
    data() {
      return {
        res: null
      };
    },
    methods: {
      getObjectModule() {
        let modules = {
          wanRate: "",
          workMode: ""
        };
        this.$setModules(modules).then(res => {
          // 获取数据
          this.res = res;
        });
      },

      getArrModule() {
        let modules = ["wanRate", "workMode"];
        this.$getModules(modules).then(res => {
          // 获取数据
          this.res = res;
        });
      },
      getArrObjModule() {
        let modules = [
          {
            module: "wanRate",
            arg1: ""
          },
          "workMode"
        ];
        this.$getModules(modules).then(res => {
          // 获取数据
          this.res = res;
        });
      }
    }
  };
</script>
```

:::

## get 请求方式

需用调用不是通用获取模块化接口时可以使用 get 方法。该方法有三个参数，`url`get 的 url，`data`请求时附带的参数，以及配置参数。

`url` 可以包含?也可以直接附带部分参数。
`data` 包含的参数注意不要包含对象等引用类型，不会自动进行转换，如需要请自行转换。
配置参数中可以包含以下几项。
`successMsg` 字符串格式，成功词条，为 false 时不提示成功，默认为 false，
`errorMsg` 字符串格式，失败词条，为 false 时不提示失败，默认为 false。

## post 请求方式

需用调用不是通用获取模块化接口时可以使用 get 方法。该方法有三个参数，`url`post 的 url，`submitData`请求时附带的参数，以及配置参数。

`url` 。
`submitData` 包含的参数注意不要包含对象等引用类型，不会自动进行转换，如需要请自行转换。
配置参数中可以包含以下几项。
`successMsg` 字符串格式，成功词条，为 false 时不提示成功，默认为配置的成功的提示语或保存成功，
`errorMsg` 字符串格式，失败词条，为 false 时不提示失败，默认为为配置的失败提示语或保存失败。
`costomErrorObj`，对象格式，错误提示对象

## 修改默认参数

除了首次注册时，后续也可以修改默认的配置参数。使用`$setHttpConfig`方法,配置相关的方法。

::: demo

```html
<v-form>
  <v-form-item label="successCode" description="可以修改开始的配置">
    <v-radio v-model="successCode" :options="[0, 1]" name="successCode2"></v-radio>
  </v-form-item>

  <v-form-item label="setModules">
    <v-button @click="setModule" size="S"  name="setModule2">设置</v-button>
  </v-form-item>
  <v-form-item label="结果"> {{ resSet }} </v-form-item>
</v-form>

<script>
  export default {
    data() {
      return {
        modules: ["wanRate"],
        setModuleName: "wanRate",
        res: "",
        resSet: "",
        successMsg: false,
        errorMsg: false,
        costomError0: "0也可以是失败啦",
        successCode: 0,
        options: ["wanRate", "workMode", "apStatus"]
      };
    },
    methods: {
      setModule() {
        let { successMsg, errorMsg, costomError0 } = this;
        this.$setModules(
          { [this.setModuleName]: {} },
          {
            successMsg,
            errorMsg,
            costomErrorObj: { 0: costomError0 }
          }
        ).then(res => {
          // 获取数据
          this.resSet = res;
        });
      }
    },
    watch: {
      successCode(val) {
        this.$setHttpConfig({ successCode: val });
      }
    }
  };
</script>
```

:::

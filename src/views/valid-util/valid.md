## 校验函数

可以用于 form 表单校验。

## 按需引入

引入后默认绑定在 `vue.prototype.$valid` 上。

```js
import { Base,valid } from "@reasy-team/reasy-ui-function";

Vue.use(Base);
Vue.use(valid);
```

## 基础包含

基础校验即引入后，就可以使用的一些校验。在 form 表单中配置即可。

使用例子
::: demo

```html
<v-form :rules="rules" class="valid-form">
  <h3>校验函数名称</h3>
  <v-form-item label="通用" prop="validType">
    <v-radio
      v-model="formData.validType"
      :options="options1"
      name="options1"
      @change="changeType"
    ></v-radio>
  </v-form-item>
  <v-form-item label="业务" prop="validType">
    <v-radio
      v-model="formData.validType"
      :options="options2"
      name="options2"
      @change="changeType"
    ></v-radio>
  </v-form-item>
  <v-form-item label="网络" prop="validType">
    <v-radio
      v-model="formData.validType"
      :options="options3"
      name="options3"
      @change="changeType"
    ></v-radio>
  </v-form-item>
  <v-form-item label="字符限制" prop="validType">
    <v-radio
      v-model="formData.validType"
      :options="options4"
      name="options4"
      @change="changeType"
    ></v-radio>
  </v-form-item>
  <v-form-item label="组合特殊使用" prop="validType">
    <v-radio
      v-model="formData.validType"
      :options="options5"
      name="options5"
      @change="changeType"
    ></v-radio>
  </v-form-item>

  <h3>校验函数参数说明</h3>
  <v-form-item label="参数说明" prop="validArgs" :required="false">
    <div>{{ text.label }}</div>
    <pre>{{ text.args }}</pre>
  </v-form-item>

  <h3>验证测试</h3>
  <v-form-item
    label="自定义校验参数"
    prop="validArgs"
    :required="false"
    description="参数逗号分隔 数组等参数可以json格式"
  >
    <v-input v-model="formData.validArgs" name="validArgs"></v-input>
  </v-form-item>

  <v-form-item label="自定义校验" prop="valid" :valid="typeValid">
    <v-input v-model="formData.valid" name="valid"></v-input>
  </v-form-item>

  <v-form-item> </v-form-item>
</v-form>
<script>
  export default {
    data() {
      return {
        formData: {
          validType: "len",
          validArgs: "1, 3",
          valid: ""
        },
        rules: {
          fei: { type: "fei" }
        },
        // 基础校验
        options1: [
          "len",
          "byteLen",
          "num",
          "even",
          "float",
          "ascii",
          "hex",
          "noSpace"
        ],
        options2: [
          "domain",
          "mask",
          "email",
          "phone",
          "port",
          "url",
          "dateTime",
          "ssid",
          "ssidPwd",
          "wep"
        ],
        options3: [
          "ip",
          "mac",
          "ipv6",
          "ipv6Header",
          "ipv6Value",
          "ipv6Prefix",
          "ipv6LocalLink"
        ],
        options4: [
          "password",
          "userPwd",
          "uniqueCode",
          "numAndLetter",
          "vlanName",
          "normarlChars",
          "normarlChars1",
          "normarlChars2",
          "notSpecialChars"
        ],
        options5: ["sameStr", "validOrArrs", "ipCompare"],
        argsDefaultTest: {
          len: "1,7",
          byteLen: "1,7",
          num: "[1,[3,5],7]",
          even: "[1,[3,5],7]",
          float: "[1.2, 23.2, 3, 4, [8, 10]]",
          hex: "3,3",
          nMultiple: "5",
          notSpecialChars: "-",
          sameStr: "555,不能一样",
          validOrArrs: `[{ "type":"ip"}, {"type":"domain"}],"请输入有效的域名"`,
          ipCompare: `"192.168.2.3"`
        },
        argsText: argsText
      };
    },
    computed: {
      typeValid() {
        let { validType, validArgs } = this.formData;
        try {
          validArgs = JSON.parse("[" + validArgs + "]");
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log("解析参数出错");
          validArgs = validArgs.split(",");
        }

        return {
          type: validType,
          args: validArgs
        };
      },
      text() {
        let text = this.argsText[this.formData.validType] || {};

        if (text.args) {
          text.args = text.args.replaceAll(/(\/\*\*\n|\*\/|\*)/g, "");
        }
        return text;
      }
    },
    methods: {
      changeType(val) {
        this.formData.validArgs = this.argsDefaultTest[val] || "";
      }
    }
  };
</script>
<style lang="scss">
  .valid-form {
    .v-radio__item + .v-radio__item {
      margin-left: 10px;
    }
  }
</style>
```

:::

## 按需引用

由于部分函数的使用频率不高，并且和项目需求相关，所以此部分函数，根据需要，自行引入。

引用方式

```js
import { asciiDisplayChar } form "./valid";

vue.$valid.asciiDisplayChar = asciiDisplayChar;
```

下面是使用校验的例子
::: demo

```html
<v-form :rules="rules" class="valid-form">
  <h3>校验函数名称</h3>

  <v-form-item label="单独引入" prop="validType">
    <v-radio
      v-model="formData.validType"
      :options="options6"
      @change="changeType"
      name="options6"
    ></v-radio>
  </v-form-item>

  <h3>校验函数参数说明</h3>
  <v-form-item label="参数说明" prop="validArgs" :required="false">
    <div>{{ text.label }}</div>
    <pre>{{ text.args }}</pre>
  </v-form-item>

  <h3>验证测试</h3>
  <v-form-item
    label="自定义校验参数"
    prop="validArgs"
    :required="false"
    description="参数逗号分隔 数组等参数可以json格式"
  >
    <v-input v-model="formData.validArgs" name="validArgs1"></v-input>
  </v-form-item>

  <v-form-item label="自定义校验" prop="valid" :valid="typeValid">
    <v-input v-model="formData.valid" name="valid1"></v-input>
  </v-form-item>

  <v-form-item> </v-form-item>
</v-form>
<script>
  export default {
    data() {
      return {
        formData: {
          validType: "email",
          validArgs: "1, 3",
          valid: ""
        },
        rules: {
          fei: { type: "fei" }
        },
        // 单独引入
        options6: [
          "tree",
          "asciiDisplayChar",
          "onlySpecific",
          "allBlank",
          "noBlank",
          "ips",
          "macs",
          "phones",
          "ports",
          "nMultiple"
        ],
        argsDefaultTest: {
          len: "1,7",
          byteLen: "1,7",
          num: "[1,[3,5],7]",
          even: "[1,[3,5],7]",
          float: "[1.2, 23.2, 3, 4, [8, 10]]",
          hex: "3,3",
          nMultiple: "5",
          notSpecialChars: "-",
          sameStr: "555,不能一样",
          validOrArrs: `[{ "type":"ip"}, {"type":"domain"}],"请输入有效的域名"`,
          ipCompare: `"192.168.2.3"`
        },
        argsText: argsText
      };
    },
    computed: {
      typeValid() {
        let { validType, validArgs } = this.formData;
        try {
          validArgs = JSON.parse("[" + validArgs + "]");
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log("解析参数出错");
          validArgs = validArgs.split(",");
        }

        return {
          type: validType,
          args: validArgs
        };
      },
      text() {
        let text = this.argsText[this.formData.validType] || {};

        if (text.args) {
          text.args = text.args.replaceAll(/(\/\*\*\n|\*\/|\*)/g, "");
        }
        return text;
      }
    },
    methods: {
      changeType(val) {
        this.formData.validArgs = this.argsDefaultTest[val] || "";
      }
    }
  };
</script>
<style lang="scss">
  .valid-form {
    .v-radio__item + .v-radio__item {
      margin-left: 10px;
    }
  }
</style>
```

:::

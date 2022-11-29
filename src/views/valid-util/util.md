## 库函数

一些常用的函数，可以按需引用使用。

## 按需引入

库函数根据只能单独引入。不会总体引入。

注意：使用前必须在主页面引入`base`.
main.js
```js
import { Base } from "@reasy-team/reasy-ui-function";

Vue.use(Base);

```
使用文件位置引入方式。
```js
import { isObject } from "@reasy-team/reasy-ui-function/dist/utils.js";

```


## 所有支持的函数

以下包含所有当前支持的库函数。

使用例子
::: demo

```html
    <v-form class="utils-form">
      <h3>库函数函数名</h3>

      <v-form-item label="通用" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options1"
          @change="changeType"
          name="options1"
        ></v-radio>
      </v-form-item>
      <v-form-item label="存储" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options"
          @change="changeType"
          name="options"
        ></v-radio>
      </v-form-item>
       <v-form-item label="日期时间处理" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="optionsTime"
          @change="changeType"
          name="optionsTime"
        ></v-radio>
      </v-form-item>
      <v-form-item label="业务" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options2"
          @change="changeType"
          name="options2"
        ></v-radio>
      </v-form-item>
      <v-form-item label="字符串" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options3"
          @change="changeType"
          name="options3"
        ></v-radio>
      </v-form-item>
        <v-form-item label="字符串-html" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="optionsHtml"
          @change="changeType"
          name="optionsHtml"
        ></v-radio>
      </v-form-item>
      <v-form-item label="数组" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options4"
          @change="changeType"
          name="options4"
        ></v-radio>
      </v-form-item>

      <v-form-item label="网络-基础" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="optionsNetwork"
          @change="changeType"
          name="optionsNetwork"
        ></v-radio>
      </v-form-item>
      <v-form-item label="网络" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options5"
          @change="changeType"
          name="options5"
        ></v-radio>
      </v-form-item>
      <v-form-item label="网络-ipv6" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options6"
          @change="changeType"
          name="options6"
        ></v-radio>
      </v-form-item>

      <h3>校验函数参数说明</h3>
      <v-form-item label="参数说明" prop="utilsArgs" :required="false">
        <div>{{ text.label }}</div>
        <pre>{{ text.args }}</pre>
      </v-form-item>

      <h3>验证测试</h3>
      <v-form-item
        label="函数参数"
        prop="args"
        :required="false"
        description="参数逗号分隔 数组等参数可以json格式"
      >
        <v-input
          type="textarea"
          v-model="formData.utilsArgs"
          :rows="4"
          width="500"
          name="utilsArgs"
        ></v-input>
      </v-form-item>

      <v-form-item label="运行结果" prop="args"
        >{{ formData.res }}
      </v-form-item>

      <v-form-item> <v-button @click="run" name="run">运行函数</v-button></v-form-item>
    </v-form>
  </v-page>
</template>
<script>
export default {
  data() {
    return {
      formData: {
        functionName: "extend",
        utilsArgs: "",
        res: ""
      },
      // 基础校验
      options1: [
        "isObject",
        "isArray",
        "isFunction",
        "extend",
        "copy",
        "getGuid",
        "isEmpty",
        "isType",
        "debounce",
        "throttle"
      ],
      options: [
        "setCookie",
        "getCookie",
        "setSessionStorage",
        "getSessionStorage",
        "removeSessionStorage"
      ],
      optionsTime:[
        "formatSeconds",
        "formatDate",
        "parseDateToObj",
        "parseDateToNum",
        "parseTimeToNum",
      ],
      options2: [
        "formatSpeed",
        "getNumList",
        "getTimezone",
        "getPwdLevel",
        "transMac",
        "transMacs"
      ],
      options3: [
        "getUtf8Length",
        "cutStrEmoji",
        "cutStrLen",
        "trimStartEndStr",
        "trim",
        "translatePassword",
        "firstLower"
      ],
      optionsHtml:[
        "toHtmlCode",
        "translateSpaceToHtml",
        "translateWrapToHtml",
      ],
      options4: [
        "uniqueArr",
        "minusArr",
        "unionArrs",
        "intersectArr",
        "arrayToObject"
      ],
      optionsNetwork:[
        "ipToInt",
        "toDotMask",
        "getNetwork",
        "getBroadcast",
        "getBigRange"
      ],
      options5: [
        "checkIpInSameSegment",
        "validIpInSameSegment",
        "checkIsValidIpMask",
        "checkIpComparison",
      ],
      options6: ["getFullIpv6", "checkIpv6InSameSegment", "compareIpv6"],

      argsDefaultTest: {
        isObject: {},
        isFunction: ["sss"],
        extend: [
          { a: "b", b: "a" },
          { a: "x", c: [1, 2, 3] }
        ],
        copy: [
          { a: "b", b: "a" },
          { a: "x", c: [1, 2, 3] }
        ],
        isType: [true, "string"],
        hasClass: "浏览器中测试, $0.hasClass('xxx')",
        addClass: "浏览器中测试，$0.addClass('xxx') ",
        removeClass: "浏览器中测试，$0.removeClass('xxx')",
        setCookie: ["123", "321"],
        getCookie: ["123"],
        setSessionStorage: ["123", "321"],
        getSessionStorage: ["123"],
        removeSessionStorage: ["123"],
        formatSeconds: 555,
        formatDate: [undefined, "YYYY年MM月DD日 hh:mm:ss"],
        parseDateToObj: ["3444年22月44日 13:11:09", "YYYY年MM月DD日 hh:mm:ss"],
        parseDateToNum: ["3444年22月44日 13:11:09", "YYYY年MM月DD日 hh:mm:ss"],
        parseTimeToNum: ["13:11:09", "hh:mm:ss"],
        formatSpeed: [1024, "B"],
        getNumList: [
          [1, 3, 4, 5, 2, 9, 14, 15, 16],
          { joiner: "~", data: { 1: "port1" } }
        ],
        getPwdLevel: "12222222",
        transMac: "22222222222222",
        transMacs: "22222222222222;22-22-22-22-22-22-22",
        toHtmlCode: "<dfd>",
        translateSpaceToHtml: "<d  fd>",
        translateWrapToHtml: "<df  d>",
        getUtf8Length: "不止三个字节呀7777",
        cutStrEmoji: "嘿嘿嘿",
        cutStrLen: ["<df3434d>", 3],
        trimStartEndStr: "   <dfd>    ",
        trim: " <  d    f    d > ",
        translatePassword: "<dfd>",
        firstLower: "Edfdfd方法",
        uniqueArr: [
          [
            {
              label: "a"
            },
            {
              label: "a"
            },
            {
              label: "b"
            },
            {
              label: "A"
            },
            {
              label: "B"
            },
            {
              label: "a"
            }
          ],
          "label",
          true
        ],
        minusArr: [
          [
            {
              label: "a"
            },
            {
              label: "a"
            },
            {
              label: "b"
            },
            {
              label: "A"
            },
            {
              label: "B"
            },
            {
              label: "a"
            }
          ],
          [
            {
              label: "a"
            },
            {
              label: "c"
            },
            {
              label: "d"
            },
            {
              label: "e"
            },
            {
              label: "f"
            }
          ],
          "label",
          true
        ],
        unionArrs: [
          [
            {
              label: "a"
            },
            {
              label: "b"
            },
            {
              label: "A"
            },
            {
              label: "B"
            },
            {
              label: "a"
            }
          ],
          [
            {
              label: "c"
            },
            {
              label: "d"
            },
            {
              label: "e"
            },
            {
              label: "f"
            },
            {
              label: "a"
            }
          ],
          "label",
          true
        ],
        intersectArr: [
          ["a", "b", "A", "B", "a"],
          ["c", "b", "e", "f", "a"]
        ],
        arrayToObject: [
          [
            {
              label: "xxx1",
              value: "aaa1"
            },
            {
              label: "xxx2",
              value: "aaa2"
            },
            {
              label: "xxx3",
              value: "aaa3"
            },
            {
              label: "xxx4",
              value: "aaa4"
            },
            {
              label: "xxx5",
              value: "aaa5"
            }
          ],
          "value",
          "label"
        ],
        checkIpInSameSegment: [
          "192.168.10.2",
          "255.255.255.0",
          "192.168.10.23",
          "255.255.255.0"
        ],
        validIpInSameSegment: [
          "192.168.10.2",
          "255.255.255.0",
          "192.168.10.23",
          "255.255.255.0",
          "LAN IP",
          "WAN IP"
        ],
        checkIsValidIpMask: ["192.168.10.0", "255.255.255.0"],
        checkIpComparison: ["192.168.10.0", "192.168.0.0"],
        ipToInt: ["192.168.10.0"],
        toDotMask: [24],
        getNetwork: ["192.168.10.66", "255.255.255.0", false],
        getBroadcast: ["192.168.10.66", "255.255.255.0", false],
        getBigRange: ["192.168.10.66", "192.168.10.99", "192.168.10.255"],
        getFullIpv6: ["2002::2"],
        checkIpv6InSameSegment: ["2002::55", "2002::66", 22, 22],
        compareIpv6: ["2002::55", "2002::66"]
      },
    };
  },
  computed: {
    args() {
      let { utilsArgs } = this.formData;
      try {
        utilsArgs = JSON.parse(utilsArgs);
      } catch (error) {
        try {
          utilsArgs = JSON.parse("[" + utilsArgs + "]");
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log("解析参数出错");
          utilsArgs = utilsArgs.split(",");
        }
      }
      if (!Array.isArray(utilsArgs)) {
        return [utilsArgs];
      }

      return utilsArgs;
    },
    text() {
      let text = argsUtilsText[this.formData.functionName] || {};
      if (text.args) {
        text.args = text.args.replaceAll(/(\/\*\*\n|\*\/|\*| @method)/g, "");
      }
      return text;
    }
  },
  methods: {
    changeType(val) {
      this.formData.utilsArgs = JSON.stringify(this.argsDefaultTest[val]) || "";
    },
    run() {
      this.formData.res = utils[this.formData.functionName](...this.args);
      if (this.formData.res === undefined) {
        this.formData.res = "运行完成";
      }
    },
    debounceBtn() {
      // 防抖
    }
  }
};
</script>
<style lang="scss">
.utils-form {
  .v-radio__item + .v-radio__item {
    margin-left: 10px;
  }
}
</style>
```

:::

## 默认支持 class 处理

引入校验和库函数时会自动把`addClass`,`hasClass`,`removeClass`绑定在 `dom`的原型上，可以直接使用。

使用方法
::: demo

```html
<div ref="red">颜色{{res}}</div>
<div>
  <div>
    <v-button @click="addClass" name="add">添加class</v-button>
    <v-button @click="removeClass" name="remove">移除class</v-button>
    <v-button @click="hasClass" name="has">hasclass</v-button>
  </div>
</div>
<script>
  export default {
    data() {
      return {
        res: "",
        class: "red"
      };
    },

    methods: {
      addClass() {
        this.$refs.red.addClass(this.class);
      },
      removeClass() {
        this.$refs.red.removeClass(this.class);
      },
      hasClass() {
        this.res = this.$refs.red.hasClass(this.class)
          ? "是红色的"
          : "不是红色的";
      }
    }
  };
</script>
```

:::

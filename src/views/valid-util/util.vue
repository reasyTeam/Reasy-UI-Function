<template>
  <v-page pageTitle="库函数">
    <v-form class="utils-form">
      <h3>基础包含</h3>

      <v-form-item label="通用" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options1"
          @change="changeType"
        ></v-radio>
      </v-form-item>
      <v-form-item label="存储" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options"
          @change="changeType"
        ></v-radio>
      </v-form-item>
      <v-form-item label="业务" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options2"
          @change="changeType"
        ></v-radio>
      </v-form-item>
      <v-form-item label="字符串" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options3"
          @change="changeType"
        ></v-radio>
      </v-form-item>
      <v-form-item label="数组" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options4"
          @change="changeType"
        ></v-radio>
      </v-form-item>
      <v-form-item label="网络" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options5"
          @change="changeType"
        ></v-radio>
      </v-form-item>
      <v-form-item label="网络-ipv6" prop="functionName">
        <v-radio
          v-model="formData.functionName"
          :options="options6"
          @change="changeType"
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
        ></v-input>
      </v-form-item>

      <v-form-item label="运行结果" prop="args"
        >{{ formData.res }}
      </v-form-item>

      <v-form-item> <v-button @click="run">运行函数</v-button></v-form-item>
    </v-form>
  </v-page>
</template>
<script>
import argsText from "./argsUtilsText";
// import utils from "../../common/utils/utils";
import utils from "./utils";
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
        "addClass",
        "hasClass",
        "removeClass",
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
      options2: [
        "formatSeconds",
        "formatDate",
        "parseDateToObj",
        "parseDateToNum",
        "parseTimeToNum",
        "formatSpeed",
        "getNumList",
        "getTimezone",
        "getPwdLevel",
        "transMac",
        "transMacs"
      ],
      options3: [
        "toHtmlCode",
        "translateSpaceToHtml",
        "translateWrapToHtml",
        "getUtf8Length",
        "cutStrEmoji",
        "cutStrLen",
        "trimStartEndStr",
        "trim",
        "translatePassword",
        "firstLower"
      ],
      options4: [
        "uniqueArr",
        "minusArr",
        "unionArrs",
        "intersectArr",
        "arrayToObject"
      ],
      options5: [
        "checkIpInSameSegment",
        "validIpInSameSegment",
        "checkIsValidIpMask",
        "checkIpComparison",
        "ipToInt",
        "toDotMask",
        "getNetwork",
        "getBroadcast",
        "getBigRange"
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
      argsText: argsText
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
      let text = this.argsText[this.formData.functionName] || {};
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

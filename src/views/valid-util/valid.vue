<template>
  <v-page pageTitle="valid校验函数">
    <v-form :rules="rules" class="valid-form">
      <h3>基础包含</h3>
      <v-form-item label="通用" prop="validType">
        <v-radio
          v-model="formData.validType"
          :options="options1"
          @change="changeType"
        ></v-radio>
      </v-form-item>
      <v-form-item label="业务" prop="validType">
        <v-radio
          v-model="formData.validType"
          :options="options2"
          @change="changeType"
        ></v-radio>
      </v-form-item>
      <v-form-item label="网络" prop="validType">
        <v-radio
          v-model="formData.validType"
          :options="options3"
          @change="changeType"
        ></v-radio>
      </v-form-item>
      <v-form-item label="字符限制" prop="validType">
        <v-radio
          v-model="formData.validType"
          :options="options4"
          @change="changeType"
        ></v-radio>
      </v-form-item>
      <v-form-item label="组合特殊使用" prop="validType">
        <v-radio
          v-model="formData.validType"
          :options="options5"
          @change="changeType"
        ></v-radio>
      </v-form-item>

      <h3>单独引用</h3>
      <v-form-item label="单独引入" prop="validType">
        <v-radio
          v-model="formData.validType"
          :options="options6"
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
        <v-input v-model="formData.validArgs"></v-input>
      </v-form-item>

      <v-form-item label="自定义校验" prop="valid" :valid="typeValid">
        <v-input v-model="formData.valid"></v-input>
      </v-form-item>

      <v-form-item> </v-form-item>
    </v-form>
  </v-page>
</template>
<script>
import argsText from "./argsText";
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

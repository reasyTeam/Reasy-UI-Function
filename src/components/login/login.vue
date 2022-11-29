<template>
  <div>
    <v-form
      ref="loginForm"
      :before-submit="beforeSubmit"
      @submit="submitData"
      v-model="formData"
    >
      <v-form-item
        v-for="(item, key) in formCfg"
        :label="item.label"
        :prop="item.field"
        :valid="item.valid"
        :key="key"
      >
        <v-input
          :name="name && `${name}-${key}`"
          v-model="formData[item.field]"
          :maxlength="item.maxlength"
          :placeholder="item.placeholder"
          :autofocus="item.autofocus"
          :disabled="item.disabled"
          :icon="item.icon"
          :size="size"
          :type="key == 'username' ? 'text' : 'password'"
          :show-password="key != 'username'"
        ></v-input>
      </v-form-item>
      <v-form-item :label="langLabel">
        <v-select
          :name="name && `${name}-lang`"
          v-if="isLang"
          v-model="lang"
          :options="langArr"
          @change="changeLang"
          :size="size"
        ></v-select>
      </v-form-item>
      <slot></slot>
      <v-button
        :name="name && `${name}-btn`"
        :size="size"
        :is-loading="isSubmiting"
        :disabled="disabled"
        type="primary"
        @click="$refs.loginForm.submitForm()"
        >{{ text }}</v-button
      >
    </v-form>
  </div>
</template>
<script>
let md5 = require("md5");
export default {
  props: {
    name: { type: String, default: "login" }, //组件ID
    //是否需要用户名
    isName: { type: Boolean, default: true },
    //是否首次登陆，是则显示确认密码框
    isFirst: { type: Boolean, default: false },
    //登录按钮文本
    text: { type: String, default: "登录" },
    //是否禁用登录按钮
    disabled: { type: Boolean, default: false },
    //是否支持语言切换，支持的语言选项配置在formConfig中
    isLang: { type: Boolean, default: false },
    langLabel: { type: String, default: "语言" },
    //用户名密码对象
    formData: { type: Object, default: () => ({}) },
    /** 表单组件相关配置, 字段配置项如下：
    username: {
      field: "字段名", //登录的字段名
      label: "标题文本", //标题文本
      placeholder: "输入框提示",
      maxlength: "最大输入限制",
      valid: ["数据校验"],
      icon: "前缀图标"
    } */
    formConfig: {
      type: Object,
      default: () => ({ username: {}, password: {}, passwordCfm: {} })
    },
    size: {
      type: String,
      default: "M"
    },
    action: { type: String, default: "" }, //登录请求地址
    //密码加密算法，默认提供MD5和BASE64，支持自定义传空不加密
    encrypt: {
      type: [Function, Object, String],
      default: "md5"
    },
    beforeSubmit: Function //提交前处理
  },

  data() {
    return {
      lang: this.B.getLang(), //默认语言
      langArr: this.B.getOptions(),
      isSubmiting: false,
      //表单默认配置
      defaultFormCfg: {
        username: {
          field: "username",
          label: "用户名",
          placeholder: "请输入用户名",
          maxlength: 63,
          disabled: false,
          autofocus: false,
          icon: ""
        },
        password: {
          field: "password",
          label: "密码",
          placeholder: "请输入密码",
          maxlength: 63,
          disabled: false,
          autofocus: false,
          icon: ""
        },
        passwordCfm: {
          field: "passwordCfm",
          label: "确认密码",
          placeholder: "请确认输入密码",
          maxlength: 63,
          disabled: false,
          autofocus: false,
          icon: ""
        }
      }
    };
  },
  model: {
    prop: "formData",
    event: "change"
  },
  methods: {
    encryptData(data) {
      let encryptType = typeof this.encrypt;
      if (!this.encrypt) {
        return data;
      }
      if (encryptType == "function") {
        return this.encrypt(data);
      }
      if (encryptType == "string" && this.encrypt.toLowerCase() == "base64") {
        return window.btoa(data);
      }
      return md5(data);
    },
    submitData(data) {
      this.isSubmiting = true;
      Object.keys(data).forEach(key => {
        if (
          key == this.formCfg.password.field ||
          (this.isFirst && key == this.formCfg.passwordCfm.field)
        ) {
          data[key] = this.encryptData(data[key]);
        }
      });
      this.$setModules({ [this.action]: data }).then(res => {
        this.isSubmiting = false;
        this.$emit("submited", res);
      });
    },
    changeLang(val) {
      this.B.setLang(val);
    }
  },
  computed: {
    formCfg() {
      let cfg = {};
      for (let key in this.defaultFormCfg) {
        if (
          (!this.isName && key == "username") ||
          (!this.isFirst && key == "passwordCfm")
        ) {
          continue;
        }

        cfg[key] = Object.assign(
          {},
          this.defaultFormCfg[key],
          this.formConfig[key]
        );
      }
      return cfg;
    }
  }
};
</script>

<template>
  <v-page pageTitle="HTTP">
    <v-form>
      <v-form-item label="getModules">
        <v-checkbox-group
          v-model="modules"
          :options="options"
        ></v-checkbox-group>
        <v-button @click="getModule" size="S">获取</v-button>
      </v-form-item>
      <v-form-item label="结果">
        {{ res }}
      </v-form-item>
      <v-form-item label="setModules">
        <v-radio v-model="setModuleName" :options="options"></v-radio>
      </v-form-item>

      <v-form-item label="successMsg">
        <v-radio v-model="successMsg" :options="successMsgOptions"></v-radio>
      </v-form-item>

      <v-form-item
        label="successCode"
        description="一般不用单独配置，可以整个项目全局配置"
      >
        <v-radio v-model="successCode" :options="[0, 1]"></v-radio>
      </v-form-item>

      <v-form-item label="errorMsg">
        <v-radio v-model="errorMsg" :options="errorMsgOptions"></v-radio>
      </v-form-item>

      <v-form-item label="0时候的失败的词条" description="自定义错误对象">
        <v-input v-model="costomError0"></v-input>
      </v-form-item>

      <v-form-item label="setModules">
        <v-button @click="setModule" size="S">设置</v-button>
      </v-form-item>
      <v-form-item label="结果">
        {{ resSet }}
      </v-form-item>
    </v-form>
  </v-page>
</template>
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

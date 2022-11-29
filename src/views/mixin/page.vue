<template>
  <v-page
    :pageTitle="pageTitle"
    :formRules="rules"
    :isSubmitLoading="isSubmitLoading"
    :isInitLoading="isInitLoading"
    @submit="submit"
  >
    <template #formContent>
      <v-form-item label="lanIP" prop="lanIP">
        <v-input v-model="formData.lanIP" name="lanIP"></v-input>
      </v-form-item>

      <v-form-item label="lan" prop="lanMask">
        <v-input v-model="formData.lanMask" name="lanMask"></v-input>
      </v-form-item>

      <v-form-item label="remark" prop="remark">
        <v-input v-model="formData.remark" name="remark"></v-input>
      </v-form-item>

      <v-form-item label="">
        <v-button @click="changeRefresh" size="S" name="refresh">{{
          refreshFlag ? "停止自动刷新" : "启动自动刷新"
        }}</v-button>
      </v-form-item>
    </template>
  </v-page>
</template>
<script>
import pageMixin from "@/components/page-mixin.js";
export default {
  mixins: [pageMixin],
  data() {
    return {
      formData: {
        lanIP: "192.168.1.1",
        lanMask: "255.255.255.0"
      },
      rules: {
        lanIP: { type: "ip" },
        lanMask: { type: "mask" }
      },
      modules: ["lanCfg"],
      initModules: ["wanCfg"],
      refreshFlag: false,
      pageTitle: _("page")
    };
  },
  methods: {
    formatData(data) {
      data.lanCfg.remark = data.lanCfg.remark || "";
      this.formData = data.lanCfg;

      this.wanCfg = data.wanCfg;
    },
    changeRefresh() {
      this.refreshFlag = !this.refreshFlag;
    }
  }
};
</script>

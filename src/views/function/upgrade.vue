<template>
  <v-page pageTitle="上传">
    <h1>上传成功时显示进度条</h1>
    <upgrade
      ref="upload"
      no-id
      action="/cgi-bin/upgrade"
      accept=".cfg"
      size="L"
      :type="type"
      :progress-cfg="progressCfg"
      success-progress
      :before-upload="beforeUpload"
      ><template #browse>选择文件</template>升级</upgrade
    >

    <h1>显示上传进度条，但须手动配置进度条状态</h1>
    <upgrade
      ref="upload"
      no-id
      action="/cgi-bin/upgrade"
      accept=".cfg"
      size="L"
      :type="type"
      :show-progress="showProgressManual"
      :progress-cfg="progressCfg"
      :before-upload="beforeUpload1"
      :on-success="onSuccess"
      >升级</upgrade
    >
    <div class="margin-top">
      <v-form-item label="组件类型">
        <v-radio name="radio" v-model="type" :options="[0, 1, 2]"></v-radio>
      </v-form-item>
    </div>
  </v-page>
</template>
<script>
export default {
  data() {
    return {
      type: 0,
      showProgress: false,
      showProgressManual: false,
      progressCfg: {
        dialogTitle: "升级",
        dialogWidth: 640,
        topTitle: "正在升级",
        leftTitle: "进度",
        tip: "升级过程中，请勿操作设备",
        time: 5,
        autoStart: true,
        startTime: 60
      }
    };
  },
  methods: {
    beforeUpload() {
      this.showProgress = true;
      return true;
    },
    beforeUpload1() {
      this.showProgressManual = true;
      return true;
    },

    onSuccess() {
      setTimeout(() => {
        this.$set(this.progressCfg, "status", "success");
      }, 2000);
    }
  }
};
</script>

<style lang="scss">
h1 {
  font-size: 16px;
  margin: 20px 0;
  font-weight: bold;
}
.margin-top {
  margin-top: 40px;
}
</style>

<template>
  <v-page pageTitle="progress测试">
    <v-form>
      <v-form-item
        label="dialogTitle弹窗标题"
        :required="false"
        description="为空时不显示标题"
      >
        <v-input v-model="data.dialogTitle"></v-input>
      </v-form-item>
      <v-form-item label="dialogWidth弹窗宽度" :required="false">
        <v-input v-model="data.dialogWidth"></v-input>
      </v-form-item>
      <v-form-item label="leftTitle左边标题" :required="false">
        <v-input v-model="data.leftTitle"></v-input>
      </v-form-item>
      <v-form-item label="tip下面描述信息" :required="false">
        <v-input v-model="data.tip"></v-input>
      </v-form-item>
      <v-form-item label="topTitle上边标题" :required="false">
        <v-input v-model="data.topTitle"></v-input>
      </v-form-item>
      <v-form-item label="time总时间 单位s" :required="false">
        <v-input v-model="data.time"></v-input>
      </v-form-item>

      <v-form-item label="startTime 开始请求百分比" :required="false">
        <v-input v-model="data.startTime"></v-input>
      </v-form-item>

      <v-form-item label="status状态" :required="false">
        <v-radio
          v-model="data.status"
          :options="['loading', 'success', 'error']"
        ></v-radio>
      </v-form-item>

      <v-form-item label="ip跳转ip">
        <v-input v-model="data.ip"></v-input>
      </v-form-item>

      <v-form-item label="domain跳转域名">
        <v-input v-model="data.domain"></v-input>
      </v-form-item>
      <v-form-item label="protocol跳转协议">
        <v-radio v-model="data.protocol" :options="['http', 'https']"></v-radio>
      </v-form-item>
    </v-form>

    <v-button @click="showProgress = !showProgress">显示进度条</v-button>

    <progress-bar
      v-if="showProgress"
      :leftTitle="data.leftTitle"
      :topTitle="data.topTitle"
      :tip="data.tip"
      :dialogTitle="data.dialogTitle"
      :dialogWidth="data.dialogWidth"
      :time="data.time"
      :startTime="data.startTime"
      :status="data.status"
      :ip="data.ip"
      :domain="data.domain"
      :protocol="data.protocol"
    ></progress-bar>
  </v-page>
</template>

<script>
export default {
  data() {
    return {
      showProgress: false,
      data: {
        leftTitle: "左边标题",
        topTitle: "",
        tip: "描述信息",
        dialogTitle: "重启进度",
        dialogWidth: "",
        time: "60",
        startTime: "60",
        status: "success",
        ip: "",
        domain: "",
        protocol: ""
      }
    };
  }
};
</script>

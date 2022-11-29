<template>
  <v-button
    :no-id="noId"
    :name="name"
    @click="backupClick"
    :type="btnType"
    :size="size"
    :disabled="disabled"
    :icon="icon"
    ><slot>{{ text }}</slot></v-button
  >
</template>
<script>
export default {
  name: "backup",
  props: {
    //组件是否没有id
    noId: Boolean,
    //组件id
    name: String,
    //备份下载地址
    action: { type: String },
    //配置备份按钮文本
    text: {
      type: String,
      default: "备份配置"
    },
    // 备份附带的数据
    data: {
      type: Object
    },
    // 备份的下载方式
    type: {
      type: String,
      default: "get"
    },
    disabled: Boolean,
    // 按钮图标
    icon: { type: String, default: "" },
    // 按钮大小
    size: { type: String, default: "M" },
    // 按钮类型
    btnType: { type: String, default: "info" }
  },
  data() {
    return {};
  },
  methods: {
    backupClick() {
      if (this.type == "get") {
        const paramArray = [];
        for (let key in this.data) {
          paramArray.push(`${key}=${this.data[key]}`);
        }
        window.location =
          this.action + `?rand=${Math.random()}&` + paramArray.join("&");
      } else {
        this.$setModule({ [this.action]: this.data });
      }
    }
  }
};
</script>

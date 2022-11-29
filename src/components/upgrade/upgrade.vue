<template>
  <div class="upload-wrap">
    <v-upload
      v-if="!isDialog"
      class="upload"
      ref="upload"
      :no-id="noId"
      :name="name"
      :type="isButton ? 'text' : 'file'"
      :icon="icon"
      :action="action"
      :accept="accept"
      :data="data"
      :size="size"
      :btn-type="btnType"
      :limit-size="limitSize"
      :beforeUpload="beforeUploadHandler"
      :on-change="changeHandler"
      :on-success="successHandler"
      :disabled="disabled"
    >
      <slot :name="isButton ? 'default' : 'browse'">{{
        isButton ? "上传" : "浏览"
      }}</slot>
    </v-upload>

    <!-- todo:弹窗上传 -->
    <v-dialog
      v-else
      v-model="showDialog"
      :no-id="noId"
      :name="name && `${name}-dlg`"
    ></v-dialog>

    <v-button
      v-if="!isButton"
      :no-id="noId"
      :name="name && `${name}-btn`"
      :size="size"
      :type="btnType"
      :disabled="disabled"
      @click="clickBtn"
      :icon="icon"
      :class="type == UPLOAD_TYPE.INPUT && !isInline && 'is-bottom'"
    >
      上传</v-button
    >
    <!-- 进度条组件 -->
    <progress-bar
      ref="progress"
      v-if="progressShow"
      :no-id="noId"
      :name="name && `${name}-progress`"
      v-bind="progressProps"
      @success="aaa"
    >
    </progress-bar>
  </div>
</template>
<script>
const UPLOAD_TYPE = {
  BUTTON: 0,
  INPUT: 1,
  DIALOG: 2
};
const STATUS = {
  LOADING: "loading",
  ERROR: "error",
  SUCCESS: "success"
};
export default {
  name: "upgrade",
  props: {
    //组件是否没有id
    noId: Boolean,
    //组件id
    name: String,
    //文件上传地址
    action: String,
    //接受上传的文件类型
    accept: {
      type: String,
      default: ".cfg"
    },
    // todo review：建议使用字符串写类型，更易理解维护
    // 0:只显示恢复配置按钮，1：显示附件浏览组件 2:弹窗预留显示
    type: {
      type: Number,
      default: 0
    },
    //是否禁用
    disabled: Boolean,
    // 按钮图标
    icon: { type: String, default: "" },
    // 按钮大小
    size: { type: String, default: "M" },
    // 按钮类型
    btnType: { type: String, default: "info" },
    // 文件限制大小
    limitSize: { type: Number, default: 0 },
    //上传时附带的数据，
    data: Object,
    //上传成功
    onSuccess: Function,
    //切换文件
    onChange: Function,
    //上传前处理事件，返回false不会上传文件
    beforeUpload: Function,
    //文件上传成功后显示成功进度条
    successProgress: {
      type: Boolean,
      default: false
    },
    //显示进度条
    showProgress: {
      type: Boolean,
      default: false
    },
    /* 进度条弹框配置*/
    progressCfg: {
      type: Object,
      default: () => ({})
    },
    isInline: { type: Boolean, default: true }
  },
  data() {
    return {
      STATUS,
      UPLOAD_TYPE,
      showDialog: false,
      succeed: false,
      uploadSuccess: false, //文件是否上传成功
      //进度条组件默认参数配置
      defaultCfg: {
        dialogTitle: "进度",
        dialogWidth: 640,
        topTitle: "",
        leftTitle: "",
        tip: "",
        time: 60,
        autoStart: true,
        startTime: 60,
        status: STATUS.LOADING, //状态 loading、success、error
        ip: "",
        domain: "",
        isAutoJump: true,
        protocol: ""
      }
    };
  },

  computed: {
    isButton() {
      return this.type == UPLOAD_TYPE.BUTTON;
    },
    isDialog() {
      return this.type == UPLOAD_TYPE.DIALOG;
    },
    isInput() {
      return this.type == UPLOAD_TYPE.INPUT;
    },
    progressShow() {
      //prop传值显示 或 成功上传时显示
      return this.showProgress || (this.successProgress && this.uploadSuccess);
    },
    progressProps() {
      return Object.assign(this.defaultCfg, this.progressCfg);
    }
  },

  methods: {
    submit() {
      this.$refs.upload.submit();
    },
    clickBtn() {
      if (this.isInput) {
        this.submit();
      } else {
        this.showDialog = true;
      }
    },
    changeHandler(file) {
      this.uploadSuccess = false;

      //按钮类型时文件变化后直接提交
      if (this.isButton) {
        this.submit();
      }
      this.onChange && this.onChange(file);
    },
    successHandler(data) {
      //文件上传成功 显示进度条
      if (this.successProgress) {
        this.uploadSuccess = true;
      }
      this.onSuccess && this.onSuccess(data);
    },
    beforeUploadHandler(file) {
      if (!file) {
        this.$message.error(_("Please choose the upgrade file"));
        return false;
      }
      return this.beforeUpload ? this.beforeUpload(file) : true;
    }
  }
};
</script>
<style lang="scss">
.upload .v-upload__row .v-button {
  margin-left: -5px;
}
</style>
<style scoped>
.upload-wrap,
.upload-wrap .v-button {
  vertical-align: middle;
}
.is-bottom {
  display: block;
}
</style>

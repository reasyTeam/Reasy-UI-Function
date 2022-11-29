<template>
  <div>
    <v-button @click="click" :name="name">{{ btnText }}</v-button>

    <!-- 确认弹窗 -->
    <v-dialog
      :title="confirmTitle"
      :confirmButtonText="confirmOkText"
      :cancelButtonText="confirmCancelText"
      @confirm="confirm"
      v-model="showConfirm"
      :name="name | id('dialog')"
      >{{ confirmContent }}<slot></slot
    ></v-dialog>

    <!-- 进度条 -->
    <progress-bar
      v-if="showProgress"
      v-bind="progressProp"
      v-on="$listeners"
      :name="name | id('progress')"
    ></progress-bar>
  </div>
</template>

<script>
import NameMixin from "../name-mixins";
export default {
  name: "reboot-btn",
  mixins: [NameMixin],
  props: {
    // 操作接口调用
    action: {
      type: String,
      default: ""
    },
    // 操作传输数据
    postData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 操作按钮文字
    btnText: {
      type: String,
      default: _("重启")
    },
    // 确认弹窗标题
    confirmTitle: {
      type: String,
      default: _("确认")
    },
    // 确认弹窗内容
    confirmContent: {
      type: String,
      default: ""
    },
    // 确认弹窗确定按钮文字
    confirmOkText: {
      type: String,
      default: _("确定")
    },
    // 确认弹窗取消按钮文字
    confirmCancelText: {
      type: String,
      default: _("取消")
    },
    // 成功处理
    successHandle: {
      type: Function,
      default: () => {
        return true;
      }
    },
    // 错误处理
    errorHandle: {
      type: Function,
      default: () => {
        return true;
      }
    },
    // 进度条的prop
    progressProp: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      showProgress: false,
      showConfirm: false
    };
  },
  methods: {
    click() {
      this.showConfirm = true;
    },
    confirm() {
      // 请求回来的判断看看怎么处理
      this.$post(this.action, this.postData, {
        successMsg: false,
        errorMsg: false
      }).then(res => {
        let result = this.successHandle(res);
        if (result) {
          this.showProgress = true;
        } else {
          // 触发失败
          this.$emit("error", res);
        }
      });
    }
  }
};
</script>

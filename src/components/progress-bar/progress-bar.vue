<template>
  <v-dialog
    :name="name"
    class="progress-dialog"
    :class="{ 'progress-dialog__no-title': !dialogTitle }"
    :title="dialogTitle"
    v-model="showDialog"
    :width="dialogWidth"
    :show-close="false"
    :show-cancel="false"
    :show-confirm="false"
  >
    <div class="progress">
      <div class="progress__title" v-if="topTitle">{{ topTitle }}</div>

      <div class="progress__bar__wrap">
        <span class="progress__bar__title" v-if="leftTitle">{{
          leftTitle
        }}</span>
        <div class="progress__bar">
          <!-- 进度条 -->
          <v-chart-percent
            :height="16"
            :value="currentPercent"
            :stroke-width="4"
            :padding="20"
            type="line"
            :colors="[color]"
            text-position="right"
          ></v-chart-percent>
          <!-- 提示语 -->
          <div class="progress__tip">{{ tip }}</div>
        </div>
      </div>
    </div>
  </v-dialog>
</template>

<script>
const COLOR_STATUS = {
  loading: "#0058E4",
  success: "#1db879",
  error: "#F7421E"
};
// 固定使用 login 请求
const GET_URL = "/login.html";
// 进度到达99依然没成功后，可以请求的次数，超过次数则跳转
const MAX_AJAX_NUM = 20;
//success连接后 5次跳转
const SUCCESS_TIMES = 5;

import NameMixin from "../name-mixins";

export default {
  mixins: [NameMixin],
  props: {
    // 弹窗标题
    dialogTitle: {
      type: String,
      default: "进度"
    },
    // 弹窗宽度
    dialogWidth: {
      type: Number,
      default: 640
    },
    // 进度条上面标题
    topTitle: String,
    // 进度条左边标题
    leftTitle: String,
    // 进度条提示语
    tip: String,
    // 是否自动启动进度条，默认启用
    autoStart: {
      type: Boolean,
      default: true
    },
    // 进度条总时间，单位秒
    time: {
      type: Number,
      default: 60
    },
    //进度 stratTime% 时开始获取是否重启
    startTime: {
      type: Number,
      default: 60
    },
    // 进度条状态：success, error, loading
    status: {
      type: String,
      default: "loading"
    },
    // 获取和跳转ip，配置ip后，只获取配置ip后的
    ip: String,
    // 配置跳转域名， 若配置域名 则和ip同时获取，但是优先ip，因为域名可能不生效，所以域名是备选有限方案
    domain: String,
    // 是否成功自动跳转，默认是自动跳转
    isAutoJump: {
      type: Boolean,
      default: true
    },
    // 协议 可以配置http 或 https
    protocol: String
  },
  mounted() {
    // 定时器事件
    if (this.autoStart) {
      this.startProgress();
      this.showDialog = true;
    }
  },
  data() {
    this.isConnectedIP = false; // 是否ip连接成功
    this.isConnectedDomain = false; // 是否域名连接成功
    this.timer = null; // 定时器
    this.showDialog = false;

    return {
      percent: 0, // 当前进度
      step: 1, // 每次增加percent的步长
      ajaxNum: 0 // 进度到达99%后没成功的获取次数
    };
  },
  computed: {
    // 定时器 时长
    intervalTime() {
      // 转换毫秒 然后除以100
      return (this.time * 1000) / 100;
    },
    // 当前百分比
    currentPercent() {
      return this.percent / 100;
    },
    // 当前状态对应的颜色
    color() {
      return COLOR_STATUS[this.status];
    },
    // 协议字符串 没有协议时不固定
    protocolStr() {
      return this.protocol ? `${this.protocol}://` : "//";
    },
    // 获取时的 url
    ipUrl() {
      let { ip, protocolStr } = this;
      let host = ip ? ip : window.location.host;
      return protocolStr + host + GET_URL;
    },
    // 获取域名的 url
    domainUrl() {
      let { domain, protocolStr } = this;
      if (domain) {
        return protocolStr + domain + GET_URL;
      }

      return "";
    },
    // 成功后跳转url
    toUrl() {
      let { isConnectedDomain, domainUrl, ipUrl } = this;
      return isConnectedDomain ? domainUrl : ipUrl;
    },
    // 判断是否成功
    isConnected() {
      return this.isConnectedIP || this.isConnectedDomain;
    }
  },
  methods: {
    // 开始或结束进度条
    startProgress() {
      this.showDialog = true;
      this.stopProgress();
      this.resetInfo();
      this.timer = setInterval(this.interval, this.intervalTime);
    },
    // 停止进度条
    stopProgress() {
      this.timer && clearInterval(this.timer);
    },
    // 重置部分数据
    resetInfo() {
      this.percent = 0;
      this.step = 1;
      this.isConnectedIP = false;
      this.isConnectedDomain = false;
      this.ajaxNum = 0;
    },
    // 定时循环处理
    interval() {
      let { isConnected, toUrl, startTime, step, isAutoJump } = this;

      // 没成功 停留在 99 获取20次后再跳转
      if (this.percent < 99 || isConnected) {
        this.percent += step;
      } else {
        // 最多再多请求20次 就直接跳转不在请求
        if (++this.ajaxNum >= MAX_AJAX_NUM) {
          this.isConnectedIP = true;
          this.percent = 100;
          isConnected = true;
        }
      }

      if (this.percent > 100) {
        this.percent = 100;
      }

      if (this.percent >= 100 && isConnected) {
        if (isAutoJump) {
          window.location.href = toUrl;
        }

        this.$emit("success", toUrl);
        this.stopProgress();
        this.closeDialog();

        // 开始获取是否连接成功
      } else if (this.percent > startTime) {
        this._getConnect();
      }
    },
    // 获取数据
    _getConnect() {
      let { ipUrl, domainUrl } = this;
      this.$get(ipUrl).then(() => {
        this.isConnectedIP = true;
        // 只有没有域名获取的时候才加速 ，有域名时若域名没有成功则继续按照正常进度请求
        !domainUrl && this._changeStep();
      });
      if (domainUrl) {
        // 可以和ip一起请求，但是优先域名
        this.$get(domainUrl).then(() => {
          this.isConnectedDomain = true;
          this._changeStep();
        });
      }
    },
    _changeStep() {
      if (this.percent < 95) {
        this.step = Math.ceil(100 - this.percent) / SUCCESS_TIMES;
      }
    },
    // 重新开始
    restart() {
      this.startProgress();
    },
    closeDialog() {
      // 关闭弹窗
      this.showDialog = false;
    }
  },
  beforeDestroy() {
    this.stopProgress();
  },
  watch: {
    time(val) {
      this.intervalTime = val * 10;
      // 时间改变重新开始
      this.startProgress();
    }
  }
};
</script>

<style lang="scss">
.progress-dialog {
  .v-dialog__main {
    text-align: center;
    min-height: 140px;
  }

  &__no-title {
    .v-dialog__title {
      visibility: hidden;
      height: 24px;
    }
  }
}
.progress {
  padding: 8px 0 32px;
  text-align: center;
  display: inline-block;

  &__title {
    vertical-align: top;
    line-height: 16px;
    height: 16px;
    font-size: 12px;
    color: #4b4b5a;
    margin-right: 8px;
    margin-bottom: 16px;
    text-align: center;
  }

  &__bar__wrap {
    display: flex;
    line-height: 16px;
    height: 16px;
    font-size: 12px;
    color: #4b4b5a;
    margin-right: 8px;
  }

  &__bar {
    width: 330px;
    display: inline-block;
    .v-chart__percent .v-chart__percent__detail__value {
      font-size: 12px;
    }
  }

  &__tip {
    margin-left: 16px;
    text-align: left;

    height: 16px;
    font-size: 12px;
    color: #f5a300;
    line-height: 16px;
    margin-top: 8px;
  }
}
</style>

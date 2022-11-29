## page-mixin

用于页面的一些通用操作，项目中可以参考这个 mixin 进行改写成符合项目的 page 通用项。

## page-mixin 需要支持项

- 基本信息配置
- 帮助信息处理
- 通用数据获取处理
- 提交处理
- 刷新处理

## mixin 代码

```js
import { trimStartEndStr } from "@/common/utils/utils";

export default {
  data() {
    this.refreshTimer = null;
    return {
      // modules:[], // 必填项，用于获取模块数据 这里不写死data类型，可以是计算属性
      // pageTitle:"", // 必填项，页面标题 这里不写死data类型，可以是计算属性
      initModules: [], // 用于首次进入页面时获取数据
      saveMsgObj: {
        successMsg: "", // 保存成功提示语，默认空
        errMsg: ""
      },
      isSubmitLoading: false, // 提交时的loading
      isInitLoading: true, // 初始loading
      refreshFlag: false, // 是否开启自动刷新 挂载时会监听这个值，
      refreshTime: 5000, // 更新时间
      trimKey: ["remark", "PolicyName"], // 自动出去前后的空格
      isRefreshAfterFail: true, // 保存失败之后是否更新数据
      pageRules: [] // 存储页面通用校验，保存前调用
    };
  },
  created() {
    // 存储初始刷新
    this.initRefreshFlag = this.refreshFlag;
    // 获取页面数据
    this.getData(true);
    // 启动刷新
    this.refresh(this.refreshFlag);

    this.setPageHelp();
  },
  methods: {
    /**
     * 获取数据
     * @param {boolean} isInit 是否初始化，若初始化则添加 initModule 一起获取
     */
    getData(isInit) {
      let modules = this.modules;
      if (isInit) {
        modules = modules.concat(this.initModules);
      }
      this.$getModules(modules).then(res => {
        this.isInitLoading = false;
        this.formatData(res, isInit);
      });
    },
    formatData(res) {
      return res;
    },
    /**
     * 对保存数据进行通用 trim 操作
     * @param {object} submitData
     */
    _trimStr(submitData) {
      if (submitData)
        this.trimKey.forEach(key => {
          // 去除前后空格处理
          if (submitData[key]) {
            submitData[key] = trimStartEndStr(submitData[key]);
          }
        });
    },
    /**
     * 提交前数据处理，目前是包装保存数据
     * @param {object} submitData
     * @param {string} submitModule
     * @returns
     */
    beforeSubmit(submitData, submitModule) {
      this._trimStr(submitData);
      // 默认使用module包裹

      return { [submitModule || this.modules[0]]: submitData };
    },

    /**
     * 提交
     * @param {object} submitData
     * @param {object} submitModule
     * @param {object} saveMsgObj
     * @returns
     */
    submit(submitData, submitModule, saveMsgObj) {
      // 自定义校验遍历所有自定义校验
      let error = "";
      this.pageRules.findIndex(valid => {
        if (typeof valid === "string") {
          if (typeof this[valid] === "function") {
            error = this[valid](submitData);
          }
        } else if (valid === "function") {
          error = valid(submitData);
        }

        return error;
      });

      if (error) {
        this.$notify.error(error);
        return false;
      }

      // 提交前数据处理
      submitData = this.beforeSubmit(submitData, submitModule);

      if (submitData === false) {
        return false;
      }

      this.isSubmitLoading = true;
      this.$setModule(submitData, saveMsgObj).then(res => {
        this.isSubmitLoading = false;
        // 保存成功之后刷新数据 若isRefreshAfterFail 为true 则失败之后也要刷新数据
        if (res.errCode == 0 || this.isRefreshAfterFail) {
          this.getRefreshData();
        }
      });
    },
    /**
     * 获取刷新数据
     */
    getRefreshData() {
      this.getData(false);
    },
    /**
     * 自动刷新处理 初始时自动获取一次
     * @param {boolean} start
     * @param {boolean} initFlag
     */
    refresh(start, initFlag) {
      this.refreshTimer && clearInterval(this.refreshTimer);
      if (start) {
        if (initFlag) {
          this.getRefreshData();
        }
        this.refreshTimer = setInterval(() => {
          this.getRefreshData();
        }, this.refreshTime);
      }
    },
    // 帮助信息处理
    setPageHelp() {
      return;
    }
  },
  watch: {
    refreshFlag(val) {
      // 只有初始flag是 true 的才可以 开启 // todo 看看这里要不要修改 若是为 false 也要能开启呢
      this.refresh(this.initRefreshFlag && val);
    }
  },
  beforeDestroy() {
    this.refreshFlag && this.refresh(false);
  }
};
```

// todo review: 确保项目中不会再重新引入axios，避免被打包多次
// import axios from "axios";
var axios = {};

class Http {
  config = {
    // 错误的信息对象
    commonErrMsg: {},
    // 获取的数据的接口
    getModulesUrl: "/goform/getModules",
    // 设置的统一的数据接口
    setModulesUrl: "/goform/setModules",
    // 设置返回的字段名
    errorCodeKey: "errCode",
    // 成功的状态码
    successCode: 0,
    // 信息的提示方式，此配置必须是挂载在vue上的，而且必须拥有成功和失败的错方法
    msgHintType: "$notify",
    // 失败的默认提示
    defaultErrMsg: _("保存失败"),
    // 成功的默认提示
    defaultSuccessMsg: _("保存成功")
  };

  constructor(config, vue, axiosF) {
    Object.assign(this.config, config);
    this.vue = vue.prototype;
    this.$message = vue[this.msgHintType];
    axios = axiosF;
  }

  setConfig(config) {
    Object.assign(this.config, config);
  }

  /**
   * 获取数据
   * @param {Object/Array} modules
   * @returns {Promise} 数据是获取到的数据对象
   */
  getModules(modules) {
    // 对模块数据进行转换
    if (Array.isArray(modules)) {
      if (modules.length == 0) {
        return;
      }

      let subObj = {};

      modules.forEach(item => {
        if (typeof item === "string") {
          subObj[item] = "";
        } else {
          subObj[item.module] = item;
          delete subObj[item.module].module;
        }
      });
      modules = subObj;
    }

    return this.post(this.config.getModulesUrl, modules);
  }

  /**
   * 提交module数据
   * @param {object} submitData
   * @param {object} options  提交配置处理
   * successMsg  {String || Boolean} 成功提示 false为不提示
   * errorMsg  {String || Boolean} 错误提示 false为不提示
   * @returns {Promise} 返回成功失败 以及接口返回值
   */
  setModules(submitData, options) {
    return this.post(this.config.setModulesUrl, submitData, options);
  }

  /**
   * 获取数据
   * @param {string} url
   * @param {object} data
   * @param {object} options  提交配置处理
   * successMsg  {String || Boolean} 成功提示 false为不提示
   * errorMsg  {String || Boolean} 错误提示 false为不提示
   * @returns
   */
  get(url, data, { successMsg = false, errorMsg = false } = {}) {
    let query = "";
    if (url.indexOf("?") == -1) {
      query = "?";
    } else if (url.indexOf("?") !== url.length - 1) {
      // 如果最后一个不是？
      query = "&";
    }

    // 拼接请求数据
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        query += `${key}=${value}&`;
      });
    }

    // 去除结尾多余的&
    query = query.replace(/&$/, "");

    return new Promise((resolve, reject) => {
      axios
        .get(url + query, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          }
        })
        .then(res => {
          return this.handelResult(
            res.data,
            resolve,
            reject,
            successMsg,
            errorMsg
          );
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }
  /**
   *
   * @param {string} url
   * @param {object} submitData
   * @param {object} options  提交配置处理
   * successMsg  {String || Boolean} 成功提示 false为不提示
   * errorMsg  {String || Boolean} 错误提示 false为不提示
   * costomErrorObj  {object} 错误提示对象
   * @param {string || Boolean} errorMsg
   * @returns
   */
  post(
    url,
    submitData,
    {
      successMsg = this.config.defaultSuccessMsg,
      errorMsg = this.config.defaultErrMsg,
      costomErrorObj = {}
    } = {}
  ) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, submitData)
        .then(res => {
          return this.handelResult(
            res.data,
            resolve,
            reject,
            successMsg,
            errorMsg,
            costomErrorObj
          );
        })
        .catch(function (err) {
          reject(err);
        });
    });
  }

  /**
   * @param {object} options  提交配置处理
   * @param successMsg  {String || Boolean} 成功提示 false为不提示
   * @param errorMsg  {String || Boolean} 错误提示 false为不提示
   * @param costomErrorObj  {object} 错误提示对象
   * @param {string || Boolean} errorMsg
   */
  handelResult(data, resolve, reject, successMsg, errorMsg, costomErrorObj) {
    if (data === undefined) {
      reject();
    }

    // 超时跳转
    if (data.toString().toUpperCase().indexOf("<!DOCTYPE HTML>") > -1) {
      window.location.reload(true);
      return;
    }
    let errCode = data[this.config.errorCodeKey];

    if (errCode !== undefined) {
      if (errCode === this.config.successCode) {
        if (successMsg !== false) {
          //false时不需要提示
          this.vue[this.config.msgHintType].success(successMsg);
        }
      } else {
        if (errorMsg !== false) {
          this.vue[this.config.msgHintType].error(
            this.getError(errCode, errorMsg, costomErrorObj)
          );
        }
      }
    }
    resolve(data);
  }
  /**
   * 返回错误提示信息
   * @param {String} code  错误码
   * @param {String} defaultMsg 默认的错误信息
   * @param {Object} costomErrorObj 错误信息对象，比默认的错误信息对象高
   * @returns
   */
  getError(code, errorMsg, costomErrorObj = {}) {
    return (
      costomErrorObj[code] ||
      this.config.commonErrMsg[code] ||
      errorMsg ||
      this.config.defaultErrMsg
    );
  }
}

export { Http };

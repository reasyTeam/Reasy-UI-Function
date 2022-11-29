// 添加语言处理等公共处理
import "./base/index";

// 注册组件
import VTableBasic from "./table/table-basic.vue";
import VTableExtend from "./table/table-extend.vue";
import VTableColExtend from "./table/table-col-extend.vue";
// import VTableMixin from "./table/table-mixin.vue";
import VOperateBtn from "./table/v-operate-btn.vue";
import VTableBtn from "./table/v-table-btn.vue";
import VColLayout from "./col/v-col.vue";
import ColList from "./col/col-list.vue";
import ProgressBar from "./progress-bar/progress-bar.vue";
import Port from "./port/port.vue";
import Login from "./login/login.vue";
import Backup from "./backup/backup.vue";
import RebootBtn from "./reboot-btn/reboot-btn.vue";
import Upgrade from "./upgrade/upgrade.vue";

import { valid } from "./valid/valid";

const components = {
  VTableBasic,
  VTableExtend,
  VTableColExtend,
  // VTableMixin,
  VOperateBtn,
  VTableBtn,
  VColLayout,
  ColList,
  ProgressBar,
  Port,
  Login,
  Backup,
  RebootBtn,
  Upgrade
};

const install = function (Vue) {
  for (let item in components) {
    Vue.component(item, components[item]);
    Vue.prototype.$valid = valid;
  }
};

export default {
  install
};

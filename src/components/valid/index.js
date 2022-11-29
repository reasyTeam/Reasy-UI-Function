import { valid } from "./valid";

let install = function (Vue) {
  Vue.prototype.$valid = valid;
};

export default { install, valid };

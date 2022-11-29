import { valid } from "./valid";
import { addClass, removeClass, hasClass } from "./utils";

HTMLElement.prototype.addClass = addClass;
HTMLElement.prototype.removeClass = removeClass;
HTMLElement.prototype.hasClass = hasClass;

let install = function (Vue) {
  Vue.prototype.$valid = valid;
};

export default { install, valid };

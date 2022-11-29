import { transCompText } from "../lang/translate";
import { addClass, removeClass, hasClass } from "../utils/utils";

HTMLElement.prototype.addClass = addClass;
HTMLElement.prototype.removeClass = removeClass;
HTMLElement.prototype.hasClass = hasClass;
window.transCompText = transCompText;

const install = function (Vue) {
  Vue.prototype.transCompText = transCompText;
};

export default { install };

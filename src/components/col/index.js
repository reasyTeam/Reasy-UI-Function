import VColLayout from "./v-col.vue";
import ColList from "./col-list.vue";

/* istanbul ignore next */
let install = function install(Vue) {
  Vue.component(VColLayout.name, VColLayout);
  Vue.component(ColList.name, ColList);
};

export default { install };

import Upgrade from "./upgrade.vue";

/* istanbul ignore next */
Upgrade.install = function install(Vue) {
  Vue.component(Upgrade.name, Upgrade);
};

export default Upgrade;

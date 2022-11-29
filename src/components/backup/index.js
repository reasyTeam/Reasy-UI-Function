import Backup from "./backup.vue";

/* istanbul ignore next */
Backup.install = function install(Vue) {
  Vue.component(Backup.name, Backup);
};

export default Backup;

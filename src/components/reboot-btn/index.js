import RebootBtn from "./reboot-btn.vue";

/* istanbul ignore next */
RebootBtn.install = function install(Vue) {
  Vue.component(RebootBtn.name, RebootBtn);
};

export default RebootBtn;

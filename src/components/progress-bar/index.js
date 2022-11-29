import ProgressBar from "./progress-bar.vue";

/* istanbul ignore next */
ProgressBar.install = function install(Vue) {
  Vue.component(ProgressBar.name, ProgressBar);
};

export default ProgressBar;

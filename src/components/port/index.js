import Port from "./port.vue";

/* istanbul ignore next */
Port.install = function install(Vue) {
  Vue.component(Port.name, Port);
};

export default Port;

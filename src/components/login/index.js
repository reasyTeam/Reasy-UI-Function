import Login from "./login.vue";

/* istanbul ignore next */
Login.install = function install(Vue) {
  Vue.component(Login.name, Login);
};

export default Login;

import { Http } from "./http";

Http.install = function (Vue, { axios, ...config }) {
  let http = new Http(config || {}, Vue, axios);
  Vue.prototype.$getModules = http.getModules.bind(http);
  Vue.prototype.$setModules = http.setModules.bind(http);
  Vue.prototype.$get = http.get.bind(http);
  Vue.prototype.$post = http.post.bind(http);
  Vue.prototype.$setHttpConfig = http.setConfig.bind(http);
};

export default Http;

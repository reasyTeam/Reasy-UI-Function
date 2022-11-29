import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import hljs from "highlight.js";
import argsText from "./views/valid-util/argsText";
import argsUtilsText from "./views/valid-util/argsUtilsText";
import utils from "./views/valid-util/utils";

window.argsText = argsText;
window.argsUtilsText = argsUtilsText;
window.utils = utils;

Vue.config.productionTip = false;

// import ReasyUi from "@reasy-team/reasy-ui/dist/trade/reasy-ui-full.js";
// import "@reasy-team/reasy-ui/dist/trade/style-full.css";
import ReasyUi from "./reasy-ui-full.js";
import "./style-full.css";
Vue.use(ReasyUi);

import axios from "axios";
// import Http from "../dist/http.js";
import Http from "./components/http/index.js";

// eslint-disable-next-line no-console
console.log(Http.install);
Vue.use(Http, { axios });

// import b28n from "../dist/b28n.js";
import b28n from "./components/b28n.js";

Vue.use(b28n, {
  supportLang: [
    "en",
    "cn",
    "brpt",
    "cs",
    "de",
    "es",
    "fr",
    "hu",
    "it",
    "ko",
    "laes",
    "nl",
    "pl",
    "pt",
    "ro",
    "ru",
    "tr",
    "uk",
    "zh"
  ]
});

// import Components from "../dist/reasy-ui-function.js";
import Components from "@/components/index";
Vue.use(Components);

// 引入样式
import "@/common/css/index.scss";

// 高亮处理
import demoBlock from "./demo/demo-block";
import SideLink from "./demo/side-link";
Vue.component("demo-block", demoBlock);
Vue.component("side-link", SideLink);

router.afterEach(() => {
  document.documentElement.scrollTop = 0;
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll("pre code:not(.hljs)");
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

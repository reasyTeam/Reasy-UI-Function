import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import navConfig from "./nav.config";

const loadComp = function (path, suffix = "md") {
  return () =>
    import(/* webpackChunkName: "[request]" */ `../views/${path}.${suffix}`);
};

const registerRoute = navConfig => {
  let route = [];

  navConfig.forEach(nav => {
    if (nav.href) return;
    let path = nav.path + "/";
    if (nav.groups) {
      nav.groups.forEach(group => {
        let path = group.path + "/";

        group.list.forEach(nav => {
          addRoute(nav, path);
        });
      });
    } else if (nav.children) {
      nav.children.forEach(nav => {
        addRoute(nav, path);
      });
    } else {
      addRoute(nav, path);
    }
  });

  function addRoute(page, path) {
    const component = loadComp(path + page.path, page.suffix);
    let child = {
      path: "/" + page.path,
      meta: {
        title: page.title || page.name,
        description: page.description
      },
      name: "component-" + (page.title || page.name),
      component: component
    };

    route.push(child);
  }

  return route;
};

let route = registerRoute(navConfig);

let defaultPath = "/start";

route = route.concat([
  {
    path: "/",
    redirect: defaultPath
  },
  {
    path: "*",
    redirect: defaultPath
  }
]);

const router = new VueRouter({
  routes: route
});

export default router;

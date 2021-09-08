import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      component: function (resolve) {
        require(["../pages/Home.vue"], resolve);
      },
    },
    {
      path: "/paper",
      component: function (resolve) {
        require(["../pages/Incorrupt.vue"], resolve);
        // require(["../pages/Paper2021.vue"], resolve);
      },
    },
    {
      path: "/info",
      component: function (resolve) {
        require(["../pages/Info.vue"], resolve);
      },
    },
    {
      path: "/login",
      component: function (resolve) {
        require(["../pages/Login.vue"], resolve);
      },
    },
    {
      path: "/chart",
      component: function (resolve) {
        require(["../pages/Chart.vue"], resolve);
      },
    },
  ],
});

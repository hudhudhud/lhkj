import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index";
import store from "./store";
import ErrorPage from "./views/ErrorPage";
import nprogress from "nprogress";
// 不显示圈圈
nprogress.configure({
  showSpinner: false
});
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/:customId/:formId",
      name: "index",
      component: Index
    },
    {
      path: "/:customId/zizhuceping/detail",
      name: "zizhuceping",
      component: () => import("@/views/ceping/zizhuceping"),
    },
    {
      path: "*",
      component: ErrorPage
    },
    {
      path: "/:customId/secondhouse",
      component: () => import("@/views/secondhouse/house"),
      children: [
        {
          path: "houseactive",
          component: () => import("@/views/secondhouse/houseactive")
        },
        {
          path: "houselist",
          component: () => import("@/views/secondhouse/houselist")
        },

        {
          path: "housereturn",
          component: () => import("@/views/secondhouse/housereturn")
        },
        {
          path: "houselogin",
          component: () => import("@/views/secondhouse/houselogin")
        }
      ]
    },
    {
      path: "/:customId/cbbSuzhou",
      component: () => import("@/views/cbbSuzhou/index"),
      children: [
        {
          path: "buyORrenthouse",
          component: () => import("@/views/cbbSuzhou/buyORrenthouse")
        },
        {
          path: "appointRecord",
          component: () => import("@/views/cbbSuzhou/appointment/appointRecord"),
        },
        {
          path: "appointDetail",
          name: "appointDetail",
          component: () => import("@/views/cbbSuzhou/appointment/appointDetail"),
        },
        {
          path: "appoint",
          component: () => import("@/views/cbbSuzhou/appointment/appoint"),
        }
      ]
    }
  ]
});
router.beforeEach(async (to, from, next) => {
  nprogress.start();
  if (to.params.customId) {
    store.commit("setCustomId", to.params.customId);
  }
  next();
});
router.afterEach((to, from, next) => {
  nprogress.done();
});
export default router;

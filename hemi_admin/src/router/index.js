import Vue from "vue";
import Router from "vue-router";
import adminRouters from "./admin";
import merchantPlatform from "./merchantPlatform";
import routers from "./base";
import nprogress from "nprogress";
import merchantRouters from "./merchant";
import activityRouters from "./activity";
import orderRouters from "./order";
import configRouters from "./config";
import mobileWhiteList from "./mobileWhiteList";
import referee from "./referee";
import custom from "./custom";
import creditDef from "./creditDef";
import creditConfig from "./creditConfig";
import merchantIp from "./merchantIp";
import merchantCustom from "./merchantCustom";
import listDef from "./listDef";
import couponRouters from "./coupon";
import graph from "./graph";
import cashierRouters from "./cashier";
import apiRequestLimit from "./apiRequestLimit";
import whiteList from "./commonWhiteList";
import merchantConsumeSerial from "./merchantConsumeSerial";
import staffWhileList from "./staffWhileList";
import queryOrder from "./queryOrder";
import activityOrder from "./activityOrder";
import sms from "./sms";
import preOrder from "./preOrder";
import refundRecord from "./refundRecord";
import applyRefund from "./applyRefund";
import staffAct from "./staffAct";
import ttyouli from "./ttstaffWhileList";
import ttBussiness from "./ttStoreBussiness";
import ttScanCode from "./ttScanCode";
import merchantpaystatics from "./merchantpaystatics";
import bankSerials from "./bankSerials";
import orderStatistics from "./orderStatistics";
import allApplyRefundRecord from "./allApplyRefundRecord";
import applyRefundRecord from "./applyRefundRecord";
import coloIndex from "./colo/index";
import project from "./project";
import institutionCredit from "./institutionCredit";
import provideCredit from "./provideCredit";
import partner from "./partner/partner";
import orderPredate from "./orderPredate";
import orderReceiptAddressRouters from "./orderReceiptAddress";
import dayidaRouters from "./dayida";
import form from "./form";
import ssshenghuo from "./ssshenghuo";

// 不显示圈圈
nprogress.configure({
  showSpinner: false
});

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      meta: {
        title: "主页"
      },
      component: () => import("@/pages/pub/Main"),
      children: routers
        .concat(adminRouters)
        .concat(dayidaRouters)
        .concat(merchantPlatform)
        .concat(merchantRouters)
        .concat(activityRouters)
        .concat(orderRouters)
        .concat(configRouters)
        .concat(couponRouters)
        .concat(cashierRouters)
        .concat(mobileWhiteList)
        .concat(referee)
        .concat(custom)
        .concat(creditDef)
        .concat(creditConfig)
        .concat(merchantIp)
        .concat(merchantCustom)
        .concat(listDef)
        .concat(graph)
        .concat(apiRequestLimit)
        .concat(whiteList)
        .concat(merchantConsumeSerial)
        .concat(staffWhileList)
        .concat(queryOrder)
        .concat(activityOrder)
        .concat(sms)
        .concat(preOrder)
        .concat(refundRecord)
        .concat(applyRefund)
        .concat(staffAct)
        .concat(ttyouli)
        .concat(ttBussiness)
        .concat(ttScanCode)
        .concat(merchantpaystatics)
        .concat(bankSerials)
        .concat(orderStatistics)
        .concat(allApplyRefundRecord)
        .concat(applyRefundRecord)
        .concat(coloIndex)
        .concat(project)
        .concat(institutionCredit)
        .concat(provideCredit)
        .concat(partner)
        .concat(orderPredate)
        .concat(orderReceiptAddressRouters)
        .concat(form)
        .concat(ssshenghuo)
    },

    {
      path: "/login",
      name: "Login",
      meta: {
        title: "登录"
      },
      component: () => import("@/pages/pub/Login")
    }
  ]
});

router.beforeEach((to, from, next) => {
  nprogress.start();
  next();
});

router.afterEach((to, from) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  nprogress.done();
});

export default router;

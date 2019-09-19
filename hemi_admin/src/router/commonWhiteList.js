export default [
  {
    path: "/commonWhiteList",
    meta: {
      title: "白名单管理"
    },
    component: () => import("@/pages/commonWhiteList/WhiteList"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/commonWhiteList/DefWhiteList")
      },

      {
        path: "phoneLocationLimitConfigForm/:defId",
        meta: {
          title: "地区白名单配置"
        },
        component: () =>
          import("@/pages/commonWhiteList/PhoneLocationLimitConfigForm")
      },
      {
        path: "BWMobileListList/:type/:defId",
        meta: {
          title: "黑号码详情"
        },
        component: () => import("@/pages/commonWhiteList/BWMobileListList")
      },
      {
        path: "CommonMobileList/:type/:defId",
        meta: {
          title: "通用号码详情"
        },
        component: () => import("@/pages/commonWhiteList/CommonMobileList")
      }
    ]
  }
]

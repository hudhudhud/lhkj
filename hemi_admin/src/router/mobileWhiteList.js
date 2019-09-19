export default [
  {
    path: "/mobileWhiteList",
    meta: {
      title: "白名单管理"
    },
    component: () => import("@/pages/mobileWhiteList/MobileWhiteList"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/mobileWhiteList/MobileWhiteListList")
      },
      {
        path: "phoneLocationLimitConfigForm/:defId",
        meta: {
          title: "地区白名单配置"
        },
        component: () =>
          import("@/pages/mobileWhiteList/PhoneLocationLimitConfigForm")
      },
      {
        path: "BWMobileListList/:type/:defId",
        meta: {
          title: "号码详情"
        },
        component: () => import("@/pages/mobileWhiteList/BWMobileListList")
      },
      {
        path: "apiLimitQueryConfigForm/:defId",
        meta: {
          title: "API限制配置"
        },
        component: () =>
          import("@/pages/mobileWhiteList/ApiLimitQueryConfigForm")
      }
    ]
  }
]

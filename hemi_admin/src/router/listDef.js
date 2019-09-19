// 商户侧
export default [
  {
    path: "/listDef",
    meta: {
      title: "限制配置"
    },
    component: () => import("@/pages/listDef/ListDef"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/listDef/ListDefList")
      },
      {
        path: "BWMobileListForm/:defId",
        meta: {
          title: "地区白名单配置"
        },
        component: () => import("@/pages/listDef/BWMobileListForm")
      },
      {
        path: "BWMobileListList/:type/:defId",
        meta: {
          title: "号码详情"
        },
        component: () => import("@/pages/listDef/BWMobileListList")
      },
      {
        path: "phoneLocationLimitConfigForm",
        meta: {
          title: "选择模版"
        },
        component: () => import("@/pages/listDef/PhoneLocationLimitConfigForm")
      }
    ]
  }
]

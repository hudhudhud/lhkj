export default [
  {
    path: "/creditConfig",
    meta: {
      title: "积分类型管理"
    },
    component: () => import("@/pages/creditConfig/CreditConfig"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/creditConfig/CreditConfigList")
      }
    ]
  }
]

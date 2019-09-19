export default [
  {
    path: "/creditDef",
    meta: {
      title: "积分规则管理"
    },
    component: () => import("@/pages/creditDef/CreditDef"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/creditDef/CreditDefList")
      }
    ]
  }
]

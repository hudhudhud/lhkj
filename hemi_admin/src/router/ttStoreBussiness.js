export default [
  {
    path: "/ttstaffBusinessLog",
    meta: {
      title: "厅堂存款业务管理"
    },
    component: () => import("@/pages/tingtang/ttBussiness"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/tingtang/ttStoreBussiness")
      }
    ]
  }
]

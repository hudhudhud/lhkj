export default [
  {
    path: "/ttstaffWhileList",
    meta: {
      title: "厅堂有礼员工管理"
    },
    component: () => import("@/pages/tingtang/ttStaffWhileList"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/tingtang/ttStaffWhileListList")
      }
    ]
  }
]

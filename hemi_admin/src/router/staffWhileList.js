export default [
  {
    path: "/staffWhileList",
    meta: {
      title: "员工白名单管理"
    },
    component: () => import("@/pages/staffWhileList/StaffWhileList"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/staffWhileList/StaffWhileListList")
      }
    ]
  }
]

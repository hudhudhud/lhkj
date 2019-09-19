export default [
  {
    path: "/custom",
    meta: {
      title: "用户管理"
    },
    component: () => import("@/pages/custom/Custom"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/custom/CustomList")
      }
    ]
  }
]

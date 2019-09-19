export default [
  {
    path: "/graph",
    meta: {
      title: "数据统计"
    },
    component: () => import("@/pages/graph/graph"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/graph/Index")
      }
    ]
  }
]

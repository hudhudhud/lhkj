export default [
  {
    path: "/queryOrder",
    meta: {
      title: "全平台查单"
    },
    component: () => import("@/pages/queryOrder/QueryOrder"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/queryOrder/QueryOrderForm")
      }
    ]
  }
]

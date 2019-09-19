export default [
  {
    path: "/activityOrder",
    meta: {
      title: "订单详情"
    },
    component: () => import("@/pages/activityOrder/ActivityOrder"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/activityOrder/ActivityOrderList")
      }
    ]
  }
]

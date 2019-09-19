export default [
  {
    path: "/colo/order",
    meta: {
      title: "订单管理"
    },
    component: () => import("@/pages/colo/order/Order"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/colo/order/OrderList")
      }
    ]
  }
]

export default [
  {
    path: "/preOrder",
    meta: {
      title: "预期支付订单"
    },
    component: () => import("@/pages/preOrder/PreOrder"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/preOrder/PreOrderList")
      }
    ]
  }
]

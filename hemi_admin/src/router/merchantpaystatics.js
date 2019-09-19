export default [
  {
    path: "/merchant_pay",
    meta: {
      title: "商户支付统计"
    },
    component: () => import("@/pages/merchant/pay/statics"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/merchant/pay/statics2")
      }
    ]
  }
]

export default [
  {
    path: "/bank_serials",
    meta: {
      title: "银行入账总览"
    },
    component: () => import("@/pages/merchant/pay/bank"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/merchant/pay/bank2")
      }
    ]
  }
]

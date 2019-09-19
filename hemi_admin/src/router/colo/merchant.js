export default [
  {
    path: "/colo/merchant",
    meta: {
      title: "商户管理"
    },
    component: () => import("@/pages/colo/merchant/Merchant"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/colo/merchant/MerchantList")
      }
    ]
  }
]

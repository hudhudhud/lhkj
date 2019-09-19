// 商户侧
export default [
  {
    path: "/merchantIp",
    meta: {
      title: "IP白名单配置"
    },
    component: () => import("@/pages/merchantIp/MerchantIp"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/merchantIp/MerchantIpList")
      }
    ]
  }
]

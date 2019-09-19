export default [
  {
    path: "/merchantCustom",
    meta: {
      title: "用户管理"
    },
    component: () => import("@/pages/merchantCustom/MerchantCustom"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/merchantCustom/MerchantCustomList")
      }
    ]
  }
]

export default [
  {
    path: "/colo/coupon/define",
    meta: {
      title: "券定义管理"
    },
    component: () => import("@/pages/colo/coupon/define/Define"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/colo/coupon/define/DefineList")
      }
    ]
  }
]

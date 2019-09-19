export default [
  {
    path: "/colo/coupon/code",
    meta: {
      title: "券定义管理"
    },
    component: () => import("@/pages/colo/coupon/code/Code"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/colo/coupon/code/CodeList")
      }
    ]
  }
]

export default [
  {
    path: "/colo/coupon/batch",
    meta: {
      title: "券批次管理"
    },
    component: () => import("@/pages/colo/coupon/batch/Batch"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/colo/coupon/batch/BatchList")
      }
    ]
  }
]

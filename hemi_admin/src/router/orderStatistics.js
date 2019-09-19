export default [
  {
    path: "/orderStatistics",
    meta: {
      title: "订单对账"
    },
    component: () => import("@/pages/financial/orderStatistics/index"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () =>
          import("@/pages/financial/orderStatistics/orderStatisticsList")
      }
    ]
  }
]

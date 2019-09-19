export default [
  {
    path: "/merchantPlatform/order",
    meta: {
      title: "订单管理"
    },
    component: () => import("@/pages/merchantPlatform/order/Index")
  },
  {
    path: "/merchantPlatform/activity",
    meta: {
      title: "活动管理"
    },
    component: () => import("@/pages/merchantPlatform/activity/Index")
  },
  {
    path: "/merchantPlatform/report",
    meta: {
      title: "报表统计"
    },
    component: () => import("@/pages/merchantPlatform/report/Index")
  }
]

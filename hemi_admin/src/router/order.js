export default [
  {
    path: "/order",
    name: "Order",
    meta: {
      title: "订单管理"
    },
    component: () => import("@/pages/order/Index")
  },
  {
    path: "order/comfirmFishOrder/:orderNumber",
    name: "ComfirmFishOrder",
    meta: {
      title: "核查飞鱼订单"
    },
    component: () => import("@/pages/order/ComfirmFishOrder")
  },
  {
    path: "/monitor",
    name: "Monitor",
    meta: {
      title: "数据监控"
    },
    component: () => import("@/pages/monitor/Index")
  }
]

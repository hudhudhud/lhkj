export default [
  {
    path: "/orderReceiptAddress",
    name: "OrderReceiptAddress",
    meta: {
      title: "收货地址管理"
    },
    component: () => import("@/pages/orderReceiptAddress/Index")
  }
]

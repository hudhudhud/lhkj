export default [
  {
    path: "/applyRefund/:orderCode",
    meta: {
      title: "申请退款"
    },
    component: () => import("@/pages/applyRefund/ApplyRefundList")
  }
]

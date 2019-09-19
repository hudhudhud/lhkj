export default [
  {
    path: "/refundRecord",
    meta: {
      title: "退款流水"
    },
    component: () => import("@/pages/refundRecord/RefundRecord"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/refundRecord/RefundRecordList")
      }
    ]
  }
]

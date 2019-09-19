export default [
  {
    path: "/applyRefundRecord",
    meta: {
      title: "退款申请记录"
    },
    component: () => import("@/pages/applyRefundRecord/ApplyRefundRecord"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/applyRefundRecord/ApplyRefundRecordList")
      }
    ]
  }
]

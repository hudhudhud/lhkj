export default [
  {
    path: "/allApplyRefundRecord",
    meta: {
      title: "申请记录"
    },
    component: () =>
      import("@/pages/allApplyRefundRecord/AllApplyRefundRecord"),
    children: [
      {
        path: "",
        meta: {
          title: "申请记录"
        },
        component: () =>
          import("@/pages/allApplyRefundRecord/AllApplyRefundRecordList")
      }
    ]
  }
]

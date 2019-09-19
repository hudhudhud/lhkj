export default [
  {
    path: "/cashier",
    meta: {
      title: "常用工具"
    },
    component: () => import("@/pages/cashier/Index"),
    children: [
      {
        path: "",
        meta: {
          title: "建行核单"
        },
        component: () => import("@/pages/cashier/CcbCsvCheckSerialList")
      },
      {
        path: "detail/:batchSerialnum",
        meta: {
          title: "核单明细"
        },
        component: () => import("@/pages/cashier/CcbCsvIssueOrderList")
      }
    ]
  }
]

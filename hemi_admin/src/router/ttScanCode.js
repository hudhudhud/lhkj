export default [
  {
    path: "/staffActLog",
    meta: {
      title: "厅堂扫码业务管理"
    },
    component: () => import("@/pages/tingtang/scanCode"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/tingtang/ttScanCode")
      }
    ]
  }
]

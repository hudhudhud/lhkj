export default [
  {
    path: "/colo/proStandard",
    meta: {
      title: "产品管理"
    },
    component: () => import("@/pages/colo/proStandard/ProStandard"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/colo/proStandard/ProStandardList")
      }
    ]
  }
]

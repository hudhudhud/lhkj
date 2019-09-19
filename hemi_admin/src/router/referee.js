export default [
  {
    path: "/referee",
    meta: {
      title: "推荐管理"
    },
    component: () => import("@/pages/referee/Referee"),
    children: [
      {
        path: "refereeList",
        meta: {
          title: "推手管理"
        },
        component: () => import("@/pages/referee/RefereeList")
      },
      {
        path: "refereeCredit",
        meta: {
          title: "注册积分管理"
        },
        component: () => import("@/pages/referee/RefereeCredit")
      },
      {
        path: "refereeAudit",
        meta: {
          title: "营销管理"
        },
        component: () => import("@/pages/refereeAudit/RefereeAuditList")
      }
    ]
  }
]

export default [
  {
    path: "/institutionCredit",
    meta: {
      title: "机构积分"
    },
    component: () => import("@/pages/credit/Index"),
    children: [
      {
        path: "",
        meta: {
          title: "机构列表",
          keepAlive: true
        },
        component: () => import("@/pages/credit/institutionCredit/institutionCreditList")
      },
      {
        path: "distributeCredit/:subsidiaryMechanismId/:subsidiaryMechanismName/:mechanismId",
        meta: {
          title: "分配积分"
        },
        component: () => import("@/pages/credit/institutionCredit/distributeCreditForm")
      }
    ]
  }

]

export default [
  {
    path: "/provideCredit",
    meta: {
      title: "积分发放"
    },
    component: () => import("@/pages/credit/Index"),
    children: [
      {
        path: "",
        meta: {
          title: "发放列表",
          keepAlive: true
        },
        component: () => import("@/pages/credit/provideCredit/provideCreditList")
      },
      {
        path: "singleProvide/",
        meta: {
          title: "单个发放"
        },
        component: () => import("@/pages/credit/provideCredit/singleProvideCreditForm")
      },
      {
        path: "batchProvide/",
        meta: {
          title: "批量发放"
        },
        component: () => import("@/pages/credit/provideCredit/batchProvideCreditForm")
      }

    ]
  }

]

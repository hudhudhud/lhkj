export default [
  {
    path: "/form",
    meta: {
      title: "表单管理"
    },
    component: () => import("@/pages/form/Form"),
    children: [
      {
        path: "formList",
        meta: {
          title: "表单配置"
        },
        component: () => import("@/pages/form/FormList")
      },
      {
        path: "formDataListBK",
        meta: {
          title: "预约信息记录"
        },
        component: () => import("@/pages/form/FormDataListBK")
      },
      {
        path: "formDataListJZ",
        meta: {
          title: "家装分期登记"
        },
        component: () => import("@/pages/form/FormDataListJZ")
      },
      {
        path: "formDataListMF",
        meta: {
          title: "我要买房登记"
        },
        component: () => import("@/pages/form/FormDataListMF")
      },
      {
        path: "formDataListQC",
        meta: {
          title: "汽车分期登记"
        },
        component: () => import("@/pages/form/FormDataListQC")
      }
    ]
  }
]

export default [
  {
    path: "/apiRequestLimit",
    meta: {
      title: "常用工具"
    },
    component: () => import("@/pages/apiRequestLimit/Index"),
    children: [
      {
        path: "",
        meta: {
          title: "接口访问限制配置"
        },
        component: () => import("@/pages/apiRequestLimit/ApiRequestLimitList")
      },
      {
        path: "addApiRequestLimit",
        meta: {
          title: "新增配置"
        },
        component: () => import("@/pages/apiRequestLimit/ApiRequestLimitForm")
      },
      {
        path: "editApiRequestLimit/:id",
        meta: {
          title: "编辑配置"
        },
        component: () => import("@/pages/apiRequestLimit/ApiRequestLimitForm")
      }
    ]
  }
]

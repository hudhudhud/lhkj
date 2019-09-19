export default [
  {
    path: "/project",
    meta: {
      title: "项目列表"
    },
    component: () => import("@/pages/project/Index"),
    children: [
      {
        path: "",
        meta: {
          title: "项目列表"
        },
        component: () => import("@/pages/project/ProjectList")
      },
      {
        path: "actConfig/:projectId",
        meta: {
          title: "活动配置"
        },
        component: () => import("@/pages/project/ProjectActConfig")
      }

    ]
  }

]

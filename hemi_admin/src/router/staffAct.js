export default [
  {
    path: "/staffAct",
    meta: {
      title: "上传机构"
    },
    component: () => import("@/pages/staffAct/StaffAct"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/staffAct/StaffActList")
      }
    ]
  }
]

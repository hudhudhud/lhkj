export default [{
  path: "/dayida",
  meta: {
    title: "答一答管理"
  },
  component: () => import("@/pages/dayida/Index"),
  children: [{
    path: "",
    meta: {
      title: "活动列表"
    },
    component: () => import("@/pages/dayida/ActivityList")
  },
  {
    path: "editQuestion/:actId",
    meta: {
      title: "编辑题目"
    },
    component: () => import("@/pages/dayida/QuestionForm")
  },
  {
    path: "addActivity",
    meta: {
      title: "新增活动"
    },
    component: () => import("@/pages/dayida/ActivityForm")
  },
  {
    path: "editActivity/:actId",
    meta: {
      title: "编辑活动"
    },
    component: () => import("@/pages/dayida/ActivityForm")
  }
  ]
}]

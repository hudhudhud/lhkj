export default [
  {
    path: "/sms",
    meta: {
      title: "发送短信"
    },
    component: () => import("@/pages/sms/Sms"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/sms/SmsForm")
      }
    ]
  }
]

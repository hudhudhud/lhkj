export default [
  {
    path: "/shpartner",
    meta: {
      title: "合伙人"
    },
    component: () => import("@/pages/partner/Partner"),
    children: [
      {
        path: "application_card",
        meta: {
          title: "办卡送积分"
        },
        component: () => import("@/pages/partner/ApplicationCard")
      },
      {
        path: "feedback",
        meta: {
          title: "用户反馈"
        },
        component: () => import("@/pages/partner/Feedback")
      }
    ]
  }
];

export default [
  {
    path: "merchantConsumeSerial",
    meta: {
      title: "商户流水"
    },
    component: () =>
      import("@/pages/merchantConsumeSerial/MerchantConsumeSerial"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () =>
          import("@/pages/merchantConsumeSerial/MerchantConsumeSerialList")
      }
    ]
  }
]

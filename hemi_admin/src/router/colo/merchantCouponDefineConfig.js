export default [
  {
    path: "/colo/merchantCouponDefineConfig",
    meta: {
      title: "商户券定义配置"
    },
    component: () => import("@/pages/colo/merchantCouponDefineConfig/MerchantCouponDefineConfig"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/colo/merchantCouponDefineConfig/MerchantCouponDefineConfigList")
      },
      {
        path: "oneCouponOfManyForm",
        meta: {
          title: "单券配置多商户"
        },
        component: () => import("@/pages/colo/merchantCouponDefineConfig/OneCouponOfManyForm")
      },
      {
        path: "oneMerchantOfManyForm",
        meta: {
          title: "单商户配置多券"
        },
        component: () => import("@/pages/colo/merchantCouponDefineConfig/OneMerchantOfManyForm")
      },
      {
        path: "manyOfMany",
        meta: {
          title: "多券配置多商户"
        },
        component: () => import("@/pages/colo/merchantCouponDefineConfig/ManyOfManyForm")
      }
    ]
  }
]

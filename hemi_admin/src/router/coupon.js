export default [
  {
    path: "/coupon",
    meta: {
      title: "卡券管理"
    },
    component: () => import("@/pages/coupon/Index"),
    children: [
      {
        path: "",
        meta: {
          title: "卡券新增"
        },
        component: () => import("@/pages/coupon/CouponList")
      },
      {
        path: "couponList",
        meta: {
          title: "卡券列表"
        },
        component: () => import("@/pages/coupon/CouponSearchList")
      },
      {
        path: "addCoupon",
        meta: {
          title: "新增卡券"
        },
        component: () => import("@/pages/coupon/CouponForm")
      },
      {
        path: "editCoupon/:id",
        meta: {
          title: "编辑卡券"
        },
        component: () => import("@/pages/coupon/CouponForm")
      },
      {
        path: "exportCouponStock/:id",
        meta: {
          title: "导出券码"
        },
        component: () => import("@/pages/coupon/CouponStockForm")
      }
    ]
  }
]

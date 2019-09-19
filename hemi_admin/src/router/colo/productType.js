export default [
  {
    path: "/colo/productType",
    meta: {
      title: "产品类型管理"
    },
    component: () => import("@/pages/colo/productType/ProductType"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/colo/productType/ProductTypeList")
      }
    ]
  }
]

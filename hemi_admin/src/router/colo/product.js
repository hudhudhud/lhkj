export default [
  {
    path: "/colo/product",
    meta: {
      title: "产品管理"
    },
    component: () => import("@/pages/colo/product/Product"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/colo/product/ProductList")
      }
    ]
  }
]

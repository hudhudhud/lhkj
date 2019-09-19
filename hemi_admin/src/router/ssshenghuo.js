export default [{
  path: "/ssshenghuo",
  meta: {
    title: "苏式生活"
  },
  component: () => import("@/pages/ssshenghuo/Index"),
  children: [{
    path: "ssMFZF",
    meta: {
      title: "买房租房需求"
    },
    component: () => import("@/pages/ssshenghuo/ssMFZF")
  },
  {
    path: "ssNotice",
    meta: {
      title: "苏式小贴士"
    },
    component: () => import("@/pages/ssshenghuo/ssNotice")
  },
  {
    path: "ssMerchantList",
    meta: {
      title: "合作4S店门店列表"
    },
    component: () => import("@/pages/ssshenghuo/ssMerchantList")
  },
  {
    path: "addMerchant/:origin",
    component: () => import("@/pages/ssshenghuo/addMerchant")
  },
  {
    path: "ssCarList",
    meta: {
      title: "合作4S店车辆列表"
    },
    component: () => import("@/pages/ssshenghuo/ssCarList")
  },
  {
    path: "ssMerchantJJJD",
    meta: {
      title: "家居家电商户列表"
    },
    component: () => import("@/pages/ssshenghuo/ssMerchantJJJD")
  },
  {
    path: "ssProductJJJD",
    meta: {
      title: "家居家电商品列表"
    },
    component: () => import("@/pages/ssshenghuo/ssProductJJJD")
  },
  {
    path: "ssMerchantJC",
    meta: {
      title: "建材商户列表"
    },
    component: () => import("@/pages/ssshenghuo/ssMerchantJC")
  },
  {
    path: "ssProductJC",
    meta: {
      title: "建材商品列表"
    },
    component: () => import("@/pages/ssshenghuo/ssProductJC")
  },
  {
    path: "ssMerchantZXSJ",
    meta: {
      title: "装修设计商户列表"
    },
    component: () => import("@/pages/ssshenghuo/ssMerchantZXSJ")
  },
  {
    path: "ssProductZXSJ",
    meta: {
      title: "装修设计商品列表"
    },
    component: () => import("@/pages/ssshenghuo/ssProductZXSJ")
  },
  {
    path: "ssDataListJZ",
    meta: {
      title: "家装分期登记"
    },
    component: () => import("@/pages/ssshenghuo/ssDataListJZ")
  },
  {
    path: "ssListMF",
    meta: {
      title: "我要买房登记"
    },
    component: () => import("@/pages/ssshenghuo/ssListMF")
  },
  {
    path: "ssListQC",
    meta: {
      title: "车贷款分期登记"
    },
    component: () => import("@/pages/ssshenghuo/ssListQC")
  },
  {
    path: "ssActJJJ",
    meta: {
      title: "家装节活动"
    },
    component: () => import("@/pages/ssshenghuo/ssActJJJ")
  },
  {
    path: "ssSignupActJJJ",
    meta: {
      title: "家装节活动报名"
    },
    component: () => import("@/pages/ssshenghuo/ssSignupActJJJ")
  },
  {
    path: "ssCarStagProduct",
    meta: {
      title: "汽车分期商品"
    },
    component: () => import("@/pages/ssshenghuo/ssCarStagProduct")
  }
  ]
}];

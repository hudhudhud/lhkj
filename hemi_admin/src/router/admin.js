export default [
  {
    path: "",
    redirect: "/dashboard"
  },
  {
    path: "main",
    redirect: "/dashboard"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    meta: {
      title: "首页"
    },
    component: () => import("@/pages/dashboard/Index")
  },
  // {
  //   path: "/merchant",
  //   name: "Merchant",
  //   meta: {
  //     title: "商户管理"
  //   },
  //   component: () => import("@/pages/merchant/Index")
  // },
  // {
  //   path: "/merchant/templateConfig/:merchantId",
  //   name: "MerchantTemplate",
  //   meta: {
  //     title: "模板管理"
  //   },
  //   component: () => import("@/pages/merchant/config/Index")
  // },
  // {
  //   path: "/activity",
  //   meta: {
  //     title: "活动管理"
  //   },
  //   component: () => import("@/pages/activity/Index"),
  //   children: [
  //     {
  //       path: "",
  //       meta: {
  //         title: "活动列表"
  //       },
  //       component: () => import("@/pages/activity/ActivityList")
  //     },
  //     {
  //       path: "addActivity",
  //       meta: {
  //         title: "新增活动"
  //       },
  //       component: () => import("@/pages/activity/ActivityForm")
  //     },
  //     {
  //       path: "white/:actId",
  //       meta: {
  //         title: "白名单"
  //       },
  //       component: () => import("@/pages/activity/WhiteList")
  //     },
  //     {
  //       path: "whiteImport/:actId",
  //       meta: {
  //         title: "白名单导入"
  //       },
  //       component: () => import("@/pages/activity/WhiteImport")
  //     },
  //     {
  //       path: "editActivity/:actId",
  //       meta: {
  //         title: "编辑活动"
  //       },
  //       component: () => import("@/pages/activity/ActivityForm")
  //     },
  //     {
  //       path: "timeConfig/:actId",
  //       meta: {
  //         title: "时间配置"
  //       },
  //       component: () => import("@/pages/activity/SeckillTimeConfig")
  //     },

  //     {
  //       path: "actTemplate/:actId",
  //       meta: {
  //         title: "模板设置"
  //       },
  //       component: () => import("@/pages/activity/config/Index")
  //     },
  //     {
  //       path: "limit/:actId",
  //       meta: {
  //         title: "活动限制"
  //       },
  //       component: () => import("@/pages/activity/Index"),
  //       children: [
  //         {
  //           path: "",
  //           meta: {
  //             title: "活动限制"
  //           },
  //           component: () => import("@/pages/activity/LimitList")
  //         },

  //         {
  //           path: "addLimit/:id",
  //           meta: {
  //             title: "新增限制"
  //           },
  //           component: () => import("@/pages/activity/LimitForm")
  //         }
  //       ]
  //     },
  //     {
  //       path: "product/:actId",
  //       meta: {
  //         title: "商品管理"
  //       },
  //       component: () => import("@/pages/activity/Index"),
  //       children: [
  //         {
  //           path: "",
  //           meta: {
  //             title: "商品管理"
  //           },
  //           component: () => import("@/pages/activity/ProductList")
  //         },
  //         {
  //           path: "standard/:proId",
  //           meta: {
  //             title: "规格列表"
  //           },
  //           component: () => import("@/pages/activity/StandardList")
  //         },
  //         {
  //           path: "addStandard/:proId",
  //           meta: {
  //             title: "新增规格"
  //           },
  //           component: () => import("@/pages/activity/StandardForm")
  //         },
  //         {
  //           path: "editStandard/:standardId",
  //           meta: {
  //             title: "编辑规格"
  //           },
  //           component: () => import("@/pages/activity/StandardForm")
  //         },
  //         {
  //           path: "proLimit/:proId",
  //           meta: {
  //             title: "商品限制"
  //           },
  //           component: () => import("@/pages/activity/Index"),
  //           children: [
  //             {
  //               path: "",
  //               meta: {
  //                 title: "商品限制"
  //               },
  //               component: () => import("@/pages/activity/LimitList")
  //             },

  //             {
  //               path: "addLimit/",
  //               meta: {
  //                 title: "新增限制"
  //               },
  //               component: () => import("@/pages/activity/LimitForm")
  //             }
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       path: "lottery/:actId",
  //       meta: {
  //         title: "奖品管理"
  //       },
  //       component: () => import("@/pages/activity/Index"),
  //       children: [
  //         {
  //           path: "",
  //           meta: {
  //             title: "奖品管理"
  //           },
  //           component: () => import("@/pages/activity/LotteryList")
  //         },
  //         {
  //           path: "addLottery",
  //           meta: {
  //             title: "新增奖品"
  //           },
  //           component: () => import("@/pages/activity/LotteryForm")
  //         },
  //         {
  //           path: "editLottery/:id",
  //           meta: {
  //             title: "编辑奖品"
  //           },
  //           component: () => import("@/pages/activity/LotteryForm")
  //         },
  //         {
  //           path: "winningRecodeList/:standardId",
  //           meta: {
  //             title: "中奖纪录"
  //           },
  //           component: () => import("@/pages/activity/ActivityOrder")
  //         }
  //         /* {
  //           path: "winningRecodeList/:id",
  //           meta: {
  //             title: "中奖纪录"
  //           },
  //           component: () => import("@/pages/activity/WinningRecodeList")
  //         } */
  //       ]
  //     },
  //     {
  //       path: "ticket/:actId",
  //       meta: {
  //         title: "券管理"
  //       },
  //       component: () => import("@/pages/activity/Index"),
  //       children: [
  //         {
  //           path: "",
  //           meta: {
  //             title: "券管理"
  //           },
  //           component: () => import("@/pages/activity/TicketList")
  //         },
  //         {
  //           path: "addTicket",
  //           meta: {
  //             title: "新增券"
  //           },
  //           component: () => import("@/pages/activity/TicketForm")
  //         },
  //         {
  //           path: "editTicket/:id",
  //           meta: {
  //             title: "编辑券"
  //           },
  //           component: () => import("@/pages/activity/TicketForm")
  //         }
  //       ]
  //     },
  //     {
  //       path: "productForm/:proId",
  //       meta: {
  //         title: "商品信息"
  //       },
  //       component: () => import("@/pages/activity/ProductForm")
  //     },
  //     {
  //       path: "addProduct/:actId",
  //       meta: {
  //         title: "新增商品"
  //       },
  //       component: () => import("@/pages/activity/ProductForm")
  //     },
  //     {
  //       path: "editProduct/:proId",
  //       meta: {
  //         title: "编辑商品"
  //       },
  //       component: () => import("@/pages/activity/ProductForm")
  //     }
  //   ]
  // },
  // {
  //   path: "merchant/edit/:mid",
  //   name: "MerchantEdit",
  //   meta: {
  //     title: "商户编辑"
  //   },
  //   component: () => import("@/pages/merchant/MerchantForm")
  // },
  // {
  //   path: "merchant/add",
  //   name: "MerchantAdd",
  //   meta: {
  //     title: "商户添加"
  //   },
  //   component: () => import("@/pages/merchant/MerchantForm")
  // },
  // {
  //   path: "merchant/wechatPayConfig/:id",
  //   meta: {
  //     title: "微信支付配置"
  //   },
  //   component: () => import("@/pages/merchant/WechatPayConfig")
  // },
  // {
  //   path: "merchant/ccbPayConfig/:id",
  //   meta: {
  //     title: "建行支付配置"
  //   },
  //   component: () => import("@/pages/merchant/CCBPayConfig")
  // },
  // {
  //   path: "merchant/icbcPayConfig/:id",
  //   meta: {
  //     title: "工行支付配置"
  //   },
  //   component: () => import("@/pages/merchant/ICBCPayConfig")
  // },
  // {
  //   path: "merchant/wechatOpenLoginConfig/:id",
  //   meta: {
  //     title: "微信开放平台登录配置"
  //   },
  //   component: () => import("@/pages/merchant/WechatOpenLoginConfig")
  // },
  // {
  //   path: "merchant/wechatPublicLoginConfig/:id",
  //   meta: {
  //     title: "微信公众号登录配置"
  //   },
  //   component: () => import("@/pages/merchant/WechatPublicLoginConfig")
  // },
  // {
  //   path: "merchant/icbcLoginConfig/:id",
  //   meta: {
  //     title: "工行登录配置"
  //   },
  //   component: () => import("@/pages/merchant/ICBCLoginConfig")
  // },
  // {
  //   path: "merchant/ccbLoginConfig/:id",
  //   meta: {
  //     title: "中行登录配置"
  //   },
  //   component: () => import("@/pages/merchant/CCBLoginConfig")
  // },
  // {
  //   path: "merchant/mobileLoginConfig/:id",
  //   meta: {
  //     title: "手机验证登录配置"
  //   },
  //   component: () => import("@/pages/merchant/MobileLoginConfig")
  // },
  // {
  //   path: "merchant/salesman",
  //   name: "MerchantSalesman",
  //   meta: {
  //     title: "我的商户"
  //   },
  //   component: () => import("@/pages/merchant/MerchantSalesman")
  // },
  {
    path: "/tools/upload",
    name: "Upload",
    meta: {
      title: "图片上传"
    },
    component: () => import("@/pages/tools/upload/Index")
  }
]

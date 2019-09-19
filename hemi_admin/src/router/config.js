export default [
  {
    path: "/loginConfig",
    meta: {
      title: "登陆配置管理"
    },
    component: () => import("@/pages/loginConfig/LoginConfig"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/loginConfig/LoginConfigList")
      },
      {
        path: "addICBCELoginAuthForm",
        meta: {
          title: "添加工行融E联登陆配置模版"
        },
        component: () => import("@/pages/loginConfig/ICBCELoginAuthForm")
      },
      {
        path: "editICBCELoginAuthForm/:id",
        meta: {
          title: "编辑工行融E联登陆配置模版"
        },
        component: () => import("@/pages/loginConfig/ICBCELoginAuthForm")
      },
      {
        path: "addICBCLoginAuthForm",
        meta: {
          title: "添加工行APP登陆配置模版"
        },
        component: () => import("@/pages/loginConfig/ICBCLoginAuthForm")
      },
      {
        path: "editICBCLoginAuthForm/:id",
        meta: {
          title: "编辑工行APP登陆配置模版"
        },
        component: () => import("@/pages/loginConfig/ICBCLoginAuthForm")
      },
      {
        path: "addBOCLoginAuthForm",
        meta: {
          title: "添加中行登陆配置模版"
        },
        component: () => import("@/pages/loginConfig/BOCLoginAuthForm")
      },
      {
        path: "editBOCLoginAuthForm/:id",
        meta: {
          title: "编辑中行登陆配置模版"
        },
        component: () => import("@/pages/loginConfig/BOCLoginAuthForm")
      },
      {
        path: "addWXAuthForm",
        meta: {
          title: "添加微信登陆配置模版"
        },
        component: () => import("@/pages/loginConfig/WXAuthForm")
      },
      {
        path: "editWXAuthForm/:id",
        meta: {
          title: "编辑微信登陆配置模版"
        },
        component: () => import("@/pages/loginConfig/WXAuthForm")
      }
    ]
  },
  {
    path: "/payConfig",
    meta: {
      title: "支付配置管理"
    },
    component: () => import("@/pages/payConfig/PayConfig"),
    children: [
      {
        path: "",
        meta: {
          title: "首页"
        },
        component: () => import("@/pages/payConfig/PayConfigList")
      },
      {
        path: "addWXPayConfig",
        meta: {
          title: "添加微信支付配置模版"
        },
        component: () => import("@/pages/payConfig/WXConfigForm")
      },
      {
        path: "editWXPayConfig/:id",
        meta: {
          title: "编辑微信支付配置模版"
        },
        component: () => import("@/pages/payConfig/WXConfigForm")
      },
      {
        path: "addBOCConfigForm",
        meta: {
          title: "添加中行支付配置模版"
        },
        component: () => import("@/pages/payConfig/BOCConfigForm")
      },
      {
        path: "editBOCConfigForm/:id",
        meta: {
          title: "编辑中行支付配置模版"
        },
        component: () => import("@/pages/payConfig/BOCConfigForm")
      },
      {
        path: "addICBCConfigForm",
        meta: {
          title: "添加工行支付配置模版"
        },
        component: () => import("@/pages/payConfig/ICBCConfigForm")
      },
      {
        path: "editICBCConfigForm/:id",
        meta: {
          title: "编辑工行支付配置模版"
        },
        component: () => import("@/pages/payConfig/ICBCConfigForm")
      },
      {
        path: "addCCBConfigForm/:type",
        meta: {
          title: "添加建行支付配置模版"
        },
        component: () => import("@/pages/payConfig/CCBConfigForm")
      },
      {
        path: "editCCBConfigForm/:id/:type",
        meta: {
          title: "编辑建行支付配置模版"
        },
        component: () => import("@/pages/payConfig/CCBConfigForm")
      },
      {
        path: "addICBCEConfigForm",
        meta: {
          title: "添加工行支付配置模版"
        },
        component: () => import("@/pages/payConfig/ICBCEConfigForm")
      },
      {
        path: "editICBCEConfigForm/:id",
        meta: {
          title: "编辑工行支付配置模版"
        },
        component: () => import("@/pages/payConfig/ICBCEConfigForm")
      },
      {
        path: "addCCBPlatformConfig",
        meta: {
          title: "添加建行外联配置模版"
        },
        component: () => import("@/pages/payConfig/CcbPlatformConfigForm")
      },
      {
        path: "editCCBPlatformConfig/:ccbMerchantId",
        meta: {
          title: "编辑建行外联配置模版"
        },
        component: () => import("@/pages/payConfig/CcbPlatformConfigForm")
      }
    ]
  }
]

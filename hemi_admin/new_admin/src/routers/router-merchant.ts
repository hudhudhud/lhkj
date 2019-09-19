export default [
  {
    path: '/merchant',
    meta: {
      title: '商户管理'
    },
    component: () => import('@/views/merchant/Merchant.vue'),
    children: [
      {
        path: '',
        meta: {
          title: '首页',
          keepAlive: true
        },
        component: () => import('@/views/merchant/Index.vue')
      },
      {
        path: 'add',
        meta: {
          title: '添加商户'
        },
        component: () => import('@/views/merchant/MerchantForm.vue')
      },
      {
        path: 'edit/:mid',
        meta: {
          title: '编辑商户'
        },
        component: () => import('@/views/merchant/MerchantForm.vue')
      },
      {
        path: 'templateConfig/:merchantId',
        name: 'MerchantTemplate',
        meta: {
          title: '模板管理'
        },
        component: () => import('@/pages/merchant/config/Index.vue')
      }
    ]
  },
  {
    path: '/merchant/phoneLocationLimitConfig/:id',
    meta: {
      title: '限制配置'
    },
    component: () =>
      import('@/pages/merchant/phoneLocationLimitConfig/PhoneLocationLimitConfigForm.vue')
  },
  {
    path: '/merchant/institution/:merchantId',
    meta: {
      title: '地区配置'
    },
    component: () => import('@/pages/merchant/Merchant.vue'),
    children: [
      {
        path: '',
        meta: {
          title: '地区列表'
        },
        component: () =>
          import('@/pages/merchant/institution/institutionConfig.vue')
      },
      {
        path: 'addInstitution',
        meta: {
          title: '新增一级地区'
        },
        component: () =>
          import('@/pages/merchant/institution/institutionForm.vue')
      },
      {
        path: 'addInstitution/:institutionId',
        meta: {
          title: '新增二级地区'
        },
        component: () =>
          import('@/pages/merchant/institution/institutionForm.vue')
      },
      {
        path: 'editInstitution/:id',
        meta: {
          title: '编辑一级地区'
        },
        component: () =>
          import('@/pages/merchant/institution/institutionForm.vue')
      },
      {
        path: 'editSubInstitution/:subId',
        meta: {
          title: '编辑二级地区'
        },
        component: () =>
          import('@/pages/merchant/institution/institutionSubForm.vue')
      },
      {
        path: 'actConfig/:id',
        meta: {
          title: '地区活动管理'
        },
        component: () =>
          import('@/pages/merchant/institution/institutionActConfig.vue')
      }
    ]
  },
  {
    path: '/merchant/department/:merchantId',
    meta: {
      title: '部门配置'
    },
    component: () => import('@/pages/merchant/Merchant.vue'),
    children: [
      {
        path: '',
        meta: {
          title: '部门列表'
        },
        component: () =>
          import('@/pages/merchant/department/departmentList.vue')
      },
      {
        path: 'addDepartment',
        meta: {
          title: '新增部门'
        },
        component: () =>
          import('@/pages/merchant/department/departmentForm.vue')
      },
      {
        path: 'editDepartment/:id',
        meta: {
          title: '编辑部门'
        },
        component: () =>
          import('@/pages/merchant/department/departmentForm.vue')
      },
      {
        path: 'actList/:id',
        meta: {
          title: '活动管理'
        },
        component: () => import('@/pages/merchant/department/actList.vue')
      }
    ]
  },
  {
    path: '/merchant/loginAuth/:id/loginDispose',
    meta: {
      title: '认证配置'
    },
    component: () => import('@/pages/merchant/Merchant.vue'),
    children: [
      {
        path: '',
        meta: {
          title: '首页'
        },
        component: () =>
          import('@/pages/merchant/MerchantLoginAuthConfigList.vue')
      },
      {
        path: 'handsetDispose/:lid',
        meta: {
          title: '添加手机登陆配置'
        },
        component: () =>
          import('@/pages/merchant/loginDispose/HandsetDispose.vue')
      },
      {
        path: 'handsetDispose/:lid/:configId',
        meta: {
          title: '编辑手机登陆配置'
        },
        component: () =>
          import('@/pages/merchant/loginDispose/HandsetDispose.vue')
      },
      {
        path: 'WxPlatformsDispose/:lid/:configId',
        meta: {
          title: '添加微信配置'
        },
        component: () =>
          import('@/pages/merchant/loginDispose/WxPlatformsDispose.vue')
      },
      {
        path: 'WxPlatformsDispose/:lid',
        meta: {
          title: '编辑微信配置'
        },
        component: () =>
          import('@/pages/merchant/loginDispose/WxPlatformsDispose.vue')
      },
      {
        path: 'bOCDispose/:lid',
        meta: {
          title: '中行登陆配置'
        },
        component: () => import('@/pages/merchant/loginDispose/BOCDispose.vue')
      },
      {
        path: 'wxVipcnDispose/:lid',
        meta: {
          title: '微信公众号登陆配置'
        },
        component: () =>
          import('@/pages/merchant/loginDispose/WxVipcnDispose.vue')
      },
      {
        path: 'iCBCDispose/:lid',
        meta: {
          title: '工商登陆配置'
        },
        component: () => import('@/pages/merchant/loginDispose/ICBCDispose.vue')
      },
      {
        path: 'rYLDispose/:lid',
        meta: {
          title: '工行融E联登陆配置'
        },
        component: () => import('@/pages/merchant/loginDispose/RYLDispose.vue')
      }
    ]
  },
  {
    path: '/merchant/payAuth/:id/payDispose',
    meta: {
      title: '支付配置'
    },
    component: () => import('@/pages/merchant/Merchant.vue'),
    children: [
      {
        path: '',
        meta: {
          title: '首页'
        },
        component: () =>
          import('@/pages/merchant/MerchantPayAuthConfigList.vue')
      },
      {
        path: 'wXDispose/:lid',
        meta: {
          title: '编辑微信支付配置'
        },
        component: () => import('@/pages/merchant/payDispose/WXDispose.vue')
      },
      {
        path: 'wXDispose',
        meta: {
          title: '新增微信支付配置'
        },
        component: () => import('@/pages/merchant/payDispose/WXDispose.vue')
      },
      {
        path: 'bOCDispose',
        meta: {
          title: '新增中行支付配置'
        },
        component: () => import('@/pages/merchant/payDispose/BOCDispose.vue')
      },
      {
        path: 'bOCDispose/:lid',
        meta: {
          title: '编辑中行支付配置'
        },
        component: () => import('@/pages/merchant/payDispose/BOCDispose.vue')
      },
      {
        path: 'iCBCDispose',
        meta: {
          title: '新增工行支付配置'
        },
        component: () => import('@/pages/merchant/payDispose/ICBCDispose.vue')
      },
      {
        path: 'iCBCDispose/:lid',
        meta: {
          title: '编辑工行支付配置'
        },
        component: () => import('@/pages/merchant/payDispose/ICBCDispose.vue')
      },
      {
        path: 'cCBDispose',
        meta: {
          title: '新增建行支付配置'
        },
        component: () => import('@/pages/merchant/payDispose/CCBDispose.vue')
      },
      {
        path: 'cCBDispose/:lid',
        meta: {
          title: '编辑建行支付配置'
        },
        component: () => import('@/pages/merchant/payDispose/CCBDispose.vue')
      },
      {
        path: 'iCBCEDispose',
        meta: {
          title: '新增工行融E联支付配置'
        },
        component: () => import('@/pages/merchant/payDispose/ICBCEDispose.vue')
      },
      {
        path: 'iCBCEDispose/:lid',
        meta: {
          title: '编辑工行融E联支付配置'
        },
        component: () => import('@/pages/merchant/payDispose/ICBCEDispose.vue')
      }
    ]
  },
  {
    path: '/merchant/ipAuth/:id/ipDispose',
    meta: {
      title: 'IP配置'
    },
    component: () => import('@/pages/merchant/Merchant.vue'),
    children: [
      {
        path: '',
        meta: {
          title: '首页'
        },
        component: () => import('@/pages/merchant/MerchantIpAuthConfigList.vue')
      }
    ]
  }
];

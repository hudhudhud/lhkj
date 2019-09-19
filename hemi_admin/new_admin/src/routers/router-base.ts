export default [
  {
    path: '/system',
    redirect: '/system/user',
    name: '系统管理',
    component: () =>
      import(/* webpackChunkName: "table" */ '@/views/example/index.vue'),
    meta: { title: '系统管理', icon: 'example' },
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: () =>
          import(/* webpackChunkName: "tree" */ '@/views/base/user/index.vue'),
        meta: { title: '用户管理', icon: 'form' }
      },
      {
        path: 'role',
        name: '角色管理',
        component: () =>
          import(/* webpackChunkName: "tree" */ '@/views/base/role/index.vue'),
        meta: { title: '角色管理', icon: 'form' }
      },
      {
        path: 'module',
        name: '模块管理',
        component: () =>
          import(/* webpackChunkName: "tree" */ '@/views/base/module/index.vue'),
        meta: { title: '模块管理', icon: 'form' }
      },
      {
        path: 'userMerchantAuth',
        name: '用户商户权限管理',
        component: () => import('@/views/base/userMerchantAuth/index.vue'),
        meta: {
          title: '用户商户权限管理',
          icon: 'form'
        }
      },
      {
        path: 'roleMerchantAuth',
        name: '角色商户权限管理',
        component: () =>
          import(/* webpackChunkName: "tree" */ '@/views/base/roleMerchantAuth/index.vue'),
        meta: { title: '角色商户权限管理', icon: 'form' }
      }
    ]
  }
];

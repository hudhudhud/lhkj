export default [
  {
    path: '/designer',
    redirect: '/designer/SGT',
    name: 'h5设计器管理',
    component: () =>
      import(/* webpackChunkName: "table" */ '@/views/example/index.vue'),
    meta: { title: 'h5设计器管理', icon: 'example' },
    children: [
      {
        path: 'SGT',
        name: '场景生成工具',
        component: () =>
          import(/* webpackChunkName: "tree" */ '@/views/designer/SGT/index.vue'),
        meta: { title: '场景生成工具', icon: 'form' }
      },
      {
        path: 'tplView',
        name: '合米自有模板',
        component: () =>
          import(/* webpackChunkName: "tree" */ '@/views/designer/tplView/index.vue'),
        meta: { title: '合米自有模板', icon: 'form' }
      },
      {
        path: 'tplCRUD',
        name: '活动模板管理',
        component: () =>
          import(/* webpackChunkName: "tree" */ '@/views/designer/tplCRUD/index.vue'),
        meta: { title: '活动模板管理' }
      }
    ]
  }
];

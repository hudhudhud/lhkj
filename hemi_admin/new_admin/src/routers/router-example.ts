export default [
  {
    path: '/example',
    redirect: '/example/table',
    name: '系统管理',
    meta: { title: '系统管理', icon: 'example' },
    component: () =>
      import(/* webpackChunkName: "table" */ '@/views/example/index.vue'),
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () =>
          import(/* webpackChunkName: "table" */ '@/views/table/index.vue'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () =>
          import(/* webpackChunkName: "tree" */ '@/views/tree/index.vue'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/nested',
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: { title: 'Nested', icon: 'nested' },
    component: () =>
      import(/* webpackChunkName: "table" */ '@/views/example/index.vue'),

    children: [
      {
        path: 'menu1',
        component: () =>
          import(/* webpackChunkName: "menu1" */ '@/views/nested/menu1/index.vue'),
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () =>
              import(/* webpackChunkName: "menu1-1" */ '@/views/nested/menu1/menu1-1/index.vue'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () =>
              import(/* webpackChunkName: "menu1-2" */ '@/views/nested/menu1/menu1-2/index.vue'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () =>
                  import(/* webpackChunkName: "menu1-2-1" */ '@/views/nested/menu1/menu1-2/menu1-2-1/index.vue'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () =>
                  import(/* webpackChunkName: "menu1-2-2" */ '@/views/nested/menu1/menu1-2/menu1-2-2/index.vue'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () =>
              import(/* webpackChunkName: "menu1-3" */ '@/views/nested/menu1/menu1-3/index.vue'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () =>
          import(/* webpackChunkName: "menu2" */ '@/views/nested/menu2/index.vue'),
        name: 'Menu2',
        meta: { title: 'Menu2' }
      }
    ]
  }
];

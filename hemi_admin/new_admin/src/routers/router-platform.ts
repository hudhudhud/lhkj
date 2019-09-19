import order from './platform/order'
import activity from './platform/activity'
import refund from './platform/refund'
export default [
  {
    path: '/platform',
    redirect: '/platform/freeSearch',
    name: '平台管理',
    component: () => import('@/views/example/index.vue'),
    meta: { title: '平台管理', icon: 'example' },
    children: [
      {
        path: 'freeSearch',
        name: '用户全维度查询',
        component: () => import('@/views/platform/freeSearch/index.vue'),
        meta: { title: '用户全维度查询', icon: 'form', keepAlive:true }
      },
      order,
      activity,
      {
        path: 'custom',
        name: '用户管理',
        component: () => import('@/views/platform/custom/index.vue'),
        meta: { title: '用户管理', icon: 'form', keepAlive:true }
      },
      refund,
    ]
  }
];

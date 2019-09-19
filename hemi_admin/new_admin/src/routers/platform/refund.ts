export default   {
    path: 'refund',
    name: '退款管理',
    component: () => import('@/views/example/index.vue'),
    meta: { title: '退款管理', icon: 'form' },
    children:[
        {
            path: 'all',
            name: '退款申请管理',
            component: () => import('@/views/platform/refund/index.vue'),
            meta: { title: '退款申请管理', icon: 'form' , keepAlive:true},
        },
        {
            path: 'myRecord',
            name: '我的退款申请',
            component: () => import('@/views/platform/refund/myRecord.vue'),
            meta: { title: '我的退款申请', icon: 'form' , keepAlive:true},
        },
    ]
  }


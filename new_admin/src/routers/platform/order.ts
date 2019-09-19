export default   {
    path: 'orderManage',
    redirect: '/platform/orderManage/order',
    name: '订单管理',
    component: () => import('@/views/example/index.vue'),
    meta: { title: '订单管理', icon: 'form' },
    children:[
      {
        path: 'order',
        name: '订单列表',
        component: () => import('@/views/platform/order/index.vue'),
        meta: { title: '订单', icon: 'form' , keepAlive:true}
      },
      {
        path: 'applyRefund/:orderCode',
        name: '申请退款',
        component: () => import('@/views/platform/order/applyRefund.vue'),
        meta: { title: '申请退款', icon: 'form' }
      }
    ]
  }
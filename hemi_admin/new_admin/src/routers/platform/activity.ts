export default   {
    path: 'activityManage',
    redirect: '/platform/activityManage/activity',
    name: '活动管理',
    component: () => import('@/views/example/index.vue'),
    meta: { title: '活动管理', icon: 'form' },
    children: [
      {
        path: 'activity',
        name: '',
        component: () => import('@/views/example/index.vue'),
        meta: { title: '活动列表', icon: 'form' },
        children:[
          {
            path: '',
            name: '活动列表',
            component: () => import('@/views/platform/activity/index.vue'),
            meta: { title: '活动列表', icon: 'form', keepAlive:true },
           
          },
          {
            path: 'add',
            name: '新增活动',
            component: () => import('@/views/platform/activity/addActivity.vue'),
            meta: { title: '新增活动', icon: 'form' }
          },
          {
            path: 'product/:actId',
            name: '商品管理',
            component: () => import('@/views/example/index.vue'),
            meta: { title: '商品管理', icon: 'form' },
            children:[
              {
                path: '',
                name: '商品管理',
                component: () => import('@/views/platform/activity/product.vue'),
                meta: { title: '商品管理', icon: 'form' , keepAlive:true},
              },
              {
                path: 'standard/:proId',
                name: '规格管理',
                component: () => import('@/views/example/index.vue'),
                meta: { title: '规格管理', icon: 'form' },
                children:[
                  {
                    path: '',
                    name: '规格管理',
                    component: () => import('@/views/platform/activity/standard.vue'),
                    meta: { title: '规格管理', icon: 'form' , keepAlive:true},
                  },
                  {
                    path: 'add',
                    name: '新增规格',
                    component: () => import('@/views/platform/activity/addStandard.vue'),
                    meta: { title: '新增规格', icon: 'form' },
                  },
                  {
                    path: 'buyRecord/:standardId',
                    name: '购买记录',
                    component: () => import('@/views/platform/order/index.vue'),
                    meta: { title: '购买记录', icon: 'form' },
                  }
                ]
              },
            ]
          },
          {
            path: 'limit/:actId',
            name: '限制',
            component: () => import('@/views/platform/activity/limit.vue'),
            meta: { title: '限制', icon: 'form' , keepAlive:true},
          },
          {
            path: 'lottery/:actId',
            name: '',
            component: () => import('@/views/example/index.vue'),
            meta: { title: '奖品', icon: 'form' },
            children:[
              {
                path: '',
                name: '奖品',
                component: () => import('@/views/platform/activity/lottery.vue'),
                meta: { title: '奖品', icon: 'form' , keepAlive:true},
              },
              {
                path: 'winningRecode/:standardId',
                name: '中奖纪录',
                component: () => import('@/views/platform/order/index.vue'),
                meta: { title: '中奖纪录', icon: 'form' },
              },
              {
                path: 'add',
                name: '添加奖品',
                component: () => import('@/views/platform/activity/addLottery.vue'),
                meta: { title: '添加奖品', icon: 'form' },
              }
            ]

          }
        ]
      },
    ]
  }
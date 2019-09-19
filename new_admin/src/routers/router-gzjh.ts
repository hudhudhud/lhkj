export default [
    {
      path: '/gzjh',
      name: '广州建行积分商城',
      meta: { title: '广州建行积分商城', icon: 'example' },
      component: () =>import('@/views/example/index.vue'),
      children: [
        {
          path: '',
          name: '广州建行积分商城',
          component: () =>
          import('@/views/gzjh/index.vue'),
          meta: { title: '广州建行积分商城', icon: 'table' }
        },
        {
          path: 'base',
          name: '基本数据',
          component: () =>import('@/views/gzjh/base.vue'),
          meta: { title: '基本数据', icon: 'table' }
        },
        {
          path: 'activity',
          name: '活动数据',
          redirect: '/gzjh/activity/user',
          component: () =>import('@/views/example/index.vue'),
          meta: { title: '活动数据', icon: 'table' },
          children:[
            {
              path: 'user',
              name: '用户参与数据统计',
              component: () =>import('@/views/gzjh/user.vue'),
              meta: { title: '用户参与数据统计', icon: 'table' }
            },
            {
              path: 'award',
              name: '奖励发放情况统计',
              component: () =>import('@/views/gzjh/award.vue'),
              meta: { title: '奖励发放情况统计', icon: 'table' }
            },
          ]
        },
        {
          path: 'mall',
          name: '活动商城',
          component: () =>import('@/views/gzjh/mall.vue'),
          meta: { title: '活动商城', icon: 'table' }
        }
      ]
    }
]
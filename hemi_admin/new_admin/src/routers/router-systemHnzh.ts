export default [
    {
      path: '/systemHnzh',
      redirect: '/systemHnzh/unitSchool',
      name: '报名活动管理',
      component: () =>
      import('@/views/example/index.vue'),
      meta: { title: '报名活动管理', icon: 'example' },
      children: [
        {
          path: 'unitSchool',
          name: '单位或学校管理',
          component: () =>
          import('@/views/systemHnzh/unitSchool.vue'),
          meta: { title: '单位或学校管理', icon: 'form' }
        },
        {
          path: 'activity',
          name: '活动管理',
          component: () =>
          import('@/views/systemHnzh/activity.vue'),
          meta: { title: '活动管理', icon: 'form' }
        },
        {
          path: 'department',
          name: '院系或部门管理',
          component: () =>
          import('@/views/systemHnzh/department.vue'),
          meta: { title: '院系或部门管理', icon: 'form' }
        },
        {
          path: 'voteObject',
          name: '投票对象管理',
          component: () =>
          import('@/views/systemHnzh/voteObject.vue'),
          meta: { title: '投票对象管理', icon: 'form' }
        },
        {
          path: 'voteRecord',
          name: '投票记录管理',
          component: () =>
          import('@/views/systemHnzh/voteRecord.vue'),
          meta: { title: '投票记录管理', icon: 'form' }
        },
        {
          path:'check',
          name:'申请和审核',
          component: () =>import('@/views/example/index.vue'),
          meta: { title: '申请和审核', icon: 'form' },
          children:[
            {
              path: 'unitSchool',
              name: '单位或学校管理',
              component: () =>
              import('@/views/systemHnzh/unitSchool.vue'),
              meta: { title: '单位或学校管理', icon: 'form' }
            },
            {
              path: 'activity',
              name: '活动管理',
              component: () =>
              import('@/views/systemHnzh/activity.vue'),
              meta: { title: '活动管理', icon: 'form' }
            },
            {
              path: 'department',
              name: '院系或部门管理',
              component: () =>
              import('@/views/systemHnzh/department.vue'),
              meta: { title: '院系或部门管理', icon: 'form' }
            },
            {
              path: 'voteObject',
              name: '投票对象管理',
              component: () =>
              import('@/views/systemHnzh/voteObject.vue'),
              meta: { title: '投票对象管理', icon: 'form' }
            },
          ]
          
        }
      ]
    }
  ];
  
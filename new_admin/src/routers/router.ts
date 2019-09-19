import Vue from 'vue';
import Router from 'vue-router';
import exampleRouters from './router-example';
import baseRouters from './router-base';
import designerRouters from './router-designer';
import platformRouters from './router-platform';
import Layout from '@/views/layout/Layout.vue';
import systemHnzhRouters from './router-systemHnzh';
import gzjhRouters from './router-gzjh';
Vue.use(Router);
let allRouters = Array.prototype.concat.apply([], baseRouters);
allRouters = Array.prototype.concat.apply(allRouters, designerRouters);
allRouters = Array.prototype.concat.apply(allRouters, platformRouters);
allRouters = Array.prototype.concat.apply(allRouters, systemHnzhRouters);
allRouters = Array.prototype.concat.apply(allRouters, gzjhRouters);
console.log(allRouters);
/*
  redirect:                      if `redirect: noredirect`, it won't redirect if click on the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

export default new Router({
  // mode: 'history',  // Disabled due to Github Pages doesn't support this, enable this if you need.
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/dashboard',
      name: '首页',
      children: [
        {
          path: '/dashboard',
          name: '首页',
          component: () =>
            import(/* webpackChunkName: "login" */ '@/views/dashboard/index.vue'),
          meta: { title: '首页', icon: 'example' }
        }
      ].concat(allRouters)
    },

    {
      path: '/login',
      component: () =>
        import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
      meta: { hidden: true, title: '登录' }
    },
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
      meta: { hidden: true }
    },

    {
      path: '*',
      redirect: '/404',
      meta: { hidden: true }
    }
  ]
});

export default {
  install: function (Vue, options) {
    /* lego_page */
    Vue.component('legoPageTemplate', () => import('@/pages/lego/Index'));

    /* 活动中心 */
    Vue.component('defaultTemplate', () =>
      import('@/pages/merchant/defaultTemplate/Index')
    );
    /* 展示单个活动 */
    Vue.component('sigleActTemplate', () =>
      import('@/pages/merchant/sigleActTemplate/Index')
    );
    /* 展示最近访问的活动 */
    Vue.component('lastVisitActTemplate', () =>
      import('@/pages/merchant/lastVisitActTemplate/Index')
    );

    /* 宁波建行 */
    Vue.component('cbbShare', () => import('@/pages/merchant/cbbShare/Index'));
    /* 设计器首页通用模板 */
    Vue.component('ccbYueHui', () =>
      import('@/pages/merchant/ccbYueHui/Index')
    );
    /* 饿了么测试专用 */
    Vue.component('elmIndex', () => import('@/pages/merchant/elmIndex/Index'));
  }
};

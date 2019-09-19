export default {
  install: function (Vue, options) {
    /*  Vue.component('zxglSaleIndex', () =>
      import('@/pages/actArea/zxglSaleIndex')
    );  中信国旅 */
    Vue.component('cityActIndex', () => import('@/pages/actArea/cityActIndex'));
    Vue.component('localBanksList', () =>
      import('@/pages/actArea/localBanksList')
    );
    Vue.component('nanning', () => import('@/pages/actArea/nanning'));
    Vue.component('guangxiBanks', () => import('@/pages/actArea/guangxiBanks'));
  }
};

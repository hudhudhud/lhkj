import Vue from 'vue';

import 'normalize.css';
import ElementUI from 'element-ui';
import SvgIcon from 'vue-svgicon';
import '@/styles/index.scss';
import '@/icons/components';
import '@/permission';
// import layouts from '@/components/layout/index';
import LayoutPage from '@/components/layout/LayoutPage.vue';
import LayoutSearch from '@/components/layout/LayoutSearch.vue';
import baseTable from "@/components/baseTable/baseTable.vue";
import App from '@/App.vue';
import store from '@/store';
import router from '@/routers/router';
import '@/registerServiceWorker';

Vue.use(ElementUI, { size: 'small' });
Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
});

/* layouts.forEach(cpn => {
  Vue.component(cpn.name, cpn);
}); */
Vue.component('LayoutPage', LayoutPage);
Vue.component('LayoutSearch', LayoutSearch);
Vue.component('baseTable', baseTable);
Vue.config.productionTip = false;

declare module 'vue/types/vue' {
  interface Vue {
    $hasAuth: Function
  }
}
Vue.prototype.$hasAuth = function (mid: String) {
  let modules = this.$store.state.app.routes
  let check = false

  if (!modules) {
    return false
  }
  modules.forEach((module: any) => {
    module.children.forEach((item: any) => {
      if (item.mid == mid) {
        check = true
      }
      if (item.children) {
        item.children.forEach((itemc: any) => {
          if (itemc.mid == mid) {
            check = true
          }
          if (itemc.children) {
            itemc.children.forEach((itemcc: any) => {
              if (itemcc.mid == mid) {
                check = true
              }
            })
          }
        })
      }
    })
  })
  return check
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

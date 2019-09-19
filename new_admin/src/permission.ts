import router from './routers/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth';
import { Route } from 'vue-router';
import { UserModule } from '@/store/modules/user';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach((to: Route, from: Route, next: any) => {
  NProgress.start();
  const token = sessionStorage.getItem('token');
  if (token) {
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`); // Redirect to login page
    }
  }
});

router.afterEach((to, from) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  NProgress.done();
});

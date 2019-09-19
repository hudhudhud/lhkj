import config from '../config'
import Index from '../pages/Index'
import Login from '../pages/login'
import Home from '../pages/Home'
import ewm from '../pages/ewm'
import bindList from '../../common/bindList'

export default {
  path: 'xyyh',
  component: Index,
  meta: {
    merchantId: config.merchantId,
    merchantAppid: config.merchantAppid
  },
  children: [
    {
      path: '',
      redirect: 'login'
    },
    {
      path: 'login',
      name: 'login',
      meta: {
        open: true
      },
      component: Login
    },
    {
      path: 'Home',
      name: 'Home',
      component: Home
    },
    {
      path: 'sharedList',
      name: 'sharedList',
      component: bindList
    },
    {
      path: 'ewm',
      nmae: 'ewm',
      component: ewm
    }
  ]
}

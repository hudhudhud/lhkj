import config from '../config'
import Index from '../pages/Index'
import Home from '../pages/Home'
import ewm from '../pages/ewm'
import bindList from '../../common/bindList'
import ranking from '../../common/ranking'

export default {
  path: 'szjh',
  component: Index,
  meta: {
    merchantId: config.merchantId,
    merchantAppid: config.merchantAppid
  },
  children: [
    {
      path: '',
      redirect: 'home'
    },
    {
      path: 'home',
      component: Home
    },
    {
      path: 'ewm',
      component: ewm
    },
    {
      path: 'bindList',
      component: bindList
    },
    {
      path: 'ranking',
      component: ranking
    }
  ]
}

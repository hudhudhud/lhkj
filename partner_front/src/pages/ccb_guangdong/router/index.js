import config from '../config'
import Index from '../pages/Index'
import Home from '../pages/home'
import Ranking from '../pages/ranking'

export default {
  path: 'gdjh',
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
      path: 'ranking',
      component: Ranking
    }
  ]
}

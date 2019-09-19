import config from '../config'
import Index from '../pages/Index'
import Home from '../pages/Home'
import Hometwo from '../pages/hometwo'
import Login from '../pages/login'
import Carget from '../pages/carget'
import Carinfo from '../pages/carinfo'
import RankingList from '../pages/ranklist'
import Clientlogin from '../pages/clientlogin'
import Stafflogin from '../pages/stafflogin'
import Card from '../pages/cardnotice'
import Share from '../pages/share'
import Carddetail from '../pages/carddetail'
import Cardn from '../pages/cardn'
import Staffsign from '../pages/staffsign'
import feedback from '../pages/feedback'
import feedbackHistory from '../pages/feedbackHistory'

export default {
  path: 'shzh',
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
      path: 'home',
      component: Home
    },
    {
      path: 'hometwo',
      component: Hometwo
    },
    {
      path: 'login',
      name: 'login',
      component: Login
    },
    {
      path: 'carget',
      component: Carget
    },
    {
      path: 'carinfo',
      name: 'carinfo',
      component: Carinfo
    },
    {
      path: 'rankinglist',
      name: 'rankinglist',
      component: RankingList
    },
    {
      path: 'clientlogin',
      name: 'clientlogin',
      component: Clientlogin
    },
    {
      path: 'stafflogin',
      name: 'stafflogin',
      component: Stafflogin
    },
    {
      path: 'cardnotice',
      component: Card
    },
    {
      path: 'share/:custId',
      nmae: 'share',
      component: Share,
      meta: {
        open: true
      }
    },
    {
      path: 'carddetail',
      name: 'carddetail',
      component: Carddetail
    },
    {
      path: 'staffsign',
      name: 'staffsign',
      component: Staffsign
    },
    {
      path: 'cardn',
      name: 'cardn',
      component: Cardn
    },
    {
      path: 'feedback',
      name: 'feedback',
      component: feedback
    },
    {
      path: 'feedbackHistory',
      name: 'feedbackHistory',
      component: feedbackHistory
    }
  ]
}

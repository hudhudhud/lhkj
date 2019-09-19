import config from '../config'
import Index from '../pages/Index'
import Home from '../pages/home'
import goldMall from '../pages/goldMall'
import ranking from '../pages/ranking'
import partner from '../pages/partner'
import qrcode from '../pages/qrCode'
import carget from '../pages/carget'
import Card from '../pages/cardnotice'
import bindCard from '../pages/bindCard'
import Smash from '../pages/Smash'
import getCard from '../pages/getCard'
import carKnowledge from '../pages/carKnowledge'
import individual from '../pages/individual'
import creditCardSafe from '../pages/creditCardSafe'
import indivNotice from '../pages/individualNotice'
import newCardInfo from '../pages/newCardInfo'

export default {
  path: 'szzh',
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
      path: 'goldMall',
      component: goldMall
    },
    {
      path: 'ranking',
      component: ranking
    },
    {
      path: 'partner',
      component: partner
    },
    {
      path: 'qrcode',
      component: qrcode
    },
    {
      path: 'carget',
      component: carget
    },
    {
      path: 'cardnotice',
      component: Card
    },
    {
      path: 'newCardInfo',
      component: newCardInfo
    },
    {
      path: 'bindCard',
      component: bindCard
    },
    {
      path: 'Smash',
      component: Smash
    },
    {
      path: 'getCard',
      component: getCard
    },
    {
      path: 'carKnowledge',
      component: carKnowledge
    },
    {
      path: 'individual/:index',
      name: 'individual',
      component: individual
    },
    {
      path: 'creditCardSafe',
      component: creditCardSafe
    },
    {
      path: 'indivNotice',
      component: indivNotice
    }
  ]
}

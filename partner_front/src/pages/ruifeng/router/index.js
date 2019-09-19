import config from '../config'
import Index from '../pages/Index'
import userInfo from '../pages/userInfo'
import khrk from '../pages/khrk'
import khIndex from '../pages/khIndex'
import khjlrk from '../pages/khjlrk'
import khjlHome from '../pages/khjlHome'
import khjlewm from '../pages/khjlewm'
import khjlIndex from '../pages/khjlIndex'
import khxxlb from '../pages/khxxlb'
import ztyl from '../pages/ztyl'
import ETCIndex from '../pages/ETCIndex'

export default {
  path: 'rfyh',
  component: Index,
  meta: {
    merchantId: config.merchantId,
    merchantAppid: config.merchantAppid
  },
  children: [
    {
      path: '',
      redirect: 'userInfo'
    },
    {
      path: 'userInfo',
      name: 'userInfo',
      component: userInfo,
      meta: {
        title: '首页'
      }
    },
    {
      path: 'khrk',
      name: 'khrk',
      component: khIndex,
      meta: {
        title: '贷款客户端'
      },
      children: [
        {
          path: '',
          name: '',
          component: khrk,
          meta: {
            title: '贷款客户端'
          }
        },
        {
          path: 'khztyl',
          name: 'khztyl',
          component: ztyl,
          meta: {
            title: '贷款客户端'
          }
        },
        {
          path: 'khewm',
          name: 'khewm',
          component: khjlewm,
          meta: {
            title: '我的二维码'
          }
        }
      ]
    },
    {
      path: 'khjlrk',
      name: 'khjlrk',
      component: khjlrk,
      meta: {
        title: '贷款客户端'
      }
    },
    {
      path: 'khjl',
      name: 'khjl',
      component: khjlIndex,
      children: [
        {
          path: 'khjlHome',
          name: 'khjlHome',
          component: khjlHome,
          meta: {
            title: '贷款客户端'
          }
        },
        {
          path: 'khjlewm',
          name: 'khjlewm',
          component: khjlewm,
          meta: {
            title: '我的二维码'
          }
        },
        {
          path: 'khxxlb',
          name: 'khxxlb',
          component: khxxlb,
          meta: {
            title: '我的客户'
          }
        }
      ]
    },
    {
      path: 'ETC',
      name: 'ETC',
      component: ETCIndex
    }
  ]
}

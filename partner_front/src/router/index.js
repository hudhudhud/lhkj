import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
import Index from '@/pages/Index.vue'
import bocShanghai from '@/pages/boc_shanghai/router'
import ccbGuangdong from '@/pages/ccb_guangdong/router'
import ruifeng from '@/pages/ruifeng/router'
import xingye from '@/pages/xingye/router'
import szjh from '@/pages/ccb_suzhou/router'
import szzh from '@/pages/boc_shenzhen/router'
import { oAuthUrl } from '@/config/index'
import store from '../store'
import { Indicator, Toast } from 'mint-ui'
import request from '../lib/Request'

// 不显示圈圈
nprogress.configure({ showSpinner: false })

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: () => import('@/pages/Home')
  },
  {
    path: '/partner',
    component: Index,
    children: [
      {
        path: '',
        component: () => import('@/pages/Home')
      },
      bocShanghai,
      ruifeng,
      xingye,
      szjh,
      szzh,
      ccbGuangdong
    ]
  }
]

const router = new Router({
  mode: 'history',
  routes: routes
})

router.beforeEach(async (to, from, next) => {
  nprogress.start()
  // 从state取token
  let merchantId = store.state.merchantId // 修改store.state.merchantId
  let merchantAppid = store.state.merchantAppid
  if (!merchantId) {
    let parentRouter = to.matched
    if (parentRouter) {
      parentRouter.forEach(route => {
        if (route.meta && route.meta.merchantId) {
          merchantId = route.meta.merchantId
          merchantAppid = route.meta.merchantAppid
          store.commit('setMerchantId', merchantId)
          store.commit('setMerchantAppid', merchantAppid)
        }
      })
    }
    if (!merchantId) {
      Toast('没有merchantId')
      return
    }
  }
  let token = store.state.token

  // 没有token时尝试从sessionStorage取
  if (!token) {
    let storedToken = sessionStorage.getItem('partner_' + merchantId + '_token')
    let hemiStoredToken = sessionStorage.getItem('hemi_' + merchantId + '_token')
    if (!storedToken) {
      storedToken = localStorage.getItem('partner_' + merchantId + '_token')
    }
    if (storedToken) {
      token = storedToken
      let cust = JSON.parse(sessionStorage.getItem('partner_' + merchantId + '_cust'))
      if (!cust) {
        cust = JSON.parse(localStorage.getItem('partner_' + merchantId + '_cust'))
      }
      store.commit('setToken', token)
      store.commit('setCust', cust)
      store.commit('setHemiToken', hemiStoredToken)
    }
  }

  // 设置页面标题
  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }

  // 如果有code则换取token
  let code = to.query.code
  if (code) {
    Indicator.open()
    let rs = await request.get('login/getJwtByCustom?code=' + code)
    if (rs.status === 200) {
      let back = rs.payload
      store.commit('setToken', back.jwt)
      store.commit('setHemiToken', back.hemiJwt)
      store.commit('setCust', back.cust)
      token = back.jwt
      // 首次登录，将用户信息注册到合伙人用户基本信息表中
      let form = {
        name: back.cust.nickname,
        mobile: back.cust.tel,
        imgUrl: back.cust.headImgUrl
      }
      // 如果有分享人 就顺便绑定
      let share = window.location.href.indexOf('share=');
      if (share > 0) {
        let custid = window.location.href.substr(share + 6);
        custid = custid.replace('?', '&')
        custid = custid.replace('/', '&')
        if (custid.indexOf('&') > 0) {
          custid = custid.substr(0, custid.indexOf('&'))
        }
        Object.assign(form, { parentCusId: custid })
      }
      let rs2 = await request.post('/new_partner/saveUserAndBind', form);
      if (rs2.status != 500) {
        if (rs2.status === 200) {
          // 如果绑定成功，将分享人存入缓存
          sessionStorage.setItem('parent_cus', form.parentCusId)
          localStorage.setItem('parent_cus', form.parentCusId)
        }
        // 用户信息保存成功，则将信息存入缓存
        sessionStorage.setItem('partner_' + merchantId + '_token', back.jwt)
        sessionStorage.setItem('hemi_' + merchantId + '_token', back.hemiJwt)
        sessionStorage.setItem('partner_' + merchantId + '_cust', JSON.stringify(back.cust))
        localStorage.setItem('partner_' + merchantId + '_token', back.jwt)
        localStorage.setItem('hemi_' + merchantId + '_token', back.hemiJwt)
        localStorage.setItem('partner_' + merchantId + '_cust', JSON.stringify(back.cust))
        next()
      } else {
        Toast(rs.error)
      }
      Indicator.close()
      return
    } else {
      if (rs.status != 300) {
        Toast(rs.error)
        Indicator.close()
        return
      }
    }
    Indicator.close()
  }

  // 合伙人绑定逻辑（非首次登录情况：用户信息已创建且本地有用户信息缓存时的绑定补偿机制）
  let json = sessionStorage.getItem('partner_' + merchantId + '_cust');
  if (!json) {
    json = localStorage.getItem('partner_' + merchantId + '_cust');
  }
  // 判断缓存中是否有用户信息
  if (json) {
    // 判断请求链接中是否有分享参数share
    let share = window.location.href.indexOf('share=');
    if (share > 0) {
      // 进入这里说明：该用户非首次登录，且是被分享进入页面
      // 此时不管他是否已经绑定，都要进行绑定逻辑，因为如果不可重复绑定，接口会返回失败信息
      // 截取分享人cusId
      let custid = window.location.href.substr(share + 6);
      custid = custid.replace('?', '&')
      custid = custid.replace('/', '&')
      if (custid.indexOf('&') > 0) {
        custid = custid.substr(0, custid.indexOf('&'))
      }
      // 请求参数
      let form = {
        parentCusId: custid
      }
      // 请求绑定接口
      let rs = await request.post('/new_partner/bind', form)
      if (rs.status === 200) {
        // 若绑定成功，更新缓存中分享人cusId
        sessionStorage.setItem('parent_cus', form.parentCusId)
        localStorage.setItem('parent_cus', form.parentCusId)
      }
    }
  }

  // 判断该路由是否需要登录
  if (to.meta && !to.meta.open && !token) {
    // 跳转到统一登录URL
    gotoAuth(merchantId, window.location.href, true)
    return
  }
  next()
})

router.afterEach((to, from, next) => {
  nprogress.done()
})

// 跳转授权
export function gotoAuth (merchantId, targetUrl, skipLogin) {
  let thisUrl = targetUrl
  if (thisUrl.indexOf('code=') > 0) {
    thisUrl = thisUrl.replace(/code=[^=]*/g, '')
  }
  thisUrl = encodeURIComponent(thisUrl)
  let url = skipLogin
    ? oAuthUrl + `?merchantId=${merchantId}&skipLogin=1&callbackUrl=${thisUrl}`
    : oAuthUrl + `?merchantId=${merchantId}&callbackUrl=${thisUrl}`
  window.location.replace(url)
}

export default router

import cbbMerchantConfigTest from './cbbMerchantConfigTest.json'
import cbbMerchantConfigRelease from './cbbMerchantConfigRelease.json'
// import cbbMerchantConfig from './cbbMerchantConfig.json'
export const apiBasePath =
  process.env.NODE_ENV === 'development'
    ? `//${window.location.host}/front/`
    : `//${window.location.host}/front/`

export const oAuthUrl =
  process.env.NODE_ENV === 'development'
    ? `//hemitest.lianhaikeji.com/customer/oauth/login/`
    : `//${window.location.host}/customer/oauth/login/`

export const payUrl =
  process.env.NODE_ENV === 'development'
    ? `//hemitest.lianhaikeji.com/cashier/pay/`
    : `//${window.location.host}/cashier/pay/`
export const cbbGuangdongConfig =
  process.env.NODE_ENV === 'development'
    ? cbbMerchantConfigTest
    : cbbMerchantConfigRelease
export default {
  cbbGuangdongConfig,
  apiBasePath,
  oAuthUrl,
  payUrl
}

if (process.env.PUBLISH_ENV != 'prod') {
  let tag = document.createElement('div')
  tag.style.position = 'fixed'
  tag.style.zIndex = 198811111
  tag.style.top = 0
  tag.style.left = 0
  tag.style.lineHeight = '.5rem'
  tag.style.background = 'rgba(0,0,0,0.3)'
  tag.style.color = 'red'
  tag.style.padding = '0 .5rem'
  tag.innerHTML = '测试环境'
  document.body.appendChild(tag)
}

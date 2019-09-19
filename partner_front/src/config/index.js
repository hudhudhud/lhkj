export const apiBasePath =
  process.env.NODE_ENV === 'development'
    ? `//hemitest.lianhaikeji.com/partner-api/`
    : `//${window.location.host}/partner-api/`

export const oAuthUrl =
  process.env.NODE_ENV === 'development'
    ? `//hemitest.lianhaikeji.com/customer/oauth/login`
    : `//${window.location.host}/customer/oauth/login`

export default {
  apiBasePath,
  oAuthUrl
}

if (process.env.PUBLISH_ENV != 'prod') {
  let tag = document.createElement('div')
  tag.style.position = 'fixed'
  tag.style.zIndex = 19941119
  tag.style.top = 0
  tag.style.left = 0
  tag.style.lineHeight = '.5rem'
  tag.style.background = 'rgba(0,0,0,0.3)'
  tag.style.color = 'red'
  tag.style.padding = '0 .5rem'
  tag.innerHTML = '测试环境'
  document.body.appendChild(tag)
}

let merchantId = null
let merchantAppid = null
let signActId = null
if (process.env.PUBLISH_ENV == 'prod') {
  // 生产配置
  merchantId = 176
  merchantAppid = 'd3931ef837054fdd84f75937391d9af4'
  signActId = '547458920'
} else {
  // 开发环境和测试环境配置
  merchantId = 192
  merchantAppid = 'ea3e81d9d2484cde92aee05294fb0734'
  signActId = '545938341'
}
export default {
  merchantId,
  merchantAppid,
  signActId
}

let merchantId = null
let merchantAppid = null
let signActId = null
if (process.env.PUBLISH_ENV == 'prod') {
  // 生产配置
  merchantId = 215
  merchantAppid = 'aa63947313ae4d6abd1fec5ef2d4194a'
  signActId = '561549579'
} else {
  // 开发环境和测试环境配置
  merchantId = 232
  merchantAppid = '2ce143d14c854b6eb2cf07b14f3ac947'
  signActId = '560752467'
}
export default {
  merchantId,
  merchantAppid,
  signActId
}

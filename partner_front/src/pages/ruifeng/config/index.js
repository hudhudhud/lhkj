let merchantId = null
let merchantAppid = null
if (process.env.PUBLISH_ENV == 'prod') {
  // 生产配置
  merchantId = 189
  merchantAppid = '8db4222e73cc4756bf1ed97126691aae'
} else {
  // 开发环境和测试环境配置
  merchantId = 207
  merchantAppid = 'db027a5f8dab407bb5748fc925ced879'
}
export default {
  merchantId,
  merchantAppid
}

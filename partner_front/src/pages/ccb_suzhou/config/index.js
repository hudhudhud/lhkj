let merchantId = null
let merchantAppid = null
if (process.env.PUBLISH_ENV == 'prod') {
  // 生产配置
  merchantId = 225
  merchantAppid = '97bd1fc3ae52452badbd7714befac92f'
} else {
  // 开发环境和测试环境配置
  merchantId = 224
  merchantAppid = '778de7c40f31425d8301b571a7a41a75'
}
export default {
  merchantId,
  merchantAppid
}

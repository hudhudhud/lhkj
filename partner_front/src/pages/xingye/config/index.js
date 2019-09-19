let merchantId = null
let merchantAppid = null
if (process.env.PUBLISH_ENV == 'prod') {
  // 生产配置
  merchantId = 202
  merchantAppid = '27dd93846e844aa28e9ecf7f7dbfb9bf'
} else {
  // 开发环境和测试环境配置
  merchantId = 212
  merchantAppid = '71bd4fd3cdd8481eb70f14bfcab8dfb1'
}
export default {
  merchantId,
  merchantAppid
}

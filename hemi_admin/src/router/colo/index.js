import merchant from "./merchant"
import couponDefine from "./couponDefine"
import couponBatch from "./couponBatch"
import couponCode from "./couponCode"
import proStandard from "./proStandard"
import product from "./product"
import merchantCouponDefineConfig from "./merchantCouponDefineConfig"
import order from "./order"
import productType from "./productType"

export default [].concat(merchant)
  .concat(couponDefine)
  .concat(couponBatch)
  .concat(couponCode)
  .concat(product)
  .concat(proStandard)
  .concat(merchantCouponDefineConfig)
  .concat(order)
  .concat(productType)

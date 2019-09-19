// 订单状态

/**
 * 订单初始状态
 */
export const ORDER_STATE_CREATE = 10;

/**
 * 订单取消状态
 */
export const ORDER_STATE_CANCEL = 20;

/**
 * 订单完成状态
 */
export const ORDER_STATE_FINISH = 30;

// 支付状态

/**
 * 初始状态 未支付
 */
export const PAY_STATE_CREATE = 10;

/**
 * 已支付
 */
export const PAY_STATE_PAID = 20;

/**
 * 退款中
 */
export const PAY_STATE_REFUNDING = 30;

/**
 * 已退款
 */
export const PAY_STATE_REFUNDED = 40;

/**
 * 超时支付,需要退款
 */
export const PAY_STATE_PAYLATE = 50;

export default {
  ORDER_STATE_CREATE,
  ORDER_STATE_CANCEL,
  ORDER_STATE_FINISH,

  PAY_STATE_CREATE,
  PAY_STATE_PAID,
  PAY_STATE_REFUNDING,
  PAY_STATE_REFUNDED,
  PAY_STATE_PAYLATE
};

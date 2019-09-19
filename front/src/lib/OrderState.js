// 订单状态

/**
 * 订单初始状态
 */
export const ORDER_STATE_CREATE = 1;

/**
 * 订单取消状态
 */
export const ORDER_STATE_CANCEL = 2;

/**
 * 订单完成状态
 */
export const ORDER_STATE_FINISH = 3;
/**
 * 订单过期状态
 */
export const ORDER_STATE_EXPIRE = 4;

// 支付状态

/**
 * 初始状态 未支付
 */
export const PAY_STATE_CREATE = 1;

/**
 * 已支付
 */
export const PAY_STATE_PAID = 2;

/**
 * 退款中
 */
export const PAY_STATE_REFUNDING = 3;

/**
 * 已退款
 */
export const PAY_STATE_REFUNDED = 4;

/**
 * 超时支付,需要退款
 */
export const PAY_STATE_PAYLATE = 5;

// 飞鱼状态

/**
 * 未提货
 */
export const FISH_STATE_CREATE = 0;

/**
 * 提货处理中
 */
export const FISH_STATE_DOING = 1;

/**
 * 提货已受理
 */
export const FISH_STATE_RECEIVED = 2;

/**
 * 提货失败
 */
export const FISH_STATE_DIRECT_FAILED = 3;

/**
 * 提货回调成功
 */
export const FISH_STATE_CALLBACK_SUCCESS = 4;

/**
 * 提货回调失败
 */
export const FISH_STATE_CALLBACK_FAILED = 5;

export default {
  ORDER_STATE_CREATE,
  ORDER_STATE_CANCEL,
  ORDER_STATE_FINISH,
  ORDER_STATE_EXPIRE,

  PAY_STATE_CREATE,
  PAY_STATE_PAID,
  PAY_STATE_REFUNDING,
  PAY_STATE_REFUNDED,
  PAY_STATE_PAYLATE,

  FISH_STATE_CREATE,
  FISH_STATE_DIRECT_FAILED,
  FISH_STATE_DOING,
  FISH_STATE_RECEIVED,
  FISH_STATE_CALLBACK_FAILED,
  FISH_STATE_CALLBACK_SUCCESS
};

import request from '@/lib/Request';
import {
  Toast,
  Indicator,
  MessageBox
} from 'mint-ui';
import {
  payUrl
} from '@/config/';
import store from '../store';
// 获得轮播信息
export async function loadOrder (actId, status, orderState) {
  let rs = await request.post('/api/getOrderList?', {
    actId: actId,
    status: status // 未支付1 已支付2
  });
  if (rs.status == 200) {
    return rs.payload.list;
  } else {
    return false;
  }
}
export async function loadAllOrder (actId, status, orderState) {
  let rs = await request.post('/api/getAllOrderList?', {
    actId: actId,
    status: status // 未支付1 已支付2
  });
  if (rs.status == 200) {
    return rs.payload.list;
  } else {
    return false;
  }
}

export function loadStandard (rid, cb) {
  request.get('api/getStandard/' + rid).then(rs => {
    if (rs.status === 200) {
      cb && cb(rs);
    } else {
      Toast(rs.error);
    }
  });
}
export async function getActDetail (actId) {
  let rs = await request.get('api/getActDetails/' + actId);
  if (rs.status === 200) {
    return rs.payload;
  } else {
    return false;
  }
}
export async function getActDetailNew (actId, cb) {
  request.get('api/getActDetails/' + actId).then(rs => {
    if (rs.status === 200) {
      cb && cb(rs);
    } else {
      return false;
    }
  });
}
export async function saveAddress (orderCode, customAddressId, callback) {
  Indicator.open();
  let rs = await request.post('api/activity/order/add/address', {
    orderCode: orderCode,
    customAddressId: customAddressId
  });
  if (rs.status === 200) {
    Indicator.close();
    callback && callback(rs);
  } else {
    Toast(rs.error);
  }
  Indicator.close();
}

export function getSeckillToken (actId, callback) {
  request.get('/api/seckill/get_token/' + actId).then(rs => {
    if (rs.status == 200) {
      callback && callback(rs);
    } else {
      Toast(rs.error);
    }
  });
}
// 秒杀下单
export function kill (std, actId, seckillToken, callback) {
  request
    .post('api/seckill/kill', {
      actId: actId,
      standardId: std.id,
      token: seckillToken,
      proId: std.proId
    })
    .then(rs => {
      if (rs.status == 405) {
        // 节流 重试
        setTimeout(() => {
          kill(std, actId, seckillToken, callback);
        }, 10000 * Math.random());
        return;
      }
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        let successUrl = `${window.location.protocol}//${
          window.location.host
        }/${store.state.merchantAppid}/merchant/index/order`;
        Toast('订单已生成...正在跳转支付');
        let url =
          payUrl + prepayId + '?redirectUrl=' + encodeURIComponent(successUrl);
        window.location.replace(url);
      } else {
        Toast(rs.error);
      }
      callback && callback();
    });
}
// 查询抽奖机会
export function loadChance (actId, callback) {
  request.get('api/get_lottery_info/' + actId).then(rs => {
    if (rs.status === 200) {
      callback && callback(rs);
    } else {
      // Toast(rs.error);
    }
  });
}
// 查询能购买的抽奖机会
export function loadBuyChance (actId, callback) {
  Indicator.open();
  request
    .post('api/activity/custom/search/record', {
      actId: actId
    })
    .then(rs => {
      if (rs.status === 200) {
        Indicator.close();
        callback && callback(rs);
      } else {
        Indicator.close();
        Toast(rs.error);
      }
    });
}
// 购买抽奖机会
export function buyChance (actId, callback) {
  Indicator.open();
  request
    .post('/api/buy_lottery', {
      actId: actId,
      num: '1'
    })
    .then(rs => {
      if (rs.status === 200) {
        Indicator.close();
        callback && callback(rs);
      } else {
        Indicator.close();
        Toast(rs.error);
      }
    });
}
// 抽奖
export function lotteryDraw (actId, callback) {
  Indicator.open();
  request
    .post('api/lottery_draw', {
      actId: actId
    })
    .then(rs => {
      if (rs.status === 200) {
        Indicator.close();
        callback && callback(rs);
      } else {
        Indicator.close();
        Toast(rs.error);
      }
    });
}
// 中行支付前提示
export function payForChance (prepayId, redirectUrl) {
  if (navigator.userAgent.indexOf('boc') > -1) {
    MessageBox({
      message: '请在完成支付后，点击<span style="color: red">左上角</span>返回活动页面。',
      title: '重要提示',
      confirmButtonText: '去支付'
    }).then(action => {
      if (action == 'confirm') {
        toPay(prepayId, redirectUrl);
      }
    });
  } else {
    toPay(prepayId, redirectUrl);
  }
}
// 普通下单支付
export function toPay (prepayId, redirectUrl) {
  let successUrl = `${window.location.protocol}//${window.location.host}/${
    store.state.merchantAppid
  }/merchant/${redirectUrl}`;
  Toast('订单已生成...正在跳转支付');
  let url = `${payUrl}${prepayId}?redirectUrl=${encodeURIComponent(
    successUrl
  )}`;
  window.location.href = url;
}
/* 发送短息 */
export function sendGdPhoneMessage (urlMessage, targetTel, callback) {
  request
    .post('api/order/credit/wheel_planting/list', {
      urlMessage: encodeURIComponent(urlMessage),
      targetTel: targetTel
    })
    .then(rs => {
      if (rs.status === 200) {
        callback && callback(rs);
      } else {
        Toast(rs.error);
      }
    });
}
/* 获取轮播积分信息 */
export function getCreditBullet (callback) {
  request.get('api/order/credit/wheel_planting/list').then(rs => {
    if (rs.status === 200) {
      callback && callback(rs);
    } else {
      Toast(rs.error);
    }
  });
}
// 订单未使用的加红点
export function getNoPayOrderList (callback) {
  request
    .post('api/getOrderList', {
      status: 1,
      orderState: 1
    })
    .then(rs => {
      if (rs.status == 200) {
        callback && callback(rs);
      } else {
        // Toast(rs.error);
      }
    });
}
// 创建订单
export function creatOrder ({
  actId,
  standardId,
  couponNumber,
  account,
  callbackPage
}, callback) {
  Indicator.open();
  request
    .post('api/createOrder/', {
      actId: actId,
      standardId: standardId,
      commodityNum: 1,
      couponNumber: couponNumber,
      account: account
    })
    .then(rs => {
      Indicator.close();
      if (rs.status === 200) {
        if (rs.payload.is_pay == '1') {
          if (navigator.userAgent.indexOf('boc') > -1) {
            MessageBox({
              message: '请在完成支付后，点击左上角返回活动页面。',
              confirmButtonText: '去支付'
            }).then(action => {
              if (action == 'confirm') {
                payDirect(rs.payload, callbackPage);
              }
            });
          } else {
            payDirect(rs.payload, callbackPage);
          }
        } else {
          callback && callback(rs);
        }
      } else {
        Toast(rs.error);
      }
    });
}

function payDirect (payload, callbackPage) {
  const {
    prepayId,
    orderCode
  } = payload;
  let successUrl = `${window.location.protocol}//${window.location.host}/${
    store.state.merchantAppid
  }/merchant/paysuccess/${orderCode}`;
  Toast('订单已生成...正在跳转支付');
  let payPath = `${payUrl}${prepayId}?redirectUrl=${encodeURIComponent(
    callbackPage || successUrl
  )}`;
  // window.location.href = payPath;
  window.location.replace(payPath);
}
export function newCreatOrder ({
  actId,
  standardId,
  couponNumber,
  account,
  callbackPage
}, callback) {
  Indicator.open();
  request
    .post('api/activity/newCreateOrder', {
      actId: actId,
      standardId: standardId,
      commodityNum: 1,
      couponNumber: couponNumber,
      account: account
    })
    .then(rs => {
      Indicator.close();
      if (rs.status === 200) {
        if (rs.payload.is_pay == '1') {
          if (navigator.userAgent.indexOf('boc') > -1) {
            MessageBox({
              message: '请在完成支付后，点击左上角返回活动页面。',
              confirmButtonText: '去支付'
            }).then(action => {
              if (action == 'confirm') {
                payDirect(rs.payload, callbackPage);
              }
            });
          } else {
            payDirect(rs.payload, callbackPage);
          }
        } else {
          callback && callback(rs);
        }
      } else {
        Toast(rs.error);
        callback && callback(rs);
      }
    });
}

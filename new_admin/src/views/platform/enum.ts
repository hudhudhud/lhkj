
export default {
  fishOrder:{
    "0":{ value: "0", name: "未提货", type: "" },
    "1":{ value: "1", name: "提货中", type: "success" },
    "2":{ value: "2", name: "已受理", type: "info" },
    "4":{ value: "4", name: "提货成功", type: "success" },
    "3":{ value: "3", name: "受理失败", type: "warning" },
    "5":{ value: "5", name: "提货失败", type: "danger" }
  },
//     //OrderCommonStatusEnum 新订单状态枚举值
//     orderState:{
//       "10":{ value: "10", name: "初始状态", type: "info" },
//       "20":{ value: "20", name: "订单取消", type: "warning" },
//       "30":{ value: "30", name: "订单完成", type: "success" },
//       "40":{ value: "40", name: "订单冻结", type: "warning" },
//       "50":{ value: "50", name: "订单过期", type: "warning" },
//       "60":{ value: "60", name: "无效订单", type: "warning" }
//     },
//     //OrderCommonChargeStatusEnum 新订单第三方充值枚举值
//     rechargeState:{
//       "0":{ value: "0", name: "不需要", type: "info" },
//       "10":{ value: "10", name: "未调用", type: "info" },
//       "20":{ value: "20", name: "调用中", type: "warning" },
//       "30":{ value: "30", name: "调用失败", type: "success" },
//       "40":{ value: "40", name: "已受理", type: "warning" },
//       "50":{ value: "50", name: "回调成功", type: "warning" },
//       "60":{ value: "60", name: "重新发起", type: "warning" }
//     },
//     //OrderCommonPayStatusEnum
//     paymentState: {
//       "0":{ value: "0", name: "不需要", type: "" },
//       "10":{ value: "10", name: "未支付", type: "info" },
//       "20":{ value: "20", name: "已支付", type: "success" },
//       "30":{ value: "30", name: "退款中", type: "info" },
//       "40":{ value: "40", name: "退款完成", type: "info" },
//       "50":{ value: "50", name: "超时支付（待退款）", type: "info" }
//     },
//     //OrderCommonConsumeEnum  新订单,消费除货币外,其它物品状态: 积分消费/卡卷消费/抽奖机会扣除
//     useStatus:{
//        "0":{ value: "0", name: "不需要", type: "" },
//        "10":{ value: "10", name: "未消费", type: "info" },
//        "20":{ value: "20", name: "消费成功", type: "success" },
//        "30":{ value: "30", name: "消费失败", type: "warning" },
//      },
//      //ProType
//     proType: {1:'直冲',2:'卡密',3:'抽奖',4:'卡券',5:'积分',6:'签到',7:'签到',8:'谢谢惠顾',9:'实品',10:'预定',11:'红包',12:'票类商品',13:'签证类商品',
//         14:'自定义充值类'},

//  //OrderTicketRefundStatusEnum 车票状态枚举
//   ticketStatus:{
//     10:{name:'已占票'},
//     20:{name:'出票中'},
//     21:{name:'出票失败'},
//     30:{name:'已出票'},
//     40:{name:'退票中'},
//     41:{name:'退票失败'},
//     50:{name:'已退票'},
//     60:{name:'申请改签'},
//     70:{name:'改签中'},
//     71:{name:'改签失败'},
//     80:{name:'改签成功'},
//   },
//   //抽奖机会扣除状态
//   lotteryUseStatus:
//   {
//    // 0. 不使用, 10. 未消费, 20. 消费成功, 30. 消费失败
//    0:{name:'不使用'},
//    10:{name:'未消费'},
//    20:{name:'消费成功'},
//    30:{name:'消费失败'},
//   } ,

orderStateOld: {
 1: { value: "1", name: "下单", type: "" },
 2: { value: "2", name: "订单取消", type: "warning" },
 3: { value: "3", name: "订单完成", type: "success" }
},
paymentStateOld: {
  1:{ value: "1", name: "未支付", type: "" },
  2:{ value: "2", name: "支付成功", type: "success" },
  3:{ value: "4", name: "正在退款", type: "info" },
  4:{ value: "5", name: "退款成功", type: "info" }
},
//退款状态
refundStatus:{
  0:'未退款',
  1:'已退款',
  2:'退款失败'
},
//退款处理状态
refundApplyStatus:{
  0:'未受理',
  1:'已受理',
  2:'拒绝受理'
},
actType:[
  {
    id: "",
    type: "全部"
  },
  {
    id: "1",
    type: "特卖活动"
  },
  {
    id: "2",
    type: "抽奖活动"
  },
  {
    id: "3",
    type: "秒杀活动"
  },

  {
    id: "4",
    type: "领券活动"
  },
  {
    id: "5",
    type: "签到活动"
  },
  {
    id: "6",
    type: "多多券卡券活动"
  },
  {
    id: "7",
    type: "游戏活动"
  },
  {
    id: "8",
    type: "积分活动"
  },
  {
    id: "12",
    type: "票类活动"
  },
  {
    id: "13",
    type: "签证活动"
  },
  {
    id: "14",
    type: "传绣球活动"
  }
],
proType:[
  {
    "code": 1,
    "desc": "直冲"
  },
  {
    "code": 2,
    "desc": "卡密"
  },
  {
    "code": 3,
    "desc": "抽奖机会"
  },
  {
    "code": 4,
    "desc": "没用"
  },
  {
    "code": 5,
    "desc": "积分"
  },
  {
    "code": 6,
    "desc": "签到"
  },
  {
    "code": 7,
    "desc": "签到"
  },
  {
    "code": 8,
    "desc": "谢谢惠顾"
  },
  {
    "code": 9,
    "desc": "实品"
  },
  {
    "code": 10,
    "desc": "预定"
  },
  {
    "code": 11,
    "desc": "红包"
  },
  {
    "code": 12,
    "desc": "火车票类商品"
  },
  {
    "code": 13,
    "desc": "签证类商品"
  },
  {
    "code": 14,
    "desc": "自定义充值类"
  },
  {
    "code": 15,
    "desc": "景点门票类商品"
  }
]    
}


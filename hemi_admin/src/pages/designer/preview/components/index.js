import LegoLayout from "./LegoLayout";
import LegoLink from "./LegoLink";
import LegoText from "./LegoText";
import LegoImage from "./LegoImage";
import LegoSwiper from "./LegoSwiper";
import LegoCustom from "./LegoCustom";
import LegoStandard from "./LegoStandard";
import LegoStandardList from "./LegoStandardList";
import LegoOrderList from "./LegoOrderList";
import LegoPrizeList from "./LegoPrizeList";
import LegoCharger from "./LegoCharger";
import LegoGame from "./LegoGame/Index";
import LegoSeckill from "./LegoSeckill/Index";
import LegoSeckillBtn from "./LegoSeckillBtn/Index";
import LegoChargerCcb from "./LegoChargerCcb/Index";
import LegoMinusCharger from "./LegoMinusCharger/Index";
import IcbcCharger from "./IcbcCharger/Index";
import LegoLottery from "./LegoLottery";
import LegoSwip from "./LegoSwip/Index";
import LegoLocalBanks from "./LegoLocalBanks/Index";
import LegoLocalBankNew from "./LegoLocalBank001/Index";
import LegoCbbZjAnimation from "./LegoCbbZjAnimation/Index";
import LegoGoldCoin from "./LegoGoldCoin/Index";
import LegoCcbCredit from "./LegoCcbCredit/Index";
import LegoModal from "./LegoModal/Index";
import LegoActDialog from "./LegoActDialog/Index";
import LegoIndexModal from "./LegoIndexModal/Index";
import LegoActTab from "./LegoActTab/Index";
import LegoSzTab from "./LegoSzTab/Index";
import EtcHot from "./ETCAPP/hot";
import EtcTab from "./ETCAPP/tab";
import LegoActGD from "./LegoActGD/Index";
import LegoActGZ from "./LegoActGZ/Index";
import LegoBaguiTab from "./LegoBaguiTab/Index";
import LegoNotice from "./LegoNotice/index";
import LegoInvite from "./LegoInvite/index";
import LegoScrollTitle from "./LegoScrollTitle/Index";
import LegoBaguiAct from "./LegoBaguiAct/Index";
import LegoSign from "./LegoSign";
import LegoBack from "./LegoBack";
import LegoChargeItem from "./LegoChargeItem";
import LegoChargeYc from "./LegoChargeYc/Index";
import LegoPaymentBusiness from "./LegoPaymentBusiness/Index";
// import CbbLottery from "./CbbLottery/Index"
import LegoCoupon from "./LegoCoupon/Index";
import LegoLettery from "./LegoLettery/Index";
import LegoLettery001 from "./LegoLettery001/Index";
import LegoBullet from "./bullet/Index";
import LegoBullet001 from "./bullet001/Index";
import LegoBullet002 from "./bullet002/Index";
import LegoBullet003 from "./bullet003/Index";
import LegoSlider from "./LegoSlider/Index";
import LegoJilinRecharge from "./LegoJilinRecharge/Index"; // 吉林充值中心
import LegoJilinGoodList from "./LegoJilinGoodList/Index"; // 吉林特卖
import LegoGoodList from "./LegoGoodList/Index"; // 商品列表组件
import LegoUrl from "./LegoUrl/Index"; // 重定向组件
import LegoShare from "./LegoShare/Index"; // 分享组件
// import EtcTab from "./ETCAPP/tab"; // 商品列表组件
// import EtcHot from "./ETCAPP/hot"; // 分享组件

export const commonProps = [{
  name: "点击事件",
  key: "onClick",
  type: "action",
  default: {
    type: "none",
    action: null
  }
},
{
  name: "显示条件",
  key: "isDisplay",
  type: "slot"
}
];

const components = [{
  name: "页面",
  desc: "根组件,一个页面",
  tag: "lego-page",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-page.png",
  component: LegoLayout,
  isContainer: true,
  props: [{
    key: "title",
    name: "页面title",
    type: "text"
  },
  {
    key: "needLogin",
    name: "是否需要登录",
    type: "boolean"
  },
  {
    key: "needLoginAuto",
    name: "是否需要自动登录",
    type: "boolean"
  },
  {
    key: "enableCache",
    name: "是否启用缓存",
    type: "boolean"
  },
  {
    key: "disabledShare",
    name: "是否禁用分享",
    type: "boolean"
  }
  ],
  defaultStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    "overflow-x": "hidden",
    "overflow-y": "auto"
  }
},
{
  name: "布局",
  desc: "基础的组件,可容纳其他组件",
  tag: "lego-layout",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-layout.png",
  component: LegoLayout,
  isContainer: true,
  props: commonProps,
  defaultStyle: {
    height: "100px",
    background: "#eee",
    "overflow-x": "hidden"
  }
},
{
  name: "超链接",
  desc: "点击将跳转到指定地址,可容纳其他组件",
  tag: "lego-link",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-link.png",
  component: LegoLink,
  isContainer: true,
  props: [{
    name: "链接",
    key: "href",
    type: "text"
  }].concat(commonProps),
  defaultStyle: {}
},
{
  name: "文本",
  desc: "添加一段文字到页面",
  tag: "lego-text",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-text.png",
  component: LegoText,
  isContainer: false,
  props: [{
    name: "启用插槽",
    key: "isSlot",
    type: "boolean"
  },
  {
    name: "文本",
    key: "text",
    type: "text",
    showFunc(comp) {
      return !comp.setting.isSlot;
    }
  },
  {
    name: "插槽字段",
    key: "slotKey",
    type: "slot",
    showFunc(comp) {
      return comp.setting.isSlot;
    }
  }
  ].concat(commonProps),
  defaultSetting: {
    text: "默认文本"
  },
  defaultStyle: {}
},
{
  name: "图片",
  desc: "添加一张图片到页面",
  tag: "lego-image",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-image.png",
  component: LegoImage,
  isContainer: false,
  props: [{
    name: "启用插槽",
    key: "isSlot",
    type: "boolean"
  },
  {
    name: "图片",
    key: "src",
    type: "image",
    showFunc(comp) {
      return !comp.setting.isSlot;
    }
  },
  {
    name: "插槽字段",
    key: "slotKey",
    type: "slot",
    showFunc(comp) {
      return comp.setting.isSlot;
    }
  }
  ].concat(commonProps),
  defaultSetting: {},
  defaultStyle: {
    display: "block",
    "max-width": "100%"
  }
},
{
  name: "轮播图",
  desc: "轮播组件,支持一组图片轮播,每个图片都可以设置点击事件",
  tag: "lego-swiper",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-swiper.png",
  component: LegoSwiper,
  isContainer: false,
  props: [{
    name: "图片列表",
    key: "list",
    type: "swiper",
    default: []
  },
  {
    name: "间隔时间",
    key: "delay",
    type: "text",
    default: "2000"
  },
  {
    name: "切换速度",
    key: "speed",
    type: "text",
    default: "300"
  }
  ],
  defaultSetting: {
    list: [{
      url: "",
      action: {
        type: "none",
        action: ""
      }
    }],
    delay: "2000"
  },
  defaultStyle: {}
},
{
  name: "个人信息",
  desc: "个人中心个人信息相关,获取当前登录的用户信息",
  tag: "lego-custom",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-custom.png",
  component: LegoCustom,
  isContainer: true,
  props: [],
  slotProps: [{
    name: "客户编号",
    key: "customId"
  },
  {
    name: "昵称",
    key: "nickname"
  },
  {
    name: "商户号",
    key: "merchantId"
  },
  {
    name: "绑定手机号",
    key: "tel"
  },
  {
    name: "绑定手机号_脱敏",
    key: "telSafe"
  },
  {
    name: "头像",
    key: "headImgUrl"
  },
  {
    name: "注册时间",
    key: "registryTime"
  }
  ],
  defaultStyle: {}
},
{
  name: "商品规格",
  desc: "商品规格组件,可容纳其他组件,并且可在其中引用商品信息",
  tag: "lego-standard",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-product.png",
  component: LegoStandard,
  isContainer: true,
  props: [{
    name: "商品规格",
    key: "standardId",
    type: "standard"
  }],
  slotProps: [{
    name: "商品ID",
    key: "proId"
  },
  {
    name: "商品名称",
    key: "proName"
  },
  {
    name: "规格ID",
    key: "standardId"
  },
  {
    name: "规格名称",
    key: "standardName"
  },
  {
    name: "规格图片",
    key: "standardImgUrl"
  },
  {
    name: "规格说明",
    key: "standardInstruction"
  },
  {
    name: "仍有库存",
    key: "hasStore"
  }
  ],
  defaultStyle: {
    height: "100px",
    width: "100px",
    background: "#ddd"
  }
},
{
  name: "商品规格列表",
  desc: "商品规格组件列表,可容纳其他组件,且指定组件可进行列表渲染",
  tag: "lego-standard-list",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoStandardList,
  isContainer: true,
  props: [{
    name: "商品",
    key: "proId",
    type: "product"
  }],
  slotProps: [{
    name: "商品ID",
    key: "proId"
  },
  {
    name: "商品名称",
    key: "proName"
  },
  {
    name: "规格ID",
    key: "standardId"
  },
  {
    name: "规格名称",
    key: "standardName"
  },
  {
    name: "规格图片",
    key: "standardImgUrl"
  },
  {
    name: "规格说明",
    key: "standardInstruction"
  },
  {
    name: "仍有库存",
    key: "hasStore"
  }
  ],
  defaultStyle: {
    height: "100px",
    width: "100px",
    background: "#ddd"
  }
},
{
  name: "订单列表",
  desc: "订单列表组件",
  tag: "lego-order-list",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoOrderList,
  isContainer: false,
  props: [],
  defaultStyle: {}
},
{
  name: "奖品列表",
  desc: "奖品列表组件",
  tag: "lego-prize-list",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoPrizeList,
  isContainer: false,
  props: [],
  defaultStyle: {}
},
{
  name: "充值组件",
  desc: "充值组件,绑定商品后,可直接将充值功能嵌入到页面上",
  tag: "lego-charger",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoCharger,
  isContainer: true,
  props: [{
    name: "商品",
    key: "proId",
    type: "product"
  },
  {
    name: "充值说明",
    key: "desc",
    type: "text"
  },
  {
    name: "回调页面",
    key: "callbackPage",
    type: "text"
  }
  ],
  defaultStyle: {}
},
{
  name: "swip组件",
  desc: "",
  tag: "lego-swip",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoSwip,
  isContainer: true,
  props: [{
    key: "swipHeigth",
    name: "swip高度",
    type: "text"
  },
  {
    key: "swipItemWidth",
    name: "swipItem宽度",
    type: "text"
  },
  {
    key: "swipItemHeigth",
    name: "swipItem高度",
    type: "text"
  },
  {
    key: "margin",
    name: "外边距",
    type: "text"
  },
  {
    key: "list",
    name: "活动列表",
    type: "text"
  }
  ]
},
{
  name: "八桂金概览",
  desc: "广西八桂八桂金",
  tag: "lego-gold-coin",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoGoldCoin,
  isContainer: true
},
{
  name: "cc币概览",
  desc: "",
  tag: "lego-ccb-credit",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoCcbCredit,
  isContainer: true,
  props: [{
    name: "defaultAvatar",
    key: "defaultAvatar",
    type: "text"
  },
  {
    name: "icon",
    key: "icon",
    type: "text"
  }
  ]
},
{
  name: "lego-charge-item",
  desc: "",
  tag: "lego-charge-item",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoChargeItem,
  isContainer: true,
  props: [{
    name: "actId",
    key: "actId",
    type: "text"
  }]
},
{
  name: "八桂金兑换专区规则弹出框",
  desc: "广西八桂八桂金",
  tag: "lego-modal",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoModal,
  isContainer: true
},
{
  name: "通用活动对话框",
  desc: "",
  tag: "lego-act-dialog",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoActDialog,
  isContainer: true,
  props: [{
    name: "targetUrl",
    key: "targetUrl",
    type: "text"
  },
  {
    name: "actId",
    key: "actId",
    type: "text"
  }
  ]
},
{
  name: "首页活动入口弹框模板",
  desc: "",
  tag: "lego-index-modal",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoIndexModal,
  isContainer: true,
  props: [{
    name: "点击跳转",
    key: "target",
    type: "text"
  },
  {
    name: "actId",
    key: "actId",
    type: "text"
  }
  ]
},
{
  name: "返回组件",
  desc: "支持sdk",
  tag: "lego-back",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoBack,
  isContainer: true,
  props: [{
    name: "image",
    key: "imgUrl",
    type: "text"
  }]
},
{
  name: "八桂金活动选项卡",
  desc: "八桂金活动选项卡",
  tag: "lego-act-tab",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoActTab,
  isContainer: true,
  props: [{
    name: "活动Id",
    key: "actId",
    type: "text"
  },
  {
    name: "skin",
    key: "skin",
    type: "text"
  }
  ]
},
{
  name: "深圳中行积分商城",
  desc: "深圳中行积分商城",
  tag: "szlego-act-tab",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoSzTab,
  isContainer: true,
  props: [{
    name: "活动Id",
    key: "actId",
    type: "text"
  }]
},
{
  name: "ETC热门商品",
  desc: "ETC热门商品",
  tag: "szlego-etc-hot",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: EtcHot,
  isContainer: true,
  props: [{
    name: "活动Id",
    key: "actId",
    type: "text"
  }]
},
{
  name: "ETC兑换专区",
  desc: "ETC兑换专区",
  tag: "szlego-etc-tab",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: EtcTab,
  isContainer: true,
  props: [{
    name: "活动Id",
    key: "actId",
    type: "text"
  }]
},
{
  name: "活动选项卡组件",
  desc: "活动选项卡组件",
  tag: "lego-act-gd",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoActGD,
  isContainer: true,
  props: [{
    name: "活动Id",
    key: "actId",
    type: "text"
  },
  {
    name: "theme",
    key: "theme",
    type: "text"
  }
  ]
},
{
  name: "礼遇贵州活动选项卡",
  desc: "贵州中行，礼遇贵州活动选项卡",
  tag: "lego-act-tab-gz",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoActGZ,
  isContainer: true,
  props: [{
    name: "活动Id",
    key: "actId",
    type: "text"
  }]
},
{
  name: "工行系列公告弹窗",
  desc: "工行系列公告弹窗",
  tag: "lego-notice",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoNotice,
  isContainer: true,
  props: [{
    name: "background",
    key: "background",
    type: "text"
  },
  {
    name: "noClose",
    key: "noClose",
    type: "text"
  },
  {
    name: "modalcss",
    key: "modalcss",
    type: "text"
  },
  {
    name: "modalH",
    key: "modalH",
    type: "text"
  },
  {
    name: "detail",
    key: "detail",
    type: "text"
  }
  ]
},
{
  name: "输入活动邀请码弹框",
  desc: "",
  tag: "lego-invite",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoInvite,
  isContainer: true,
  props: [{
    name: "目标链接",
    key: "targetUrl",
    type: "text"
  },
  {
    name: "入口banner",
    key: "bannerUrl",
    type: "text"
  },
  {
    name: "默认邀请码",
    key: "pass",
    type: "text"
  }
  ]
},
{
  name: "小贴士畅享苏州",
  desc: "小贴士畅享苏州",
  tag: "lego-scroll-title",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoScrollTitle,
  isContainer: true,
  props: [{
    name: "txtList",
    key: "titleList",
    type: "text"
  }]
},
{
  name: "八桂金兑换活动选项卡",
  desc: "八桂金兑换活动选项卡",
  tag: "lego-bagui-tab",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoBaguiTab,
  isContainer: true,
  props: [{
    name: "活动Id",
    key: "actId",
    type: "text"
  }]
},
{
  name: "赢话费组件",
  desc: "",
  tag: "lego-game",
  icon: "",
  component: LegoGame,
  isContainer: true,
  props: [{
    name: "活动Id",
    key: "actId",
    type: "text"
  }],
  defaultStyle: {}
},
{
  name: "八桂首页弹窗活动",
  desc: "",
  tag: "lego-bagui-act",
  icon: "",
  component: LegoBaguiAct,
  isContainer: true,
  defaultStyle: {}
},
{
  name: "幸运大转盘组件",
  desc: "",
  tag: "lego-lottery",
  icon: "",
  component: LegoLottery,
  isContainer: true,
  props: [{
    name: "活动Id",
    key: "actId",
    type: "text"
  }],
  defaultStyle: {}
},
{
  name: "畅享苏州充值组件",
  desc: "",
  tag: "lego-charger-ccb",
  icon: "",
  component: LegoChargerCcb,
  isContainer: true,
  props: [{
    key: "actId",
    name: "活动Id",
    type: "text"
  }],
  defaultStyle: {}
},
{
  name: "话费立减充值组件",
  desc: "",
  tag: "lego-minus-charger",
  icon: "",
  component: LegoMinusCharger,
  isContainer: true,
  props: [{
    key: "actId",
    name: "活动Id",
    type: "text"
  }],
  defaultStyle: {}
},
{
  name: "九宫格",
  desc: "",
  tag: "lego-lettery",
  icon: "",
  component: LegoLettery,
  isContainer: true,
  props: [{
    key: "actId",
    name: "活动Id",
    type: "text"
  }]
},
{
  name: "九宫格抽奖组件",
  desc: "",
  tag: "lego-lettery",
  icon: "",
  component: LegoLettery001,
  isContainer: true,
  props: [{
    key: "actId",
    name: "活动Id",
    type: "text"
  }]
},
{
  name: "河南邮储充值",
  desc: "",
  tag: "lego-charge-yc",
  icon: "",
  component: LegoChargeYc,
  isContainer: true,
  props: [{
    key: "actId",
    name: "活动Id",
    type: "text"
  }]
},
{
  name: "河南邮储缴费",
  desc: "",
  tag: "lego-payment-business",
  icon: "",
  component: LegoPaymentBusiness,
  isContainer: true,
  props: [{
    key: "actId",
    name: "活动Id",
    type: "text"
  }]
},
{
  name: "约惠浙江首页动画",
  desc: "",
  tag: "lego-cbb-zj-animation",
  icon: "",
  component: LegoCbbZjAnimation,
  isContainer: true
},
{
  name: "汇聚广东bullet",
  desc: "",
  tag: "lego-bullet",
  icon: "",
  component: LegoBullet,
  isContainer: true,
  props: [{
    key: "act",
    name: "活动配置",
    type: "text"
  }]
},
{
  name: "广东建行bullet",
  desc: "",
  tag: "lego-bullet001",
  icon: "",
  component: LegoBullet001,
  isContainer: true
},
{
  name: "通用bullet",
  desc: "",
  tag: "lego-bullet002",
  icon: "",
  component: LegoBullet002,
  isContainer: true,
  props: [{
    name: "txtList",
    key: "titleList",
    type: "text"
  }]
},
{
  name: "苏式生活bullet",
  desc: "",
  tag: "lego-bullet003",
  icon: "",
  component: LegoBullet003,
  isContainer: true
},
{
  name: "苏式生活slider",
  desc: "",
  tag: "lego-slider",
  icon: "",
  component: LegoSlider,
  isContainer: true,
  props: [{
    key: "json",
    name: "json",
    type: "text"
  }]
},
{
  name: "地方行",
  desc: "",
  tag: "lego-local-banks",
  icon: "",
  component: LegoLocalBanks,
  isContainer: true,
  props: [{
    key: "swipHeigth",
    name: "swip高度",
    type: "text"
  },
  {
    key: "swipItemWidth",
    name: "swipItem宽度",
    type: "text"
  },
  {
    key: "swipItemHeigth",
    name: "swipItem高度",
    type: "text"
  },
  {
    key: "margin",
    name: "外边距",
    type: "text"
  },
  {
    key: "actId",
    name: "活动Id",
    type: "text"
  }
  ]
},
{
  name: "浙江中行地方行",
  desc: "",
  tag: "lego-local-bank-new",
  icon: "",
  component: LegoLocalBankNew,
  isContainer: true
},
{
  name: "工行充值组件",
  desc: "",
  tag: "icbc-charger",
  icon: "",
  component: IcbcCharger,
  isContainer: true,
  props: [{
    key: "actId",
    name: "活动Id",
    type: "text"
  }],
  defaultStyle: {}
},
{
  name: "lego秒杀",
  desc: "",
  tag: "lego-seckill",
  icon: "",
  component: LegoSeckill,
  isContainer: true,
  props: [{
    key: "actId",
    name: "活动Id",
    type: "text"
  },
  {
    key: "enableCache",
    name: "是否启用缓存",
    type: "boolean"
  }
  ],
  defaultStyle: {}
},
{
  name: "lego游青山预定按钮",
  desc: "",
  tag: "lego-seckill-btn",
  icon: "",
  component: LegoSeckillBtn,
  isContainer: true,
  props: [{
    key: "actId",
    name: "活动Id",
    type: "text"
  },
  {
    key: "enableCache",
    name: "是否启用缓存",
    type: "boolean"
  }
  ],
  defaultStyle: {}
},
{
  name: "签到组件",
  desc: "",
  tag: "lego-sign",
  icon: "",
  component: LegoSign,
  isContainer: true,
  props: [{
    key: "actId",
    name: "活动Id",
    type: "text"
  },
  {
    name: "顶部背景",
    key: "banner",
    type: "image"
  },
  {
    name: "可签到按钮图片",
    key: "btnOn",
    type: "image"
  },
  {
    name: "不可签到按钮图片",
    key: "btnSuccess",
    type: "image"
  }
  ],
  defaultSetting: {
    banner: "//static.lianhaikeji.com/images/20180928/cf54666dcbf44fc3a305c584e7038f6a.png",
    btnOn: "//static.lianhaikeji.com/images/20180928/60055cf0f27b4eb0b61e7f07988dd339.png",
    btnSuccess: "//static.lianhaikeji.com/images/20180928/0484f235f4da4db8bb99fdee257fe4ac.png"
  },
  defaultStyle: {}
},
{
  name: "兑换组件",
  desc: "",
  tag: "lego-coupon",
  icon: "",
  component: LegoCoupon,
  isContainer: false,
  props: [{
    key: "actId",
    name: "活动Id",
    type: "text"
  },
  {
    key: "btnBg",
    name: "按钮背景",
    type: "background"
  },
  {
    key: "borderColor",
    name: "边框颜色",
    type: "color",
    default: "#000"
  }
  ],
  defaultStyle: {}
},
{
  name: "吉林建行充值中心",
  desc: "吉林建行充值中心",
  tag: "lego-jilinRecharge",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoJilinRecharge,
  isContainer: true,
  props: [{
    name: "活动id",
    key: "actid",
    type: "text"
  }
  ],
  defaultStyle: {}
},
{
  name: "吉林建行特卖",
  desc: "吉林建行特卖",
  tag: "lego-jilinGoodslist",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoJilinGoodList,
  isContainer: true,
  props: [{
    name: "活动id",
    key: "actid",
    type: "text"
  },
  {
    name: "tab文字",
    key: "tabText",
    type: "text"
  },
  {
    name: "ul样式",
    key: "ulStyle",
    type: "text"
  },
  {
    name: "li样式",
    key: "liStyle",
    type: "text"
  }
  ],
  defaultStyle: {}
},
{
  name: "135特惠列表",
  desc: "135特惠列表",
  tag: "lego-goodslist",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoGoodList,
  isContainer: true,
  props: [{
    name: "活动id",
    key: "actid",
    type: "text"
  },
  {
    name: "ul样式",
    key: "ulStyle",
    type: "text"
  },
  {
    name: "li样式",
    key: "liStyle",
    type: "text"
  },
  {
    name: "按钮样式",
    key: "btnStyle",
    type: "text"
  },
  {
    name: "按钮文字",
    key: "btnText",
    type: "text"
  }
  ],
  defaultStyle: {}
},
{
  name: "链接重定向组件",
  desc: "链接重定向组件",
  tag: "lego-urlRedirect",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoUrl,
  isContainer: true,
  props: [
    {
      name: "重定向链接",
      key: "link",
      type: "text"
    }
  ],
  defaultStyle: {}
},
{
  name: "微信分享组件",
  desc: "微信分享组件",
  tag: "lego-share",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: LegoShare,
  isContainer: true,
  props: [{
    name: "分享正标题",
    key: "title",
    type: "text"
  },
  {
    name: "分享副标题",
    key: "desc",
    type: "text"
  },
  {
    name: "分享链接",
    key: "link",
    type: "text"
  },
  {
    name: "分享图片",
    key: "imgUrl",
    type: "image"
  }
  ],
  defaultStyle: {}
}, {
  name: "ETC热门商品",
  desc: "ETC热门商品",
  tag: "szlego-etc-hot",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: EtcHot,
  isContainer: true,
  props: [{
    name: "活动Id",
    key: "actId",
    type: "text"
  }]
},
{
  name: "ETC兑换专区",
  desc: "ETC兑换专区",
  tag: "szlego-etc-tab",
  icon: "//static.lianhaikeji.com/lib%2Fimgs%2Ficon-list.png",
  component: EtcTab,
  isContainer: true,
  props: [{
    name: "活动Id",
    key: "actId",
    type: "text"
  }]
}
];
export default components;

let _componentsMap = {};
components.forEach(item => {
  _componentsMap[item.tag] = item;
});
export const componentsMap = _componentsMap;

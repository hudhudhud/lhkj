import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import Main from '@/pages/Main';
import MerchantIndex from '@/pages/index/MerchantIndex';
import IndexMine from '@/pages/index/IndexMine';
import IndexTest from '@/pages/index/test';
import IndexService from '@/pages/index/IndexService';
import ActFront from '@/pages/index/FrontAct';
import Dispatcher from '@/pages/index/dispatcher';
import ActArea from '@/pages/index/ActArea';
import IndexAct from '@/pages/index/IndexAct';
import ActIndex from '@/pages/act/ActIndex';
import nprogress from 'nprogress';
import {
  oAuthUrl
} from '@/config/index';
import {
  Indicator,
  Toast
} from 'mint-ui';
import request from '../lib/Request';
import {
  getToken
} from '@/utils/storage';

// 不显示圈圈
nprogress.configure({
  showSpinner: false
});

Vue.use(Router);

const routes = [{
  path: '/',
  redirect: 'index'
},
{
  path: 'train',
  component: () => import('@/pages/index/IndexShare'),
  authorization: true,
  children: [{
    path: 'order',
    component: () => import('@/pages/train/order')
  },
  {
    path: 'orderDetails',
    component: () => import('@/pages/train/orderDetails')
  }
  ]
},
{
  path: 'ticketSpot', // 景区门票
  component: () => import('@/pages/index/IndexShare'),
  authorization: true,
  children: [{
    path: 'index',
    component: () => import('@/pages/ticketSpot/Index')
  }, {
    path: 'order',
    component: () => import('@/pages/ticketSpot/order')
  },
  {
    path: 'orderDetails',
    component: () => import('@/pages/ticketSpot/orderDetails')
  },
  {
    path: 'ticketDetail/:orderCode',
    component: () => import('@/pages/ticketSpot/ticketDetail')
  }
  ]
},
{
  path: 'share/:customId',
  component: () => import('@/pages/share/dangban'),
  meta: {
    skipLogin: true,
    authorization: true
  },
  children: [{
    path: 'index',
    component: () => import('@/pages/share/Index'),
    meta: {
      skipLogin: true
    }
  },
  {
    path: 'uploadCode',
    component: () => import('@/pages/share/upload'),
    meta: {
      title: '上传二维码'
    }
  },
  {
    path: 'seeDimensionalCode',
    component: () => import('@/pages/share/seeDimensionalCode'),
    meta: {
      title: '查看二维码'
    }
  },
  {
    path: 'indexGuide',
    component: () => import('@/pages/share/ShareGuides')
  },
  {
    path: 'myQrcode/:phoneNum',
    component: () => import('@/pages/share/MyQrcode'),
    meta: {
      title: '我的二维码'
    }
  },
  {
    path: 'acEntrance',
    component: () => import('@/pages/share/acEntrance'),
    meta: {
      skipLogin: true
    }
  },
  {
    path: 'pointsDetails',
    component: () => import('@/pages/share/PointsDetails'),
    meta: {
      title: '积分明细'
    }
  },
  {
    path: 'recommendedDetails',
    component: () => import('@/pages/share/recommendedDetails'),
    meta: {
      title: '推荐明细'
    }
  },
  {
    path: 'refereeList',
    component: () => import('@/pages/share/refereeList'),
    meta: {
      title: '外拓网点功能页'
    }
  },
  {
    path: 'refereeDetail',
    name: 'refereeDetail',
    component: () => import('@/pages/share/refereeDetail'),
    meta: {
      title: '用户详情'
    }
  }
  ]
},
{
  path: 'fudai',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/fudai/Index')
  },
  {
    path: 'friend',
    component: () => import('@/pages/fudai/friend')
  }
  ]
},
{
  path: 'fuyunPay',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/fuyunPay/index')
  }]
},
{
  path: 'jrFamily',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/jrFamily/index')
  }]
},
{
  path: 'jianhangyq',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/jianhangyq/index'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'code',
    component: () => import('@/pages/jianhangyq/code')
  }]
},
{
  path: 'xingyebanka',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/xingyebanka/index')
  }]
},
{
  path: 'fjgongyi',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/fjgongyi/index')
  },
  {
    path: 'detail',
    component: () => import('@/pages/fjgongyi/detail')
  }]
},
{
  path: 'JLjianhang',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/JLjianhang/index')
  }]
},
{
  path: 'nhhuafei',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/nhhuafei/index'),
    meta: {
      skipLogin: true
    }
  }]
},
{
  path: 'cznhli',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/cznhli/index')
  }]
},
{
  path: 'bjoneYuanbuy',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/bjoneYuanbuy/index'),
    meta: {
      authorization: true
    }
  }]
},
{
  path: 'ZJetc',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/ZJetc/index')
  }]
},
{
  path: 'ghsale',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/ghsale/index')
  }]
},
{
  path: 'hunantoupiao',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/hunantoupiao/index')
  },
  {
    path: 'lettory',
    component: () => import('@/pages/hunantoupiao/lettory')
  },
  {
    path: 'activity',
    component: () => import('@/pages/hunantoupiao/activity')
  },
  {
    path: 'vote',
    component: () => import('@/pages/hunantoupiao/vote')
  },
  {
    path: 'Submission',
    component: () => import('@/pages/hunantoupiao/Submission')
  },
  {
    path: 'voteresult',
    component: () => import('@/pages/hunantoupiao/voteresult')
  }
  ]
},
{
  path: 'cznhtravel',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/cznhtravel/index')
  },
  {
    path: 'detail',
    component: () => import('@/pages/cznhtravel/detail')
  }
  ]
},
{
  path: 'cznhlettory',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'Index',
    component: () => import('@/pages/cznhlettory/Index')
  }
  ]
},
{
  path: 'jianhanglettory',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'Index',
    component: () => import('@/pages/jianhanglettory/Index')
  }
  ]
},
{
  path: 'ZJcoupons',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/ZJcoupons/Index')
  }]
},
{
  path: 'xinye',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/xinye/index')
  }]
},
{
  path: 'xinyeCreditCard',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/xinyeCreditCard/index')
  }]
},
{
  path: 'baguibiyeji',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/baguibiyeji/index')
  }]
},
{
  path: 'jianhangCday',
  component: Main,
  children: [{
    path: 'index',
    component: () => import('@/pages/jianhangCday/index')
  },
  {
    path: 'instruction',
    component: () => import('@/pages/jianhangCday/instruction')
  }
  ]
},
{
  path: 'baoming',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/baoming/index')
  },
  {
    path: 'actlist',
    component: () => import('@/pages/baoming/actlist')
  }
  ]
},
{
  path: 'beijinlettory',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/beijinlettory/Index')
  }]
},
{
  path: 'longkaCode',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/longkaCode/index')
  },
  {
    path: 'rule',
    component: () => import('@/pages/longkaCode/rule')
  }
  ]
},
{
  path: 'manjian',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/manjian/index')
  }]
},
{
  path: 'ccbHenan',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'manjian',
    component: () => import('@/pages/ccbHenan/index')
  }]
},
{
  path: 'gdjinli',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/gdjinli/index')
  },
  {
    path: 'lottery',
    component: () => import('@/pages/gdjinli/lottery')
  },
  {
    path: 'sign',
    component: () => import('@/pages/gdjinli/sign')
  },
  {
    path: 'publicity',
    component: () => import('@/pages/gdjinli/publicity')
  },
  {
    path: 'feature',
    component: () => import('@/pages/gdjinli/feature')
  },
  {
    path: 'feature2',
    component: () => import('@/pages/gdjinli/feature2')
  },
  {
    path: 'rule1',
    component: () => import('@/pages/gdjinli/rule1')
  },
  {
    path: 'rule2',
    component: () => import('@/pages/gdjinli/rule2')
  },
  {
    path: 'rule3',
    component: () => import('@/pages/gdjinli/rule3')
  },
  {
    path: 'charts',
    component: () => import('@/pages/gdjinli/charts')
  }
  ]
},
{
  path: 'gzjinli',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/gzjinli/index'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'jinlilettory',
    component: () => import('@/pages/gzjinli/jinlilettory'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'rule',
    component: () => import('@/pages/gzjinli/rule')
  },
  {
    path: 'liucheng',
    component: () => import('@/pages/gzjinli/liucheng')
  }
  ]
},
{
  path: 'zhLicai',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/zhLicai/index')
  }]
},
{
  path: 'xiuqiu',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/xiuqiu/index')
  },
  {
    path: 'fu/:sui',
    component: () => import('@/pages/xiuqiu/fu'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'zhufu/:type',
    component: () => import('@/pages/xiuqiu/zhufu'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'songfuover',
    component: () => import('@/pages/xiuqiu/songfuover')
  }
  ]
},
{
  path: 'fujianlettory',
  component: Main,
  children: [{
    path: 'Index',
    component: () => import('@/pages/fujianlettory/Index')
  },
  {
    path: 'shoufu',
    component: () => import('@/pages/fujianlettory/shoufu'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'zhufu',
    component: () => import('@/pages/fujianlettory/zhufu')
  },
  {
    path: 'list',
    component: () => import('@/pages/fujianlettory/list'),
    meta: {
      authorization: true
    }
  }
  ]
},
{
  path: 'zhonghanglettory',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'Index',
    component: () => import('@/pages/zhonghanglettory/Index')
  }]
},
{
  path: 'hslettory',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'Index',
    component: () => import('@/pages/hslettory/Index')
  }]
},
{
  path: 'ZJyidong',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/ZJyidong/index'),
    meta: {
      skipLogin: true
    }
  },
  {
    path: 'rule',
    component: () => import('@/pages/ZJyidong/rule')
  }
  ]
},
{
  path: 'guangzhouETC',
  component: () => import('@/pages/guangzhouETC/index'),
  meta: {
    skipLogin: true
  }
},
{
  path: 'fjgridLettery',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/fjgridLettery/index')
  }
  ]
},
{
  path: 'fjgridLettery1',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/fjgridLettery1/index')
  }
  ]
},
{
  path: 'lklettory',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'Index',
    component: () => import('@/pages/lklettory/Index')
  }]
},
{
  path: 'ZJlettory',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'Index',
    component: () => import('@/pages/ZJlettory/Index')
  }]
},
{
  path: 'zhseckill',
  component: Main,
  children: [{
    path: 'Index',
    component: () => import('@/pages/zhseckill/index'),
    meta: {
      authorization: true
    }
  }]
},
{
  path: 'sichuanlettory',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'Index',
    component: () => import('@/pages/sichuanlettory/Index')
  },
  {
    path: 'order',
    component: () => import('@/pages/sichuanlettory/order')
  }
  ]
},
{
  path: 'foshanlettory',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'Index',
    component: () => import('@/pages/foshanlettory/Index'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'rule',
    component: () => import('@/pages/foshanlettory/rule')
  },
  {
    path: 'code',
    component: () => import('@/pages/foshanlettory/code')
  },
  {
    path: 'advert',
    component: () => import('@/pages/foshanlettory/advert')
  }
  ]
},
{
  path: 'chouhongbao',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'Index',
    component: () => import('@/pages/chouhongbao/Index')
  }]
},
{
  path: 'gdMothersDay',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'Index',
    component: () => import('@/pages/gdMothersDay/index')
  },
  {
    path: 'feature',
    component: () => import('@/pages/gdMothersDay/feature')
  }
  ]
},
{
  path: 'henanlettory',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'Index',
    component: () => import('@/pages/henanlettory/Index')
  }]
},
{
  path: 'guizhoulettory',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'Index',
    component: () => import('@/pages/guizhoulettory/Index')
  },
  {
    path: 'address',
    component: () => import('@/pages/guizhoulettory/address')
  },
  {
    path: 'prize',
    component: () => import('@/pages/guizhoulettory/prize')
  }
  ]
},
{
  path: 'cznhMothersDay',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/cznhMothersDay/index')
  },
  {
    path: 'diandeng',
    component: () => import('@/pages/cznhMothersDay/diandeng'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'zhulipool',
    component: () => import('@/pages/cznhMothersDay/zhulipool'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'quliangdeng',
    component: () => import('@/pages/cznhMothersDay/quliangdeng'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'rule',
    component: () => import('@/pages/cznhMothersDay/rule')
  }
  ]
},
{
  path: 'zhMothersDay',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/zhMothersDay/index')
    // meta: {
    //   authorization: true
    // }
  },
  {
    path: 'rule',
    component: () => import('@/pages/zhMothersDay/rule')
  },
  {
    path: 'prize',
    component: () => import('@/pages/zhMothersDay/prize')
  }
  ]
},
{
  path: 'shanghai520',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/shanghai520/index'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'qingshu/:type',
    component: () => import('@/pages/shanghai520/qingshu')
  }
  ]
},
{
  path: 'nhlettory',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'Index',
    component: () => import('@/pages/nhlettory/Index')
  }]
},
{
  path: 'whyiyuangou',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/whyiyuangou/index')
  }]
},
{
  path: 'jianhangDT',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/jianhangDT/index')
  },
  {
    path: 'liucheng',
    component: () => import('@/pages/jianhangDT/liucheng')
  }
  ]
},
{
  path: 'baguijin',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/baguijin/index')
  }]
},
{
  path: 'chaifudai',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'chaifudai',
    component: () => import('@/pages/chaifudai/chaifudai')
  }]
},
{
  path: 'yifenchou',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/yifenchou/index')
  },
  {
    path: 'fanpai',
    component: () => import('@/pages/yifenchou/fanpai')
  },
  {
    path: 'rule',
    component: () => import('@/pages/yifenchou/rule')
  }
  ]
},
{
  path: 'yifenchou4',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/yifenchou4/index')
  },
  {
    path: 'rule',
    component: () => import('@/pages/yifenchou4/rule')
  }
  ]
},
{
  path: 'yifenchou5',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/yifenchou5/index')
  },
  {
    path: 'rule',
    component: () => import('@/pages/yifenchou5/rule')
  }
  ]
},
{
  path: 'yifenchou6', // 父亲节周末一分赢好礼
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/yifenchou6/index')
  },
  {
    path: 'rule',
    component: () => import('@/pages/yifenchou6/rule')
  }
  ]
},
{
  path: 'yifenchou7',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/yifenchou7/index')
  },
  {
    path: 'rule',
    component: () => import('@/pages/yifenchou7/rule')
  }
  ]
},
{
  path: 'yifenchou2',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/yifenchou2/index')
  },
  {
    path: 'rule',
    component: () => import('@/pages/yifenchou2/rule')
  }
  ]
},
{
  path: 'yifenchou3',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'fanpai',
    component: () => import('@/pages/yifenchou3/fanpai')
  },
  {
    path: 'rule',
    component: () => import('@/pages/yifenchou3/rule')
  }
  ]
},
{
  path: 'baguiFanpai',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/baguiFanpai/index')
  },
  {
    path: 'fanpai',
    component: () => import('@/pages/baguiFanpai/fanpai')
  }
  ]
},
{
  path: 'address',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'list',
    component: () => import('@/pages/address/addressList')
  },
  {
    path: 'edit',
    component: () => import('@/pages/address/address')
  }
  ]
},
{
  path: 'qmshidai',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/qmshidai/index')
  },
  {
    path: 'goodsdetail/:rid/:actId',
    component: () => import('@/pages/qmshidai/goodsdetail')
  },
  {
    path: 'myorder',
    component: () => import('@/pages/qmshidai/order/Index')
  },
  {
    path: 'addressList',
    component: () => import('@/pages/qmshidai/addressList')
  },
  {
    path: 'address',
    component: () => import('@/pages/qmshidai/address')
  },
  {
    path: 'orderdetail/:orderCode',
    component: () => import('@/pages/qmshidai/orderdetail')
  }
  ]
},
{
  path: 'nvshenjie',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/nvshenjie/index')
  },
  {
    path: 'rule',
    component: () => import('@/pages/nvshenjie/rule')
  },
  {
    path: 'lihe/:actId',
    component: () => import('@/pages/nvshenjie/lihe')
  }
  ]
},
{
  path: 'yybao',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/yybao/index'),
    meta: {
      authorization: true
    }
  }]
},
{
  path: 'mtkingdom', // 萌童乐园
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/mtkingdom/index'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'details',
    component: () => import('@/pages/mtkingdom/details'),
    meta: {
      authorization: true
    }
  }
  ]
},
{
  path: 'hongbaoyu', // 宁波红包雨
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'home',
    component: () => import('@/pages/hongbaoyu/home')
  },
  {
    path: 'choujiang',
    component: () => import('@/pages/hongbaoyu/choujiang')
  }
  ]
},
{
  path: 'partner',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/partner/Index'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'acEntrance/:customId/:tel',
    component: () => import('@/pages/partner/acEntrance'),
    meta: {
      skipLogin: true
    }
  },
  {
    path: 'taskList',
    component: () => import('@/pages/partner/taskList'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'ShareQrcode/:customId/:tel',
    component: () => import('@/pages/partner/ShareQrcode')
  },
  {
    path: 'rule',
    component: () => import('@/pages/partner/rule')
  },
  {
    path: 'credit',
    component: () => import('@/pages/partner/credit')
  },
  {
    path: 'recommendDetail',
    component: () => import('@/pages/partner/recommendDetail')
  }
  ]
},
{
  path: 'carLife',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'washCar',
    component: () => import('@/pages/carLife/washCar')
  },
  {
    path: 'partner',
    component: () => import('@/pages/carLife/partner'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'keepcar',
    component: () => import('@/pages/carLife/keepcar'),
    meta: {
      authorization: true
    }
  }
  ]
},
{
  path: 'hjgd',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'oneYuangy',
    component: () => import('@/pages/index/IndexShare'),
    children: [{
      path: 'index',
      component: () => import('@/pages/hjgd/oneYuangy/index')
    },
    {
      path: 'rule',
      component: () => import('@/pages/hjgd/oneYuangy/rule')
    },
    {
      path: 'prize',
      component: () => import('@/pages/hjgd/oneYuangy/prize')
    }
    ]
  },
  {
    path: 'dapaiyouhui',
    component: () => import('@/pages/index/IndexShare'),
    children: [{
      path: 'index',
      component: () => import('@/pages/hjgd/dapaiyouhui/index')
    },
    {
      path: 'detail',
      component: () => import('@/pages/hjgd/dapaiyouhui/detail'),
      meta: {
        authorization: true
      }
    }
    ]
  },
  {
    path: 'youhuichuxing',
    component: () => import('@/pages/index/IndexShare'),
    children: [{
      path: 'index',
      component: () => import('@/pages/hjgd/youhuichuxing/index'),
      meta: {
        authorization: true
      }
    }
    ]
  }]
},
{
  path: 'hjgdCbb', // 广东建行
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'newcust',
    component: () => import('@/pages/hjgdCbb/newcust')
  },
  {
    path: 'fanpai',
    component: () => import('@/pages/fanpai001/Index')
  },
  {
    path: 'zicanshenji',
    component: () => import('@/pages/hjgdCbb/zicanshenji')
  },
  {
    path: 'ccbi',
    component: () => import('@/pages/hjgdCbb/ccbi')
  },
  {
    path: 'credit',
    component: () => import('@/pages/credit/creditGD')
  },
  {
    path: 'jifenSpMall',
    component: () => import('@/pages/credit/jifenSpMall')
  },
  {
    path: 'caihubang',
    component: () => import('@/pages/hjgdCbb/caihubang')
  },
  {
    path: 'my',
    component: () => import('@/pages/hjgdCbb/my')
  },
  {
    path: 'tiyanguan',
    component: () => import('@/pages/tiyanguan/main'),
    children: [{
      path: 'index',
      component: () => import('@/pages/tiyanguan/index')
    },
    {
      path: 'register',
      component: () => import('@/pages/tiyanguan/register')
    },
    {
      path: 'tiyan',
      component: () => import('@/pages/tiyanguan/tiyan')
    }
    ]
  }
  ]
},
{
  path: 'tiyanyouli',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/tiyanyouli/index')
  },
  {
    path: 'rule',
    component: () => import('@/pages/tiyanyouli/rule')
  },
  {
    path: 'youli',
    component: () => import('@/pages/tiyanyouli/youli')
  }
  ]
},
{
  path: 'daibanZSH', // 卡部代办油卡
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index/:actId',
    component: () => import('@/pages/daibanZSH/index'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'createOrder',
    component: () => import('@/pages/daibanZSH/createOrder'),
    meta: {
      authorization: true
    }
  }
  ]
},
{
  path: 'daxueshengDT', // 大学生答题
  component: () => import('@/pages/daxueshengDT/IndexLogin'),
  children: [{
    path: 'role',
    component: () => import('@/pages/daxueshengDT/role')
  },
  {
    path: 'register/:type',
    component: () => import('@/pages/daxueshengDT/register'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'questionstart/:type',
    component: () => import('@/pages/daxueshengDT/questionStart'),
    meta: {
      role: 'student'
    }
  },
  {
    path: 'scorequery/:type',
    component: () => import('@/pages/daxueshengDT/scoreQuery')
  },
  {
    path: 'question/:type',
    component: () => import('@/pages/daxueshengDT/question')
  },
  {
    path: 'prizeawards',
    component: () => import('@/pages/daxueshengDT/prizeAwards')
  },
  {
    path: 'prize',
    component: () => import('@/pages/daxueshengDT/prize')
  },
  {
    path: 'duihuan',
    component: () => import('@/pages/daxueshengDT/duihuan'),
    meta: {
      authorization: true
    }
  }
  ]
},
{
  path: 'luckyStar',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/luckyStarWap/Index')
  },
  // {
  //   path: 'actSelector',
  //   component: () => import('@/pages/luckyStarWap/actSelector')
  // },
  {
    path: 'actSelector',
    component: () => import('@/pages/luckyStarWap/actSelector')
  },
  {
    path: 'luckyIndex',
    component: () => import('@/pages/luckyStarWap/luckyIndex')
  },
  {
    path: 'role/:index',
    component: () => import('@/pages/luckyStarWap/role')
  },
  {
    path: 'rule',
    component: () => import('@/pages/luckyStarWap/rule')
  },
  {
    path: 'myBuff',
    component: () => import('@/pages/luckyStarWap/myBuff')
  },
  {
    path: 'ruleCcb',
    component: () => import('@/pages/luckyStarWap/ruleCcb')
  }
  ]
},
{
  path: 'sichongli',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/sichongli/index')
  }]
},
{
  path: 'luckyBoxH5',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/luckyBoxH5/Index')
  },
  {
    path: 'role/:index',
    component: () => import('@/pages/luckyBoxH5/role')
  },
  {
    path: 'rule',
    component: () => import('@/pages/luckyBoxH5/rule')
  },
  {
    path: 'myBuff',
    component: () => import('@/pages/luckyBoxH5/myBuff')
  },
  {
    path: 'ruleCcb',
    component: () => import('@/pages/luckyBoxH5/rule')
  }
  ]
},
{
  path: 'shenzhenBOC',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'prizeDetail/:actId',
    component: () => import('@/pages/act/chouhuawei/prizeDetail')
  },
  {
    path: 'rule',
    component: () => import('@/pages/act/chouhuawei/rule')
  },
  {
    path: 'guide',
    component: () => import('@/pages/act/chouhuawei/guide')
  }
  ]
},
{
  path: 'zajindan',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/zajindan/Index')
  }]
},
{
  path: 'ahzajindan',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/ahzajindan/index'),
    meta: {
      authorization: true
    }
  }]
},
{
  path: 'baGui',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'shanRong',
    component: () => import('@/pages/bagui/fupin')
  },
  {
    path: 'menPiao/:orderCode/:actId',
    component: () => import('@/pages/bagui/menpiao')
  },
  {
    path: 'festival',
    component: () => import('@/pages/bagui/festival')
  },
  {
    path: 'festival_rule',
    component: () => import('@/pages/bagui/festival_rule')
  },
  {
    path: 'activevity',
    component: () => import('@/pages/bagui/activevity')
  },
  {
    path: 'activevitylist',
    component: () => import('@/pages/bagui/activevitylist')
  },
  {
    path: 'wx_bind_card',
    component: () => import('@/pages/bagui/wxBindCard')
  },
  {
    path: 'scratch_card',
    component: () => import('@/pages/bagui/ScratchCard/index')
  },
  {
    path: 'baguijin_change',
    component: () => import('@/pages/bagui/ScratchCard/productList')
  }
  ]
},
{
  path: 'cardpackage',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'DrawAccounts',
    component: () => import('@/pages/cardpackage/DrawAccounts')
  }]
},
{
  path: 'login',
  component: () => import('@/pages/index/IndexLogin'),
  children: [{
    path: 'boclogin',
    component: () => import('@/pages/login/boc/Index')
  }]
},
{
  path: 'index',
  component: Main,
  children: [{
    path: '',
    component: () => import('@/pages/merchant/MerchantIndex')
  },
  {
    path: 'act/:actId',
    component: IndexAct
  },
  {
    path: 'actArea/:tpl',
    component: ActArea
  },
  {
    path: 'mine',
    meta: {
      authorization: true
    },
    component: IndexMine
  },
  {
    path: 'test',
    meta: {
      authorization: true
    },
    component: IndexTest
  },
  {
    path: 'service',
    component: IndexService
  },
  {
    path: 'coupons',
    meta: {
      authorization: true
    },
    component: () => import('@/pages/coupons/Index')
  },
  {
    path: 'credit',
    meta: {
      authorization: true
    },
    component: () => import('@/pages/credit/Index')
  },
  {
    path: 'order',
    meta: {
      authorization: true
    },
    component: () => import('@/pages/order/Index')
  },
  {
    path: 'prize',
    meta: {
      authorization: true
    },
    component: () => import('@/pages/prize/Index')
  },
  {
    path: 'cbbBuy001/:type/:rid',
    meta: {
      authorization: true
    },
    component: () => import('@/pages/buy/cbbBuy/Standard002')
  },
  {
    path: 'cbbBuy/:type/:rid',
    meta: {
      authorization: true
    },
    component: () => import('@/pages/buy/cbbBuy/Standard001')
  },
  {
    path: 'convert/:rid',
    meta: {
      authorization: true
    },
    component: () => import('@/pages/buy/convert/Index')
  },
  {
    path: 'convertCharge/:rid',
    meta: {
      authorization: true
    },
    component: () => import('@/pages/buy/convert/Charge')
  },
  {
    path: 'mintaikill',
    meta: {
      authorization: true
    },
    component: () => import('@/pages/mintai/index')
  }
  ]
},
{
  path: 'service',
  component: IndexService
},
{
  path: 'youchuHN',
  component: Main,
  children: [{
    path: 'payment',
    component: () => import('@/pages/youchuHN/payment')
  },
  {
    path: 'index',
    component: () => import('@/pages/youchuHN/index')
  },
  {
    path: 'recharge/:type',
    component: () => import('@/pages/youchuHN/recharge')
  }
  ]
},
{
  path: 'youchu',
  component: Main,
  children: [{
    path: 'address',
    component: () => import('@/pages/youchu/address'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'addressList',
    component: () => import('@/pages/youchu/addressList'),
    meta: {
      authorization: true
    }
  },
  {
    path: 'index',
    component: () => import('@/pages/youchu/Index')
  },
  {
    path: 'card/:rid/:actId',
    component: () => import('@/pages/youchu/card'),
    meta: {
      authorization: true
    }
  }
  ]
},
{
  path: 'actIndex',
  component: ActFront
},
{
  path: 'dispatcher',
  component: Dispatcher
},
{
  path: 'actArea/:tpl',
  component: ActArea
},
{
  path: 'prize',
  meta: {
    authorization: true
  },
  component: () => import('@/pages/prize/Index')
},
{
  path: 'act/:actId',
  component: ActIndex
},
{
  path: 'buy/:type/:rid',
  meta: {
    authorization: true
  },
  component: () => import('@/pages/buy/Index')
},
{
  path: 'creditBuy/:type/:rid/:actId',
  meta: {
    authorization: true
  },
  component: () => import('@/pages/buy/creditBuy')
},
{
  path: 'ccreditBuy1/:type/:rid/:actId',
  meta: {
    authorization: true
  },
  component: () => import('@/pages/buy/ccreditBuy1')
},
{
  path: 'ccreditBuy2/:type/:rid/:actId',
  meta: {
    authorization: true
  },
  component: () => import('@/pages/buy/ccreditBuy2')
},
{
  path: 'ETCCreditBuy/:type/:rid/:actId',
  meta: {
    authorization: true
  },
  component: () => import('@/pages/buy/ETCCreditBuy')
},
// {
//   path: 'newCreateOrder/:type/:rid',
//   meta: {
//     authorization: true
//   },
//   component: () => import('@/pages/buy/newCreateOrder')
// },
{
  path: 'newCreateOrder/:type/:rid',
  meta: {
    authorization: true
  },
  component: () => import('@/pages/buy/newCreateOrder')
},
{
  path: 'cbbBuy/:type/:rid',
  meta: {
    authorization: true
  },
  component: () => import('@/pages/buy/cbbBuy/Standard001')
},
{
  path: 'cbbBuy001/:type/:rid',
  meta: {
    authorization: true
  },
  component: () => import('@/pages/buy/cbbBuy/Standard002')
},
{
  path: 'paysuccess/:orderCode',
  meta: {
    authorization: true
  },
  component: () => import('@/pages/pay/PaySuccess')
},
{
  path: 'cardwin/:id',
  meta: {
    authorization: true
  },
  component: () => import('@/pages/interface/CardWin')
},
{
  path: 'cardwinpre/:id',
  meta: {
    authorization: true
  },
  component: () => import('@/pages/interface/CardWinPre')
},
{
  path: 'icbcquit',
  meta: {
    authorization: false
  },
  component: () => import('@/pages/pub/ICBCQuit')
},
{
  path: 'ccboil',
  meta: {
    authorization: false
  },
  component: () => import('@/pages/pub/CCBOil')
},
{
  path: 'ccbjump/:code',
  meta: {
    authorization: false
  },
  component: () => import('@/pages/pub/CCBjump')
},
{
  path: 'lego/:pageKey',
  meta: {
    authorization: false
  },
  component: () => import('@/pages/lego/Index')
},
{
  path: 'legopreview/:pageKey',
  meta: {
    authorization: false
  },
  component: () => import('@/pages/lego/Preview')
},
{
  path: 'goddess',
  component: () => import('@/pages/goddess/root'),
  children: [{
    path: 'index',
    component: () => import('@/pages/goddess/index')
  },
  {
    path: 'regist',
    meta: {
      authorization: false
    },
    component: () => import('@/pages/goddess/regist')
  },
  {
    path: 'games',
    meta: {
      authorization: false
    },
    component: () => import('@/pages/goddess/games')
  },
  {
    path: 'analyze',
    meta: {
      authorization: false
    },
    component: () => import('@/pages/goddess/analyze')
  },
  {
    path: 'result',
    meta: {
      authorization: false
    },
    component: () => import('@/pages/goddess/result')
  },
  {
    path: 'feature',
    meta: {
      authorization: true
    },
    component: () => import('@/pages/goddess/feature')
  },
  {
    path: 'card',
    meta: {
      authorization: false
    },
    component: () => import('@/pages/goddess/card')
  },
  {
    path: 'reward',
    meta: {
      authorization: false
    },
    component: () => import('@/pages/goddess/reward')
  }
  ]
},
{
  path: 'fruitkill',
  meta: {
    authorization: false
  },
  component: () => import('@/pages/fruitkill/index')
},
{
  path: 'motherDay',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'index',
    component: () => import('@/pages/motherDay/index')
  },
  {
    path: 'answerQuestion',
    component: () => import('@/pages/motherDay/answerQuestion')
  }
  ]
},
{
  path: 'zhxsjx', // 薪上加薪 hd
  component: () => import('@/pages/zhxsjx/Index'),
  meta: {
    authorization: true
  }
},
{
  path: 'jianhang38',
  component: () => import('@/pages/jianhang38/root'),
  children: [{
    path: 'index',
    component: () => import('@/pages/jianhang38/index'),
    meta: {
      authorization: false
    }
  },
  {
    path: 'takephoto',
    meta: {
      authorization: false
    },
    component: () => import('@/pages/jianhang38/takephoto')
  },
  {
    path: 'result',
    meta: {
      authorization: false
    },
    component: () => import('@/pages/jianhang38/result')
  },
  {
    path: 'scanning',
    meta: {
      authorization: false
    },
    component: () => import('@/pages/jianhang38/scanning')
  }
  ]
},
{
  path: 'rylXianFeng',
  component: () => import('@/pages/rylXianFeng/Index')
},
{
  path: 'houseHome',
  component: () => import('@/pages/formFront/houseHome'),
  meta: {
    authorization: true
  }
},
{ /* etc */
  path: 'etcMall/:actId',
  component: () => import('@/pages/etcMall/index'),
  meta: {
    title: '兑换专区'
  }
},
{ /* etc */
  path: 'etcMall1/:actId',
  component: () => import('@/pages/etcMall1/index'),
  meta: {
    title: '中国银行四川分行ETC新客奖励兑换'
  }
},
{ // 广州积分商户答一答
  path: 'dayida',
  component: () => import('@/pages/guangzhouCCB/index'),
  meta: {
    title: '答一答'
  }
},
{ // 深圳中行合伙人
  path: 'bocsz',
  component: () => import('@/pages/index/IndexShare'),
  meta: {
    authorization: true
  },
  children: [{
    path: 'credit',
    component: () => import('@/pages/credit/creditSZ')
  }, {
    path: 'szbocdeta/:id',
    component: () => import('@/pages/szboc/Index')
  }]
},
{ // 吉林建行
  path: 'cbbJilin',
  component: () => import('@/pages/cbbJilin/root'),
  children: [
    {
      path: 'qiandao',
      component: () => import('@/pages/cbbJilin/qiandao/Index'),
      meta: {
        title: '签到',
        authorization: true
      }
    }
  ]
},
{// 苏式生活新户首刷礼
  path: 'goodsDetail',
  component: () => import('@/pages/cbbsuzhou/goodsDetail'),
  meta: {
    title: '商品详情'
  }
},
{
  path: 'cbbsuzhou',
  component: () => import('@/pages/cbbsuzhou/root'),
  children: [
    {
      path: 'livePay',
      component: () => import('@/pages/cbbsuzhou/livePay'),
      meta: {
        title: '生活缴费'
      }
    },
    {
      path: 'taskList',
      component: () => import('@/pages/cbbsuzhou/taskList'),
      meta: {
        title: '新客任务中心',
        authorization: true
      }
    },
    {
      path: 'fineFood/:actId',
      component: () => import('@/pages/cbbsuzhou/fineFood'),
      meta: {
        title: '饭票美食',
        authorization: true
      }
    },
    {
      path: 'suzhouTips/:id',
      component: () => import('@/pages/cbbsuzhou/suzhouTips'),
      meta: {
        title: '苏式小贴士'
      }
    },
    {
      path: 'recharge',
      component: () => import('@/pages/cbbsuzhou/recharge'),
      meta: {
        title: '娱乐充值'
      }
    }
  ]
},
{// loanCalc
  path: 'loanCalc',
  component: () => import('@/pages/cbbsuzhou/loanCalc'),
  meta: {
    title: '贷款计算器'
  }
},
{ // 宁波兴业银行
  path: 'ningboCIB',
  component: Main,
  children: [{
    path: 'index',
    component: () => import('@/pages/ningboCIB/index')
  }]
},
{ // 安徽中行
  path: 'anhui_boc',
  component: () => import('@/pages/index/IndexShare'),
  children: [{
    path: 'tennis', // 网球
    component: () => import('@/pages/AnhuiBOC/tennis/index')
  },
  {
    path: 'dafangjia', // 大放价
    component: () => import('@/pages/AnhuiBOC/dafangjia/index')
  },
  {
    path: 'rotateLottery', // 安徽中行大转盘
    component: () => import('@/pages/AnhuiBOC/rotateLottery/Index')
  },
  {
    path: 'hfOneyuanbuy',
    component: () => import('@/pages/index/IndexShare'),
    children: [{
      path: 'index',
      component: () => import('@/pages/AnhuiBOC/hfOneyuanbuy/index'),
      meta: {
        authorization: false
      }
    }]
  }]
},
{
  path: 'wenzhou_boc',
  component: Main,
  children: [{
    path: 'huafeigou',
    component: () => import('@/pages/WenzhouBOC/huafeigou/index')
  }]
},
{
  path: 'szzhzjd', // 砸蛋页
  component: () => import('@/pages/szzhzjd/index'),
  meta: {
    title: '深圳中行砸金蛋'
  }
},
{
  path: 'homeSzzhzjd', // 砸金蛋首页
  component: () => import('@/pages/szzhzjd/home'),
  meta: {
    title: '深圳中行砸金蛋'
  }
},
{
  path: 'orderSzzhzjd', // 奖品页
  component: () => import('@/pages/szzhzjd/order'),
  meta: {
    title: '深圳中行砸金蛋'
  }
},
{
  path: 'cznhqx', // 常州农行七夕
  component: () => import('@/pages/cznhqx/index'),
  meta: {
    title: '常州农行七夕'
  }
}
];

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: import('@/pages/error/404')
  },
  {
    path: '/:merchantAppid/merchant',
    component: MerchantIndex,
    meta: {
      authorization: false
    },
    children: routes
  }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

router.beforeEach(async (to, from, next) => {
  nprogress.start();
  if (to.params.merchantAppid) {
    if (!store.state.merchantConfig) {
      await getMerchantConfig(to.params.merchantAppid, to);
      console.log(getToken(to.params.merchantAppid + '_token'));
      let custName = to.params.merchantAppid + '_cust';

      if (
        store.state.payload.authType == 0 ||
        store.state.payload.authType == 5
      ) {
        let localToken = getToken(to.params.merchantAppid + '_token');
        if (localToken) {
          store.commit('setToken', localToken);
          let cust =
            localStorage.getItem(custName) ||
            localStorage.getItem(store.state.merchantId + '_cust');
          if (cust) {
            store.commit('setCust', JSON.parse(cust));
          }
        }
      } else {
        let localToken =
          sessionStorage.getItem(to.params.merchantAppid + '_token') ||
          getToken(to.params.merchantAppid + '_token');
        if (localToken) {
          store.commit('setToken', localToken);
          let cust =
            sessionStorage.getItem(custName) ||
            localStorage.getItem(custName) ||
            localStorage.getItem(store.state.merchantId + '_cust');
          if (cust) {
            store.commit('setCust', JSON.parse(cust));
          }
        }
      }
    }
  }

  let code = to.query.code;
  let checkedcode = localStorage.getItem('checkedcode' + code);
  if (code && !checkedcode) {
    await getJwtByCode(code);
  }

  let token = store.state.token;
  if (to.meta && to.meta.title) {
    document.title = to.meta.title;
  }
  // 如果页面需要登录, 且状态为未登录,跳转到用户系统登录
  if (to.meta && to.meta.authorization && !token) {
    if (token) {
      next();
      return;
    }
    if (window.location.hash == '#shared') {
      gotoAuth(
        window.location.protocol +
        '//' +
        window.location.host +
        to.path +
        '#shared'
      );
    } else {
      gotoAuth(
        window.location.protocol + '//' + window.location.host + to.fullPath
      );
    }
    return;
  }
  if (to.meta && to.meta.skipLogin && !token) {
    if (token) {
      next();
      return;
    }
    gotoAuth(
      window.location.protocol + '//' + window.location.host + to.fullPath,
      '1'
    );
    return;
  }
  store.commit('setTabbarShow', true);
  let actId = to.params.actId ? to.params.actId : null;
  signPvUv(actId);
  next();
});

router.afterEach((to, from, next) => {
  nprogress.done();
});

// 跳转授权
export function gotoAuth (targetUrl, skipLogin) {
  let merchantId = store.state.merchantId;
  let thisUrl = targetUrl || window.location.href;
  thisUrl = encodeURIComponent(
    thisUrl.replace(/&code=[^&]*/g, '').replace(/\?code=[^&]*&?/g, '?')
  );
  let url = skipLogin
    ? oAuthUrl +
    `?merchantId=${merchantId}&skipLogin=${skipLogin}&callbackUrl=${thisUrl}`
    : oAuthUrl + `?merchantId=${merchantId}&callbackUrl=${thisUrl}`;
  window.location.replace(url);
}
// 注册pv&uv
function signPvUv (actId) {
  let url = window.location.href
    .replace(window.location.hash, '')
    .replace(window.location.search, '');
  request.post('api/view/info', {
    url: url,
    actId: actId
  });
}
// 根据code 获取jwt和用户信息
async function getJwtByCode (code) {
  Indicator.open();
  let tokenName = store.state.merchantAppid + '_token';
  let custName = store.state.merchantAppid + '_cust';
  let rs = await request.get('api/getTokenByCode?code=' + code);
  if (rs.status === 200) {
    let back = rs.payload;
    sessionStorage.setItem(tokenName, back.jwt);
    sessionStorage.setItem(custName, JSON.stringify(back.cust));
    localStorage.setItem(tokenName, back.jwt);
    localStorage.setItem(custName, JSON.stringify(back.cust));
    store.commit('setToken', back.jwt);
    store.commit('setCust', back.cust);
  } else {
    if (rs.status != 300) {
      Toast(rs.error);
    }
  }
  localStorage.setItem('checkedcode' + code, '1');
  Indicator.close();
}

// 获取商户配置
async function getMerchantConfig (merchantAppid, to) {
  Indicator.open();
  let rs = await request.get('api/get_merchant_config/' + merchantAppid);
  if (rs.status === 200) {
    let payload = rs.payload;
    if (navigator.userAgent.indexOf('MicroMessenger') > 0) {
      payload.authType = 1;
    }
    store.commit('setMerchantId', payload.merchantId);
    store.commit('setMerchant', payload);
  } else if (rs.status == 500) {
    Toast('网络异常');
  } else {
    Toast('获取商户信息失败:' + rs.error + ',to:' + window.location.href);
  }
  Indicator.close();
}
export default router;

export default {
  install: function (Vue, options) {
    Vue.component('train', () => import('@/pages/act/train/Index'));
    Vue.component('template001', () => import('@/pages/act/template001/Index'));
    Vue.component('couponSale', () => import('@/pages/act/couponSale/Index'));
    Vue.component('couponList', () => import('@/pages/act/couponList/Index'));
    Vue.component('couponSale001', () =>
      import('@/pages/act/couponSale001/Index')
    );
    Vue.component('couponSale003', () =>
      import('@/pages/act/couponSale003/Index')
    );
    Vue.component('couponSale002', () =>
      import('@/pages/act/couponSale002/Index')
    );
    Vue.component('nbFanPai', () => import('@/pages/act/nbFanPai/Index'));
    Vue.component('saleTpl001', () => import('@/pages/act/saleTpl001/Index'));
    Vue.component('gridLettery001', () =>
      import('@/pages/act/gridLettery001/Index')
    );
    Vue.component('gridLettery002', () =>
      import('@/pages/act/gridLettery002/Index')
    );
    Vue.component('gridLettery003', () =>
      import('@/pages/act/gridLettery003/Index')
    );
    /* 安徽中行三只松鼠一期 */
    Vue.component('gridLettery004', () =>
      import('@/pages/act/gridLettery005/Index')
    );
    /* 安徽中行三只松鼠二期 */
    Vue.component('gridLettery005', () =>
      import('@/pages/act/gridLettery004/Index')
    );
    /* 常州农行 */
    Vue.component('gridLettery006', () =>
      import('@/pages/act/gridLettery006/Index')
    );
    /* 广州幸运九宫格 */
    Vue.component('gridLettery007', () =>
      import('@/pages/act/gridLettery007/Index')
    );
    /* 吉林建行九宫格 */
    Vue.component('gridLettery008', () =>
      import('@/pages/act/gridLettery008/Index')
    );
    Vue.component('ticket001', () => import('@/pages/act/ticket001/Index'));
    Vue.component('ticket002', () => import('@/pages/act/ticket002/Index'));
    Vue.component('ticket003', () => import('@/pages/act/ticket003/Index'));
    Vue.component('vipAct001', () => import('@/pages/act/vipAct001/Index'));
    Vue.component('youshengyouse', () =>
      import('@/pages/act/youshengyouse/Index')
    );
    Vue.component('lettery006', () => import('@/pages/act/lettery006/Index'));
    Vue.component('lettery005', () => import('@/pages/act/lettery005/Index'));
    Vue.component('lettery004', () => import('@/pages/act/lettery004/Index'));
    Vue.component('lottery002', () => import('@/pages/act/lottery002/Index'));
    Vue.component('lottery001', () => import('@/pages/act/lottery001/Index'));
    Vue.component('lottery003', () => import('@/pages/act/lottery003/Index'));
    Vue.component('seckill001', () => import('@/pages/act/seckill001/Index'));
    Vue.component('shareCoupon', () => import('@/pages/act/shareCoupon/Index'));
    Vue.component('seckill002', () => import('@/pages/act/seckill002/Index'));
    Vue.component('seckill003', () => import('@/pages/act/seckill003/Index'));
    Vue.component('seckill004', () => import('@/pages/act/seckill004/Index'));
    Vue.component('seckill005', () => import('@/pages/act/seckill005/Index'));
    Vue.component('seckill006', () => import('@/pages/act/seckill006/Index'));
    Vue.component('seckill007', () => import('@/pages/act/seckill007/Index'));
    Vue.component('seckillGX', () => import('@/pages/act/seckillGX/Index'));
    Vue.component('seckillCCBhn', () => import('@/pages/act/seckillCCBhn/Index'));
    Vue.component('creditMall', () => import('@/pages/act/creditMall/Index'));
    Vue.component('hemiAnswer', () => import('@/pages/act/hemiAnswer/Index'));
    Vue.component('jianmianli', () => import('@/pages/act/jianmianli/Index'));
    Vue.component('hemiSign', () => import('@/pages/act/hemiSign/index'));
    Vue.component('hemiSign001', () => import('@/pages/act/hemiSign001/Index'));
    Vue.component('hemiSign002', () => import('@/pages/act/hemiSign002/Index'));
    Vue.component('hemiSign003', () => import('@/pages/act/hemiSign003/Index'));
    Vue.component('hemiSign004', () => import('@/pages/act/hemiSign004/Index'));
    Vue.component('hzghrylLottery', () =>
      import('@/pages/act/hzghrylLottery/Index')
    );
    Vue.component('yiyuanhuidache', () =>
      import('@/pages/act/yiyuanhuidache/Index')
    );
    Vue.component('zxglSale', () => import('@/pages/act/zxglSale/Index'));
    Vue.component('huaFeiStandard', () =>
      import('@/pages/act/huaFeiStandard/Index')
    );
    Vue.component('icbcCharger', () => import('@/pages/act/icbcCharger/Index'));
    Vue.component('couponAct', () => import('@/pages/act/couponAct/Index'));
    Vue.component('birthdayGift', () =>
      import('@/pages/act/birthdayGift/Index')
    );
    Vue.component('receiveHuaFei', () =>
      import('@/pages/act/receiveHuaFei/Index')
    );
    Vue.component('chargeStandard', () =>
      import('@/pages/act/chargeStandard/Index')
    );
    Vue.component('oilCardStandard', () =>
      import('@/pages/act/oilCardStandard/Index')
    );
    Vue.component('jiuzheyouka', () => import('@/pages/act/jiuzheyouka/Index'));
    Vue.component('couponBuy', () => import('@/pages/act/couponBuy/Index'));
    Vue.component('creditExchange', () =>
      import('@/pages/act/creditExchange/Index')
    );
    Vue.component('receiveCoupon', () =>
      import('@/pages/act/receiveCoupon/Index')
    );
    Vue.component('tianMallQuan', () =>
      import('@/pages/act/tianMallQuan/Index')
    );
    Vue.component('ghfly', () => import('@/pages/act/ghfly/Index'));
    Vue.component('ghfly001', () => import('@/pages/act/ghfly001/Index'));
    Vue.component('luckyStar', () => import('@/pages/act/luckyStar/Index'));
    Vue.component('goddess', () => import('@/pages/act/goddess/Index'));
    Vue.component('enjoyRecharge', () =>
      import('@/pages/act/enjoyRecharge/index')
    );
    Vue.component('cheapRecharge', () =>
      import('@/pages/act/cheapRecharge/index')
    );
    Vue.component('luckyBox', () => import('@/pages/act/luckyBox/Index'));
    Vue.component('duihuanquan', () => import('@/pages/act/duihuanquan/Index'));
    Vue.component('bangkafanxian', () =>
      import('@/pages/act/bangkafanxian/Index')
    );
    Vue.component('LegoPage', () => import('@/pages/act/LegoPage/Index'));
    Vue.component('LegoPageLettery', () =>
      import('@/pages/act/LegoPage/Index')
    );
    Vue.component('OutsideLink', () => import('@/pages/act/OutsideLink/Index'));
    Vue.component('nonghangtehui', () =>
      import('@/pages/act/nonghangtehui/Index')
    );
    Vue.component('hjfjBoc', () => import('@/pages/act/hjfjBoc/Index'));
    Vue.component('fudai', () => import('@/pages/act/gzCBB/Index'));
    Vue.component('wenzhouBocYyg', () =>
      import('@/pages/act/wenzhouBocYyg/Index')
    );
    Vue.component('wenzhouBocYyg001', () =>
      import('@/pages/act/wenzhouBocYyg001/Index')
    );
    Vue.component('wenzhouBocYyg002', () =>
      import('@/pages/act/wenzhouBocYyg002/Index')
    );
    Vue.component('WrapperedPwd', () =>
      import('@/pages/act/WrapperedPwd/Index')
    );
    Vue.component('chouhuawei', () => import('@/pages/act/chouhuawei/Index'));
    Vue.component('xichequan', () => import('@/pages/act/xichequan/Index'));
    Vue.component('daiJiaSale', () => import('@/pages/act/daiJiaSale/Index'));
    Vue.component('huafeiJQ', () => import('@/pages/act/huafeiJQ/Index'));
    Vue.component('couponCharge', () =>
      import('@/pages/act/couponCharge/Index')
    );
    Vue.component('whyiyuangou', () => import('@/pages/act/whyiyuangou/index'));
    Vue.component('bankcardAct', () => import('@/pages/act/bankcardAct/index'));
    Vue.component('shaizi', () => import('@/pages/act/shaizi/qiandaoShaizi'));
    Vue.component('szzhqd', () => import('@/pages/act/szzhqd001/Index'));
    Vue.component('czzq', () => import('@/pages/act/czzq/Index'));
    /* 配置后台场景生成模版 */
    Vue.component('CanvasLettory', () =>
      import('@/pages/act/visual/CanvasLettory/Index')
    );
    Vue.component('CanvasLettory001', () =>
      import('@/pages/act/visual/CanvasLettory001/Index')
    );
    Vue.component('GridLettory', () =>
      import('@/pages/act/visual/GridLettory/Index')
    );
    Vue.component('sale001', () =>
      import('@/pages/act/visual/sale001/Index')
    );
    Vue.component('sale002', () =>
      import('@/pages/act/visual/sale002/index')
    );
    Vue.component('sale003', () =>
      import('@/pages/act/visual/sale003/Index')
    );
    Vue.component('sale004', () =>
      import('@/pages/act/visual/sale004/Index')
    );
    Vue.component('saleMJ', () =>
      import('@/pages/act/visual/saleMJ/Index')
    );
    Vue.component('sign001', () =>
      import('@/pages/act/visual/sign001/Index')
    );
  }
};

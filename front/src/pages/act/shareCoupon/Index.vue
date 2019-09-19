<template>
  <div>
    <cbbHeader title="分享领券"></cbbHeader>
    <div class="seckill">
      <div class="share-right" v-if="showShare" @click="ccbShare">分享</div>
      <div class="rule-left" @click="openRule = true"></div>
      <div class="wrapper">
        <div class="receive-coupon">
          <div class="standard-list">
            <div v-for="(act, index) in actGroup" :key="'act'+index">
              <div v-for="(product,ind) in act.productList" :key="'product_'+ind">
                <div class="standard-item" v-for="(standard,ind2) in product.standardList" :key="ind+'_standard_'+ind2">
                  <!-- <div class="price"><b>{{standard.currentPrice}}</b>元</div> -->
                  <!-- <div class="name">{{standard.standardName}}</div> -->
                  <div v-if="index==0" class="proName"><img src="./img/IMG_BG_10.png" alt=""></div>
                  <div v-else class="proName"><img src="./img/IMG_BG_YHDLB.png" alt=""></div>

                  <!-- <div class="desc" v-if="index==1">
                    （礼包含3张优惠券）<br />分享页面可领
                  </div> -->
                  <div class="btn" @click="createOrder(standard.id, act.actId)"><img src="./img/BTN_DJLQ.png" alt=""></div>
                </div>
              </div>
            </div>
          </div>
          <p>优惠券数量有限，先到先得，每人只有一次领取机会</p>
          <!-- <p v-html="act.detail"></p> -->
        </div>

        <div class="seckill-container">
          <div class="title"></div>
          <div class="seckill-wrapper">
            <div class="linkPlate" v-for="(product,indexPro) in act.productList" :key="'pro_'+indexPro">
              <div class="pro-type">
                <img v-if="indexPro==0" src="./img/hf-title.png" alt="">
                <img v-else-if="indexPro==1" src="./img/spTitle.png" alt="">
                <img v-else src="./img/yk-title.png" alt="">
              </div>
              <div class="plate-item" v-for="std in product.standardList" :key="'std_'+std.id">
                <div class="plate-info">
                  <div class="item-img">
                    <img :src="std.standardImgUrl" />
                  </div>
                  <div class="item-detail">
                    <div class="proName">{{std.standardName}}
                    </div>
                    <div class="expire">
                      <div class="currentPrice">
                        ￥<b>{{std.currentPrice}}</b> 元
                      </div>

                    </div>
                  </div>
                  <div class="btn" @click="buy(std, act.actId)">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="ad">
            <a :href="templateConfig.bannerUrl"> <img class="banner-img" :src="templateConfig.banner" alt=""></a>
          </div>
        </div>
      </div>

      <div class="dialog" v-if="openRule">
        <div class="main">
          <div class="close">
            <img src="./img/close.png" alt="" @click="openRule = false">
            <div class="line"></div>
          </div>
          <div class="title">
          </div>
          <div class="article">
            <p><span>1.</span>该活动仅限广州地区客户专享，活动期间，每个客户只有一次参与机会，活动截止时间2018年12月25日。</p>
            <p><span>2.</span>优惠券数量有限，领取后1周内有效。</p>
            <p><span>3.</span>优惠券仅可在购买专区中产品时使用，一笔订单仅可使用一张优惠券，点击购买可直接点选使用对应优惠券，优惠券可在“我的”→“我的卡包”中查看。</p>
            <p><span>4.</span>进入活动页面，可以直接领取通用优惠券10元(数量有限，先到先得)；点击右上角分享，分享该页面至微信群或朋友圈，可领取专享优惠券大礼包（包括9折通用券3张）。</p>
            <p><span>5.</span>领券使用中出现疑问可拨打客服电话：400-9626962。</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import { payUrl } from '@/config/';
import jssdk from '@/lib/jssdk';
import cbbHeader from '@/components/cbbHeader';
export default {
  components: {
    cbbHeader
  },
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      showShare: window.location.href.indexOf('shared') < 0,
      orderList: [],
      // actArr: [191, 192],
      actArr: [186, 184],
      actGroup: [],
      merchantId: this.$store.state.merchantId,
      actGifts: [],
      actSale: [],
      orderAct: [],
      shareConfig: {},
      payUrl,
      templateConfig: JSON.parse(this.act.templateConfig),
      openRule: false
    };
  },
  methods: {
    executeCallIframe (url) {
      // 构造调用客户端分享功能的请求
      let iframe = null;
      if (iframe == null) {
        iframe = document.createElement('IFRAME');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }
      iframe.setAttribute('src', url);
    },
    makeParas (dict) {
      // 构造URL请求参数字符串
      var para = '';
      for (var key in dict) {
        if (key != 'scheme' && key != 'operation') {
          para = para + key + '=' + dict[key] + '&';
        }
      }
      para = para.substr(0, para.length - 1);
      return para;
    },
    initWXShare () {
      Indicator.open();
      this.$store.commit('setIsReady', false);
      let link = window.location.href.replace(window.location.search, '');
      let _this = this;
      this.shareConfig = {
        title: '分享领券 畅享壕礼', // 分享标题
        desc: '星巴克券、必胜客券、话费卡、加油卡等你来拿～', // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:
          'http://static.lianhaikeji.com/images/20181109/a6ad62e4019d4b8ea12a04a5cabc4a65.jpg',
        success: function () {
          _this.getChance();
        }
      };
      jssdk.jssdk.init('', this.merchantId, '1', val => {
        this.$jssdk.call('share', this.shareConfig);
        Indicator.close();
      });
    },
    ccbShare () {
      window.location.hash = 'shared';
      var url = window.location.href.replace(window.location.search, '');
      var dict = [];
      dict['scheme'] = 'ccbwebapi';
      dict['operation'] = 'webshare';
      dict['title'] = '分享领券 畅享壕礼';
      dict['description'] = '星巴克券、必胜客券、话费卡、加油卡等你来拿～';
      dict['url'] = encodeURIComponent(url);
      dict['imageurl'] =
        'http://static.lianhaikeji.com/images/20181109/a6ad62e4019d4b8ea12a04a5cabc4a65.jpg';
      this.callNative(dict);
      this.getChance();
    },
    callNative (dict) {
      var para = this.makeParas(dict);
      this.executeCallIframe(
        dict['scheme'] + '://' + dict['operation'] + '?' + para
      );
    },
    async getChance () {
      let rs = await this.$post('api/add/user/record', {
        actId: 184
      });
      if (rs.status == 200) {
        // Toast('您已获得优惠大礼包领取资格哦！')
      } else {
        Toast(rs.error);
      }
    },
    buy (standard, actId) {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/cbbBuy001/standard/${
          standard.id
        }?actId=${actId}`
      );
    },
    async createOrder (standardId, actId) {
      let rs = await this.$post('api/create/coupon/order', {
        actId: actId,
        standardId: standardId,
        commodityNum: 1
      });
      if (rs.status === 200) {
        Toast('领取成功');
      } else {
        Toast(rs.error);
      }
    },
    async loadAct (actId, list) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        list.push(rs.payload);
      } else {
      }
      return true;
    },
    async loadActAll () {
      let i = 0;
      let arr = this.actArr;
      for (; i < arr.length;) {
        await this.loadAct(arr[i], this.actGroup);
        i++;
      }
    }
  },
  created () {
    this.loadActAll();
  },
  mounted () {
    if (navigator.userAgent.indexOf('MicroMessenger') > 0) {
      this.initWXShare();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.seckill {
  overflow-y: scroll;
  background: #4d1cda url(./img/bg.jpg) no-repeat;
  background-size: 100% auto;
  .share-right {
    position: absolute;
    top: 1.2rem;
    right: 0;
    width: 1.4rem;
    height: 0.6rem;
    line-height: 0.6rem;
    background: #09b6f2;
    font-weight: bold;
    font-size: 0.32rem;
    color: #fff;
    text-align: center;
    border-radius: 0.3rem 0 0 0.3rem;
  }
  .rule-left {
    width: 2.14rem;
    height: 0.62rem;
    margin-top: 3.5rem;
    background: url(./img/button-rule.png) no-repeat;
    background-size: 100% 100%;
    background-position-x: -0.3rem;
  }
  .wrapper {
    margin: 0 0.26rem;
  }
  .receive-coupon {
    width: 6.97rem;
    margin: 0 auto 0.5rem;
    text-align: center;
    p {
      position: relative;
      bottom: 1rem;
      font-size: 0.24rem;
      color: #fff;
      line-height: 0.38rem;
    }
    .standard-list {
      display: flex;
      height: 4.88rem;
      max-width: 6.97rem;
      justify-content: space-between;
      padding: 1.32rem 0.38rem 0;
      background: url(./img/coupon-box.png) no-repeat;
      background-size: 100% 100%;
      div {
        flex: 1;
      }
      .standard-item {
        flex: 1;
        display: flex;
        max-height: 4rem;
        flex-direction: column;
        max-width: 3.08rem;
        padding: 0.16rem 0 0;
        font-size: 0;
        .price {
          font-size: 0.22rem;
          b {
            font-size: 0.48rem;
          }
        }
        .proName {
          img {
            width: 100%;
          }
        }
        .name {
          width: 2.66rem;
          max-height: 1rem;
          line-height: 1rem;
          font-size: 0.44rem;
          background: #f94682;
          color: #fff;
          border-radius: 0.26rem;
          font-weight: bold;
        }
        .desc {
          color: #fff884;
          font-size: 0.24rem;
          line-height: 0.36rem;
        }
        .btn {
          text-align: center;
          img {
            width: 100%;
          }
        }
      }
    }
  }
  .seckill-container {
    width: 100%;
    padding-bottom: 0.24rem;

    .title {
      height: 1.32rem;
      background: url(./img/buy-title.png) no-repeat;
      background-size: 100% 100%;
      color: #fff;
      font-size: 0.28rem;
      text-align: center;
      font-weight: 700;
    }
    .seckill-wrapper {
      position: relative;
      bottom: 0.05rem;
      background: #a449f8;
      padding-bottom: 0.34rem;
      padding-top: 0.18rem;
      border-radius: 0 0 0.2rem 0.2rem;
      .linkPlate {
        padding: 0 0.24rem;
        .pro-type {
          text-align: center;
          margin-bottom: 0.32rem;
          font-size: 0;
          img {
            width: 2.58rem;
          }
        }
        /* .pro-type {
          display: flex;
          height: 0.52rem;
          justify-content: center;
          margin-bottom: 0.3rem;
          .txt {
            margin: 0 0.3rem;
            color: #fff03a;
            font-size: 0.44rem;
          }
          .ic {
            width: 0.52rem;
            height: 0.52rem;
            background: url(./img/icon-left.png) no-repeat;
            background-size: 100% 100%;
            &:last-child {
              background: url(./img/icon-right.png) no-repeat;
              background-size: 100% 100%;
            }
          }
        } */
        .item-title {
          height: 1.2rem;
          display: flex;
          align-items: center;
          div {
            img {
              width: 0.4rem;
              margin-right: 0.2rem;
            }
          }
        }
        .plate-item {
          .plate-info {
            display: flex;
            height: 1.82rem;
            align-items: center;
            background: url(./img/item-bg.png) no-repeat;
            background-size: 100% 100%;
            margin-bottom: 0.18rem;
            .item-img {
              flex: 1;
              font-size: 0;
              padding-bottom: 0.2rem;
              img {
                width: 1.38rem;
                margin: 0 0.3rem 0 0.38rem;
              }
            }
            .item-detail {
              flex: 2;
              .proName {
                font-size: 0.4rem;
                color: rgb(51, 51, 51);
              }
              .proDesc {
                text-decoration: line-through;
                color: #ffa8a8;
                font-size: 0.28rem;
                line-height: 0.5rem;
              }
              .expire {
                display: flex;
                align-items: center;
                font-size: 0.24rem;
                color: #fff;
                .currentPrice {
                  flex: 1;
                  color: rgb(247, 37, 54);
                  font-size: 0.32rem;
                  margin-top: 0.1rem;
                  b {
                    font-size: 0.52rem;
                    font-weight: normal;
                  }
                }
              }
            }
            .btn {
              width: 1.29rem;
              height: 1.7rem;
              margin-top: -0.1rem;
              font-size: 0.28rem;
              background: url(./img/buy-btn.png) no-repeat;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
}
.gray-btn {
  filter: grayscale(100%);
}
.dialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  .main {
    position: relative;
    width: 5.64rem;
    position: absolute;
    height: 5rem;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    font-size: 0.28rem;
    line-height: 0.4rem;
    box-sizing: border-box;
    .close {
      position: absolute;
      width: 0.68rem;
      height: 0.68rem;
      top: -1.36rem;
      right: 0.34rem;
      font-size: 0;
      line-height: 1;
      z-index: -1;
      .line {
        height: 0.7rem;
        border-left: 1px solid #fff;
        margin-left: 0.34rem;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      width: 5.64rem;
      height: 0.95rem;
      background: url(./img/rule-title.png) no-repeat;
      background-size: 100% 100%;
    }
    .article {
      background: #fff;
      padding: 0.3rem 0.2rem 0;
      height: 5rem;
      overflow: scroll;
      color: #666;
      line-height: 0.5rem;
      overflow-y: scroll;
      border-radius: 0 0 0.2rem 0.2rem;
      strong {
        font-style: normal;
        color: #e4545e;
      }
      p {
        span {
          font-size: 0.36rem;
          margin-right: 0.1rem;
        }
      }
      div {
        position: relative;
      }
      i {
        position: relative;
        bottom: 0.03rem;
        display: inline-block;
        font-size: 0.2rem;
        font-style: normal;
        width: 0.34rem;
        height: 0.34rem;
        border: 1px solid #333;
        border-radius: 50%;
        line-height: 0.34rem;
        text-align: center;
        color: #333;
      }
    }
    .comfirm {
      float: right;
      width: 1.6rem;
      height: 0.56rem;
      margin-right: 0.3rem;
      line-height: 0.56rem;
      color: #fff;
      text-align: center;
      background: #b50029;
    }
  }
}
</style>

<template>
  <div>
    <div class="main">
      <div class="rules"><img src="./imgs/BTN_HDGZ.png" @click="rulesShow = true"></div>
      <div class="main-head">
        <div class="touxiang">
          <img :src="headImgUrl">
          <div class="ewm_btn" @click="gotoqrcode"></div>
        </div>
        <div class="info">
          <div class="info-item">
            <div class="info-title">我的积分</div>
            <div class="num">{{wdrank}}</div>
          </div>
          <div class="info-item" @click="getCount">
            <div class="info-title">邀请人数</div>
            <div class="num">{{count}}</div>
          </div>
          <div class="info-item" @click="getCount">
            <div class="info-title">办卡人数</div>
            <div class="num">{{applicationCount}}</div>
          </div>
          <div class="info-item">
            <div class="info-title">剩余积分</div>
            <div class="num">{{syrank}}</div>
          </div>
        </div>
      </div>
      <div class="recommend">
        <a href="https://wm.cib.com.cn/html/webapp/fast-issue/parnter.html?id=3e62a3bc67a9465ca5e8c9c02b553b34">
          <div class="recommend-item wybk">我要办卡
          </div>
        </a>
        <a href="https://s.cibfintech.com/vUVv6b">
          <div class="recommend-item yyqz">1元签证
          </div>
        </a>
      </div>
      <div class="product">
        <a :href="`${protocol}//${host}/${$store.state.merchantAppid}/merchant/index/credit`">
          <div class="product-item jfmx">
          </div>
        </a>
        <a
          :href="`${protocol}//${host}/${$store.state.merchantAppid}/merchant`"
        >
          <div class="product-item jfsc">
          </div>
        </a>
      </div>
      <div class="swipe-wrapper">
        <mt-swipe :auto="4000">
          <mt-swipe-item>
            <a href="https://s.cibfintech.com/vUVv6b">
              <img src="./imgs/1yqzksj.png">
            </a>
          </mt-swipe-item>
          <mt-swipe-item>
            <img src="./imgs/BANNER3.png">
          </mt-swipe-item>
        </mt-swipe>
      </div>
    </div>
    <div class="mask" v-show="rulesShow">
      <div class="bg">
        <div class="close-btn" @click="rulesShow = false"></div>
        <p>
          1、注册兴业银行信用卡合伙人，成功申请信用卡即送<span>80积分</span>，完成首刷<span>满99元即送20积分</span>。
        </p>
        <p>
          2、将你的个人二维码分享给你周围的朋友，邀请TA们成为你的合伙人，TA办卡成功之后你将获得80积分，完成首刷99元之后你将获得<span>20积分</span>。
        </p>
        <p>
          3、每个人最多可以获得<span>4900积分</span>。
        </p>
        <p>
          4、积分可在积分兑换商城里面兑换油卡、话费或其他喜欢的卡券。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast, Indicator} from 'mint-ui';
import jssdk from '@/lib/jssdk';
import config from '../config';

export default {
  data () {
    return {
      applicationCount: '0',
      count: '0',
      host: window.location.host,
      protocol: window.location.protocol,
      syrank: '0',
      wdrank: '0',
      headImgUrl: '',
      nickname: '',
      merchantId: config.merchantId,
      rulesShow: false
    };
  },
  methods: {
    async getinfo () {
      let rs = await this.$post('/new_partner/countBoundUser', {});
      if (rs.status == 200) {
        this.count = rs.payload.count;
      } else {
        Toast(rs.error);
      }
      let rs2 = await this.$post('/new_partner/countBoundUser', {
        apply_card: 'Y'
      });
      if (rs2.status == 200) {
        this.applicationCount = rs2.payload.count;
      } else {
        Toast(rs2.error);
      }
    },
    async getrank () {
      let rs = await this.$post('/user_credit/get');
      if (rs.status == 200) {
        this.syrank = rs.payload.useableCredit;
        this.wdrank = rs.payload.accumulatedCredit;
      } else {
        Toast(rs.error);
      }
    },
    async gotoqrcode () {
      this.$router.push('ewm')
    },
    getCount () {
      this.$router.push('sharedList');
    },
    // 获取头像
    getheadImgUrl () {
      this.headImgUrl = this.$store.state.cust.headImgUrl;
      this.nickname = this.$store.state.cust.nickname;
    }
  },
  async created () {
    Indicator.open();
    await this.getinfo();
    await this.getheadImgUrl();
    await this.getrank();
    let link = `${window.location.protocol}//${window.location.host}/partner/xyyh?share=` + this.$store.state.cust.id;
    this.shareConfig = {
      title: '兴业银行合伙人', // 分享标题
      desc: '加入兴业合伙人，积分换好礼！', // 分享描述
      link: link, // 分享，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `https://static.lianhaikeji.com/images/20190425/328cf4b8e9ad44968f476d0f76273393.jpg` // 分享图标
    };
    jssdk.jssdk.init('', this.merchantId, '1', val => {
      this.$jssdk.call('share', this.shareConfig);
    });
    Indicator.close();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .main {
    position: absolute;
    width: 100%;
    min-height: 100%;
    height: 100%;
    overflow-y: auto;
    background: url("./imgs/home_bg.png") no-repeat;
    background-size: 100% 100%;
    .rules {
      position: absolute;
      top: -0.05rem;
      right: 0.5rem;
      z-index: 99;
      width: 2.24rem;
      height: 0.72rem;
      img {
        width: 100%;
      }
    }
    .main-head {
      position: relative;
      width: 7.06rem;
      height: 2.86rem;
      border-radius: 0.2rem;
      box-shadow: 0 0 0.3rem #bbbbbb;
      background: white;
      margin: 1.74rem auto 0 auto;
      .touxiang {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        width: 2.06rem;
        height: 2.06rem;
        border-radius: 0.2rem;
        box-shadow: 0 0 0.3rem #aaaaaa;
        margin: 0 auto;
        top: -1.04rem;
        overflow: hidden;
        .ewm_btn {
          background: url("./imgs/ewm_btn.png") no-repeat;
          background-size: 100% 100%;
          height: 0.52rem;
          width: 0.58rem;
          right: 0;
          bottom: 0;
          position: absolute;
        }
        img {
          width: 100%;
        }
      }
      .info {
        position: absolute;
        width: 100%;
        margin-top: 1.36rem;
        display: flex;
        .info-item {
          width: 25%;
          text-align: center;
          .info-title {
            color: rgba(163, 172, 185, 0.8);
            font-size: 0.26rem;
            font-family: "simhei";
            margin-bottom: 0.24rem;
          }
          .num {
            color: rgb(51, 51, 51);
            font-size: 0.4rem;
            font-family: HelveticaNeueLTStd-Md;
          }
        }
        .level {
          margin-bottom: 0.32rem;
          text-align: center;
          font-size: 0.36rem;
          color: rgb(47, 190, 243);
          font-family: "simhei";
        }
      }
    }
    .recommend {
      position: relative;
      display: flex;
      justify-content: center;
      margin: 0.36rem auto 0 auto;
      .recommend-item {
        width: 3.58rem;
        height: 1.48rem;
        line-height: 1.4rem;
        text-align: center;
        font-family: "PingFang SC";
        color: #fff;
        font-size: 0.34rem;
        font-weight: bolder;
      }
      .wybk {
        background: url('./imgs/HOME_BTN_CARD.png') no-repeat;
        background-size: 100% 100%;
      }
      .yyqz {
        background: url('./imgs/HOME_BTN_1Y.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .product {
      display: flex;
      justify-content: center;
      margin: 0.4rem auto 0 auto;
      .product-item {
        width: 3.46rem;
        height: 1.96rem;
        img {
          width: 100%;
        }
      }
      .jfmx {
        margin-right: 0.16rem;
        background: url("./imgs/BTN_JFMX.png") no-repeat;
        background-size: 100% 100%;
      }
      .jfsc {
        background: url("./imgs/BTN_JFSC.png") no-repeat;
        background-size: 100% 100%;
      }
    }
    .swipe-wrapper {
      width: 7.2rem;
      height: 2.5rem;
      margin: 0.38rem auto 0.34rem;
      img {
        width: 100%;
      }
    }
  }
  .mask {
    font-family: "simhei";
    width: 100%;
    min-height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    overflow-y: scroll;
    .bg {
      position: relative;
      width: 5.98rem;
      height: 6.8rem;
      background: url("./imgs/tcbg.png") no-repeat;
      background-size: 100% 100%;
      margin: 2rem auto;
      padding: 1.24rem 0.4rem 0 0.4rem;
      font-size: 0.28rem;
      font-family: "PingFang SC";
      font-weight: bold;
      line-height: 0.48rem;
      text-align: justify;
      .close-btn {
        background: url("./imgs/close_btn.png") no-repeat;
        background-size: 100% 100%;
        width: 0.48rem;
        height: 0.48rem;
        position: absolute;
        right: 0;
        top: -0.8rem;
        z-index: 100;
      }
      p {
        color: rgb(51, 51, 51);
      }
      span {
        color: rgb(218, 44, 44);
      }
    }
  }
</style>

<template>
  <div class="main">
    <div class="body">
      <div class="head"><img :src="headUrl"/></div>
      <div class="code">
        <img :src="src"/>
      </div>
      <div class="casm">长按扫描二维码</div>
      <div class="rule">
        <div class="rule-banner">
          <img src="./imgs/BTN_SHARE.jpg">
        </div>
        <div class="rule-text">
          将你的个人二维码分享给你周围的朋友，邀请TA们成为你的合伙人，TA办卡成功之后你将<span>获得80积分</span>，
          完成首刷之后你将<span>获得20积分</span>，可在积分兑换商城里面兑换喜欢的礼品哦。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jssdk from '@/lib/jssdk';
import config from '../config';
export default {
  data () {
    return {
      headUrl: this.$store.state.cust.headImgUrl,
      src: '',
      custId: '',
      linkQrcode: '',
      qrshow: true,
      shareConfig: {},
      merchantId: config.merchantId,
      custType: ''
    };
  },
  methods: {
    qrcode () {
      this.src = `//hmurl.cn/qrcode/get?text=${encodeURIComponent(this.linkQrcode)}&width=500&margin=0`
    }
  },
  async mounted () {
    this.linkQrcode = `${window.location.protocol}//${window.location.host}/partner/xyyh?share=` + this.$store.state.cust.id;
    this.qrcode();
    this.shareConfig = {
      title: '兴业银行合伙人', // 分享标题
      desc: '加入兴业合伙人，积分换好礼！', // 分享描述
      link: this.linkQrcode, // 分享，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `https://static.lianhaikeji.com/images/20190425/328cf4b8e9ad44968f476d0f76273393.jpg` // 分享图标
    };
    jssdk.jssdk.init('', this.merchantId, '1', val => {
      this.$jssdk.call('share', this.shareConfig);
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.main {
  width: 100%;
  height-min: 12.85rem;
  height: 100%;
  overflow-y: scroll;
  background: url("./imgs/home_bg.png") no-repeat;
  background-size: 100% 100%;
  .body {
    margin: 1.7rem auto 0 auto;
    position: relative;
    width: 7.06rem;
    height: 10.72rem;
    background: rgba(255, 255,255, 0.8);
    border-radius: 0.16rem;
    text-align: center;
    .head {
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
      img {
        width: 100%;
      }
    }
    .code {
      padding-top: 1.3rem;
      text-align: center;
      img {
        width: 4.66rem;
        height: 4.66rem;
      }
    }
    .casm {
      font-family: "PingFang SC";
      font-size: 0.26rem;
      color: rgb(22,74,149);
      margin-top: 0.2rem;
    }
    .rule {
      position: relative;
      margin: 0.9rem auto 0 auto;
      width: 6.6rem;
      height: 3.08rem;
      background: rgb(235,236,237);
      border-radius: 0.08rem;
      .rule-banner {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -0.26rem;
        margin: 0 auto;
        width: 4.76rem;
        height: 0.52rem;
        z-index: 99;
        img {
          width: 100%;
        }
      }
      .rule-text {
        text-align: justify;
        color: rgb(51, 51, 51);
        font-size: 0.26rem;
        font-family: "PingFang SC";
        line-height: 0.4rem;
        padding: 0.58rem 0.26rem 0.26rem 0.26rem;
      }
      .rule-text span {
        color: rgb(199, 28, 28);
      }
    }
  }
}
</style>

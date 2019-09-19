<template>
  <div class="orange">
    <back></back>
    <div class="background">
      <img src="./imgs/IMG_BG_CODE.jpg" alt>
    </div>
    <div class="share-one-screen">
      <div class="share-content">
        <div class="qrcode-container">
          <div class="qrcode-msg">
            {{$route.params.tel}}
            <span>邀您助力完成任务</span>
          </div>
          <div class="qrcode-con">
            <div class="qrcode-box" id="qrcode"></div>
          </div>
          <div class="share" v-if="showShare" @click="ccbShare"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';
import QRCode from 'qrcodejs2';
import jssdk from '@/lib/jssdk';
import { ccbShare } from '@/lib/shareHandler.js';
export default {
  data () {
    return {
      showShare: window.location.href.indexOf('shared') < 0,
      merchantId: this.$store.state.merchantId,
      shareConfig: {},
      linkQrcode: ''
    };
  },
  methods: {
    initWXShare (cb) {
      Indicator.open();
      this.$store.commit('setIsReady', false);
      let link = window.location.href.replace(window.location.search, '');
      this.shareConfig = {
        title: '百万佣金悬赏', // 分享标题
        desc: '积分好礼等你来拿～', // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:
          'http://static.lianhaikeji.com/images/20181219/37dcacb38f1a4ac286df9291af1197c9.jpeg',
        success: function () {
          cb && cb();
        }
      };
      jssdk.jssdk.init('', this.merchantId, '1', val => {
        this.$jssdk.call('share', this.shareConfig);
        Indicator.close();
      });
    },
    ccbShare () {
      let url = `${window.location.href}#shared`;
      var dict = [];
      dict['scheme'] = 'ccbwebapi';
      dict['operation'] = 'webshare';
      dict['title'] = '百万佣金悬赏';
      dict['description'] = '点击积分好礼等你来拿～';
      dict['url'] = encodeURIComponent(url);
      dict['imageurl'] =
        'http://static.lianhaikeji.com/images/20181219/37dcacb38f1a4ac286df9291af1197c9.jpeg';
      ccbShare(dict);
    },
    qrcode () {
      let _this = this;
      _this.linkQrcode = `${
        window.location.href.split('ShareQrcode')[0]
      }acEntrance/${this.$route.params.customId}/${this.$route.params.tel}`;
      let qrcode = new QRCode('qrcode', {
        width: 210,
        height: 210, // 高度
        text: _this.linkQrcode
      });
      console.log(qrcode);
    }
  },
  created () {},
  mounted () {
    this.qrcode();
    if (navigator.userAgent.indexOf('MicroMessenger') > 0) {
      this.initWXShare();
    }
  }
};
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #5d60f4;
}
.background img {
  display: block;
  width: 100%;
}
.share-one-screen {
  position: relative;
  width: 100%;
  min-height: 100%;
  height: auto;
}
.page-intro {
  margin: 0 auto;
  width: 90%;
  background-size: 100% 100%;
}
.page-intro-txt {
  padding: 0.3rem 0.24rem 0.24rem;
  line-height: 1.8;
  font-size: 0.26rem;
  text-align: justify;
  color: #bb4b20;
}
.share-content {
  padding-top: 2rem;
}

.share-page-intro {
  margin: 0 auto;
}

.qrcode-container {
  margin-top: 0.24rem;
  position: relative;
  font-size: 0.34rem;
}

.qrcode-msg {
  padding-bottom: 1rem;
  text-align: center;
  color: #fff;
  span {
    color: rgb(255, 221, 119);
  }
}
.share {
  margin: 1.4rem auto 0;
  width: 3.08rem;
  height: 1.04rem;
  background: url(./imgs/BTN_SHARE.png) no-repeat;
  background-size: 100% 100%;
}
.user-share-img {
  margin-right: 0.2rem;
  display: inline-block;
  width: 0.6rem;
  height: 0.6rem;
  vertical-align: middle;
  border: 0.08rem solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
}

.qrcode-con {
  position: relative;
  font-size: 0;
  text-align: center;
}

.qrcode-box {
  display: inline-block;
  padding: 0.06rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0.08rem;
}

.share-qrcode-img {
  display: block;
  width: 1.8rem;
  height: 1.8rem;
}

.qrcode-info {
  margin-top: 0.08rem;
  font-size: 0.26rem;
  color: #fff;
  text-align: center;
}
</style>

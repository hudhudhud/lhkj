<template>
  <div class="orange">
    <back></back>
    <div class="background">
      <img src="./imgs/IMG_BG_RULE.jpg" alt>
    </div>
    <div class="rule">
      <p>注册成为建行手机银行推手，发挥你的营销才华，推荐你身边的同学成为建行手机银行活跃用户，让你的朋友天天享受建行的优惠活动，你还可以获得丰厚的积分奖励，积分奖励可兑换话费、视频会员、星巴克券、善融商城券等奖品。今年9月开始至11月30日，推荐成功一户的奖励分是5000分。</p>
    </div>
    <div class="btn">
      <img src="./imgs/BTN_RWGL.png" alt>
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
      customId: this.$store.state.cust ? this.$store.state.cust.id : null,
      shareConfig: {},
      linkQrcode: ''
    };
  },
  computed: {
    cust () {
      return this.$store.state.cust;
    }
  },
  methods: {
    initWXShare (cb) {
      Indicator.open();
      this.$store.commit('setIsReady', false);
      let link = window.location.href.replace(window.location.search, '');
      this.shareConfig = {
        title: '分享领券 畅享壕礼', // 分享标题
        desc: '星巴克券、必胜客券、话费卡、加油卡等你来拿～', // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:
          'http://static.lianhaikeji.com/images/20181109/a6ad62e4019d4b8ea12a04a5cabc4a65.jpg',
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
      let url = `${window.location.href}#shered`;
      var dict = [];
      dict['scheme'] = 'ccbwebapi';
      dict['operation'] = 'webshare';
      dict['title'] = '全城寻觅 谁是圣诞之子';
      dict['description'] = '点击参与';
      dict['url'] = encodeURIComponent(url);
      dict['imageurl'] =
        'http://static.lianhaikeji.com/images/20181123/66b9efe0d383467a911c9fe1f50a13ef.jpeg';
      ccbShare(dict);
    },
    async refereeCustom () {
      let rs = await this.$get(`api/referee/isReferee/${this.$store.state.cust.id}`);
      // alert('customerid:' + this.$store.state.cust.id)
      if (rs.status == 300) {
        // 已成为推手
        window.location.replace(
          `/${this.$store.state.merchantAppid}/merchant/share/${
            this.$store.state.cust.id
          }/index`
        );
      }
    },
    qrcode () {
      let _this = this;
      _this.linkQrcode =
        window.location.href.split(_this.$route.params.customId)[0] +
        _this.$route.params.customId +
        '/acEntrance/' +
        this.cust.tel;
      let qrcode = new QRCode('qrcode', {
        width: 210,
        height: 210, // 高度
        text: _this.linkQrcode
      });
      console.log(qrcode);
    }
  },
  created () {
    if (this.$store.state.cust.id != this.$route.params.customId) {
      // this.refereeCustom();
    }
  },
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
.rule {
  position: relative;
  top: 4.8rem;
  width: 6rem;
  margin: 0 auto;
  line-height: 0.44rem;
  // border: 1px solid #fff;
  color: #fff;
  font-size: 0.3rem;
}
.btn {
  position: absolute;
  left: 50%;
  bottom: 0.6rem;
  transform: translateX(-50%);
  width: 3.08rem;
  text-align: center;
  img {
    width: 100%;
  }
}
</style>

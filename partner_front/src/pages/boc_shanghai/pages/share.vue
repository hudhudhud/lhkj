<template>
  <div class="qrCode">
    <div class="parnterJoin">邀您加入合伙人</div>
    <div class="code" ref="qr">
      <!-- <img src="./imgs/erweima.png" alt> -->
      <div class="qrcode-box" id="qrcode"></div>
      <div class="operate"></div>
    </div>

    <div class="rule">
      <img src="./imgs/sharerule.png" alt>
      <div class="share">
        <img src="./imgs/share.png" alt>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import QRCode from 'qrcodejs2';
import jssdk from '@/lib/jssdk';
import { gotoAuth } from '@/router';
import config from '../config';
export default {
  data () {
    return {
      custId: '',
      linkQrcode: '',
      qrshow: true,
      shareConfig: {},
      merchantId: config.merchantId,
      custType: ''
    };
  },
  // computed: {
  //   tel () {
  //     return this.$store.state.cust.tel;
  //   }
  // },
  methods: {
    gotoHome () {
      if (this.custType == 1) {
        window.location.href = `//${window.location.host}/partner/shzh/home`; // 去员工页面
      } else if (this.custType == 2) {
        window.location.href = `//${window.location.host}/partner/shzh/hometwo`; // 去学生页面
      }
    },
    async getCustType () {
      let rs = await this.$post('/custom/get/customType');
      this.custType = rs.payload;
    },
    async getcust () {
      let token = this.$store.state.token;
      if (!token) {
        // 统一登录,skipLogin,换取cust,callbackUrl是当前页面
        let targetURL = window.location.href;
        gotoAuth(this.merchantId, targetURL, true);
      }
    },
    async checkCustId () {
      // 判断是否有手机
      if (this.tel) {
        let rs = await this.$post('/binding/judge/partner');
        if (rs.status == 200) {
          var payload = rs.payload;
          if (payload) {
            // 不能绑定
            if (payload == this.$route.params.custId) {
              // 提示已经绑定该合伙人
              Toast('您已经绑定该合伙人');
            } else {
              // 提示已经绑定过其他的合伙人
              Toast('您已经绑定其他合伙人');
            }
            await this.getCustType();
            // 写跳转主页
            this.gotoHome();
          } else {
            // 可以绑定,有手机号码,绑定助力
            this.becAssistance();
          }
        } else {
          Toast(rs.message);
        }
      } else {
        // 没有手机号
        localStorage.setItem(
          config.merchantId + 'custId',
          this.$route.params.custId
        );
        this.becParnter();
      }
    },

    qrcode () {
      let _this = this;
      _this.linkQrcode = window.location.href;
      if (_this.linkQrcode.indexOf('code=') > 0) {
        _this.linkQrcode = _this.linkQrcode.replace(/code=[^=]*/g, '');
      }
      if (_this.linkQrcode.indexOf('set=') > 0) {
        _this.linkQrcode = _this.linkQrcode.replace(/\?set=[^=]*/g, '');
      }
      let qrcode = new QRCode('qrcode', {
        width: 215,
        height: 215, // 高度
        text: _this.linkQrcode
      });
      console.log(qrcode);
    },

    // 有手机号直接绑定
    async becAssistance () {
      let rs = await this.$post('/binding/binding', {
        customId: this.$route.params.custId
      });
      if (rs.status == 200) {
        Toast('绑定成功');
        // 写跳转主页
        await this.getCustType();
        this.gotoHome();
      } else {
        Toast(rs.message);
      }
    },
    becParnter () {
      // 统一登录skipLogin   ,返回code，换取jwt和cust，存储，跳转到选择角色页面
      // let targetURL = `${window.location.protocol}//${
      //   window.location.host
      // }/parnter/shzh/login?custId=${this.$route.params.custId}`; // 是登陆选择角色的页面
      // gotoAuth(this.merchantId, targetURL, true);

      this.$router.replace({
        name: 'login',
        query: { custId: this.$route.params.custId }
      });
      // window.location.href(`${targetURL}`);
    }
  },
  async mounted () {
    this.getcust();
    if (this.$route.params.custId != this.$store.state.cust.id) {
      this.checkCustId();
    } else {
      if (!this.$route.query.set) {
        await this.getCustType();
        this.gotoHome();
      }
    }
    this.qrcode();
    this.$store.commit('setIsReady', false);
    let link = window.location.href;
    if (link.indexOf('code=') > 0) {
      link = link.replace(/code=[^=]*/g, '');
    }
    if (link.indexOf('set=') > 0) {
      link = link.replace(/\?set=[^=]*/g, '');
    }
    this.shareConfig = {
      title: '中国银行上海市分行青春合伙人', // 分享标题
      desc: '加入青春计划，成就最强合伙人！', // 分享描述
      link: link, // 分享，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `https://static.lianhaikeji.com/images/20190114/f6b071e305cf4f9d8c47782b22302235.jpeg` // 分享图标
    };
    jssdk.jssdk.init('', this.merchantId, '1', val => {
      this.$jssdk.call('share', this.shareConfig);
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.qrCode {
  position: relative;
  width: 100%;
  height: 15.19rem;
  background: #eff0f1;
  overflow-y: scroll;
  background: url("./imgs/qrcodebg2.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 3.62rem;
  .parnterJoin {
    width: 4.9rem;
    height: 0.6rem;
    margin: 0 auto;
    text-align: center;
    line-height: 0.6rem;
    color: rgb(236, 40, 46);
    font-size: 0.32rem;
    background-color: rgba(85, 180, 93, 0.5);
    border-radius: 0.5rem;
  }
  .code {
    position: relative;
    width: 229px;
    height: 228px;
    background: url("./imgs/codebg.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    padding: 0.1rem 0;
    font-size: 0;
    text-align: center;
    .qrcode-box {
      display: inline-block;
    }
    .operate {
      position: absolute;
      top: 0.2rem;
      right: -0.6rem;
      width: 0.74rem;
      height: 2.59rem;
      background: url("./imgs/operate.png") no-repeat;
      background-size: 100% 100%;
    }
  }

  .rule {
    position: absolute;
    bottom: 1.1rem;
    left: 0.8rem;
    font-size: 0;
    width: 5.94rem;
    height: 4.03rem;
    img {
      width: 100%;
    }
    .share {
      position: absolute;
      top: -0.6rem;
      left: 0rem;
      width: 5.99rem;
      height: 0.86rem;
      font-size: 0;
      z-index: 99;
      img {
        width: 100%;
      }
    }
  }
}
</style>

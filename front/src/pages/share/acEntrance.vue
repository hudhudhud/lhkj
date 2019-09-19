<template>
  <div class="bg">
    <div class="main">
    </div>
    <div class="popup-login-form" v-if="showLogin">
      <div class="page-mask"></div>
      <div class="login-form">
        <div class="login-title">
          <p class="login-title-text">点亮星标领好礼</p>
        </div>
        <div class="form-item border-form-item">
          <div class="input-icon">
            <i class="input-icon-img input-icon-phone"></i>
          </div>
          <div class="input-filed">
            <input class="input-filed-text" type="text" maxlength="11" placeholder="请输入手机号码"
                   v-model="phoneNum">
          </div>
        </div>
        <div class="form-item border-form-item">
          <div class="input-filed">
            <input class="input-filed-text" style="width: 2.8rem;" v-model="validCode" type="text" placeholder="请输入验证码">
          </div>
          <div class="input-extra" :class="{disabled:!this.canClick}" @click="countDown">
            {{getCodeContent}}
          </div>
        </div>
        <div class="sign-btn-item">
          <input class="sign-btn" type="button" @click="validBind()" value="提交"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, MessageBox, Indicator } from 'mint-ui';
export default {
  data () {
    return {
      phoneNum: '',
      totalNum: 1,
      validCode: '',
      getCodeContent: '获取验证码',
      canClick: true,
      totalTime: 60,
      merchantId: this.$store.state.merchantId,
      showLogin: false,
      submiting: false
    };
  },
  computed: {
    customId () {
      return this.$store.state.cust.id;
    }
  },
  methods: {
    // 提交注册信息
    async validBind () {
      if (this.submiting) {
        return;
      }
      this.validCode = this.validCode.trim()
      this.phoneNum = this.phoneNum.trim()
      if (!(this.validCode && this.phoneNum)) {
        return;
      }
      Indicator.open();
      this.submiting = true
      // 开始更新用户信息
      let rs = await this.$post('api/verify/sms/bind/share_relation', {
        mobile: this.phoneNum,
        smsVerifyCode: this.validCode,
        sharedCustomId: this.customId
      });
      if (rs.status == 200) {
        // 更新用户信息成功
        let back = rs.payload;
        let custKey = this.$store.state.merchantAppid + '_cust';
        let tokenKey = this.$store.state.merchantAppid + '_token';
        sessionStorage.setItem(tokenKey, back.jwt);
        sessionStorage.setItem(custKey, JSON.stringify(back.cust));
        localStorage.setItem(tokenKey, back.jwt);
        localStorage.setItem(custKey, JSON.stringify(back.cust));
        this.$store.commit('setToken', back.jwt);
        this.$store.commit('setCust', back.cust);
        this.customId = back.cust.id
        // 开始绑定
        let rs1 = await this.$post('api/referee/smallBind', {
          shareCustomId: this.$route.params.customId,
          sharedCustomId: this.customId
        })
        if (rs1.status == 200) {
          this.showLogin = false;
          let boolean = await this.pushHand();
          let msg = '注册成功';
          if (boolean) {
            msg += '，您已获得500积分'
          }
          MessageBox({
            message: msg,
            title: '提示',
            showCancelButton: false,
            confirmButtonText: '确定'
          });
          setTimeout(() => {
            window.location.replace(
              `/${this.$store.state.merchantAppid}/merchant/share/${this.$store.state.cust.id}/index`
            );
          }, 1000);
        } else if (rs1.status == 300) {
          // 推荐失败
          let f = await this.pushHand();
          if (f) {
            window.location.replace(
              `/${this.$store.state.merchantAppid}/merchant/share/${
                this.$store.state.cust.id}/index`
            );
          } else {
            this.submiting = false
            Indicator.close();
          }
        } else {
          Toast('推荐失败：失败原因：' + rs1.error ? rs1.error : JSON.stringify(rs1))
          this.submiting = false
          Indicator.close();
        }
      } else {
        // 更新用户信息失败
        Toast(rs.error ? rs.error : JSON.stringify(rs))
        this.submiting = false
        Indicator.close();
      }
    },
    // 判断是否已经是推手
    async refereeCustom () {
      // 查询是否已经是推手
      let rs = await this.$get(`api/referee/isReferee/${this.$store.state.cust.id}`);
      if (rs.status == 200) {
        // 未成为推手
        this.showLogin = true;
      } else if (rs.status == 300) {
        // 已成为推手，判断是否需要更新绑定信息
        let rs = await this.$post('api/referee/smallBind', {
          shareCustomId: this.$route.params.customId,
          sharedCustomId: this.customId
        })
        if (rs.status == 200) {
          Toast('推荐人已更新')
        }
        // 直接跳入主页
        this.$router.replace(
          `/${this.$store.state.merchantAppid}/merchant/share/${
            this.$store.state.cust.id}/index`
        );
      } else {
        Toast('查询推手身份失败，失败原因：' + rs.error ? rs.error : JSON.stringify(rs))
      }
    },
    // 新增推手信息
    async pushHand () {
      let params = {
        merchantId: this.merchantId.toString(),
        customId: this.customId
      };
      let rs = await this.$post('api/referee/set', params);
      if (rs.status == 200) {
        return true;
      } else if (rs.status == 300) {
        return true;
      } else {
        Toast('注册失败！失败原因：' + rs.error ? rs.error : JSON.stringify(rs))
        return false;
      }
    },
    // 获取验证码
    async getValidCode () {
      let rs = await this.$post('api/send/sms/ignore/verify/img', {
        merchantId: this.merchantId.toString(),
        mobile: this.phoneNum
      });
      if (rs.status != 200) {
        Toast(rs.error);
      }
    },
    // 验证码重发倒计时
    countDown () {
      let phoneReg = /^1[3456789]\d{9}$/;
      if (phoneReg.test(this.phoneNum)) {
        if (!this.canClick) return;
        this.canClick = false;
        this.getValidCode();
        this.getCodeContent = this.totalTime + 's后重新发送';
        let clock = window.setInterval(() => {
          this.totalTime--;
          this.getCodeContent = this.totalTime + 's后重新发送';
          if (this.totalTime <= 0) {
            window.clearInterval(clock);
            this.getCodeContent = '重新发送验证码';
            this.totalTime = 60;
            this.canClick = true;
          }
        }, 1000);
      } else {
        Toast('输入正确手机号码');
      }
    }
  },
  created () {
    // 判断是否已经是推手
    this.refereeCustom();
  }
};
</script>

<style scoped>
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    background: #5a70f8;
    width: 100%;
    height: 100%;
  }

  .main {
    position: absolute;
    top: 0;
    left: 0;
    background: url("./imgs/login_bg.jpg") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 12.05rem;
  }

  .login-title {
    margin-bottom: 0.16rem;
  }

  .login-title-text {
    line-height: 1rem;
    font-size: 0.44rem;
    color: #3973ed;
    text-align: center;
  }

  .page-mask {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }

  .login-form {
    position: absolute;
    width: 6.5rem;
    left: 50%;
    top: 3rem;
    z-index: 9;
    background-color: #fff;
    transform: translateX(-50%);
    border-radius: 0.2rem;
    padding: 0.3rem;
  }

  .form-item {
    position: relative;
    margin-bottom: 0.28rem;
    padding: 0 0.4rem;
    width: 5.9rem;
  }

  .border-form-item {
    border: 1px solid #c6c8c9; /*no*/
    border-radius: 0.2rem;
    overflow: hidden;
  }

  .input-icon {
    display: inline-block;
    margin-right: 0.12rem;
    width: 0.4rem;
    height: 0.75rem;
    float: left;
  }

  .input-icon-img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .input-icon-phone {
    background: url(./imgs/icon-ipt-phone.png) no-repeat left center;
    background-size: 0.24rem 0.36rem;
  }

  .input-filed {
    float: left;
    padding: 0;
    height: 0.75rem;
  }

  .input-filed-text {
    height: 0.75rem;
    line-height: 0.75rem;
    font-size: 0.32rem;
    color: #333;
    width: 4.5rem;
  }

  .input-extra {
    display: block;
    height: 0.75rem;
    line-height: 0.75rem;
    font-size: 0.3rem;
    color: #34a0dd;
    background-color: transparent;
    float: right;
  }

  .disabled {
    color: #ccc;
  }

  .sign-btn-item {
    margin-top: 0.44rem;
  }

  .sign-btn {
    display: block;
    width: 100%;
    line-height: 0.8rem;
    font-size: 0.34rem;
    color: #fff;
    letter-spacing: 6px;
    text-align: center;
    background: url(./imgs/sign-btn-bg.png) no-repeat center;
    background-size: 100% 100%;
    border-radius: 0.4rem;
  }

</style>

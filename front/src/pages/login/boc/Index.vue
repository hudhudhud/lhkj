<template>
  <div class="position-wrapper">
    <div class="header"></div>
    <div class="boc-login">
      <div class="bg">
        <img src="./imgs/boc.png" alt>
      </div>
      <div class="login-form">
        <label for>&nbsp;员工号</label>
        <input type="text" v-model="username" placeholder="请输入员工号">
        <label for>&nbsp;手机号</label>
        <input type="text" v-model="phone" placeholder="请输入手机号">
        <div class="btn" @click="login">登录</div>
        <div class="rule" @click="openRule = true">活动规则</div>
      </div>
      <div class="dialog" v-if="openRule">
        <div class="main">
          <div class="title">活动规则</div>
          <div class="article">
            <div>
              <i>1</i> 只有指定到店客户通过手机银行APP成功完成二维码支付才可以参与抽奖，非二维码支付、非成功交易等不能参与抽奖。
            </div>
            <div>
              <i>2</i> 奖品设置有1元、2元、5元、10元、50元话费，中奖率100%。
            </div>
            <div>
              <i>3</i> 每位符合条件的客户每月有且仅有1次抽奖机会，由客户确认手机号后进行抽奖，手机号一经确认不可更改。
            </div>
            <div>
              <i>4</i> 客户中奖后，点击“确认领取”即可领取话费，一般情况下话费实时到账，月初24小时内到账。
            </div>
            <div>
              <i>5</i> 由于客户未提供正确的手机号码导致客户无法获得手机话费，活动主办方不承担任何责任。
            </div>
            <div>
              <i>6</i> 对于活动细节如有疑问，请咨询中国银行福建省分行各营业网点。
            </div>
            <div>
              <i>7</i> 凡参与本次活动即视为同意活动规则所述的各项规则，在法律允许的范围内中国银行福建省分行将保留修改本次活动条款、延迟或提前终止本活动而无须事先通知的权利。
            </div>
          </div>
          <div class="comfirm" @click="openRule = false">我知道了</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
export default {
  data () {
    return {
      openRule: false,
      username: '',
      phone: ''
    };
  },
  methods: {
    async replaceAct () {
      let rs = await this.$get(
        '/api/sichuan/boc/login?appId=' +
          this.$store.state.merchantAppid +
          '&tel=' +
          this.phone
      );
      if (rs.status == 200) {
        this.$router.replace(
          `/${this.$store.state.merchantAppid}/merchant/index/act/154?code=${
            rs.payload
          }`
        );
      } else {
        Toast(rs.error);
      }
    },
    async login () {
      if (!this.username) {
        Toast('请输入员工号');
        return;
      }
      if (!this.phone) {
        Toast('请输入手机号');
        return;
      }
      let phoneReg = /^1[3456789]\d{9}$/;
      if (phoneReg.test(this.phone)) {
        Indicator.open();
        let rs = await this.$post(
          'api/get/staffWhileList/by_ehrAndMobileAndMerchantId',
          {
            mobile: this.phone,
            merchantId: this.$store.state.merchantId,
            ehr: this.username
          }
        );
        if (rs.status == 200) {
          if (rs.payload) {
            this.replaceAct();
          } else {
            Toast('您不在白名单中，请确认输入信息是否有误');
          }
        }
        Indicator.close();
      } else {
        Toast('请输入正确的手机号');
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.boc-login {
  position: relative;
  .bg img {
    display: block;
    border: none;
    width: 100%;
  }
  .login-form {
    position: absolute;
    top: 4.8rem;
    width: 5.72rem;
    left: 50%;
    margin-left: -2.86rem;
    label {
      color: #b50029;
      font-size: 0.3rem;
      font-weight: bold;
    }
    input,
    .btn {
      width: 100%;
      line-height: 0.75rem;
      padding: 0 0.2rem;
      border-radius: 0.1rem;
      font-size: 0.3rem;
      color: #fff;
      margin: 0.2rem 0 0.4rem;
    }
    input {
      color: #000;
    }
    .btn {
      background: #b50029;
      font-weight: bold;
      text-align: center;
    }
    .rule {
      width: 1.6rem;
      line-height: 0.56rem;
      color: #b50029;
      border: 1px solid #b50029;
      background: #fff;
      text-align: center;
      font-size: 0.3rem;
      border-radius: 0.12rem;
      margin: 0 auto;
    }
    .qrcode {
      text-align: right;
      img {
        width: 1.4rem;
      }
      div {
        color: #fff;
        line-height: 0.3rem;
        font-size: 0.12rem;
      }
    }
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
      width: 6.14rem;
      position: absolute;
      height: 10.12rem;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      background: url(./imgs/dialog-bg.jpg) no-repeat;
      background-size: 100% 100%;
      font-size: 0.28rem;
      line-height: 0.4rem;
      box-sizing: border-box;
      .title {
        color: #fff;
        font-size: 0.32rem;
        text-align: center;
        line-height: 0.7rem;
        background: #b50029;
        margin-bottom: 0.3rem;
      }
      .article {
        padding: 0 0.2rem;
        height: 8rem;
        overflow: auto;
        color: #666;
        line-height: 0.5rem;
        overflow-y: scroll;
        margin-bottom: 0.3rem;
        div {
          position: relative;
          padding-left: 0.5rem;
        }
        i {
          position: absolute;
          left: 0;
          top: 0.05rem;
          display: inline-block;
          font-style: normal;
          width: 0.4rem;
          height: 0.4rem;
          background: url(./imgs/circle.png) no-repeat;
          background-size: 100% 100%;
          line-height: 0.4rem;
          text-align: center;
          color: #fff;
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
}
</style>

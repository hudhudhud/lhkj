<template>
  <div class="clientlogin">
    <div class="clientlogin-header">
      <div>青春合伙人</div>
    </div>
    <div class="main-content">
      <input type="text" placeholder="请输入员工号" v-model="ehr">
      <div class="input-filed border-form-item">
        <!--ch-->
        <input
          class="input-filed-text"
          type="text"
          maxlength="11"
          placeholder="请输入手机号码"
          v-model="phoneNum"
        >
      </div>
      <div class="login-input">
        <input type="text" v-model="imageVerifyCode" placeholder="请输入图形验证码">
        <img class="codepic" :src="imageVerifyCodeUrl" @click="getImageVerifyCode">
      </div>
      <div class="form-item border-form-item">
        <div class="form-filed">
          <input class="input-filed-text" v-model="validCode" type="text" placeholder="请输入验证码">
        </div>
        <div class="input-extra" :class="{disabled:!this.canClick}" @click="countDown">
          <!--ch-->
          {{getCodeContent}}
        </div>
      </div>
    </div>
    <div class="loginButton" @click="login">登录</div>
    <div class="bottompic">
      <img src="./imgs/staffpicbg.png" alt>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import config from '../config';
export default {
  data () {
    return {
      // organCode: '',机构号
      ehr: '',
      phoneNum: '',
      validCode: '',
      imageVerifyCode: '',
      imageVerifyCodeUrl: '',
      getCodeContent: '验证码',
      canClick: true,
      totalTime: 60,
      code: '', // 图形验证码的key
      clock: '',
      host: window.location.host,
      protocol: window.location.protocol
    };
  },
  methods: {
    // 点击登录
    async login () {
      if (!this.ehr) {
        Toast('请输入员工号');
        return;
      }
      if (!this.phoneNum && !this.validCode && !this.imageVerifyCode) {
        Toast('请填写正确信息再登录');
        return;
      }
      let rs = await this.$post('/staff/login', {
        organCode: this.organCode,
        ehr: this.ehr,
        mobile: this.phoneNum,
        smsVerifyCode: this.validCode,
        customId: this.$route.query.custId,
        headImgUrl: this.$store.state.cust.headImgUrl
      });
      if (rs.status == 200) {
        this.$store.commit('setToken', rs.payload.jwt);
        this.$store.commit('setCust', rs.payload.cust);
        sessionStorage.setItem('partner_' + config.merchantId + '_token', rs.payload.jwt);
        sessionStorage.setItem('partner_' + config.merchantId + '_cust', JSON.stringify(rs.payload.cust));
        localStorage.setItem('partner_' + config.merchantId + '_token', rs.payload.jwt);
        localStorage.setItem('partner_' + config.merchantId + '_cust', JSON.stringify(rs.payload.cust));
        Toast('登陆成功');
        window.location.replace(
          `${window.location.protocol}//${
            window.location.host
          }/partner/shzh/home`
        );
      } else {
        var error = rs.error;
        var message = rs.message;
        var msg = '';
        if (error && !message) {
          msg += error;
        }
        if (message) {
          msg += message;
        }
        Toast(msg);
      }
    },

    // 图形验证码
    async getImageVerifyCode () {
      let rs = await this.$get('/mobile/get/getImgCode');
      if (rs.payload && rs.status == 200) {
        this.code = rs.payload;
        let src = await this.$get(
          '/mobile/get/verifyimage?keyCode=' + this.code,
          { responseType: 'blob' }
        );
        this.imageVerifyCodeUrl = window.URL.createObjectURL(src);
      }
    },
    // 短信验证
    async getValidCode () {
      let rs = await this.$post('/mobile/send/verification', {
        merchantId: config.merchantId,
        mobile: this.phoneNum,
        imageVerifyCode: this.imageVerifyCode,
        imageVerifyKey: this.code
      });
      if (rs.status != 200) {
        Toast(rs.error);
        this.getImageVerifyCode();
        this.getCodeContent = this.totalTime + 's';
        window.clearInterval(this.clock);
        this.getCodeContent = '重新发送';
        this.totalTime = 60;
        this.canClick = true;
      }
    },
    // 验证码按钮点击
    countDown () {
      if (!this.imageVerifyCode) {
        Toast('请先输入图形验证码');
        return;
      }
      let phoneReg = /^1[3456789]\d{9}$/;
      if (phoneReg.test(this.phoneNum)) {
        if (!this.canClick) return;
        this.canClick = false;
        this.getValidCode();
        this.getCodeContent = this.totalTime + 's';
        this.clock = window.setInterval(() => {
          this.totalTime--;
          this.getCodeContent = this.totalTime + 's';
          if (this.totalTime <= 0) {
            window.clearInterval(this.clock);
            this.getCodeContent = '重新发送';
            this.totalTime = 60;
            this.canClick = true;
          }
        }, 1000);
      } else {
        Toast('输入正确手机号码');
      }
    }
  },
  async created () {
    this.getImageVerifyCode();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.clientlogin {
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: 100%;
  overflow-y: hidden;
  .clientlogin-header {
    font-family: "simhei";
    position: relative;
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #fff;
    margin-bottom: 0.66rem;
    background-color: #e9273c;
    .clientlogin-out {
      position: absolute;
      top: 0.4rem;
      right: 0.3rem;
      height: 0.3rem;
      width: 0.3rem;
    }
  }
  .main-content {
    padding: 0 0.4rem 0 0.4rem;
    margin-bottom: 0.66rem;
    .login-form {
      margin-bottom: 0.3rem;
      .select {
        //用div的样式代替select的样式
        width: 100%;
        line-height: 0.8rem;
        border-radius: 0.06rem;
        //盒子阴影修饰作用,自己随意
        border: 1px solid #ccc;
        position: relative;
        margin-right: 0.22rem;
        select {
          //清除select的边框样式
          width: 100%rem;
          border: none;
          line-height: 0.8rem;
          //清除select聚焦时候的边框颜色
          outline: none;
          //将select的宽高等于div的宽高
          width: 100%;
          //隐藏select的下拉图标
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          //通过padding-left的值让文字居中
          padding-left: 0.2rem;
        }
        &:after {
          content: "";
          width: 0.28rem;
          height: 0.28rem;
          background: url(./imgs/arrow.png) no-repeat center;
          //通过定位将图标放在合适的位置
          background-size: 100% 100%;
          position: absolute;
          right: 0.2rem;
          top: 34%;
          //给自定义的图标实现点击下来功能
          pointer-events: none;
        }
      }
    }
    input {
      width: 100%;
      height: 0.82rem;
      border: 1px solid #ccc;
      border-radius: 0.06rem;
      margin-bottom: 0.3rem;
      padding-left: 0.2rem;
    }
    .input-filed {
      flex: 1;
      border-radius: 0.06rem;
      overflow: hidden;
      .input-filed-text {
        height: 0.82rem;
        width: 100%;
        line-height: inherit;
        font-size: 0.28rem;
        color: #333;
        margin-bottom: 0;
      }
    }
    .form-item {
      width: 100%;
      display: flex;
      .input-filed-text {
        height: 0.82rem;
        width: 4.8rem;
        line-height: inherit;
        padding: 0.2rem;
        font-size: 0.28rem;
        color: #333;
        border-radius: 0.06rem;
        margin-right: 0.2rem;
        overflow: hidden;
      }
      .input-extra {
        width: 1.78rem;
        height: 0.8rem;
        background-color: #ff7373;
        border: 1px solid #ff7373; /*no*/
        border-radius: 0.06rem;
        text-align: center;
        line-height: 0.8rem;
        color: rgb(255, 255, 255);
        font-size: 0.28rem;
      }
    }
    .login-input {
      position: relative;
      margin: 0.3rem auto;
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 0.8rem;
      font-size: 0.28rem;
      border: 1px solid #c6c8c9; /*no*/
      border-radius: 0.06rem;
      overflow: hidden;
      input {
        width: 5rem;
        border: 0px;
      }
      img {
        position: absolute;
        top: 0;
        right: 0;
        width: 1.5rem;
        height: 0.8rem;
      }
    }
  }
  .loginButton {
    width: 6.34rem;
    height: 1.28rem;
    margin: 0 auto;
    background: url("./imgs/loginbutton.png") no-repeat;
    background-size: 100% 100%;
    line-height: 1.28rem;
    text-align: center;
    font-size: 0.36rem;
    color: rgb(255, 255, 255);
  }
  .bottompic {
    width: 100%;
    height: 3.52rem;
    img {
      width: 100%;
    }
  }
}
</style>

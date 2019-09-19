<template>
  <div class="regist">
    <!--<div class="regist-header">-->
      <!--<i class="regist-icon">&lt;</i>-->
      <!--<h1>注册账号</h1>-->
    <!--</div>-->
    <p class="regist-title">注册账号</p>
    <div class="regist-content">
      <div class="regist-row">
        <span class="regist-icon phone"></span>
        <input type="text" v-model="mobile" placeholder="请输入手机号码">
      </div>
      <div class="regist-row">
        <div>
          <span class="regist-icon code"></span>
          <input type="text" class="code" v-model="mcode" placeholder="请输入短信验证码">
        </div>
        <span class="regist-codetxt" @click="sendCode">{{codeTxt}}</span>
      </div>
      <div class="regist-btn" @click="regist">注册穿越龙支付星球</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goddessRegist',
  data () {
    return {
      mobile: '',
      mcode: '',
      codeTxt: '获取验证码',
      codeDisabled: false
    }
  },
  methods: {
    regist () {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/goddess/games`
      );
    },
    sendCode () {
      if (this.codeDisabled) {
        return false;
      }
      // 禁用验证码点击按钮
      this.codeDisabled = true;
      let time = 60;
      let timer = null;
      this.codeTxt = `${time}s`
      if (!timer) {
        timer = setInterval(() => {
          time--;
          this.codeTxt = `${time}s`
          if (time === 0) {
            clearInterval(timer);
            this.codeTxt = '获取验证码';
            this.codeDisabled = false;
            return false;
          }
        }, 1000)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .regist {
    background: #fff;
    overflow: hidden;
    min-height: 13.34rem;
    &-header {
      display: flex;
      align-items: center;
      height: 0.88rem;
      line-height: 0.88rem;
      background-image: linear-gradient(#38b6f7, #38b6f7),
      linear-gradient(180deg, #ff4d43 0%, #fc264b 55%, #f90650 100%);
      background-blend-mode: normal, normal;
      color: #fff;

      h1 {
        font-size: 0.34rem;
        margin-left: 2.5rem;
      }
    }

    &-title {
      margin-top: 1.47rem;
      margin-bottom: 0.58rem;
      font-size: 0.44rem;
      text-align: center;
      color: #edb2c6;
    }

    &-content {
      padding: 0 0.65rem;
    }

    &-row {
      display: flex;
      align-items: center;
      height: 0.88rem;
      line-height: 0.88rem;
      border: 1px solid #c6c8c9;
      border-radius: 0.44rem;

      &:nth-child(2) {
        margin-top: 0.3rem;
        justify-content: space-between;
      }
    }

    &-icon {
      margin-left: 0.44rem;
      display: inline-block;
      background-size: cover;

      &.phone {
        width: 0.2rem;
        height: 0.3rem;
        background-image: url("./img/icon_phone.png");
      }

      &.code {
        width: 0.22rem;
        height: 0.24rem;
        background-image: url("./img/icon_code.png");
      }
    }

    input {
      flex-grow: 1;
      margin-left: 0.2rem;

      &.code {
        max-width: 2.5rem;
        margin-left: 0.1rem;
      }
    }

    &-codetxt {
      display: inline-block;
      text-align: right;
      margin-right: 0.64rem;
      font-size: 0.28rem;
      color: #edb2c6;
    }

    &-btn {
      width: 6.2rem;
      height: 0.88rem;
      line-height: 0.88rem;
      text-align: center;
      margin-top: 0.92rem;
      background-image: linear-gradient(-7deg, #eaa9bf 0%, #edb2c6 58%, #f0bbcd 100%), linear-gradient(#ed0d22, #ed0d22);
      background-blend-mode: normal, normal;
      box-shadow: 0.03rem 0.03rem 0.06rem 0 rgba(235, 130, 178, 0.6);
      border-radius: 0.44rem;
      border: 0.02rem solid #ffdce2;
      font-size: 0.36rem;
      color: #fff;
    }
  }
</style>

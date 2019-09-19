<template>
  <div class="bg">
    <div class="background">
      <img src="./imgs/zhuli-bg.jpg" alt>
    </div>
    <div class="share-one-screen">
      <div class="share-content">
        <div class="qrcode-container">
          <div class="qrcode-msg">
            {{tel}}
            <span>邀您助力完成任务</span>
          </div>
          <div class="bind">
            <div class="info">您和您的好友均可获取10积分可兑
              <br>换2318，请前往平台领取
            </div>
            <form action class="form-container">
              <div class="form-item border-form-item">
                <div class="input-filed">
                  <!--ch-->
                  <input
                    class="input-filed-text"
                    type="text"
                    maxlength="11"
                    placeholder="请输入手机号码"
                    v-model="phoneNum"
                  >
                </div>
              </div>
              <div class="form-item border-form-item">
                <div class="input-filed">
                  <input
                    class="input-filed-text"
                    v-model="validCode"
                    type="text"
                    placeholder="请输入验证码"
                  >
                </div>
                <div class="input-extra">
                  <!--ch-->
                  <button
                    class="get-code-btn js-get-code-btn"
                    :class="{disabled:!this.canClick}"
                    type="button"
                    @click="countDown"
                  >{{getCodeContent}}</button>
                </div>
              </div>
            </form>
            <div class="download">
              <a href="http://a.app.qq.com/o/simple.jsp?pkgname=com.chinamworld.main">下载APP</a>
            </div>
            <div class="share" @click="validBind()"></div>
          </div>
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
      notPushHand: false,
      phoneNum: '',
      validCode: '',
      getCodeContent: '获取验证码',
      canClick: true,
      totalTime: 60,
      merchantId: this.$store.state.merchantId,
      isBinded: false,
      showLogin: false,
      isShared: false,
      shareConfig: {}
    };
  },
  computed: {
    customId () {
      return this.$store.state.cust.id;
    },
    tel () {
      return this.$route.params.tel;
    }
  },
  methods: {
    async validBind () {
      Indicator.open();
      let rs = await this.$post('api/verify/sms/bind/share_relation', {
        mobile: this.phoneNum,
        smsVerifyCode: this.validCode,
        shareCustomId: this.$route.params.customId,
        sharedCustomId: this.customId
      });
      if (rs.status == 200) {
        let back = rs.payload;
        localStorage.setItem('token', back.jwt);
        localStorage.setItem('cust', JSON.stringify(back.cust));
        this.$store.commit('setToken', back.jwt);
        this.$store.commit('setCust', back.cust);
        Toast('您已成功助力');
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async checkBindState () {
      let rs = await this.$post('api/check_is_shared', {
        customId: this.customId
      });
      if (rs.status == 200) {
        // 已绑定
        MessageBox.alert('您已完成助力');
      }
    },
    async getValidCode () {
      let rs = await this.$post('api/send/sms/ignore/verify/img', {
        merchantId: this.merchantId.toString(),
        mobile: this.phoneNum
      });
      if (rs.status != 200) {
        Toast(rs.error);
      }
    },
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
    this.checkBindState();
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
  margin: 1rem auto 0;
  width: 4.5rem;
  height: 1.26rem;
  background: url(./imgs/BTN_ZHULI.png) no-repeat center;
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
.bind {
  width: 5.4rem;
  margin: 0 auto;
  .info {
    margin-bottom: 0.46rem;
    color: #fff;
    font-size: 0.28rem;
    text-align: center;
    line-height: 0.44rem;
  }
  .form-item {
    position: relative;
    margin-bottom: 0.28rem;
    display: flex;
  }

  .border-form-item {
    border-radius: 0.1rem;
    overflow: hidden;
    padding-left: 0.24rem;
    background: #fff;
  }

  .input-filed {
    flex: 1;
  }

  .input-filed-text {
    width: 100%;
    padding-right: 0.2rem;
  }

  .input-filed-text {
    height: 0.96rem;
    line-height: 0.96rem;
    font-size: 0.32rem;
    color: #333;
  }

  .input-extra {
    margin-right: 0.2rem;
  }

  .get-code-btn {
    display: inline-block;
    height: 0.56rem;
    line-height: inherit;
    font-size: 0.32rem;
    color: rgb(205, 39, 78);
    border: 0;
    margin-top: 0.2rem;
    background-color: transparent;
    border-left: 1px solid rgb(205, 39, 78);
  }

  .login-form-container {
    position: absolute;
    width: 96%;
    left: 2%;
    top: 50%;
    z-index: 9;
    background-color: #fff;
    transform: translateY(-50%);
    border-radius: 0.2rem;
  }
  .page-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 1;
  }
  .get-code-btn.disabled {
    color: #ccc;
  }
  .download {
    font-size: 0.28rem;
    text-align: right;
    color: #fff;
    margin-top: 0.5rem;
    padding-right: 0.4rem;
  }
}
</style>

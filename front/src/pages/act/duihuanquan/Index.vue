<template>
  <div class="dhq">
    <div class="dhq-code-box">
      <div class="dhq-code-input">
        <input
          v-model="code"
          placeholder="请输入兑换码"
        />
      </div>
      <div
        @click="checkCode"
        class="dhq-code-btn"
      >
        确认
      </div>
    </div>
    <div
      class="dhq-icon-box"
      v-if="pro"
    >
      <img
        class="dhq-icon"
        :src="pro.standardImgUrl"
      />
      <div class="dhq-icon-name">{{pro.standardName}}</div>
      <div v-html="pro.standardInstruction"></div>
    </div>
    <div class="dhq-code-row">
      <div class="dhq-code-row-label">充值账号:</div>
      <div class="dhq-code-row-input">
        <input
          v-model="account"
          :placeholder="placeholder"
        />
      </div>
      <div></div>
    </div>
    <div class="dhq-code-row">
      <div class="dhq-code-row-label">图片验证码:</div>
      <div class="dhq-code-row-input">
        <input
          v-model="verifyCode"
          placeholder="请输入验证码"
        />
      </div>
      <div
        class="dhq-code-row-img"
        @click="getImageVerifyCode"
      >
        <img :src="imageVerifyCodeUrl" />
      </div>
    </div>
    <div
      class="dhq-code-button"
      @click="doCharge"
    >
      确定
    </div>
    <div
      class="dhq-desc"
      v-if="act"
    >
      <div class="dhq-desc-title">活动说明</div>
      <div
        class="dhq-desc-detail"
        v-html="act.detail||'暂无说明'"
      ></div>
    </div>
  </div>
</template>

<script>
import { apiBasePath } from '@/config/';
import { Toast, Indicator } from 'mint-ui';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      code: '',
      account: '',
      pro: null,
      placeholder: '请输入充值账号',
      verifyCode: '',
      imageVerifyCodeUrl: '',
      imageVerifyKey: ''
    };
  },
  methods: {
    async checkCode () {
      Indicator.open();
      let rs = await this.$post('api/show/coupon/pro', {
        couponNumber: this.code
      });
      if (rs.status == 200) {
        this.placeholder = '请输入' + rs.payload.accountName;
        this.pro = rs.payload;
      } else {
        this.pro = null;
        Toast(rs.error);
      }
      Indicator.close();
    },
    async getImageVerifyCode () {
      let rs = await this.$get('api/mobile/get/getImgCode');
      if (rs && rs.status == 200) {
        this.imageVerifyKey = rs.payload;
        this.verifyCode = '';
        // 换取图形
        this.imageVerifyCodeUrl =
          apiBasePath +
          'api/mobile/get/verifyimage?keyCode=' +
          this.imageVerifyKey;
      } else {
        alert(rs.error);
      }
    },
    async doCharge () {
      if (!this.code) {
        Toast('请输入兑换码');
        return;
      }
      if (!this.pro) {
        await this.checkCode();
      }
      if (!this.account) {
        Toast('请输入' + this.pro.accountName);
        return;
      }
      if (
        this.pro.accountPattern &&
        !new RegExp(this.pro.accountPattern).test(this.account)
      ) {
        Toast('请输入正确的' + this.pro.accountName);
        return;
      }
      if (!this.verifyCode) {
        Toast('请输入验证码');
      }
      Indicator.open();
      let rs = await this.$post('api/create/coupon_order', {
        couponNumber: this.code,
        account: this.account,
        imgCode: this.imageVerifyKey,
        codeInput: this.verifyCode,
        actId: this.act.actId,
        standardId: this.pro.standardId
      });
      if (rs.status == 200) {
        Toast('充值成功');
        this.code = '';
        this.account = '';
        this.pro = null;
        this.verifyCode = '';
      } else {
        Toast(rs.error);
        this.getImageVerifyCode();
      }
      Indicator.close();
    }
  },
  created () {
    this.getImageVerifyCode();
  }
};
</script>

<style scoped>
.dhq-code-box {
  margin: 0.5rem 0.2rem;
  height: 1rem;
  display: flex;
  border: 1px solid rgb(88, 187, 32);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
}
.dhq-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.dhq-icon {
  margin: 0 0.2rem;
  max-width: 80%;
}
.dhq-icon-name {
  line-height: 0.5rem;
  font-size: 0.3rem;
  color: #666;
}
.dhq-code-input {
  flex: 1 0 auto;
  display: flex;
}
.dhq-code-input input {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  padding: 0 10px;
  text-align: center;
  font-size: 0.3rem;
}
.dhq-code-btn {
  flex: 0 0 2rem;
  line-height: 1rem;
  text-align: center;
  color: #fff;
  background: rgb(88, 187, 32);
  font-size: 0.3rem;
}
.dhq-code-row {
  display: flex;
  margin: 0.2rem;
  height: 1rem;
  border: 1px solid rgb(88, 187, 32);
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  background: #fff;
  border-radius: 5px;
  align-items: center;
  justify-content: stretch;
  overflow: hidden;
  font-size: 0.3rem;
}
.dhq-code-row-label {
  flex: 0 0 2rem;
  text-align: center;
}
.dhq-code-row-input {
  flex: 1 1 auto;
}
.dhq-code-row-input input {
  max-width: 3rem;
}
.dhq-code-row-img {
  flex: 0 0 2rem;
  display: flex;
}
.dhq-code-button {
  height: 1rem;
  line-height: 1rem;
  width: 6rem;
  text-align: center;
  margin: 0.5rem auto;
  background: url(./imgs/BTN-queding.png);
  background-size: auto 100%;
  background-repeat: no-repeat;
  color: #fff;
  font-size: 0.36rem;
}
.dhq-desc {
  padding: 0.3rem;
}
.dhq-desc-title {
  font-size: 0.26rem;
  padding: 0.1rem 0;
  margin-bottom: 0.2rem;
  border-bottom: 1px solid #eee;
}
.dhq-desc-detail {
  line-height: 0.3rem;
  font-size: 0.26rem;
}
</style>

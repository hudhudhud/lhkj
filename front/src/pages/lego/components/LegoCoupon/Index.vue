<template>
  <div class="dhq">
    <div class="dhq-code-box" :style="{'borderColor': setting.borderColor}">
      <div class="dhq-code-input">
        <input v-model="code" placeholder="请输入兑换码">
      </div>
      <div
        @click="checkCode"
        class="dhq-code-btn"
        :style="{'backgroundColor': setting.borderColor}"
      >校验券码</div>
    </div>
    <div class="dhq-icon-box" v-if="pro">
      <img class="dhq-icon" :src="pro.standardImgUrl">
      <div class="dhq-icon-name">{{pro.standardName}}</div>
      <div v-html="pro.standardInstruction"></div>
    </div>
    <template v-if="order">
      <div class="dhq-order">
        <p>订单号:{{order.orderCode}}</p>
        <p v-if="order.fishState=='4'">充值状态:充值成功</p>
        <p v-else>充值状态:充值中</p>
        <p>充值账号:{{order.rechargeAccount}}</p>
        <p>充值金额:{{pro.originalPrice}}</p>
      </div>
    </template>
    <template v-if="!order">
      <div class="dhq-code-row" :style="{'borderColor': setting.borderColor}">
        <div class="dhq-code-row-label">充值账号:</div>
        <div class="dhq-code-row-input">
          <input v-model="account" :placeholder="placeholder">
        </div>
        <div></div>
      </div>
      <div class="dhq-code-row" :style="{'borderColor': setting.borderColor}">
        <div class="dhq-code-row-label">图片验证码:</div>
        <div class="dhq-code-row-input width2">
          <input v-model="verifyCode" placeholder="请输入验证码">
        </div>
        <div class="dhq-code-row-img" @click="getImageVerifyCode">
          <img :src="imageVerifyCodeUrl">
        </div>
      </div>
      <div class="dhq-code-button" @click="doCharge" :style="{'backgroundImage': setting.btnBg}">确定</div>
    </template>
    <div class="dhq-desc" v-if="act">
      <div class="dhq-desc-title">活动说明</div>
      <div class="dhq-desc-detail" v-html="act.detail||'暂无说明'"></div>
    </div>
  </div>
</template>

<script>
import { apiBasePath } from '@/config/';
import { Toast, Indicator } from 'mint-ui';
export default {
  props: {
    setting: {
      require: true
    }
  },
  data () {
    return {
      act: null,
      code: '',
      account: '',
      pro: null,
      placeholder: '请输入手机号',
      verifyCode: '',
      imageVerifyCodeUrl: '',
      imageVerifyKey: '',
      order: null
    };
  },
  methods: {
    async checkCode () {
      if (!this.code) {
        Toast('请输入兑换码');
        return;
      }
      Indicator.open();
      this.order = null;
      let rs = await this.$post('api/show/coupon/pro', {
        couponNumber: this.code
      });
      if (rs.status == 200) {
        this.placeholder = '请输入' + rs.payload.accountName;
        this.pro = rs.payload;
        this.order = rs.payload.order;
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
      if (!this.pro) {
        return;
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
        return;
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
    },
    async loadAct () {
      Indicator.open();
      let rs = await this.$get('api/getActDetails/' + this.setting.actId);
      if (rs.status === 200) {
        this.act = rs.payload;
      } else {
        this.error = rs.error;
      }
      Indicator.close();
    }
  },
  created () {
    this.loadAct();
    this.getImageVerifyCode();
    if (this.$route.query.sn) {
      this.code = this.$route.query.sn;
      this.checkCode();
    }
  }
};
</script>

<style scoped>
.dhq {
  position: relative;
}
.dhq-code-box {
  margin: 0.4rem;
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
  flex: 1;
  display: flex;
  padding: 0 0.2rem;
}
.dhq-code-input input {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.3rem;
}
.dhq-code-btn {
  flex: 1;
  line-height: 1rem;
  max-width: 2rem;
  text-align: center;
  color: #fff;
  font-size: 0.34rem;
}
.dhq-code-row {
  display: flex;
  margin: 0.4rem;
  height: 1.1rem;
  border: 1px solid;
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
.width2 {
  max-width: 2.1rem;
}
.dhq-code-row-input input {
  max-width: 3rem;
}
.dhq-code-row-img {
  flex: 0 0 2rem;
  display: flex;
  height: 100%;
}
.dhq-code-button {
  height: 1.02rem;
  line-height: 1rem;
  width: 5.14rem;
  text-align: center;
  margin: 0.5rem auto;
  background-size: 100% 100%;
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
  line-height: 0.4rem;
  font-size: 0.26rem;
}
.dhq-order {
  padding: 1rem;
}
</style>

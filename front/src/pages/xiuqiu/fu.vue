<template>
  <div class="fu">
    <back></back>
    <div class="header"></div>
    <div class="zhufu-contain">
      <template v-if="sui=='fu'">
        <div class="fuimg">
          <img
            src="./imgs/fuq.png"
            alt=""
          >
        </div>
        <div class="fufont">
          <img
            src="./imgs/fufont.png"
            alt=""
          >
        </div>
      </template>
      <template v-if="sui=='ai'">
        <div class="fuimg">
          <img
            src="./imgs/aiq.png"
            alt=""
          >
        </div>
        <div class="fufont aifont">
          <img
            src="./imgs/aifont.png"
            alt=""
          >
        </div>
      </template><template v-if="sui=='an'">
        <div class="fuimg">
          <img
            src="./imgs/anq.png"
            alt=""
          >
        </div>
        <div class="fufont">
          <img
            src="./imgs/anfont.png"
            alt=""
          >
        </div>
      </template><template v-if="sui=='mei'">
        <div class="fuimg">
          <img
            src="./imgs/meiq.png"
            alt=""
          >
        </div>
        <div class="fufont">
          <img
            src="./imgs/meifont.png"
            alt=""
          >
        </div>
      </template><template v-if="sui=='lu'">
        <div class="fuimg">
          <img
            src="./imgs/luq.png"
            alt=""
          >
        </div>
        <div class="fufont">
          <img
            src="./imgs/lufont.png"
            alt=""
          >
        </div>
      </template><template v-if="sui=='shou'">
        <div class="fuimg">
          <img
            src="./imgs/shouq.png"
            alt=""
          >
        </div>
        <div class="fufont">
          <img
            src="./imgs/shoufont.png"
            alt=""
          >
        </div>
      </template>
    </div>
    <div class="input-group">
      <div class="tel">
        <div class="fonttel">填写ta的手机号码</div>
        <input
          class="input"
          v-model="targetTel"
          placeholder="单行输入"
        >
      </div>
      <div class="name">
        <div class="fontname">留下你的名字吧</div>
        <input
          class="input"
          v-model="custName"
          placeholder="单行输入"
        >
      </div>
    </div>
    <div class="iconpay">
      <img
        src="./imgs/iconpay.png"
        alt=""
      >
    </div>
    <div
      class="btnpay"
      @click="createOrder"
    ></div>
    <div class="bottom"></div>
  </div>
</template>
<script>
import { Toast, Indicator } from 'mint-ui';
import { payUrl } from '@/config/';

export default {
  data () {
    return {
      sui: this.$route.params.sui,
      payUrl: payUrl,
      actId: process.env.PUBLISH_ENV == 'prod' ? '554304906' : '554197756',
      timer: null,
      targetTel: this.$route.query.custTel ? this.$route.query.custTel : '',
      errorMsg: '',
      count: 0,
      orderCode: '',
      custName: ''
    };
  },
  methods: {
    async turns () {
      if (this.count > 6) {
        Toast(this.errorMsg);
        clearTimeout(this.timer);
        Indicator.close();

        return;
      }
      this.count++;
      let rs = await this.$post('api/order/check/status', {
        orderCode: this.orderCode
      });
      if (rs.status == 200) {
        const { prepayId } = rs.payload;
        let successUrl = `${window.location.protocol}//${
          window.location.host
        }/${this.$store.state.merchantAppid}/merchant/xiuqiu/songfuover`;
        Toast('订单已生成...正在跳转支付');
        let payPath = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.replace(payPath);
      } else {
        this.errorMsg = rs.error;
        this.timer = setTimeout(() => {
          this.turns();
        }, 2000);
      }
    },
    async createOrder () {
      if (this.custName == '' || this.targetTel == '') {
        Toast('请输入完善您的绣球传递信息');
        return;
      }
      if (!new RegExp(/^1[3456789]\d{9}$/).test(this.targetTel)) {
        Toast('手机号码填写有误哦');
        return;
      }
      Indicator.open();
      let rs = await this.$post('api/activity/newCreateOrder', {
        actId: this.actId,
        standardId: this.$route.query.id,
        ballOrderVO: {
          targetTel: this.targetTel,
          custName: this.custName
        },
        commodityNum: 1
      });
      if (rs.status === 200) {
        this.orderCode = rs.payload.orderCode;
        this.turns();
      } else {
        Toast(rs.error);
        Indicator.close();
      }
    }
  }
};
</script>
<style  rel="stylesheet/scss" lang="scss" scoped>
.fu {
  width: 100%;
  min-height: 100vh;
  background: url("./imgs/ibg.jpg") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.01rem;
  padding-bottom: 1rem;
  position: relative;
  .header {
    width: 5.7rem;
    height: 0.37rem;
    background: url("./imgs/i-header.png") no-repeat;
    background-size: 100% 100%;
    margin: 0.4rem auto;
  }
  .zhufu-contain {
    width: 6.5rem;
    height: 5.57rem;
    background: url("./imgs/fukuang.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    padding-top: 0.01rem;
    .fuimg {
      width: 3.1rem;
      height: 3.1rem;
      margin: 0.4rem auto 0.2rem;
      img {
        width: 100%;
      }
    }
    // .fufont {
    //   width: 100%;
    //   height: 0.6rem;
    //   margin-top: 0.4rem;
    //   text-align: center;
    //   background: url("./imgs/aifont.png") no-repeat 50% 50%;
    //   background-size: auto 100%;
    // }
    .fufont {
      width: 100%;
      text-align: center;
      margin-top: 0.5rem;
      img {
        display: inline-block;
        height: 0.32rem;
      }
    }
    .aifont {
      img {
        height: 0.63rem;
      }
    }
  }

  .input-group {
    width: 6.6rem;
    height: 1.6rem;
    margin: 0.2rem auto;
    .tel,
    .name {
      width: 100%;
      height: 0.8rem;
      margin-bottom: 0.3rem;
      .input {
        width: 3.8rem;
        height: 0.8rem;
        background-color: #ffffff;
        border-radius: 0.1rem;
        float: right;
        padding-left: 0.2rem;
      }
    }
    .tel {
      margin-top: 0.44rem;
    }
    .fonttel,
    .fontname {
      float: left;
      width: 2.8rem;
      height: 0.8rem;
      line-height: 0.8rem;
      text-align: right;
      font-size: 0.3rem;
      color: #fff;
      padding-right: 0.3rem;
    }
  }
  .iconpay {
    width: 4.6rem;
    height: 0.58rem;
    margin: 1rem auto 0.4rem;
    img {
      width: 100%;
    }
  }
  .btnpay {
    width: 3rem;
    height: 0.8rem;
    background: url("./imgs/btnpay.png") no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
  }
  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 0.58rem;
    background: url("./imgs/bottom.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>

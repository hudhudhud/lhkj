<template>
  <div>
    <headerBar :title="act.actName"></headerBar>
    <div class="container">
      <div class="wrapper clearfix">
        <div class="banner"></div>
        <div class="buy">
          <div
            class="buy-content"
            v-for="(product,ind) in act.productList"
            :key="'product_'+ind"
          >
            <div
              class="standard clearfix"
              v-for="(standard,ind2) in product.standardList"
              :key="ind+'_standard_'+ind2"
            >
              <img :src="standard.standardImgUrl">
              <div class="standard-detail">
                <div>{{standard.standardName}}</div>
                <div v-if="standard.currentPrice">&yen;{{standard.currentPrice}}</div>
                <div
                  class="totalpoints"
                  v-if="standard.integralNum"
                >{{standard.integralNum}}{{creditName}}</div>
              </div>

              <div
                class="buy-btn"
                @click="createOrder"
              >立即购买</div>
              <div class="query"><a :href="`https://hemi.lianhaikeji.com/shredder/define/${standard.baseStandardCode}`">附近洗车店查询</a></div>
            </div>

          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
// import BuyCharge from './BuyCharge';
import { loadStandard, loadProduct } from '@/pages/buy/buy';
import headerBar from '@/components/headerBar';
import { payUrl } from '@/config/';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    headerBar
  },
  computed: {
    type () {
      return this.$route.params.type;
    },
    rid () {
      return this.$route.params.rid;
    }
  },
  data () {
    return {
      creditName:
        this.$store.state.merchantId == 187 ||
        this.$store.state.merchantId == 167
          ? '八桂金'
          : '积分',
      timer: null,
      count: 0,
      proType: 0,
      account: '',
      errorMsg: '',
      valuationType: '',
      couponCode: '',
      coinTotal: '',
      orderCode: null,
      payUrl: payUrl,
      requestFlag: true
    };
  },

  methods: {
    async getTotalCredit () {
      let rs = await this.$post('/api/user_credit/get', {
        customId: null
      });
      if (rs.status == 200) {
        this.coinTotal = rs.payload.useableCredit;
      } else {
        Toast(rs.error);
      }
    },
    async createOrder () {
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: this.act.actId,
        standardId: this.act.productList[0].standardList[0].id,
        commodityNum: 1
      });
      if (rs.status === 200) {
        if (rs.payload.is_pay == '1') {
          const { prepayId, orderCode } = rs.payload;
          let successUrl = `${window.location.protocol}//${
            window.location.host
          }/${
            this.$store.state.merchantAppid
          }/merchant/paysuccess/${orderCode}`;
          Toast('订单已生成...正在跳转支付');
          let payPath = `${
            this.payUrl
          }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
          window.location.replace(payPath);
        }
      } else {
        Toast(rs.error);
        Indicator.close();
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  },
  created () {
    this.getTotalCredit();
    if (this.type === 'product') {
      loadProduct(this.rid);
    } else if (this.type === 'standard') {
      Indicator.open();
      loadStandard(this.rid).then(rs => {
        if (rs.status === 200) {
          this.standard = rs.payload;
          this.valuationType = rs.payload.valuationType;
          this.proType = rs.payload.proType;
        }
        Indicator.close();
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  position: absolute;
  top: 0.8rem;
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.wrapper {
  position: fixed;
  width: 100%;
  min-height: 100%;
  background: #fff;
}
.banner {
  width: 100%;
  height: 1.4rem;
  background: url("./img/backbule.png") no-repeat;
  background-size: 100% 100%;
}
.buy {
  &:after {
    display: block;
    content: ".";
    height: 0;
    clear: both;
    visibility: hidden;
  }
  padding-bottom: 1.1rem;

  .buy-content {
    position: relative;
    .standard {
      min-height: 3rem;
      background: #fff;
      padding: 0.3rem;
      margin-bottom: 0.2rem;
      img {
        position: absolute;
        top: -50%;
        left: 50%;
        margin-top: 1.82rem;
        margin-left: -1.02rem;
        width: 2.04rem;
        height: 2.04rem;
      }
      .standard-detail {
        width: 100%;
        position: relative;
        margin-top: 1.2rem;
        font-size: 0.36rem;
        display: flex;
        flex-direction: column;
        div {
          text-align: center;
          line-height: 0.6rem;
          &.totalpoints {
            color: rgb(255, 119, 45);
          }
        }
      }
    }
    .charge {
      background: #fff;
      padding: 0 0.4rem;

      .charge-title {
        font-size: 0.36rem;
        line-height: 1rem;
      }
      .charge-account {
        display: flex;
      }
      .standard-proDescript {
        padding: 0.4rem 0;
      }
      .charge-standards {
        margin-left: 0.4rem;
        margin-right: 0.2rem;
        display: flex;
        flex-wrap: wrap;
        .charge-standard {
          flex: 0 0 33.33%;
          display: flex;
          box-sizing: border-box;
          padding-right: 0.2rem;
          padding-bottom: 0.2rem;
          .charge-standard-content {
            border: 1px solid #ccc;
            padding: 0.4rem;
          }
        }
      }
    }
  }
  .pay-detail {
    background: #fff;
    padding: 0 0.4rem 0.3rem;
    .pay-title {
      font-size: 0.36rem;
      line-height: 1rem;
      // border-bottom: 1px solid #ccc;
    }
    .integralPay,
    .residuealPay,
    .moneyPay {
      color: rgb(146, 151, 161);
      font-size: 0.26rem;
      margin-top: 0.26rem;
      span {
        font-size: 0.32rem;
        color: rgb(51, 51, 51);
      }
      i {
        display: inline-block;
        height: 0.4rem;
        width: 0.4rem;
        vertical-align: -0.1rem;
        margin-right: 0.16rem;
        background: url(./img/money_1_line.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .coupon {
      display: flex;
      align-items: center;
      .icon {
        height: 0.4rem;
        margin-right: 0.16rem;
        width: 0.4rem;
        background: url(./img/coupon.png) no-repeat;
        background-size: 100% 100%;
      }
      .input-warpper {
        flex: 2;
        display: flex;
        align-items: center;
        input {
          flex: 2;
        }
      }
    }
    .integralPay {
      i {
        background: url(./img/jifen.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}

.buy-btn {
  width: 5rem;
  height: 0.8rem;
  margin: 1rem auto 0.5rem;
  text-align: center;
  background: #26a2ff;
  color: #fff;
  font-size: 0.3rem;
  border-radius: 0.1rem;
  line-height: 0.8rem;
}
.query {
  font-size: 0.28rem;
  color: rgb(255, 127, 64);
  text-align: center;
}
.query a {
  color: rgb(255, 127, 64);
}
.charge-input {
  flex: 1 1 auto;
  border: none;
  border-bottom: 1px solid #ccc;
  height: 0.7rem;
  line-height: 0.7rem;
  font-size: 0.32rem;
  outline: none;
  padding-left: 0.1rem;
}
</style>

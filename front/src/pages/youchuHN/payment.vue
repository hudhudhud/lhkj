<template>
  <div>
    <div class="payment" v-if="orderDetail">
      <div class="payment-wrap">
        <div class="payment-standard">
          <!--     <img
          src="./imgs/water.png"
          alt=""
        > -->
          <span>{{$route.query.paymentName}}</span>
        </div>

        <div class="payment-price">{{orderDetail.amount.toFixed(2)}}</div>
        <div class="payment-li">
          <div class="left">缴费单位</div>
          <div>{{orderDetail.wecCompanyName}}</div>
        </div>
        <div class="payment-li">
          <div class="left">缴费户号</div>
          <div>{{orderDetail.wecaccount}}</div>
        </div>
        <div class="payment-li">
          <div class="left">户名</div>
          <div>{{orderDetail.useraddress}}</div>
        </div>
        <div class="payment-li">
          <div class="left">余额</div>
          <div>{{orderDetail.wecbalance}}</div>
        </div>
      </div>
      <div class="payment-recharge">

        <div class="inputmoney" @click="selfAdaption()" :class="{choose:checked}">
          <input type="text" placeholder="缴费金额不可少于10元" v-model="pushMoney">
          元
        </div>
      </div>
      <div class="payment-btn" @click="createOrder">
        立即缴费
      </div>
      <p class="search">找人代缴</p>
      <div class="boot">
        缴费记录<span>|</span>使用帮助
      </div>
    </div>

  </div>
</template>
<script>
import { payUrl } from '@/config/';

export default {
  data () {
    return {
      payUrl: payUrl,
      pushMoney: '',
      count: 0,
      queryId: '',
      timer: null,
      errorMsg: '',
      balance: true,
      money: ['80元', '100元', '200元'],
      mask: '0',
      checked: false,
      loading: true,
      orderDetail: null
    };
  },
  methods: {
    async createOrder () {
      if (!this.pushMoney) {
        this.$toast('请输入有效的缴费金额');
        return;
      }
      if (this.pushMoney < 10) {
        this.$toast('缴费金额不可低于10元');
        return;
      }
      this.$indicator.open();
      let query = this.$route.query;
      let rs = await this.$post('api/createOrder/', {
        actId: query.actId,
        standardId: query.proStandardId,
        account: this.queryId.toString(),
        pushPrice: this.pushMoney,
        commodityNum: 1
      });
      if (rs.status === 200) {
        let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/paysuccess/${rs.payload.orderCode}`;
        this.$toast('订单已生成...正在跳转支付');
        let payPath = `${payUrl}${
          rs.payload.prepayId
        }?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.replace(payPath);
      } else {
        this.$toast(rs.error);
      }
      this.$indicator.close();
    },
    async turns () {
      if (this.count > 10) {
        this.$toast('您选择的城市，暂时无法提供服务。');
        clearTimeout(this.timer);
        this.$indicator.close();
        return;
      }
      this.$indicator.open();

      this.count++;
      console.log('clu:' + this.count);
      let query = this.$route.query;
      let rs = await this.$post('api/search/wec/account', {
        companyId: query.companyId,
        actId: query.actId,
        proStandardId: query.proStandardId,
        account: query.account,
        queryId: this.queryId
      });
      if (rs.status == 200) {
        let payload = JSON.parse(rs.payload);
        if (payload.code == 300) {
          this.queryId = payload.queryId;
          this.errorMsg = payload.msg;
          this.timer = setTimeout(() => {
            this.turns();
          }, 3000);
        } else if (payload.code == 200) {
          this.orderDetail = payload;
          this.queryId = payload.queryId;
          this.pushMoney = this.orderDetail.amount;
          this.$indicator.close();
        } else {
          this.$indicator.close();
          this.$toast(payload.msg);
        }
      } else {
        this.$indicator.close();
        this.errorMsg = rs.error;
        this.timer = setTimeout(() => {
          this.turns();
        }, 2000);
      }
    },

    changePage (i) {
      this.mask = i;
      this.checked = false;
    },
    selfAdaption () {
      this.checked = true;
      this.mask = -1;
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  },
  created () {
    this.turns();
  }
};
</script>
<style lang="scss" scoped>
.payment {
  width: 100%;
  min-height: 100vh;
  overflow: scroll;
  background: #f3f3f3;
  &-standard {
    width: 7rem;
    height: 1rem;
    border-bottom: 1px solid rgb(249, 249, 249);
    margin: 0 auto;
    font-size: 0.32rem;
    color: #999;
    position: relative;
    line-height: 1rem;
    padding-left: 0.6rem;
    img {
      position: absolute;
      width: 0.44rem;
      display: block;
      top: 0.28rem;
      left: 0.1rem;
    }
  }
  &-wrap {
    background: #fff;
  }
  &-date {
    width: 100%;
    font-size: 0.32rem;
    margin: 0.2rem 0.4rem;
  }
  &-price {
    width: 100%;
    font-size: 0.84rem;
    text-align: right;
    padding-right: 0.5rem;
  }
  &-li {
    text-align: right;
    font-size: 0.3rem;
    color: #999;
    padding: 0.2rem;
    padding-left: 2rem;
    position: relative;
    div {
      position: relative;
    }
    .left {
      position: absolute;
      left: 0.3rem;
    }
    .address {
      text-align: justify;
    }
    .chongzhi {
      padding-right: 0.5rem;
    }
  }
  &-btn {
    width: 6.7rem;
    height: 0.98rem;
    background: url("./imgs/btnbg.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    line-height: 0.98rem;
    font-size: 0.34rem;
    color: #fff;
    margin: 0.3rem auto;
    clear: both;
  }
  p {
    font-size: 0.3rem;
    color: #23ab2d;
    width: 100%;
    text-align: center;
    margin: 0.3rem auto;
  }
  .search {
    margin-top: 1rem;
  }
  .payment-recharge {
    width: 100%;
    margin: 0.3rem auto;
    background: #fff;
    padding: 0.2rem 0;
    .recharge-tip {
      width: 100%;
      padding-left: 0.2rem;
      font-size: 0.32rem;
    }
    .recharge-main {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      margin-top: 0.3rem;
      .recharge-item {
        width: 2.16rem;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        border: solid 0.01rem #ccc;
        border-radius: 0.1rem;
      }
      .active {
        border: solid 0.01rem #23ab2d;
        color: #23ab2d;
      }
    }
    .inputmoney {
      width: 4.56rem;
      height: 0.9rem;
      border: solid 0.01rem #ccc;
      text-align: right;
      padding-right: 0.2rem;
      border-radius: 0.1rem;
      margin: 0.2rem 0.17rem;
      input {
        width: 3.8rem;
        height: 0.8rem;
        margin-top: 0.05rem;
        line-height: 0.8rem;
      }
    }
    .choose {
      border: solid 0.01rem #23ab2d;
      input {
        color: #23ab2d;
      }
    }
  }
  .boot {
    width: 100%;
    text-align: center;
    font-size: 0.26rem;
    color: #23ab2d;
    margin: 0.5rem auto;
    span {
      padding: 0 0.2rem;
    }
  }
}
.icon-go::after {
  content: "";
  width: 0.2rem;
  height: 0.2rem;
  border: solid rgb(154, 132, 137);
  border-width: 1px 1px 0 0;
  transform: translate(-50%, -50%) rotate(45deg);
  position: absolute;
  right: 2%;
  top: 50%;
}
</style>

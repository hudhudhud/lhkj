<template>
  <div>
    <div class="tab-title-wrapper">
      <div class="table-title-item" :class="{'activeTab':currentTab=='0'}" @click="currentTab='0'">
        <span class="tt-item-text">话费97折充值</span>
      </div>
      <div class="table-title-item" :class="{'activeTab':currentTab=='1'}" @click="currentTab='1'">
        <span class="tt-item-text">话费优惠券充值</span>
      </div>
      <div class="table-title-item" :class="{'activeTab':currentTab=='2'}" @click="currentTab='2'">
        <span class="tt-item-text">油卡优惠券充值</span>
      </div>
    </div>
    <div class="wrap">
      <div class="input mBottom30">
        <input type="text" v-model="account" :placeholder="placeholder">
        <div class="btn" @click="createOrder">充值</div>
      </div>
      <template v-if="currentTab==0">
        <div class="tips">1.每人总共3次机会。
          <br>2.已发起交易但未支付的订单，请到主页面下方“我的”里面完成支付。
          <br>3.订单存在有效期，发起后未支付导致订单关闭的，机会失效。
          <br>4.话费具体到账时间，以运营商短信通知为准。
        </div>
      </template>
      <template v-if="currentTab==1 ">
        <div class="input">
          <input class="coupon" type="text" v-model="couponNumber" placeholder="请输入优惠码">
        </div>
        <div
          class="tips"
        >请输入手机号码和优惠券码，点击充值。仅支持优惠券充值。优惠券存在有效期，因此请务必尽快使用，已发起交易但未支付的订单，请到主页面下方“我的”里面完成支付，订单发起后未支付或取消导致券码失效的，不退不补。注意：5.01元该面值只支持特定活动优惠券</div>
      </template>
      <template v-if="currentTab==2 ">
        <div class="input">
          <input class="coupon" type="text" v-model="couponNumber" placeholder="请输入优惠码">
        </div>
        <div class="tips">（1）每次只能抵用一张，具体抵扣面值按实际支付为准。
          <br>（2）【中石化输入1开头19位中石化油卡号充值，中石油输入9开头16位中石油卡号充值】
          <br>（3）油卡产品充值1-48小时到账，充值成功以平台短信通知为准。
          <br>（4）您还需要到中石化加油站加油机上进行订单金额圈存，这样您充值的金额才能到账使用。
          <br>（5）兑换使用过程中如有疑问，可拨打客服电话：0571-58106068。
        </div>
      </template>
      <div class="wrapper" v-for="(product,ind) in act.productList" :key="'pro_'+ind">
        <div class="label">{{product.proName}}面额</div>
        <div class="product">
          <div
            class="product-item"
            v-for="(std, ind2) in product.standardList"
            :key="'std_'+std.id"
            @click="select(ind2, std, product.id)"
            :class="{'active': ind2 == index && productId == product.id}"
          >
            <div class="tip" v-if="currentTab==0 && actArr[0] == '103'"></div>
            <div
              class="decoration"
              v-if="currentTab==0 && actArr[0] == '103'"
            >{{std.originalPrice}}元</div>
            <div>{{std.currentPrice}}元</div>
          </div>
          <div class="spinner" v-if="SpinnerFlag">
            <mt-spinner type="triple-bounce"></mt-spinner>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast, Spinner } from 'mint-ui';
import { payUrl } from '@/config/';
export default {
  props: {
    setting: {
      type: Object,
      required: true
    }
  },
  components: {
    [Spinner.name]: Spinner
  },
  data () {
    return {
      SpinnerFlag: false,
      currentTab: 0,
      act: {
        productList: []
      },
      actArr: this.setting.actId.split(','),
      index: -1,
      payUrl: payUrl,
      cust: this.$store.state.cust,
      placeholder: '',
      accountPattern: '',
      couponNumber: '',
      standard: {},
      productId: '',
      account: ''
    };
  },
  watch: {
    currentTab: function (val) {
      this.index = -1;
      this.loadAct(this.actArr[val]);
    }
  },
  methods: {
    async createOrder () {
      if (!this.account) {
        Toast('请输入' + this.placeholder);
        return;
      }
      if (!this.standard.id) {
        Toast('请先选择充值面值');
        return;
      }
      if (!new RegExp(this.accountPattern).test(this.account)) {
        Toast(this.standard.accountName + '输入有误');
        return;
      }
      if (this.currentTab != 0) {
        if (!this.couponNumber) {
          Toast('请填写优惠码');
          return;
        }
      }
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: this.actArr[this.currentTab] - 0,
        standardId: this.standard.id,
        commodityNum: 1,
        account: this.account,
        couponNumber: this.couponNumber
      });
      if (rs.status === 200) {
        if (rs.payload.is_pay == '1') {
          let successUrl = `${window.location.protocol}//${
            window.location.host
          }/${this.$store.state.merchantAppid}/merchant/paysuccess/${
            rs.payload.orderCode
          }`;
          Toast('订单已生成...正在跳转支付');
          let payPath = `${payUrl}${
            rs.payload.prepayId
          }?redirectUrl=${encodeURIComponent(successUrl)}`;
          window.location.replace(payPath);
        } else {
          Toast('下单成功');
          window.location.replace(
            `${window.location.protocol}//${window.location.host}/${
              this.$store.state.merchantAppid
            }/merchant/index/order`
          );
        }
      } else {
        Toast('订单生成失败:' + rs.error);
      }
      Indicator.close();
    },
    select (i, std, productId) {
      this.index = i;
      if (std) {
        Object.assign(this.standard, std);
        // console.log(this.standard)
        this.placeholder = '请输入' + std.accountName;
        this.accountPattern = std.accountPattern;
        this.productId = productId;
      }
    },
    async loadAct (actId) {
      this.SpinnerFlag = true;
      // Indicator.open()
      // let rs = await this.$get('http://rap2api.taobao.org/app/mock/21855/prizeInfo')
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.act = rs.payload;
        this.placeholder =
          '请输入' + rs.payload.productList[0].standardList[0].accountName;
      } else {
        // this.error = rs.error
      }
      // Indicator.close()
      this.SpinnerFlag = false;
    },
    buy (standard) {
      this.$router.push(
        `/${
          this.$store.state.merchantAppid
        }/merchant/index/cbbBuy001/standard/${standard.id}`
      );
    }
  },
  created () {
    this.loadAct(this.actArr[0]);
  },
  mounted () {
    // console.log(this.setting)
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tab-title-wrapper {
  margin-bottom: 0.2rem;
  padding: 0 0.3rem;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  background: #fff;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
.spinner {
  position: absolute;
  top: 8.8rem;
  left: 50%;
  text-transform: translate(-55%);
  text-align: center;
}
.table-title-item {
  flex: 1;
  line-height: 1rem;
  font-size: 0.3rem;
  text-align: center;
  color: #999999;
}

.table-title-item.activeTab {
  color: #1fafef;
}

.table-title-item.activeTab {
  display: inline-block;
  border-bottom: 4px solid rgb(9, 182, 242);
}

.tab-content-wrapper {
  position: absolute;
  top: 1.2rem;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}
.wrap {
  padding: 0 0.3rem;
  .input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.mBottom30 {
      margin-bottom: 0.3rem;
    }
    input {
      border: 1px solid #999;
      border-radius: 0.2rem;
      padding: 0 0.4rem;
      height: 0.8rem;
      min-width: 5.6rem;
      color: #434343;
      &.coupon {
        height: 0.8rem;
        line-height: 0.8rem;
      }
    }
    .btn {
      display: flex;
      height: 1.05rem;
      width: 1.05rem;
      line-height: 1.05rem;
      justify-content: center;
      border-radius: 50%;
      background: url(./imgs/charger.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .tips {
    margin: 0.1rem 0 0.2rem;
    color: #999;
    font-size: 0.2rem;
    line-height: 0.4rem;
  }
  .wrapper {
    color: #666;
  }
  .product {
    display: flex;
    flex-wrap: wrap;
    .product-item {
      position: relative;
      white-space: nowrap;
      line-height: 0.4rem;
      border: 1px solid #999;
      padding: 0.2rem 0;
      flex: 1;
      margin: 0.1rem;
      border-radius: 0.1rem;
      text-align: center;
      min-width: 1.5rem;
      max-width: 1.5rem;
      color: #333;
      .tip {
        position: absolute;
        top: -0.03rem;
        right: -0.02rem;
        width: 0.57rem;
        height: 0.26rem;
        background: url(./imgs/97.png) no-repeat;
        background-size: 100% 100%;
      }
      .decoration {
        text-decoration: line-through;
      }
    }
    .active {
      color: #09b6f2;
      border: 1px solid #09b6f2;
    }
  }
}
</style>

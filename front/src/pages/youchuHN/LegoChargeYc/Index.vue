<template>
  <div>
    <div class="wrap">
      <div class="input">
        <input
          type="text"
          v-model="phone"
          placeholder="请输入手机号"
        />
        <div
          class="btn"
          @click="go()"
        >
          <img
            src="./imgs/charger.jpg"
            alt=""
          >
        </div>
      </div>
      <template v-if="setting.couponSurport== true">
        <div class="input">
          <input
            class="coupon"
            type="text"
            v-model="couponNumber"
            placeholder="请输入优惠码"
          />
        </div>
        <div class="tips">请输入手机号码和优惠券码，点击充值。</div>
      </template>

      <div
        v-else
        class="tips"
      >请输入手机号码,选择充值金额点击“充值”。</div>
      <div
        class="wrapper"
        v-for="(product,ind) in act.productList"
        :key="'pro_'+ind"
      >
        <!-- <div class="label">{{product.proName}}面额</div> -->
        <div class="product">
          <div
            class="product-item"
            v-for="(std, ind2) in product.standardList"
            :key="'std_'+std.id"
            @click="select(ind2, std.id)"
            :class="{'active': ind2 == index, 'mR2': (ind2+1)%3!=0}"
          >
            <div class="tip"></div>

            <div>{{std.originalPrice}}元</div>
          </div>
        </div>
      </div>

    </div>
    <mt-popup
      v-model="showtip"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="tipmsg">
        <div class="tipcontent">
          尊敬的客户，本月您已享受过68折优惠活动，本次缴费需原价支付哦。
        </div>
        <div
          class="btntip"
          @click="gotopay()"
        ><img
            src="../imgs/btntip.png"
            alt=""
          ></div>
      </div>
      <div
        class="tipclose"
        @click="showtip=false"
      ><img
          src="../imgs/close.png"
          alt=""
        ></div>
    </mt-popup>

    <mt-popup
      v-model="showtip1"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="tipmsg1">
        <div class="tiptop">温馨提示</div>
        <div class="tipcontent"> 每周六周日上午9点起，使用湖南省内邮储银行卡支付才有机会享受68折优惠哦。</div>
        <div
          class="btnnext"
          @click="showtip1=false, createOrder()"
        ><img
            src="../imgs/btnsure.png"
            alt=""
          ></div>
      </div>
      <div
        class="tipclose"
        @click="showtip1=false"
      ><img
          src="../imgs/close.png"
          alt=""
        ></div>
    </mt-popup>
  </div>
</template>

<script>
import { Indicator, Toast, Spinner, Popup } from 'mint-ui';
import { payUrl } from '@/config/';
export default {
  name: 'legoCharge',
  props: {
    setting: {
      type: Object,
      required: true
    },
    settingAll: {
      type: String,
      required: true
    }
  },
  components: {
    [Spinner.name]: Spinner,
    [Popup.name]: Popup
  },
  data () {
    return {
      showtip1: false,
      showtip: false,
      SpinnerFlag: false,
      act: {
        productList: []
      },
      actArr: this.setting.actId.split(','),
      index: -1,
      payUrl: payUrl,
      cust: this.$store.state.cust,
      couponNumber: '',
      standardId: '',
      phone: this.$store.state.cust ? this.$store.state.cust.tel : '',
      orderCode: '',
      prepayId: '',
      payttipshow: false
    };
  },
  methods: {
    go () {
      if (!this.phone) {
        Toast('请输入手机号');
        return;
      }
      if (!this.standardId) {
        Toast('请先选择话费面值');
        return;
      }
      this.showtip1 = true;
    },
    async createOrder () {
      if (!this.phone) {
        Toast('请输入手机号');
        return;
      }
      if (!this.standardId) {
        Toast('请先选择话费面值');
        return;
      }
      let phoneReg = /^1[3456789]\d{9}$/;
      if (!phoneReg.test(this.phone)) {
        Toast('手机号输入有误');
        return;
      }
      if (this.setting.couponSurport == true && !this.couponNumber) {
        Toast('请填写优惠码');
        return;
      }
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: this.actArr[0] - 0,
        standardId: this.standardId,
        commodityNum: 1,
        account: this.phone,
        couponNumber: this.couponNumber
      });
      if (rs.status === 200) {
        // let week = new Date().getDay();
        // console.log(week);
        // if (week === 0 || week === 6) {
        //   if (rs.payload.is_pay == '1') {
        //     let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/paysuccess/${rs.payload.orderCode}`;
        //     Toast('订单已生成...正在跳转支付');
        //     let payPath = `${payUrl}${
        //       rs.payload.prepayId
        //     }?redirectUrl=${encodeURIComponent(successUrl)}`;
        //     window.location.replace(payPath);
        //   } else {
        //     Toast('下单成功');
        //     window.location.replace(
        //       `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/order`
        //     );
        //   }
        // } else {
        if (rs.payload.is_pay == '1') {
          this.orderCode = rs.payload.orderCode;
          this.prepayId = rs.payload.prepayId;
          if (this.payttipshow) {
            this.showtip = true;
          } else {
            let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/paysuccess/${rs.payload.orderCode}`;
            Toast('订单已生成...正在跳转支付');
            let payPath = `${payUrl}${
              rs.payload.prepayId
            }?redirectUrl=${encodeURIComponent(successUrl)}`;
            window.location.replace(payPath);
          }
        } else {
          Toast('下单成功');
          window.location.replace(
            `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/order`
          );
        }
      } else {
        Toast('订单生成失败:' + rs.error);
      }
      Indicator.close();
    },
    gotopay () {
      let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/paysuccess/${this.orderCode}`;
      let payPath = `${payUrl}${this.prepayId}?redirectUrl=${encodeURIComponent(
        successUrl
      )}`;
      window.location.replace(payPath);
    },
    select (i, id) {
      this.index = i;
      if (id) {
        this.standardId = id;
      }
    },
    async loadAct (actId) {
      this.SpinnerFlag = true;
      // Indicator.open()
      // let rs = await this.$get('http://rap2api.taobao.org/app/mock/21855/prizeInfo')
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.act = rs.payload;
      } else {
        // this.error = rs.error
      }
      // Indicator.close()
      this.SpinnerFlag = false;
    },
    buy (standard) {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/index/cbbBuy001/standard/${standard.id}`
      );
    },
    async checktip () {
      let rs = await this.$post('api/order/searchIsRecharge', {
        actIds: this.settingAll
      });
      if (rs.status === 200) {
        this.payttipshow = true;
      }
    }
  },
  created () {
    console.log(1111, this.settingAll);
    this.loadAct(this.actArr[0]);
    this.checktip();
  },
  mounted () {
    // console.log(this.setting)
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";

.tab-title-wrapper {
  margin-bottom: 0.2rem;
  padding: 0 0.3rem;
  display: flex;
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
  width: 100%;
  padding: 0 0.3rem;
  overflow-x: hidden;
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
      color: #434343;
      min-width: 5.6rem;
      &.coupon {
        height: 0.8rem;
        line-height: 0.8rem;
      }
    }
    .btn {
      display: flex;
      height: 1.05rem;
      width: 1.05rem;
      border-radius: 50%;
      // background: url(./imgs/charger.jpg) no-repeat;
      // background-size: cover;
      img {
        width: 100%;
      }
    }
  }
  .tips {
    color: #999;
    font-size: 0.2rem;
    line-height: 0.4rem;
  }
  .wrapper {
    width: 6.84rem;
    margin: 0 auto;
    // padding-right: 0.14rem;
  }
  .product {
    @include flex(row, wrap, flex-start, center);
    width: 100%;
    font-size: 0.32rem;
    .product-item {
      position: relative;
      @include flex(column, wrap, center, center);
      min-width: 2.14rem;
      max-width: 2.14rem;
      white-space: nowrap;
      border: 1px solid #999;
      margin: 0.1rem 0;
      border-radius: 0.1rem;
      text-align: center;
      color: #666;
      height: 1.16rem;
      &.mR2 {
        margin-right: 0.2rem;
      }
      .tip {
        position: absolute;
        top: -0.03rem;
        left: -0.03rem;
        width: 0.92rem;
        height: 0.35rem;
        background: url(./imgs/yh.png) no-repeat;
        background-size: 100% 100%;
      }
    }
    .active {
      color: #ff5c5c;
      background: #fdcecf;
      border: 3px solid #df1f20;
      font-weight: 600;
    }
  }
}
.tipmsg {
  width: 5.89rem;
  height: 6.24rem;
  background: url("../imgs/tip.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 2.2rem;
  .tipcontent {
    width: 80%;
    text-align: center;
    font-size: 0.34rem;
    margin: 0.3rem auto;
    line-height: 0.6rem;
  }
  .btntip {
    width: 3.43rem;
    height: 0.78rem;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}
.tipclose {
  width: 0.52rem;
  height: 0.52rem;
  margin: 0.3rem auto;
  img {
    width: 100%;
  }
}
.mypop {
  background: transparent;
}
.tipmsg1 {
  width: 5.88rem;
  min-height: 4rem;
  background: url(../imgs/tip.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 0.001rem;
  padding-bottom: 0.5rem;
  .tipcontent {
    font-size: 0.26rem;
    color: #333;
    text-indent: 0.4rem;
    line-height: 0.45rem;
    width: 80%;
    margin: 0.3rem auto;
  }
  .tiptop {
    width: 100%;
    text-align: center;
    font-size: 0.4rem;
    font-weight: 700;
    margin: 0.3rem auto 1.1rem;
    color: #fff;
  }

  .btnnext {
    width: 3.43rem;
    height: 0.78rem;
    margin: 0.3rem auto 0;
    img {
      width: 100%;
    }
  }
}
</style>

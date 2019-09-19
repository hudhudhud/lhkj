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
          @click="createOrder"
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

            <!-- <div>{{std.integralNum}}</div> -->
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
      act: {
        productList: []
      },
      actArr: this.setting.actId.split(','),
      index: -1,
      payUrl: payUrl,
      cust: this.$store.state.cust,
      couponNumber: '',
      standardId: '',
      phone: this.$store.state.cust ? this.$store.state.cust.tel : ''
    };
  },
  methods: {
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
      background: url(./imgs/charger.png) no-repeat;
      background-size: cover;
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
      color: #138f1c;
      background: #c9e7cb;
      border: 3px solid #138f1c;
    }
  }
}
</style>

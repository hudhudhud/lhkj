<template>
  <div>
    <div class="wrap">
      <div class="product-wrapper">
        <div class="product" v-for="(product,ind) in act.productList" :key="'pro_'+ind" @click="getProDetails(product.id, ind)">
          <img v-if="productIndex == ind" :src="iconOnUrlList[ind]" ref="productImg">
          <img v-else :src="product.iconUrl" ref="productImg">
          <div>{{product.proName}}</div>
        </div>

      </div>
      <div class="standard-wrapper">
        <div class="input mBottom30" v-show="accountName">
          <input type="text" v-model="account" class="account" :placeholder="'请输入'+accountName" />
        </div>
        <div class="input mBottom30" v-if="productIndex !=0">
          <input type="text" v-model="couponNumber" :placeholder="'请输入优惠码'" />
        </div>
        <div class="standard-item" v-for="(std, ind2) in standardList" :key="'std_'+std.id" @click="select(ind2, std.id)" :class="{'active': ind2 == index}">
          <div class="name">{{std.standardName}}</div>
          <div class="corner-tip" v-if="std.originalPrice-std.currentPrice">立减</div>
          <div class="originalPrice" v-if="std.originalPrice-std.currentPrice">原价：{{std.originalPrice}}元</div>
          <div>现价：{{std.currentPrice}}元</div>
        </div>
        <div class="spinner" v-if="SpinnerFlag">
          <mt-spinner type="triple-bounce"></mt-spinner>
        </div>
      </div>
      <div class="btn" @click="createOrder">
        下单
      </div>
      <div class="act-rule" v-if="proDescript">
        <div class="rule-title">使用说明</div>
        <div class="detail" v-html="proDescript"></div>
      </div>
    </div>
  </div>
</template>

<script>
import iconOn0 from './imgs/icon-0-on.png'
import iconOn1 from './imgs/icon-1-on.png'
import iconOn2 from './imgs/icon-2-on.png'
import iconOn3 from './imgs/icon-3-on.png'
import iconOn4 from './imgs/icon-4-on.png'
import iconOn5 from './imgs/icon-5-on.png'
import iconOn6 from './imgs/icon-6-on.png'
import iconOn7 from './imgs/icon-7-on.png'
import { Indicator, Toast, Spinner } from 'mint-ui'
import { payUrl } from '@/config/'
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
      iconOnUrlList: [
        iconOn0,
        iconOn1,
        iconOn2,
        iconOn3,
        iconOn4,
        iconOn5,
        iconOn6,
        iconOn7
      ],
      standardList: [],
      actArr: this.setting.actId.split(','),
      productIndex: -1,
      index: -1,
      payUrl: payUrl,
      cust: this.$store.state.cust,
      standardId: '',
      couponNumber: '',
      proDescript: '',
      account: ''
    }
  },
  computed: {
    accountName: function () {
      return this.standardList[0] && this.standardList[0].accountName || ''
    },
    accountPattern: function () {
      return this.standardList[0] && this.standardList[0].accountPattern || null
    }
  },
  methods: {
    async getProDetails (id, i) {
      this.proDescript = this.act.productList[i].proDescript
      Indicator.open()
      let rs = await this.$get('api/getProDetails/' + id)
      if (rs.status == 200) {
        this.productIndex = i
        this.index = -1
        this.standardId = ''
        this.standardList = rs.payload.standardList
        this.proType = rs.payload.proType
        this.$nextTick(() => {
        })
      } else {
        Toast(rs.error)
      }
      Indicator.close()
    },
    async createOrder () {
      if (!this.account) {
        Toast('请输入' + this.accountName)
        return
      }
      if (!this.standardId) {
        Toast('请先选择话费面值')
        return
      }
      let reg = new RegExp(this.accountPattern)
      if (reg) {
        if (!reg.test(this.account)) {
          Toast(this.accountName + '输入有误')
          return
        }
      }
      Indicator.open()
      let rs = await this.$post('api/createOrder/', {
        actId: this.actArr[0] - 0,
        standardId: this.standardId,
        commodityNum: 1,
        couponNumber: this.couponNumber,
        account: this.account
      })
      if (rs.status === 200) {
        if (rs.payload.is_pay == '1') {
          let successUrl = `${window.location.protocol}//${window.location.host}/${
            this.$store.state.merchantAppid
          }/merchant/paysuccess/${rs.payload.orderCode}`
          Toast('订单已生成...正在跳转支付')
          let payPath = `${payUrl}${rs.payload.prepayId}?redirectUrl=${encodeURIComponent(successUrl
          )}`
          window.location.replace(payPath)
        } else {
          Toast('下单成功')
          window.location.replace(
            `${window.location.protocol}//${window.location.host}/${
              this.$store.state.merchantAppid
            }/merchant/index/order`
          )
        }
      } else {
        Toast('订单生成失败:' + rs.error)
      }
      Indicator.close()
    },
    select (i, id) {
      this.index = i
      if (id) {
        this.standardId = id
      }
    },
    async loadAct (actId) {
      this.SpinnerFlag = true
      Indicator.open()
      let rs = await this.$get('api/getActDetails/' + actId)
      if (rs.status === 200) {
        this.act = rs.payload
        this.standardList = this.act.productList[0].standardList
        this.proDescript = this.act.productList[0].proDescript
      } else {
        // this.error = rs.error
      }
      Indicator.close()
      this.SpinnerFlag = false
    },
    buy (standard) {
      this.$router.push(`/${this.$store.state.merchantAppid}/merchant/index/cbbBuy001/standard/${standard.id}`)
    }
  },
  created () {
    this.loadAct(this.actArr[0])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
  .product-wrapper {
    display: flex;
    flex-wrap: wrap;
    color: #434343;
    .product {
      flex: 1;
      min-width: 25%;
      text-align: center;
      img {
        width: 60%;
        margin-top: 0.2rem;
      }
      div {
        font-size: 0.24rem;
        line-height: 0.4rem;
      }
    }
  }
  .standard-wrapper {
    margin-top: 0.3rem;
    overflow: hidden;
    .input {
      padding: 3%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      input {
        border: 1px solid #999;
        border-radius: 0.1rem;
        padding: 0 0.7rem 0 0.4rem;
        height: 0.8rem;
        color: #434343;
        min-width: 100%;
        &.account {
          background: url(./imgs/man.png) no-repeat right center;
        }
      }
    }
    .standard-item {
      width: 47%;
      display: inline-block;
      position: relative;
      white-space: nowrap;
      line-height: 0.4rem;
      border: 1px solid #999;
      padding: 0.2rem 0;
      margin: 0.1rem;
      border-radius: 0.1rem;
      text-align: center;
      color: #999;
      .name {
        font-weight: 400;
      }
      .originalPrice {
        color: #999;
        text-decoration: line-through;
      }
      .corner-tip {
        display: block;
        color: white;
        position: absolute;
        top: 9px;
        width: 126px;
        padding-right: 12px;
        right: -46px;
        background-size: 100%;
        font-size: 13px;
        font-weight: 700;
        line-height: 30px;
        background: url("./imgs/jiao.png") no-repeat center center;
        transform: rotate(50deg) scale(0.78);
      }
    }
    .active {
      color: #09b6f2;
      // background: #09b6f2;
      border: 1px solid #09b6f2;
    }
  }
  .btn {
    height: 0.9rem;
    width: 6.2rem;
    margin: 0.3rem auto;
    line-height: 0.9rem;
    border-radius: 0.1rem;
    background: #09b6f2;
    color: #fff;
    text-align: center;
    font-size: 0.3rem;
    font-weight: 700;
  }
}
.act-rule {
  padding: 0.2rem 0.2rem;
  color: #999;
  .rule-title {
    padding: 0.1rem 0;
  }
  .detail {
    font-size: 0.24rem;
    line-height: 0.3rem;
  }
}
</style>

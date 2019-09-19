<template>
  <div class="lego-charger" v-if="slotData">
    <div class="lego-charger-input">
      <div class="lego-charger-input-box">
        <input class="lego-charger-input-inpt" v-model="account" :placeholder="currentStd?currentStd.accountName:''" />
        <input class="lego-charger-input-inpt" v-model="couponNumber" placeholder="请输入优惠码" />
      </div>
        <div class="lego-charger-input-button" @click="doCharge">
          <img src="//static.lianhaikeji.com/images/20180917/cff99f0fcd834572b5869c9e8e794fd5.png" />
      </div>
        </div>
        <div class="lego-charger-tips">
          {{setting.desc}}
        </div>
        <div class="lego-charge-list" v-if="slotData && slotData.standardList">
          <div class="lego-charge-std" :class="{'lego-charge-std-active':std==currentStd}" @click="currentStd=std" v-for="std in slotData.standardList" :key="std.id">{{std.standardName}}</div>
        </div>
      </div>
</template>

<script>
import {Toast, Indicator} from 'mint-ui'
import { payUrl } from '@/config/'

export default {
  props: {
    setting: {
      type: Object
    }
  },
  data () {
    return {
      slotData: {},
      currentStd: null,
      account: '',
      couponNumber: ''
    }
  },
  watch: {
    'setting.proId': function (val) {
      if (val) {
        this.loadProduct(val)
      } else {
        this.slotData = null
      }
    }
  },
  methods: {
    async loadProduct (proId) {
      let rs = await this.$get('api/lego/getProDetails/' + proId)
      if (rs.status == 200) {
        this.slotData = rs.payload
        if (this.slotData.standardList) {
          this.currentStd = this.slotData.standardList[0]
        }
      } else {
        this.slotData = null
      }
    },
    async doCharge () {
      if (!this.account) {
        Toast('请输入' + this.currentStd.accountName)
        return
      }
      if (this.currentStd.accountPattern) {
        let reg = new RegExp(this.currentStd.accountPattern)
        if (!reg.test(this.account)) {
          Toast('账号格式有误，请重新输入')
          return
        }
      }
      this.createOrder()
    },
    async createOrder () {
      Indicator.open()

      let rs = await this.$post('api/createOrder/', {
        actId: this.slotData.actId,
        standardId: this.currentStd.id,
        commodityNum: 1,
        account: this.account,
        couponNumber: this.couponNumber
      })
      if (rs.status === 200) {
        if (rs.payload.is_pay == '1') {
          let payload = rs.payload
          let successUrl = `${window.location.protocol}//${window.location.host}/${
            this.$store.state.merchantAppid
          }/merchant/lego/${this.setting.callbackPage}`

          let prepayId = payload.prepayId
          Toast('订单已生成...正在跳转支付')
          let payPath = `${payUrl}${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`
          window.location.replace(payPath)
        } else {
          Toast('支付成功')
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
    }
  },
  created () {
    if (this.setting.proId) {
      this.loadProduct(this.setting.proId)
    }
  }
}
</script>

<style scoped>
.lego-charger {
  display: flex;
  flex-direction: column;
}
.lego-charger-input {
  display: flex;
}
.lego-charger-input-box {
  flex: 1 1 80%;
  display: flex;
  flex-direction: column;
}
.lego-charger-input-inpt {
  flex: 0 0 0.8rem;
  margin-bottom: 10px;
  outline: none;
  line-height: 0.8rem;
  padding: 0 10px;
  border: 1px solid #999;
  border-radius: 10px;
}
.lego-charger-input-button {
  flex: 0 0 60px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.lego-charger-input-button img {
  height: 50px;
  width: 50px;
}
.lego-charger-tips {
  flex: 1 1 auto;
  line-height: 20px;
  font-size: 12px;
  color: #999;
}
.lego-charge-list {
  flex: 1 1 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.lego-charge-std {
  flex: 0 0 2.3rem;
  min-height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-bottom: 0.1rem;
  margin-right: 0.1rem;
  border: 1px solid #ccc;
}
.lego-charge-std:nth-child(3n) {
  margin-right: 0;
}
.lego-charge-std-active {
  border: 1px solid orange;
  color: orange;
}
</style>

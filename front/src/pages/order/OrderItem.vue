<template>
  <div class="order-item" v-if="order">
    <div class="order-date-code">
      <div class="order-item-time">
        {{order.orderTime}}
      </div>
      <div class="order-item-paynotice" v-if="order.payState==PAY_STATE_CREATE && canPay">
        请在{{latestPayTimeFormatted}}内完成支付</div>
    </div>
    <template v-if="order.actName=='中行滴滴-北京'">
      <div class="order-item-icon" style="backgroundSize:cover;backgroundPosition: -0.2rem 0;"
        :style="{'backgroundImage': 'url('+order.standardImgUrl+ ')'}"></div>

    </template>
    <template v-else>
      <img class="order-item-icon" :src="order.standardImgUrl" />
    </template>
    <div class="order-item-info">
      <div class="order-item-info-content">
        <div class="order-item-name">
          <!--  {{order.proName}} -->
          <!-- <br/> --><span v-html="order.proStandardName"></span> &times; <span v-html="order.commodityNum"></span>
          <!-- <div class="order-item-tag" v-if="order.credit>0">积分兑换</div> -->
        </div>
        <div class="order-item-price" v-if="order.actualPrice>0">¥{{order.actualPrice}}</div>
      </div>
      <div class="order-item-state">
        <!-- 未支付 -->
        <template v-if="order.payState==PAY_STATE_CREATE">
          <!-- <div class="order-item-paynotice" v-if="canPay">请在{{latestPayTimeFormatted}}内完成支付</div> -->
          <div class="order-item-state-item" v-if="!canPay && order.orderState!=ORDER_STATE_CANCEL">超时未支付</div>
          <div class="order-item-state-btn" v-if="canPay" @click="pay">立即支付</div>
          <div class="order-item-state-btn" v-if="order.orderState==ORDER_STATE_CREATE"
            @click="cancelOrder(order.orderCode)">取消订单</div>
        </template>

        <!-- 已支付 -->
        <template v-if="order.payState==PAY_STATE_PAID">
          <div class="order-item-state-item" v-if="order.actType == '1' || order.actType == '3'">已支付</div>
          <div class="order-item-state-btn" v-if="order.proType == '9'">
            <span @click="getAddress">查看地址</span>
          </div>
          <!--           <div class="order-item-state-btn" v-if=" order.proType == '10'">
 -->
          <div class="order-item-state-btn" v-if="$store.state.merchantId==182&& order.proType == '10'">
            <span @click="getSignInfo">查看报名信息</span>
          </div>
          <div class="order-item-state-btn" v-if="order.fishState==FISH_STATE_CREATE && order.proType < 3 ">
            <span v-if="order.proType=='1'|| order.proType=='14'" @click="charge">立即充值</span>
            <span v-if="order.proType=='2'" @click="getCardPwd">
              <template v-if="order.proStandardId ==1646|| order.proStandardId ==1903">
                点击领取
              </template>
              <template v-else>
                查看卡密与规则
              </template>
            </span>
          </div>
          <template v-else-if="order.fishState==FISH_STATE_CALLBACK_SUCCESS">
            <div v-if="order.proType=='1'|| order.proType=='14'"
              class="order-item-state-item order-item-state-item-success">充值成功
              <div class="order-item-state-btn" @click="drawAccount">查看充值账号</div>
            </div>
            <div v-if="order.proType=='2'" class="order-item-state-btn" @click="getCardPwd"> <template
                v-if="order.proStandardId ==1646 || order.proStandardId ==1903">
                点击领取
              </template>
              <template v-else>
                查看卡密与规则
              </template></div>
          </template>
          <template v-else-if="order.proType=='1'|| order.proType=='14'">
            <div class="order-item-state-item">充值中</div>
            <div class="order-item-state-btn" @click="drawAccount">查看充值账号</div>
            <div class="order-info">
              5分钟内到账，网络延迟48小时内到账。</div>

          </template>
          <div v-else-if="order.proType=='2'" class="order-item-state-btn">
            <span @click="getCardPwd">
              <template v-if="order.proStandardId ==1646 || order.proStandardId ==1903">
                点击领取
              </template>
              <template v-else>
                查看卡密与规则
              </template></span>
          </div>
          <div class="order-item-state-item" v-if="order.orderState==ORDER_STATE_EXPIRE">订单已过期</div>
        </template>

        <!-- 退款或超时支付的 -->
        <div class="order-item-state-item" v-if="order.payState==PAY_STATE_REFUNDING">退款中</div>
        <div class="order-item-state-item" v-if="order.payState==PAY_STATE_REFUNDED">已退款</div>
        <div class="order-item-state-item" v-if="order.payState==PAY_STATE_PAYLATE">超时支付,待退款</div>
        <div class="order-item-state-item" v-if="order.orderState==ORDER_STATE_CANCEL">已取消</div>
      </div>
    </div>
    <div class="order-item-code">
      订单号：{{order.orderCode}}
      <!-- 参与活动：{{order.actName}} -->
    </div>
    <div class="order-item-code" v-if="$store.state.merchantId==171">有效期至：{{endTime}}</div>
  </div>
</template>

<script>
import OrderState from '@/lib/OrderState';
import moment from 'moment';
import { Indicator, Toast, MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';
export default {
  props: {
    orderInfo: {
      require: true,
      type: Object
    }
  },
  data () {
    return {
      order: this.orderInfo,
      ...OrderState,
      latestPayTime: null,
      latestPayTimeFormatted: '',
      canPay: false,
      payUrl: payUrl,
      endTime: ''
    };
  },
  methods: {
    async pay () {
      Indicator.open();
      let rs = await this.$post('/api/re_buy', {
        orderCode: this.order.orderCode,
        merchantId: this.$store.state.merchantId
      });
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/order`;
        Toast('订单已生成...正在跳转支付');
        let payUrl = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.href = payUrl;
      } else {
        Toast('购买失败:' + rs.error);
      }
      Indicator.close();
    },
    calcPayTime () {
      let d = (this.latestPayTime - new Date().getTime()) / 1000;
      let hour = parseInt(d / 3600);
      let minute = parseInt(parseInt(d % 3600) / 60);
      let second = parseInt(d % 60);
      this.latestPayTimeFormatted = `${hour}小时${minute}分${second}秒`;

      if (d > 0) {
        this.canPay = true;
        this._expireInd = setTimeout(this.calcPayTime, 1000);
      } else {
        this.canPay = false;
      }
    },
    getAddress () {
      this.$emit('get-address');
    },
    getSignInfo () {
      this.$emit('get-signInfo');
    },
    charge () {
      this.$emit('draw-order');
    },
    drawAccount () {
      this.$emit('draw-account');
    },
    getCardPwd () {
      this.$emit('draw-order');
    },
    cancelOrder (orderCode) {
      let target = event.target;
      var vm = this;
      MessageBox.confirm('确定执行此操作?').then(function () {
        vm.cancel(orderCode, target);
      });
    },
    async cancel (orderCode, target) {
      Indicator.open();
      let rs = await this.$post(`api/order/cancel/${orderCode}`);
      if (rs.status == 200) {
        Toast({
          message: rs.message,
          iconClass: 'icon icon-success'
        });
        this.order.orderState = this.ORDER_STATE_CANCEL;
        this.order.payState = null;
      } else {
        // this.receiveState = '重新提取'
        Toast(rs.error);
      }
      Indicator.close();
    }
  },
  beforeDestroy () {
    if (this._expireInd) {
      clearTimeout(this._expireInd);
    }
  },
  created () {
    // 如果是未支付且 订单未取消,计算剩余时间
    if (
      this.order.orderState == this.ORDER_STATE_CREATE &&
      this.order.payState == this.PAY_STATE_CREATE
    ) {
      let expireTime = this.order.expireTime;
      this.latestPayTime = moment(expireTime).valueOf();
      this.calcPayTime();
    }
    // this.endTime = moment(this.orderInfo.orderTime).format('YYYY-MM-DD');
    this.endTime = moment(this.orderInfo.orderTime)
      .add('year', 0)
      .month(moment(this.orderInfo.orderTime).month() + 1)
      .endOf('month')
      .format('YYYY-MM-DD');
    // console.log(11111, this.orderInfo);
  }
};
</script>

<style scoped>
.order-item {
  position: relative;
  min-height: 1.8rem;
  background: #fff;
  padding: 0 0.3rem;
}
.order-date-code {
  display: flex;
  height: 0.6rem;
  line-height: 0.6rem;
  color: #999;
  font-size: 0.24rem;
  white-space: nowrap;
}
.order-date-code div {
  flex: 1;
}
.order-item-code {
  text-align: right;
  height: 0.6rem;
  line-height: 0.6rem;
  color: rgb(153, 153, 153);
  font-size: 0.24rem;
  white-space: nowrap;
}
.order-item:after {
  content: " ";
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  border-bottom: 1px solid #d9d9d9;
  transform: scaleY(0.3);
}
.order-item-icon {
  position: absolute;
  top: 0.6rem;
  left: 0.3rem;
  height: 1rem;
  width: 1rem;
}
.order-info {
  font-size: 0.2rem;
  margin-top: 0.1rem;
}
.order-item-info {
  position: relative;
  margin-left: 1.2rem;
  display: flex;
}
.order-item-info-content {
  flex: 1 1 auto;
  line-height: 0.48rem;
}
.order-item-name {
  font-size: 0.28rem;
}
.order-item-price {
  font-size: 0.28rem;
  color: red;
}
.order-item-tag {
  display: inline-block;
  vertical-align: middle;
  height: 0.4rem;
  line-height: 0.4rem;
  padding: 0 0.1rem;
  border: 1px solid #fc751c;
  color: #fc751c;
  border-radius: 0.6rem;
  font-size: 0.24rem;
}
.order-item-state {
  flex: 0 0 1rem;
  white-space: nowrap;
}

.order-item-paynotice {
  color: #333;
  font-size: 0.24rem;
  line-height: 0.48rem;
}
.order-item-state-item {
  line-height: 0.48rem;
  text-align: center;
  font-size: 0.28rem;
}
.order-item-state-item-success {
  color: green;
}
.order-item-state-btn {
  line-height: 0.48rem;
  text-align: center;
  font-size: 0.28rem;
  margin-top: 0.2rem;
  padding: 0 0.2rem;
  border-radius: 0.6rem;
  border: 1px solid #ccc;
  color: #666;
}
</style>

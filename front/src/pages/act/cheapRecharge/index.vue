<template>
  <div>
    <div class="cheap bg100" :style="{'background-image': 'url('+ backImage+')'}">
      <back></back>
      <div class="cheap-atom bg100" :style="{'background-image': 'url('+ backAtom +')'}"></div>
      <div class="cheap-rule" @click="showRule">活动规则</div>
      <div class="cheap-rule" @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/order`)"
        style="top: 1.3rem;width: 1.4rem;text-align: center;">去充值</div>
      <div class="cheap-content">
        <div class="cheap-logo bg100" :style="{'background-image': 'url('+ logo +')'}"></div>
        <!--<div-->
        <!--class="cheap-title bg100"-->
        <!--:style="{'background-image': 'url('+ title +')'}"-->
        <!--&gt;</div>-->
        <div class="cheap-title">
          <img :src="title" alt="">
        </div>
        <div class="cheap-limit">仅限受邀用户参加</div>
      </div>
      <div class="cheap-action bg100" :style="{'background-image': 'url('+ action +')'}" @click="createOrder"></div>
      <Popup v-model="showDialog" lockScroll="true" pop-transition="popup-fade" modal="false" closeOnClickModal="true"
        style="background: transparent;">
        <div class="rule">
          <span class="rule-close" @click="closeRule"></span>
          <div class="rule-content" v-html="ruleDetail"></div>
        </div>
      </Popup>
      <mt-popup v-model="showpayMsg" class="mypop" :closeOnClickModal=false popup-transition="popup-fade">
        <div class="tipdetail">
          <div class="content" style="text-align:center;padding-bottom: 2rem;">
            本期活动已结束，<br />下期活动近期开启，敬请期待
            <!-- 本期活动已结束，已购买的用户,<br />您可点击下方<span>“去充值”</span>完成充值。<br /> -->
            <!-- 3月31日23:59前未完成充值的用户，活动主办方将为您完成充值服务。 -->
          </div>
          <!--  <div
            class="btnpay"
            @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/order?actId=${act.actId}`)"
          >
          </div> -->
        </div>
        <!-- <div class="tipdetail">
          <div class="content">
            支付完成后您共有两种方式完成5元话费充值：<br />
            1.点击左上角返回键，确认支付，返回活动主页，点击<span>“立即充值”</span>按钮，完成充值。<br />
            2.点击下方导航中的<span>“返回首页”</span>，重新进入活动点击<span>“立即充值”</span>，完成充值。<br />
            3.如您未完成支付，中途退出充值，您可点击<span>“去充值”</span>找到未完成订单，取消此订单后重新充值。
          </div>
          <div
            class="btnpay"
            @click="pay"
          >
          </div>
        </div> -->
      </mt-popup>
      <drawOrder :orderInfo="order" @draw-order="drawOrder" @dialog-flag="dialogFlag" v-if="openDialog"></drawOrder>
    </div>

  </div>
</template>

<script>
import { Indicator, Popup, Toast, MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';
import OrderState from '@/lib/OrderState';
import drawOrder from '@/components/Order/drawOrder';
import moment from 'moment';
export default {
  components: {
    Popup,
    drawOrder
  },
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      order: null,
      openDialog: false,
      showpayMsg: false,
      title: '',
      backImage: '',
      standard: this.act.productList[0].standardList[0],
      logo: '',
      backAtom: '',
      ...OrderState,
      action: '',
      proList: [],
      ruleDetail: '',
      payUrl: payUrl,
      showDialog: false,
      canpay: false,
      prepayId: '',
      orderCode: '',
      cardpwdList: [],
      canPay: false,
      latestPayTime: null,
      latestPayTimeFormatted: ''
    };
  },
  component: {
    drawOrder
  },
  watch: {
    order (val) {
      if (val) {
        this.openDialog = true;
      }
    }
  },
  mounted () {
    let temlateConfig = null;
    let protocol = window.location.protocol;
    if (this.act.templateConfig) {
      temlateConfig = JSON.parse(this.act.templateConfig);
      // 背景图片
      this.backImage = `${protocol}${temlateConfig.backImage}`;
      // 银行logo
      this.logo = `${protocol}${temlateConfig.logo}`;
      // 标题图片
      this.title = `${protocol}${temlateConfig.title}`;
      // 背景上元素图
      this.backAtom = `${protocol}${temlateConfig.backAtom}`;
      this.action = `${protocol}${temlateConfig.action}`;
    }
    this.proList = this.act.productList;
    this.ruleDetail = this.act.detail;
  },
  methods: {
    dialogFlag (val) {
      this.openDialog = val;
    },
    calcPayTime () {
      let d = (this.latestPayTime - new Date().getTime()) / 1000;
      let hour = parseInt(d / 3600);
      let minute = parseInt(parseInt(d % 3600) / 60);
      let second = parseInt(d % 60);
      this.latestPayTimeFormatted = `${hour}小时${minute}分${second}秒`;
      console.log(this.latestPayTimeFormatted);
      if (d > 0) {
        this.canPay = true;
        // this._expireInd = setTimeout(this.calcPayTime, 1000);
      } else {
        this.canPay = false;
      }
    },
    async loadOrder () {
      Indicator.open();
      let rs = await this.$post('/api/getOrderList?', {
        actId: this.act.actId,
        status: ''
      });
      if (rs.status == 200) {
        let list = rs.payload.list;
        let result = list.some(element => {
          if (
            element.payState == this.PAY_STATE_PAID &&
            element.fishState == this.FISH_STATE_CREATE
          ) {
            this.order = element;
            return true;
          }
          if (element.payState == this.PAY_STATE_CREATE) {
            console.log('order', this.order);
            // 如果是未支付且 订单未取消,计算剩余时间
            if (
              element.orderState == this.ORDER_STATE_CREATE &&
              element.payState == this.PAY_STATE_CREATE
            ) {
              let expireTime = element.expireTime;
              this.latestPayTime = moment(expireTime).valueOf();
              this.calcPayTime();
            }
            if (this.canPay) {
              MessageBox({
                message: '您有未完成订单，是否进入?',
                title: '提示',
                showCancelButton: true,
                cancelButtonText: '重新购买',
                confirmButtonText: '进入'
              }).then(action => {
                if (action == 'confirm') {
                  this.$router.push(
                    `/${this.$store.state.merchantAppid}/merchant/paysuccess/${rs.payload.orderCode}`
                  );
                }
              });
            }
            return true;
          }
        });
        console.log(result);
      }
      Indicator.close();
    },
    async drawOrder (account) {
      // 检查账号格式
      if (this.order.proType == 1) {
        console.log(account);
        if (!account) {
          Toast('请输入手机号');
          return;
        }
        if (this.standard.accountPattern) {
          if (!new RegExp(this.standard.accountPattern).test(account)) {
            Toast('请输入正确的手机号');
            return;
          }
        }
      }
      Indicator.open();
      let rs = await this.$post('api/order/draw', {
        orderCode: this.order.orderCode,
        account: account
      });
      if (rs.status == 200) {
        if (this.order.proType == 1) {
          Toast('已提交充值');
          this.order.fishState = '1';
        } else if (this.order.proType == 2) {
          this.cardpwdList = JSON.parse(rs.payload.cardPwds);
        }
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    showRule () {
      this.showDialog = true;
    },
    closeRule () {
      this.showDialog = false;
    },
    async createOrder () {
      let standard = this.act.productList[0].standardList[0];
      Indicator.open();
      let rs = await this.$post('api/createOrder', {
        actId: this.act.actId,
        standardId: standard.id,
        commodityNum: 1
      });
      if (rs.status === 200) {
        // this.showpayMsg = true;
        this.canpay = true;
        this.prepayId = rs.payload.prepayId;
        this.pay();
      } else {
        this.$toast(rs.error);
      }
      Indicator.close();
    },
    async pay () {
      if (this.canpay) {
        this.showpayMsg = false;
        let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/order`;
        this.$toast('订单已生成...正在跳转支付');
        let payUrl = `${this.payUrl}${
          this.prepayId
        }?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.href = payUrl;
      }
    }
  },
  created () {
    this.loadOrder();
  }
};
</script>

<style scoped lang="scss">
.cheap {
  position: relative;
  width: 100%;
  height: calc(100vh);
  padding-bottom: 0.6rem;
  overflow: hidden;

  &-rule {
    position: absolute;
    z-index: 3;
    top: 0.6rem;
    right: 0;
    font-size: 0.28rem;
    color: #fff;
    line-height: 0.55rem;
    padding: 0.02rem 0.14rem;
    border: 0.02rem solid #fff;
    border-top-left-radius: 0.4rem;
    border-bottom-left-radius: 0.4rem;
    border-right: 0;
  }

  &-atom {
    position: absolute;
    width: 100%;
    height: 12.94rem;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  &-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 2;
    text-align: center;
  }
  &-limit {
    width: 2.7rem;
    height: 0.54rem;
    line-height: 0.54rem;
    background-color: #ffffff;
    box-shadow: 0 0.03rem 0.12rem 0 rgba(251, 154, 0, 0.5),
      inset 0.02rem -0.04rem 0.05rem 0 rgba(252, 196, 72, 0.34);
    border-radius: 0.27rem;
    text-align: center;
    color: #e73f48;
    margin: 0.1rem auto;
  }

  &-logo {
    width: 1.75rem;
    height: 0.5rem;
    margin-top: 0.3rem;
    margin-left: 0.33rem;
  }

  &-title {
    width: 5.64rem;
    /*height: 2.89rem;*/
    margin: 0 auto;
    img {
      width: 100%;
    }
  }

  &-action {
    position: absolute;
    width: 5.18rem;
    height: 1.26rem;
    bottom: 0.7rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
  }
}
.tipdetail {
  width: 6.23rem;
  padding: 2.4rem 0.2rem 0;
  background: url("tanchuang.png") no-repeat;
  background-size: 100% 100%;
  .content {
    line-height: 0.46rem;
    font-size: 0.28rem;
    color: #333;
    span {
      color: #ab1818;
    }
  }
  .btnpay {
    width: 3.71rem;
    height: 1.04rem;
    background: url("btn-charge.png") no-repeat;
    background-size: 100% 100%;
    margin: 0.5rem auto;
  }
}
.bg100 {
  background-size: 100% 100%;
}
.rule {
  width: 6.5rem;
  height: 7rem;
  position: relative;
  background: url(./rule.png) no-repeat;
  background-size: 100% 100%;
  padding: 2.6rem 1rem 0;

  &-close {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 0.53rem;
    height: 0.53rem;
    border-radius: 50%;
    background-image: url("./close.png");
    background-size: cover;
  }
  &-header {
    padding: 0.2rem;
    font-size: 0.32rem;
    text-align: center;
  }
  &-content {
    font-size: 0.28rem;
    text-align: justify;
    color: #333;
    line-height: 0.36rem;
    -webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    max-height: 3.6rem;
  }
}
/deep/ .mint-popup {
  border-radius: 0.29rem;
}

@media screen and (min-height: 812px) {
  .cheap-title {
    margin: 1.5rem auto 0;
  }
  .cheap-limit {
    margin: 0.2rem auto;
  }
}
</style>

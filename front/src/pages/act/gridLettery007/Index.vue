<template>
  <div>
    <back></back>
    <TopRBtn
      :defineStyle="{'width': '2rem', 'top': '0.4rem','imgUrl': templateConfig.recordBtn}"
      :link="'index/prize'"
    ></TopRBtn>
    <div class="background">
      <img
        :src="templateConfig.background"
        alt
      >
    </div>
    <div class="chance">您共有<span>{{chances}}</span>次抽奖机会</div>
    <div class="wap">
      <HemiGrid
        :act="act"
        :template-config="templateConfig"
        @open-message="openMessage"
        @chance='chance'
      ></HemiGrid>
      <Modal
        v-if="show"
        :act="act"
        :prize="payloadModal"
        @modal-handler="prizeHandler"
        :orderCode="orderCode"
      ></Modal>
    </div>
  </div>
</template>
<script>
import HemiGrid from './components/HemiGrid002';
import MessageModal from '@/components/lotteryModal/MessageModal';
import TopRBtn from '@/components/TopRBtn';
import Modal from './components/modal';
import { payUrl } from '@/config/';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    HemiGrid,
    MessageModal,
    Modal,
    TopRBtn
  },
  data () {
    return {
      payUrl: payUrl,
      show: false,
      templateConfig: JSON.parse(this.act.templateConfig),
      payloadModal: {},
      orderCode: '',
      chances: 0
    };
  },
  created () {
    // this.loadAct()
  },
  methods: {
    gotest () {
      if (this.$route.query.testurl) {
        window.location.href = this.$route.query.testurl;
      }
    },
    async reBuy () {
      this.$indicator.open();
      let rs = await this.$post('/api/re_buy', {
        orderCode: this.orderCode,
        merchantId: this.$store.state.merchantId
      });
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/order`;
        this.$toast('订单已生成...正在跳转支付');
        let payUrl = `${
          this.payUrl
        }${prepayId}?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.href = payUrl;
      } else {
        this.$toast('购买失败:' + rs.error);
      }
      this.$indicator.close();
    },
    openMessage (payload) {
      this.show = true;
      this.orderCode = payload.orderCode;
      this.payloadModal = payload;
    },
    chance (payload) {
      this.chances = payload;
    },
    prizeHandler () {
      // if (this.payloadModal.proType == 2) {
      // this.reBuy();
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/index/prize`
      );
      // } else {
      //   this.show = false;
      // }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.background {
  position: absolute;
  height: 100%;
  background: #fff;
  img {
    // height: 100%;
    display: block;
    width: 100%;
  }
}
.chance {
  width: 100%;
  text-align: center;
  font-size: 0.3rem;
  color: #537af1;
  position: absolute;
  left: 0;
  right: 0;
  padding-top: 4.1rem;
  font-weight: 600;
  span {
    color: #f00;
  }
}
.wap {
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  padding-top: 4.7rem;
  .btn-div {
    margin: 0.4rem 0 0.6rem;
    text-align: center;
    button {
      height: 0.6rem;
      width: 1.8rem;
      margin: 0 0.2rem;
      border: none;
      &.win-record {
        background-size: 100% 100%;
      }
      &.act-detail {
        background-size: 100% 100%;
      }
    }
  }
}
.act-detail {
  width: 7rem;
  min-height: 7.64rem;
  padding: 0.9rem 0.2rem 0;
  background: url(./img/act-rule.png) no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
}
</style>

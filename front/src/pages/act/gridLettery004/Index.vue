<template>
  <div>
    <back></back>
    <TopRBtn
      :defineStyle="{'width': '2rem', 'top': '0.4rem','imgUrl': imgUrl}"
      :link="'index/prize'"
    ></TopRBtn>
    <div class="background">
      <img
        :src="templateConfig.background"
        alt
      >
    </div>
    <div class="wap">

      <HemiGrid
        :act="act"
        :template-config="templateConfig"
        @open-message="openMessage"
      ></HemiGrid>

      <div
        class="act-detail"
        v-html="act.detail||'暂无说明'"
      >

      </div>

      <!--   <p class="service-tel">
        <a v-if="$store.state.payload.serviceTel" :href="'tel:'+ $store.state.payload.serviceTel">客服热线: {{$store.state.payload.serviceTel}}</a>
        <a else href="tel: 4009626962">客服热线: 4009626962</a>
      </p>-->
    </div>
    <Modal
      v-if="show"
      :act="act"
      :prize="payloadModal"
      @modal-handler="prizeHandler"
      :orderCode="orderCode"
    ></Modal>
  </div>
</template>
<script>
import recordBtn from './img/lettery-record.png';
import imgUrl from './img/prizebtn.png';
import HemiGrid from '@/components/HemiGrid002';
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
      imgUrl: imgUrl,
      payUrl: payUrl,
      show: false,
      recordBtn: recordBtn,
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
    async reBuy () {
      this.$indicator.open();
      let rs = await this.$post('/api/re_buy', {
        orderCode: this.orderCode,
        merchantId: this.$store.state.merchantId
      });
      if (rs.status === 200) {
        let prepayId = rs.payload.prepayId;
        let successUrl = `${window.location.protocol}//${
          window.location.host
        }/${this.$store.state.merchantAppid}/merchant/index/order`;
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
    prizeHandler () {
      if (this.payloadModal.is_buy == 1) {
        this.reBuy();
      } else {
        this.show = false;
      }
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
  line-height: 0.46rem;
}
</style>

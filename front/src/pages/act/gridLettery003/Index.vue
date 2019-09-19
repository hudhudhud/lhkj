<template>
  <div class="gdjiugongge">
    <back></back>
    <div class="background">
      <img
        :src="templateConfig.background"
        alt
      >
    </div>
    <div class="btn-div">
      <button
        class="win-record"
        @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
        :style="{'backgroundImage': 'url('+ templateConfig.recordBtn+')'}"
      > 我的奖品</button>
      <button
        class="act-detail"
        @click="openMessage({keyward: 'showRules', detail: act.detail})"
        :style="{'backgroundImage': 'url('+ templateConfig.ruleBtn+')'}"
      > 活动规则</button>

    </div>
    <!-- <img class="banner" :src="templateConfig.banner" alt=""> -->
    <div class="wap">
      <img
        class="banner"
        :src="templateConfig.banner"
        alt
      >
      <bullet :act="act"></bullet>
      <p class="paymoney">请随机支付0.01元到0.1元参与抽奖</p>
      <!-- <p class="chances">剩余抽奖机会: {{chances}}</p> -->
      <HemiGrid
        :act="act"
        :template-config="templateConfig"
        @open-message="openMessage"
      ></HemiGrid>
      <!--   <p class="service-tel">
        <a v-if="$store.state.payload.serviceTel" :href="'tel:'+ $store.state.payload.serviceTel">客服热线: {{$store.state.payload.serviceTel}}</a>
        <a else href="tel: 4009626962">客服热线: 4009626962</a>
      </p>-->
    </div>
    <MessageModal
      v-model="payloadModal"
      @order-info="show = true"
      :act="act"
    ></MessageModal>
    <Modal
      v-if="show"
      :act="act"
      @close="show = false"
      :orderCode="orderCode"
    ></Modal>
  </div>
</template>
<script>
import recordBtn from './img/lettery-record.png';
import ruleBtn from './img/act-detail.png';
import HemiGrid from './components/HemiGridCommon';
import MessageModal from './components/MessageModal';
import Modal from './components/modal';
import bullet from './components/bullet';
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
    bullet
  },
  data () {
    return {
      show: false,
      recordBtn: recordBtn,
      ruleBtn: ruleBtn,
      templateConfig: JSON.parse(this.act.templateConfig),
      payloadModal: {},
      orderCode: ''
    };
  },
  created () {
    // this.loadAct()
    console.log(1111, JSON.parse(this.act.templateConfig));
  },
  methods: {
    openMessage (payload) {
      this.orderCode = payload.orderCode;
      this.payloadModal = payload;
      console.log(88888, this.payloadModal);
    },
    showRule () {
      alert('点击显示弹出框');
      console.log('mmmmm');
      this.showRule = true;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.gdjiugongge {
  width: 100%;
  position: relative;
}
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
  // top: 0;
  left: 0;
  right: 0;
  top: 1rem;
  z-index: 5;
  .banner {
    display: block;
    width: 85%;
    margin: 0 auto;
  }
}
.service-tel {
  text-align: center;
  color: #333;
  // background: #fff;
}
.btn-div {
  position: absolute;
  width: 2.01rem;
  height: 2rem;
  right: 0;
  top: 0.5rem;
  z-index: 10;
  button {
    height: 0.78rem;
    width: 2.01rem;
    margin-bottom: 0.2rem;
    font-size: 0.32rem;
    color: #fff;
    font-weight: 700;
    padding-left: 0.3rem;
    border: none;
    &.win-record {
      background-size: 100% 100%;
    }
    &.act-detail {
      background-size: 100% 100%;
    }
  }
}
.ruledetail {
  width: 6.39rem;
  height: 5.7rem;
  background: #ff0;
  // background-size: 100% 100%;
  padding: 1.9rem 0.5rem 0.4rem 0.6rem;
  text-align: left;
  .content {
    font-size: 0.28rem;
    color: rgb(59, 23, 0);
    line-height: 0.45rem;
    height: 3.5rem;
    overflow: scroll;
    span {
      color: rgb(240, 11, 0);
    }
  }
}
.mypop {
  background: transparent;
}
.paymoney {
  width: 100%;
  text-align: center;
  font-size: 0.34rem;
  color: #008742;
  margin: 0.1rem;
}
</style>

<template>
  <div>
    <cbbHeader title="九宫格"></cbbHeader>
    <div class="background">
      <img
        :src="templateConfig.background"
        alt
      >
    </div>
    <!-- <img class="banner" :src="templateConfig.banner" alt=""> -->
    <div class="wap">
      <img
        class="banner"
        :src="templateConfig.banner"
        alt
      >

      <!-- <p class="chances">剩余抽奖机会: {{chances}}</p> -->
      <HemiGrid
        :act="act"
        :template-config="templateConfig"
        @open-message="openMessage"
      ></HemiGrid>
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
      <template v-if="templateConfig.recordBtn!=null">
        <div class="btn-div">
          <button
            class="win-record"
            @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
            :style="{'backgroundImage': 'url('+ templateConfig.recordBtn+')'}"
          ></button>
          <button
            class="act-detail"
            @click="openMessage({keyward: 'showRules', detail: act.detail})"
            :style="{'backgroundImage': 'url('+ templateConfig.ruleBtn+')'}"
          ></button>
        </div>
      </template>

      <!--   <p class="service-tel">
        <a v-if="$store.state.payload.serviceTel" :href="'tel:'+ $store.state.payload.serviceTel">客服热线: {{$store.state.payload.serviceTel}}</a>
        <a else href="tel: 4009626962">客服热线: 4009626962</a>
      </p>-->
    </div>
  </div>
</template>
<script>
import recordBtn from './img/lettery-record.png';
import ruleBtn from './img/act-detail.png';
import HemiGrid from '@/components/HemiGridCommon';
import MessageModal from '@/components/lotteryModal/MessageModal';
import cbbHeader from '@/components/cbbHeader';
import Modal from './components/modal';
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
    cbbHeader
  },
  data () {
    return {
      show: false,
      recordBtn: recordBtn,
      ruleBtn: ruleBtn,
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
    openMessage (payload) {
      this.orderCode = payload.orderCode;
      this.payloadModal = payload;
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
  // top: 0;
  left: 0;
  right: 0;

  .banner {
    display: block;
    width: 100%;
  }
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
.service-tel {
  text-align: center;
  color: #333;
  // background: #fff;
}
</style>

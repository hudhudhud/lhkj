<template>
  <div>
    <headerBar
      :title="act.actName"
      :bgColor="'#2cb5f6'"
    ></headerBar>
    <div class="travel-gift">
      <!-- <img
        src="./imgs/bg1.png"
        alt=""
      > -->
      <img
        class="bg"
        src="./imgs/bg1.jpg"
        width="100%"
        alt=""
      >
      <div class="main">

        <div
          class="rules"
          @click=" ruleShow = true;"
        >
          <img
            src="./imgs/rulebutton.png"
            alt
          >
        </div>
        <rule
          v-if="ruleShow"
          :detail="act.detail"
          @close-rule="ruleShow = false"
          :gorulesShow="ruleShow"
        ></rule>
        <div class="button">
          <div
            class="one-coin"
            :class="{current:activity=='coin'}"
          >1元惠打车</div>
          <div
            class="driving"
            :class="{current:activity=='driving'}"
            @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/act/${linkAct}`)"
          >8.88元叫代驾</div>
        </div>
        <img
          class="bg2"
          src="./imgs/car.gif"
          width="100%"
          alt=""
        >
        <div class="box-bg">
          <HemiGrid
            :act="act"
            :template-config="templateConfig"
            @open-message="openMessage"
          ></HemiGrid>
          <MessageModal
            v-model="payloadModal"
            :act="act"
          ></MessageModal>
        </div>

        <!--      <div class="rule">
          <div class="point">
            <span class="list">(1)</span>活动期间，惠打车活动每个用户限有4次参加机会，代驾每个用户只有1次参与机会。
          </div>
          <div class="point">
            <span class="list">
              <span>(2)</span>
            </span>活动礼品数量有限，先打先得，售完为止。
          </div>
        </div> -->
      </div>

    </div>
  </div>

</template>

<script>
import HemiGrid from './components/HemiGridICBC';
import MessageModal from '@/components/lotteryModal/MessageModal';
import headerBar from '@/components/headerBar';
import rule from './components/rule';

// import { Indicator } from 'mint-ui';
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      linkAct: process.env.PUBLISH_ENV == 'prod' ? 548932305 : 548660275,
      activity: 'coin',
      ruleShow: false,
      merchantId: this.$store.state.merchantId,
      payloadModal: {},
      templateConfig: JSON.parse(this.act.templateConfig)
    };
  },
  components: {
    HemiGrid,
    headerBar,
    rule,
    MessageModal
  },
  methods: {
    openMessage (payload) {
      this.payloadModal = payload;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.travel-gift {
  position: absolute;
  top: 0.8rem;
  bottom: 0;
  width: 100%;
  overflow-y: scroll;
  background: #e54539;

  .bg,
  .bg2 {
    display: block;
    width: 100%;
  }
  .button {
    width: 6.48rem;
    height: 0.92rem;
    margin: 0 auto 3rem;
    display: flex;
    font-size: 0.36rem;
    text-align: center;
    line-height: 0.92rem;
    color: rgb(237, 79, 67);
    .one-coin {
      width: 3.24rem;
      height: 0.92rem;
      border-left: 1px solid rgb(237, 79, 67);
      border-top: 1px solid rgb(237, 79, 67);
      border-bottom: 1px solid rgb(237, 79, 67);
      border-radius: 0.16rem 0 0 0.16rem;
      background-color: #fff;
      &.current {
        color: #fff;
        background-color: rgb(237, 79, 67);
      }
    }
    .driving {
      width: 3.24rem;
      height: 0.92rem;
      border-right: 1px solid rgb(237, 79, 67);
      border-top: 1px solid rgb(237, 79, 67);
      border-bottom: 1px solid rgb(237, 79, 67);
      border-radius: 0rem 0.16rem 0.16rem 0;
      background-color: #fff;
      &.current {
        color: #fff;
        background-color: rgb(237, 79, 67);
      }
    }
  }
  .main {
    position: absolute;
    top: 0.4rem;
    bottom: 0;
    width: 100%;
    .rules {
      position: absolute;
      top: 1rem;
      right: 0rem;
      width: 2.1rem;
      img {
        width: 100%;
      }
    }
    .rule {
      width: 7.5rem;
      height: 5.77rem;
      padding: 2.7rem 0.8rem 0 1.5rem;
      background: url("./imgs/rulebg.png") no-repeat;
      background-size: 100% 100%;
      line-height: 0.4rem;
      font-size: 0.3rem;
      color: rgb(255, 219, 132s);
      .point {
        margin-bottom: 0.2rem;
        position: relative;
        font-weight: 500;
        .list {
          font-weight: bold;
          position: absolute;
          left: -0.5rem;
        }
      }
    }
  }
}
</style>

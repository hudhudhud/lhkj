<template>
  <div>
    <div class="gif-wapper">
      <img src="./imgs/welcome.gif" alt>
    </div>
    <div class="bg-wrap">
      <div class="box-bg" v-if="actId">
        <HemiGrid :act="act" :template-config="templateConfig" @open-message="openMessage"></HemiGrid>
        <MessageModal v-model="payloadModal" :act="act"></MessageModal>
      </div>
      <div class="rule">
        <img src="./imgs/rule-btn.png" alt>
        <div class="detail" v-html="act.html||'暂无说明'"></div>
      </div>
    </div>
  </div>
</template>

<script>
import HemiGrid from '@/pages/act/hzghrylLottery/HemiGridICBC';
import MessageModal from '@/components/lotteryModal/MessageModal';
import { Indicator } from 'mint-ui';
export default {
  props: {
    setting: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      act: {},
      actId: '',
      merchantId: this.$store.state.merchantId,
      payloadModal: {},
      templateConfig: {}
    };
  },
  components: {
    HemiGrid,
    MessageModal
  },
  methods: {
    openMessage (payload) {
      this.payloadModal = payload;
    },
    async loadAct (actId) {
      Indicator.open();
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        Object.assign(this.act, rs.payload);
        console.log(this.act);
        this.actId = rs.payload.actId;
        console.log(this.templateConfig);
        Object.assign(
          this.templateConfig,
          JSON.parse(rs.payload.templateConfig)
        );
      } else {
        this.error = rs.error;
      }
      Indicator.close();
    }
  },
  created () {
    this.loadAct(this.setting.actId);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.gif-wapper {
  height: 2.34rem;
  font-size: 0;
  text-align: center;
  margin-top: 0.26rem;
  width: 100%;
  img {
    position: relative;
    right: 0.02rem;
    width: 100%;
    margin-top: -0.26rem;
  }
}
.bg-wrap {
  width: 7rem;
  margin: 0 auto;
  background: url(./imgs/lottery-bg.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 0.45rem;
  .rule {
    img {
      display: block;
      width: 1.85rem;
      margin: 0.2rem auto 0.1rem;
    }
    .detail {
      padding: 0 0.3rem 0.3rem;
      color: #fff;
      font-size: 0.28rem;
      line-height: 0.36rem;
    }
  }
}
</style>

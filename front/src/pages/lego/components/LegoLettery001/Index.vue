<template>
  <div>
    <div class="box-bg" v-if="actId">
      <HemiGrid :act="act" :template-config="templateConfig" @open-message="openMessage"></HemiGrid>
      <MessageModal v-model="payloadModal" :act="act"></MessageModal>
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
</style>

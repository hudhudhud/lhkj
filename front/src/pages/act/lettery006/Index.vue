<template>
  <div>
    <img
      :src="templateConfig.background"
      alt
      width="100%"
    >
    <Back></Back>

    <div class="titlebox">
      <img src="./imgs/title.png">
    </div>
    <div class="lottery">
      <div class="my-prize">
        <img
          src="./imgs/my-prize.png"
          alt
          @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
        >
      </div>
      <HemiRotate
        ref="myRotate"
        v-if="showPannel"
        :setting="setting"
        @start="start"
        @end="rotateEnd"
        class="lottery-pannel"
      ></HemiRotate>
      <div class="rule">
        <img
          src="./imgs/rule.png"
          alt
        >
        <p v-html="act.detail"></p>
      </div>
    </div>

    <!-- <MessageModal v-model="payloadModal" :act="act"></MessageModal> -->
    <MessageBox
      :prize="payloadModal"
      v-if="MessageBoxShow"
      @onHide="MessageBoxShow=false"
    />
  </div>
</template>

<script>
import HemiRotate from './HemiRotate';
import { Indicator, Toast } from 'mint-ui';
import MessageModal from './lotteryModal/MessageModal';
import MessageBox from './mseeageBox';
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    HemiRotate,
    MessageModal,
    MessageBox
  },
  data () {
    return {
      payloadModal: {},
      account: this.$store.state.cust ? this.$store.state.cust.tel : '',
      error: '',
      templateConfig: JSON.parse(this.act.templateConfig),
      showPannel: false,
      loading: false,
      rotating: false,
      chances: 0,
      noMore: '',
      prizeList: this.act.productList,
      currentPrize: null,
      timer: null,
      orderCode: '',
      currentPage: 1,
      setting: {
        pannelImage: JSON.parse(this.act.templateConfig).pannel,
        pointerImage: JSON.parse(this.act.templateConfig).pointer,
        names: this.act.productList.map(item => item.prizeName), // 大转盘奖品名称
        icons: this.act.productList.map(item => item.standardImgUrl),
        colors: ['#8fb8fa', '#fff', '#8fb8fa', '#fff', '#8fb8fa', '#fff'], // 大转盘奖品区块对应背景颜色 // 大转盘奖品区块对应背景颜色
        /*   colors: [
          'transparent',
          'transparent',
          'transparent',
          'transparent',
          'transparent',
          'transparent'
        ], */ startAngle: 0, // 开始角度
        bRotate: false // false:停止;ture:旋转
      },
      bulletList: [],
      bulletTop: 0,
      bulletFlag: false,
      flyList: [],
      prize: null,
      shareConfig: null,
      MessageBoxShow: false
    };
  },
  computed: {
    actId () {
      return this.$route.params.actId;
    }
  },
  methods: {
    async loadOrder () {
      let rs = await this.$post('/api/getOrderList?', {
        actId: this.actId,
        status: 2
      });
      if (rs.status === 200 && rs.payload.list) {
        let list = rs.payload.list;
        this.prize = list[0];
        this.prize.keyward = 'payPrizeShow';
        this.openMessage(this.prize);
      }
    },
    openMessage (payload) {
      this.payloadModal = payload;
    },

    showRules (txt) {
      this.$dialog({
        state: true,
        content: {
          type: 'lottery-rules-dialog',
          article: txt
        }
      });
    },

    rotateEnd () {
      this.rotating = false;
      this.prize.keyward = 'showPrize';
      this.timer = setTimeout(() => {
        this.openMessage(this.prize);
        this.MessageBoxShow = true;
      }, 1000);
    },

    async loadAct () {
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      } else {
        this.$toast(rs.error);
      }
      Indicator.close();
    },
    async start () {
      if (this.loading || this.rotating) {
        return;
      }
      this.loading = true;
      let rs = await this.$post('api/lottery_draw', {
        actId: this.actId
      });
      if (rs.status === 200) {
        this.prize = rs.payload;
        let standardId = rs.payload.standardId;
        this.orderCode = rs.payload.orderCode;
        this.chances--;
        this.prizeList.forEach((item, ind) => {
          if (item.standardId === standardId) {
            this.currentPrize = item;
            this.rotating = true;
            this.$refs.myRotate.rotate(ind);
          }
        });
      } else {
        Toast(rs.error);
      }
      this.loading = false;
    }
  },
  created () {
    this.setting.names = [];
    this.setting.icons = [];
    this.act.productList.forEach(item => {
      this.setting.names.push(item.prizeName);
      this.setting.icons.push(item.standardImgUrl);
    });
    this.showPannel = true;
    this.loadAct();
    this.loadOrder();
    console.log(this.act);
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
img {
  display: block;
}
.titlebox {
  width: 100%;
  position: absolute;
  top: 2.9rem;
  padding: 0.3rem;
  img {
    width: 100%;
  }
}
.lottery {
  position: absolute;
  top: 4.8rem;
  left: 0;
  right: 0;
  bottom: 0;
  height: 7.3rem;
  z-index: 80;
  overflow: visible;
  .chance {
    text-align: center;
    padding-bottom: 0.2rem;
    color: #fff;
    font-size: 0.26rem;
    b {
      color: rgb(251, 203, 66);
      font-family: "PingFang SC";
    }
  }
  .my-prize {
    position: absolute;
    top: -0.2rem;
    left: 0;
    z-index: 10;
    img {
      width: 2rem;
    }
  }
  p {
    text-align: center;
    line-height: 0.5rem;
  }
}
.rule {
  width: 6.94rem;
  margin: 0.2rem auto 0;
  position: relative;
  p {
    position: absolute;
    margin: 0.5rem 0.3rem 0;
    top: 0;
    text-align: left;
    font-size: 0.28rem;
    color: #fff;
  }
  img {
    width: 100%;
  }
}
</style>

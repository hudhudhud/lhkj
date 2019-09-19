<template>
  <div class="out-box" :style="{'background-color': templateConfig.pageColor || '#fff'}">
    <back></back>
    <!-- <div class="page-bg">
      <img :src="templateConfig.pageBg">
    </div> -->
    <div class="page-container" :style="{'background-image': 'url('+templateConfig.pageBg+')'}">
      <!-- 我的奖品 -->
      <div class="page-prize" @click="goPrize">
        <img :src="templateConfig.prizeBtnImg" alt="">
      </div>
      <div class="page-rotate">
        <HemiRotate ref="myRotate" v-if="showPannel" :setting="setting" :templateConfig="templateConfig" @start="start"
          @end="rotateEnd">
        </HemiRotate>
      </div>
      <div class="page-rule">
        <img :src="templateConfig.ruleImg">
        <div class="rule-desc" v-html="this.act.detail"></div>
      </div>
      <img class="container-bg-bottom" :src="templateConfig.finishingImg">
    </div>
    <custDialog ref="custDialog" @confirm="pay" :templateConfig="templateConfig" :actionText="actionText"></custDialog>
  </div>
</template>

<script>
import HemiRotate from './component/HemiRotate';
import custDialog from './component/dialog';
import { MessageBox } from 'mint-ui';
import { payUrl } from '@/config/';

export default {
  name: 'CanvasLettory',
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    HemiRotate,
    custDialog,
    MessageBox
  },
  data () {
    return {
      actionText: '',

      templateConfig: this.act.templateConfig
        ? JSON.parse(this.act.templateConfig)
        : null,
      account: this.$store.state.cust ? this.$store.state.cust.tel : '',
      orderCode: '',
      payUrl: payUrl,
      showPannel: false,
      loading: false,
      rotating: false,
      chances: 0,
      payChances: 0,
      currentPrize: null,
      prizeList: [],
      detail: '',
      setting: {
        names: [],
        icons: [],
        startAngle: 0, // 开始角度
        bRotate: false // false:停止;ture:旋转
      }
    };
  },
  async mounted () {
    await this.setRotate();
    await this.loadAct();
    await this.loadRecord();
  },
  computed: {
    tel () {
      return this.$store.state.cust ? this.$store.state.cust.tel : null;
    }
  },
  methods: {
    goPrize () {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/index/prize`
      );
    },
    async pay () {
      // 立即领取
      if (!this.currentPrize.is_buy) {
        this.goPrize();
        return;
      }
      MessageBox({
        message: '请在完成支付后，点击左上角返回活动页面。',
        title: '重要提示',
        confirmButtonText: '去支付'
      }).then(action => {
        if (action == 'confirm') {
          this.reBuy();
        }
      });
    },
    async loadRecord () {
      let rs = await this.$post('api/activity/custom/search/record', {
        actId: this.act.actId
      });
      if (rs.status === 200) {
        this.payChances = JSON.parse(rs.payload).num;
      }
    },
    async reBuy () {
      this.$indicator.open();
      let rs = await this.$post('/api/re_buy', {
        orderCode: this.currentPrize.orderCode,
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
    async loadAct () {
      this.$indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.act.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      }
      this.$indicator.close();
    },
    async buyChance () {
      this.$indicator.open();
      let rs = await this.$post('/api/buy_lottery', {
        actId: this.act.actId,
        num: '1'
      });
      if (rs.status === 200) {
        MessageBox({
          message: '支付0.01元即可抽奖',
          title: '购买抽奖机会',
          confirmButtonText: '去支付'
        }).then(action => {
          if (action == 'confirm') {
            this.payForChance(rs.payload.prepayId);
          }
        });
      } else {
        this.$toast(rs.error);
      }
      this.$indicator.close();
    },
    payForChance (prepayId) {
      let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/act/${this.act.actId}`;
      this.$toast('订单已生成...正在跳转支付');
      let payUrl = `${this.payUrl}${prepayId}?redirectUrl=${encodeURIComponent(
        successUrl
      )}`;
      window.location.href = payUrl;
    },
    async start () {
      if (this.loading || this.rotating) {
        return;
      }
      if (this.chances == 0) {
        this.buyChance();
        return;
      }
      this.loading = true;
      let rs = await this.$post('api/lottery_draw', {
        actId: this.act.actId,
        account: this.tel
      });
      if (rs.status === 200) {
        this.currentPrize = rs.payload;
        let standardId = rs.payload.standardId;
        this.orderCode = rs.payload.orderCode;
        this.chances--;
        this.prizeList.forEach((item, ind) => {
          if (item.standardId === standardId) {
            this.rotating = true;
            this.$refs.myRotate.rotate(ind);
          }
        });
      } else {
        this.$toast(rs.error);
      }
      this.loading = false;
    },
    async rotateEnd () {
      this.rotating = false;
      this.actionText = this.currentPrize.is_buy ? '立即购买' : '点击充值';
      this.$refs.custDialog.setPrize(this.currentPrize);
      this.$refs.custDialog.open();
    },
    setRotate () {
      this.prizeList = this.act.productList;
      this.detail = this.act.detail;
      this.setting.names = [];
      this.setting.icons = [];
      this.prizeList.forEach(item => {
        this.setting.names.push(item.prizeName);
        this.setting.icons.push(item.standardImgUrl);
      });
      this.showPannel = true;
    }
  }
};
</script>

<style scoped lang="scss">
.out-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;
  .page-container {
    position: absolute;
    width: 100%;
    height: auto;
    background-size: 100% auto;
    background-repeat: no-repeat;
    .page-prize {
      float: right;
      margin-top: 0.42rem;
      width: 2rem;
      img {
        max-width: 100%;
      }
    }
    .page-rotate {
      margin: 5.2rem auto 0;
      width: 100%;
    }
    .page-rule {
      box-sizing: border-box;
      width: 90%;
      margin: 0.3rem auto 1.08rem;
      border-radius: 10px;
      background-color: #fff;
      padding: 0.2rem 0.2rem 0.7rem;
      img {
        display: block;
        margin: 0 auto 0.14rem;
        height: 1.18rem;
      }
      .rule-desc {
        font-size: 0.24rem;
        color: #333;
        line-height: 0.36rem;
      }
    }
    .container-bg-bottom {
      position: absolute;
      width: 100%;
      bottom: 0;
    }
  }
}
</style>

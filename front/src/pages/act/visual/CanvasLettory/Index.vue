<template>
  <div class="page">
    <back></back>
    <div class="page-container">
      <div class="page-rule" @click="showRule">
        <img :src="templateConfig.ruleBtnImg" alt="">
      </div>
      <div class="page-prize" @click="goPrize">
        <img :src="templateConfig.prizeBtnImg" alt="">
      </div>
      <div class="page-title">
        <img :src="templateConfig.titlePng" alt="">
      </div>
      <div class="page-tips" :style="{'backgroundImage': 'url(' + templateConfig.bulletBg+')'}">
        <!--       <div class="page-tips" :style="{'backgroundImage': 'url(' + templateConfig.bulletBg+')'}">
 --> <img
          :src="templateConfig.bulletBg" alt="">
        <div class="page-tipswrap">
          <bullet :act="act"></bullet>
        </div>

      </div>
      <div class="page-back" :style="{'backgroundImage': 'url(' + templateConfig.finishingImg+')'}">
        <div class="page-rotate">
          <HemiRotate ref="myRotate" v-if="showPannel" :setting="setting" :templateConfig="templateConfig" @start="start"
            @end="rotateEnd">
          </HemiRotate>
        </div>
        <div class="page-chances" :style="{'backgroundImage': 'url(' + templateConfig.chanceBg+')', }">剩余{{chancesNum}}次抽奖机会</div>
      </div>
    </div>
    <custDialog ref="custDialog" @confirm="pay" :templateConfig="templateConfig" :actionText="actionText"></custDialog>
    <ruleDialog ref="ruleDialog" :templateConfig="templateConfig"></ruleDialog>
  </div>
</template>

<script>
import HemiRotate from './component/HemiRotate';
import pannelImage from './img/panel.png';
import pointerImage from './img/pointer.png';
import custDialog from './component/dialog';
import ruleDialog from './component/ruleDialog';
import bullet from '@/components/bullet';
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
    ruleDialog,
    bullet,
    MessageBox
  },
  data () {
    return {
      tips: '恭喜182****2222获得50元鲜果券',
      actionText: '立即支付',

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
        pannelImage: pannelImage,
        pointerImage: pointerImage,
        // names: this.act.productList.map(item => item.prizeName), // 大转盘奖品名称
        // icons: this.act.productList.map(item => item.standardImgUrl),
        names: [],
        icons: [],
        colors: [
          'rgb(99,153,57)',
          'rgb(210,245,199)',
          'rgb(99,153,57)',
          'rgb(210,245,199)',
          'rgb(99,153,57)',
          'rgb(210,245,199)'
        ], // 大转盘奖品区块对应背景颜色
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
    chancesNum () {
      return this.payChances > 0 ? this.payChances : this.chances;
    }
  },
  methods: {
    goPrize () {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/index/order`
      );
    },
    showRule () {
      this.$refs.ruleDialog.setDetail(this.detail);
      this.$refs.ruleDialog.open();
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
        this.$dialog({
          state: true,
          content: {
            type: 'buy-lettery-chance',
            actualPrice: rs.payload.actualPrice,
            actId: this.act.actId,
            prepayId: rs.payload.prepayId,
            merchantAppid: this.$store.state.merchantAppid
          }
        });
      } else {
        this.$toast(rs.error);
      }
      this.$indicator.close();
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
        actId: this.act.actId
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
      console.log(this.currentPrize);
      this.actionText = this.currentPrize.is_buy ? '立即支付' : '立即领取';
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
div {
  img {
    width: 100%;
  }
}

.page {
  overflow: hidden;
  height: 100vh;
  &-container {
    position: relative;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    background: #d2f5c7;
    height: 100%;
  }
  &-rule {
    position: absolute;
    top: 0.2rem;
    right: 0;
    width: 1.1rem;
    height: 0.8rem;
    z-index: 10;
  }
  &-prize {
    position: absolute;
    top: 1.4rem;
    right: 0;
    width: 1.1rem;
    height: 0.8rem;
    z-index: 10;
  }

  &-title {
    margin: 0rem auto 0;
    width: 5.74rem;
  }

  &-tips {
    position: relative;
    width: 5.85rem;
    height: 0.68rem;
    line-height: 0.68rem;
    color: #fff;
    font-size: 0.28rem;
    text-align: center;
    position: relative;
    margin: 0 auto;
    background-position: 0 -0.1rem;
    background-size: 100% auto;
  }
  &-tips img {
    display: block;
    margin: 0 auto;
    width: 100%;
  }
  &-tipswrap {
    position: absolute;
    top: -0.2rem;
    width: 100%;
    height: 100%;
  }
  &-chances {
    width: 4.78rem;
    height: 1rem;
    line-height: 1rem;
    color: #fff;
    font-size: 0.34rem;
    margin: 0 auto 0.2rem;
    background-size: 100% 100%;
    text-align: center;
  }
  &-back {
    position: absolute;
    z-index: 20;
    bottom: 0;
    left: 0;
    right: 0;
    height: 7.78rem;
    background-size: 100% 100%;
  }
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  /*.page-container{*/
  /*padding-top: 1.2rem;*/
  /*}*/
}
</style>

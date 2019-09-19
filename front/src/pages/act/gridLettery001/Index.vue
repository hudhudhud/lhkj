<template>
  <div>
    <template v-if="$route.query.isQuit == 'true' || $store.state.merchantId== 191">
      <back :type="'quit'"></back>
    </template>
    <template v-else>
      <back></back>
    </template>
    <div
      class="background"
      :style="{'backgroundImage': 'url('+ templateConfig.background+')'}"
    >
    </div>

    <div class="wap">
      <img
        class="banner"
        :src="templateConfig.banner"
        alt
      >
      <div v-if="act.actId==559786685">
        <div
          class="bobao"
          style="margin: 0 auto;background: #c08576;width: 80%;border-radius: 0.4rem;"
        >
          <bullet :act="act"></bullet>
          <!-- <div class="remark">本活动所抽中奖品均由中国银行提供，与苹果公司无关。</div> -->
        </div>
      </div>
      <HemiGrid
        v-if="act.actId!=558318870 && act.actId!=559786685"
        :act="act"
        :template-config="templateConfig"
        @open-message="openMessage"
      ></HemiGrid>
      <HemiGrid001
        v-else
        :act="act"
        :template-config="templateConfig"
        @open-message="openMessage"
      ></HemiGrid001>
      <MessageModal
        v-model="payloadModal"
        :act="act"
      ></MessageModal>
      <template v-if="!templateConfig.recordBtn">
        <div class="btn-div">
          <button
            class="win-record"
            @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
            :style="{'backgroundImage': 'url('+ recordBtn+')'}"
          ></button>
          <button
            class="act-detail"
            @click="openMessage({keyward: 'showRules', detail: act.detail})"
            :style="{'backgroundImage': 'url('+ ruleBtn+')'}"
          ></button>
        </div>
      </template>
      <template v-else>
        <div class="btn-div">
          <button
            v-if="act.actId== 554706131"
            class="win-record"
            @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/order?actId=${act.actId}, ${limitAct}`)"
            :style="{'backgroundImage': 'url('+ templateConfig.recordBtn+')'}"
          ></button>
          <button
            v-else-if="act.actId== 559786685"
            class="win-record"
            @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize?actId=${act.actId}`)"
            :style="{'backgroundImage': 'url('+ templateConfig.recordBtn+')'}"
          ></button>
          <button
            v-else
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
      <!-- 555417496 -->

      <!-- 554706131 -->
      <div
        class="bobao"
        v-if="act.actId== 554706131"
        style="background: #890128;"
      >
        <bullet :act="act"></bullet>
        <div class="remark">本活动所抽中奖品均由中国银行提供，与苹果公司无关。</div>
      </div>

    </div>
    <ActDialog
      :PopupFlag="PopupFlag"
      :setting="setDialog"
      @close-dialog="PopupFlag=false"
    ></ActDialog>

  </div>
</template>

<script>
import recordBtn from './img/lettery-record.png';
import ruleBtn from './img/act-detail.png';
import action from './img/action.png';
import actbanner from './img/act-banner.png';
import HemiGrid from '@/components/HemiGridCommon';
import HemiGrid001 from '@/components/HemiGrid001';
import MessageModal from '@/components/lotteryModal/MessageModal';
import goHome from '@/components/goHome';
import bullet from '@/components/bullet';
import ActDialog from '@/components/ActDialog';
import { getActDetail } from '@/lib/api';
import { Indicator, MessageBox } from 'mint-ui';
import OrderState from '@/lib/OrderState';
import moment from 'moment';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      order: null,
      orderCode: '',
      canPay: false,
      latestPayTime: null,
      latestPayTimeFormatted: '',
      ...OrderState,
      PopupFlag: false,
      limitAct: process.env.PUBLISH_ENV == 'prod' ? 560419748 : 554972374,
      recordBtn: recordBtn,
      ruleBtn: ruleBtn,
      templateConfig: JSON.parse(this.act.templateConfig),

      setDialog: {
        banner: actbanner,
        btn: action,
        actId: ''
      },
      payloadModal: {}
    };
  },
  components: {
    HemiGrid,
    HemiGrid001,
    ActDialog,
    MessageModal,
    bullet,
    goHome
  },
  async created () {
    if (this.act.actId == 554706131 || this.act.actId == 552966116) {
      await this.loadOrder(this.limitAct);
      await this.loadOrder(this.limitActNew);
      this.determine();
    }
  },

  methods: {
    async loadOrder (actId) {
      Indicator.open();
      let rs = await this.$post('/api/getOrderList?', {
        actId: actId,
        status: ''
      });
      if (rs.status == 200) {
        let list = rs.payload.list;
        let result = list.some(element => {
          if (element.payState == this.PAY_STATE_PAID) {
            this.order = element;
            console.log('order', element);
            return true;
          }
          if (element.payState == this.PAY_STATE_CREATE) {
            console.log('order', this.order);
            // 如果是未支付且 订单未取消,计算剩余时间
            if (
              element.orderState == this.ORDER_STATE_CREATE &&
              element.payState == this.PAY_STATE_CREATE
            ) {
              let expireTime = element.expireTime;
              this.latestPayTime = moment(expireTime).valueOf();
              this.calcPayTime();
            }
            if (this.canPay) {
              MessageBox({
                message: '您有未完成订单，是否进入?',
                title: '提示',
                showCancelButton: true,
                cancelButtonText: '放弃',
                confirmButtonText: '进入'
              }).then(action => {
                if (action == 'confirm') {
                  this.$router.push(
                    `/${this.$store.state.merchantAppid}/merchant/paysuccess/${
                      rs.payload.orderCode
                    }`
                  );
                }
              });
            }
            return true;
          }
        });
        console.log(result);
      }
      Indicator.close();
    },
    calcPayTime () {
      let d = (this.latestPayTime - new Date().getTime()) / 1000;
      let hour = parseInt(d / 3600);
      let minute = parseInt(parseInt(d % 3600) / 60);
      let second = parseInt(d % 60);
      this.latestPayTimeFormatted = `${hour}小时${minute}分${second}秒`;
      console.log(this.latestPayTimeFormatted);
      if (d > 0) {
        this.canPay = true;
        // this._expireInd = setTimeout(this.calcPayTime, 1000);
      } else {
        this.canPay = false;
      }
    },
    async determine () {
      let rs = await this.$post('api/act/limit/', { actId: this.limitAct });
      if (rs.status === 200) {
        this.openLimitAct(this.limitAct, 'PopupFlag', 'setDialog');
      }
    },
    async openLimitAct (limitActId, PopupFlag, setDialog) {
      let payload = await getActDetail(limitActId);
      if (payload.productList.length) {
        let standardId = payload.productList[0].standardList[0].id;
        let actId = limitActId;
        this.$set(this[setDialog], 'actId', actId);
        this.$set(this[setDialog], 'standardId', standardId);
        this[PopupFlag] = true;
      }
    },
    openMessage (payload) {
      console.log(payload);
      this.payloadModal = payload;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.background {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow-y: scroll;
  background-size: 100% 100%;
  img {
    display: block;
    width: 100%;
  }
}
.wap {
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  overflow: auto;
  .banner {
    display: block;
    margin: 0.4rem auto;
    width: 80%;
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
.remark {
  margin-top: 0.6rem;
  text-align: center;
  font-size: 0.28rem;
}
</style>

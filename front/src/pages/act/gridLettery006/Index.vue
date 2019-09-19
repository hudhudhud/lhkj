<template>
  <div class="gridLettery006" :class="{'dialogTrue':dialogStatus}">
    <template v-if="$route.query.isQuit == 'true' || $store.state.merchantId== 191">
      <back :type="'quit'"></back>
    </template>
    <template v-else>
      <back></back>
    </template>
    <div class="background">
      <img :src="templateConfig.background">
      <div class="zhezhao"></div>
    </div>

    <div class="wap">
      <HemiGrid006
        :act="act"
        :template-config="templateConfig"
        @open-message="openMessage"
      ></HemiGrid006>
      <div class="tag">限常州地区号段农行掌银用户</div>
      <div class="tel">抽中实物奖品用户，请联系中国农业银行常州分行薛经理</div>
      <div class="tel">联系电话：0519-88104945</div>
      <template>
        <div class="btn-div">
          <button
            class="win-record"
            @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
            :style="{'backgroundImage': 'url('+ templateConfig.recordBtn+')'}"
          ></button>
          <!-- <button
            class="act-detail"
            @click="openMessage({keyward: 'showRules', detail: act.detail})"
            :style="{'backgroundImage': 'url('+ templateConfig.ruleBtn+')'}"
          ></button> -->
          <button
            class="act-detail"
            @click="openRule"
            :style="{'backgroundImage': 'url('+ templateConfig.ruleBtn+')'}"
          ></button>
        </div>
      </template>
      <!-- 555417496 -->

    </div>
    <div class="Dialog" v-if="dialogStatus">
      <div class="dialog prize" v-if="dialogType==1">
        <div class="gift" v-if="payloadModal.proType!=8">
          <img :src="payloadModal.standardImgUrl" alt="">
          <p>{{payloadModal.prizeName}}</p>
        </div>
        <div class="thanks" v-else>
          <img src="./img/face.png" alt="">
        </div>
        <div class="btn" @click="closeDialog"></div>
        <p v-if="payloadModal.proType!=8">请前往“中奖记录”领取奖品</p>
      </div>
      <div class="rule" v-if="dialogType==2">
        <div class="rulers" v-html="act.detail"></div>
        <div class="btn" @click="closeDialog"></div>
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
import action from './img/action.png';
import actbanner from './img/act-banner.png';
import HemiGrid from '@/components/HemiGridCommon';
import HemiGrid006 from '@/components/HemiGrid006';
import MessageModal from '@/components/lotteryModal/MessageModal';
import goHome from '@/components/goHome';
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
      templateConfig: JSON.parse(this.act.templateConfig),

      setDialog: {
        banner: actbanner,
        btn: action,
        actId: ''
      },
      payloadModal: {},
      dialogStatus: false,
      dialogType: null
    };
  },
  components: {
    HemiGrid,
    HemiGrid006,
    ActDialog,
    MessageModal,
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
      this.dialogStatus = true;
      this.dialogType = 1;
    },
    closeDialog () {
      this.dialogStatus = false;
      this.dialogType = null;
    },
    openRule () {
      this.dialogStatus = true;
      this.dialogType = 2;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.gridLettery006{
    height: 100vh;
    width: 100%;
    position: relative;
    &.dialogTrue{
      overflow: hidden;
    }
}
.background {
  position: absolute;
  width: 100%;
  top: 0;
  img {
    display: block;
    width: 100%;
    float: left;
  }
  .zhezhao{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }
}
.wap {
  //height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  padding-top: 4.2rem;
  overflow: hidden;
  .tag{
    font-size: 0.32rem;
    color: #9b2310;
    line-height: 0.62rem;
    width: 5.2rem;
    height: 0.62rem;
    margin: 0.16rem auto 0.1rem;
    text-align: center;
    background: #febe5a;
    border-radius: 0.4rem;
  }
  .tel{
    width: 100%;
    padding: 0 10%;
    text-align: center;
    font-size: 0.2rem;
    color: #9b2310;
    line-height: 0.3rem;
  }
  .btn-div {
    margin: 0.1rem 0 0.1rem;
    text-align: center;
    button {
      height: 0.9rem;
      width: 2.84rem;
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
.Dialog{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  position: fixed;
  top: 0;
  .dialog{
    width: 5.58rem;
    height: 6.54rem;
    background: url('./img/thanks.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -3.27rem 0 0 -2.8rem;
    &.prize{
      background: url('./img/prize.png') no-repeat;
      background-size: 100% 100%;
    }
    .gift,.thanks{
      position: absolute;
      top: 3.75rem;
      width: 100%;
      text-align: center;
      img{
        width: 0.8rem;
        height: 0.8rem;
      }
      p{
        font-size: 0.24rem;
        color: #ffffff;
        line-height: 0.24rem;
        margin-top: 0.06rem;
      }
    }
    .thanks{
      top: 4rem;
      img{
        width: 0.9rem;
        height: auto;
      }
    }
    .btn{
      width: 4rem;
      height: 0.85rem;
      position: absolute;
      top: 5.15rem;
      left: 0.8rem;
    }
    p{
      color: #fff;
      text-align: center;
      position: absolute;
      width: 100%;
      top: 6.15rem;
      font-size: 0.18rem;
    }
  }
  .rule{
    width: 5.58rem;
    height: 8.1rem;
    background: url('./img/rule.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -4.05rem 0 0 -2.8rem;
    .rulers{
      font-size: 0.24rem;
      color: #ffffff;
      line-height: 0.36rem;
      width: 4.28rem;
      height: 2.75rem;
      overflow: auto;
      position: absolute;
      top: 3.5rem;
      left: 0.65rem;
    }
    .btn{
      width: 4rem;
      height: 0.85rem;
      position: absolute;
      top: 6.83rem;
      left: 0.8rem;
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

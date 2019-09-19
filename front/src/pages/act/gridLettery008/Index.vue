<template>
  <div class="out-box">
    <template v-if="$route.query.isQuit == 'true' || $store.state.merchantId== 191">
      <back :type="'quit'"></back>
    </template>
    <template v-else>
      <back></back>
    </template>

    <div class="wap" :style="{'backgroundImage': 'url('+ templateConfig.background+')'}">
      <!-- <img class="banner" :src="templateConfig.banner" alt> -->
      <div class="condition-desc">
        每人每天限抽1次<br />
        每月共计4次抽奖机会
      </div>
      <div class="bullet-container">
        <div class="bullet-position">
          <BulletNew :list='msgList' :itemHeight='".76rem"'></BulletNew>
        </div>
      </div>
      <HemiGrid class="hemiGrid" ref="grid" :act="act" :template-config="templateConfig" @open-message="openMessage">
      </HemiGrid>
      <div class="act-chance">您有<span>{{chance}}</span>抽奖机会</div>
      <template v-if="templateConfig.recordBtn">
        <div class="btn-div">
          <button class="win-record" @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
            :style="{'backgroundImage': 'url('+ templateConfig.recordBtn+')'}"></button>
          <button class="act-detail" @click="showRule=true;"
            :style="{'backgroundImage': 'url('+ templateConfig.ruleBtn+')'}"></button>
        </div>
      </template>
    </div>
    <Modal v-if="PopupFlag" :act="act" :prize="payloadModal" @modal-handler="handleModal" :orderCode="orderCode">
    </Modal>
    <mt-popup class="rule-popup" v-model="showRule" popup-transition="popup-fade">
      <div class="rule-main" @click="showRule = false;">
        <div class="rule-label"></div>
        <div class="rule-desc" v-html="act.detail"></div>
      </div>
    </mt-popup>
    <mt-popup class="pay-popup" v-model="showPay" popup-transition="popup-fade">
      <div class="pay-main">
        <div class="pay-desc">
          支付<span>0.01元</span>即可抽奖
        </div>
        <div class="act-people">
          活动对象：吉林省手机银行客户<br>
          (每天一次，每月4次)
        </div>
        <div class="pay-btn" @click="buyChance"></div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import HemiGrid from '@/components/HemiGridCommon';
import BulletNew from '@/components/BulletNew';
import Modal from './components/modal';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      orderCode: '',
      PopupFlag: false,
      showRule: false,
      showPay: false,
      templateConfig: JSON.parse(this.act.templateConfig),
      payloadModal: {},
      msgList: [],
      chance: 0
    };
  },
  components: {
    HemiGrid,
    BulletNew,
    Modal
  },
  async created () {
    let rs = await this.$post('/api/getAllOrderList?', {
      actId: this.act.actId,
      status: 2
    });
    if (rs.status === 200) {
      let list = rs.payload.list;
      if (!list || list.length === 0) {
        this.msgList = [];
      } else {
        let cur = [];
        list.forEach(item => {
          let tel = item.tel
            ? item.tel.replace(/([\d]{3})([\d]{5})([\d]{3})/, '$1*****$3')
            : '**';
          let str = `恭喜${tel}的用户获得${item.proStandardName}`;
          cur.push(str);
        });
        this.msgList = [...cur];
      }
    }
    Indicator.open();
    let chanceRs = await this.$get('api/get_lottery_info/' + this.act.actId);
    if (chanceRs.status === 200) {
      this.chance = chanceRs.payload.chances;
      // if (this.chance == 0) {
      //   this.showPay = true;
      // }
    } else {
      Toast(chanceRs.error);
    }
    Indicator.close();
  },
  methods: {
    openMessage (payload) {
      this.payloadModal = payload;
      if (this.chance > 0 && payload.keyward == 'showPrize') {
        this.chance--;
        this.PopupFlag = true;
      } else if (this.chance == 0 && payload.keyward == 'showBuyChance') {
        this.showPay = true;
      } else {
        this.chance = 0;
      }
    },
    handleModal () {
      if (this.payloadModal.proType != 8) {
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/index/prize?orderCode=${this.payloadModal.orderCode}`
        );
      } else {
      }
      this.PopupFlag = false;
    },
    buyChance () {
      Indicator.open();
      this.$post('/api/buy_lottery', {
        actId: this.act.actId,
        num: '1'
      }).then(rs => {
        if (rs.status === 200) {
          this.$refs.grid.prepayId = rs.payload.prepayId;
          this.$refs.grid.payForChance();
        } else {
          Toast(rs.error);
        }
        Indicator.close();
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.out-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}
.wap {
  position: absolute;
  left: 0;
  right: 0;
  background-size: 100% 14.05rem;
  .banner {
    display: block;
    margin: 0.4rem auto;
    width: 80%;
  }
  .condition-desc {
    color: #f1452e;
    font-size: 0.28rem;
    line-height: 0.4rem;
    text-align: center;
    margin-top: 2.9rem;
  }
  .bullet-container {
    box-sizing: border-box;
    width: 92%;
    height: 0.8rem;
    line-height: 0.8rem;
    margin: 0.1rem 4% 0.2rem;
    background: url(//static.lianhaikeji.com/images/20190719/6a6b68473dc34617a74176219ad79dd6.png)
      no-repeat;
    background-position: center;
    background-size: 100%;
    color: #fff;
    padding: 0 11.5%;
    .bullet-position {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
  .act-chance {
    width: 100%;
    text-align: center;
    font-size: 0.3rem;
    line-height: 0.45rem;
    color: #f1452e;
    margin-top: 0.1rem;
    > span {
      font-size: 0.4rem;
      font-weight: bold;
    }
  }
  .btn-div {
    margin: 0.4rem 0 0.6rem;
    text-align: center;
    button {
      height: 0.8rem;
      width: 2.9rem;
      border: none;
      &.win-record {
        margin-right: 0.4rem;
        background-size: 100% 100%;
      }
      &.act-detail {
        background-size: 100% 100%;
      }
    }
  }
}
.rule-popup {
  border-radius: 10px;
}
.rule-main {
  width: 6.9rem;
  height: 10.8rem;
  background-color: #f3fcff;
  border-radius: 10px;
  .rule-label {
    display: inline-block;
    width: 1.58rem;
    height: 0.38rem;
    background: url("./img/rule-title.png") no-repeat;
    background-size: 100%;
    margin: 0.4rem 2.66rem 0.42rem;
  }
  .rule-desc {
    line-height: 0.36rem;
    font-size: 0.24rem;
    color: #333;
    padding: 0 0.3rem;
    max-height: 9.6rem;
    overflow-y: auto;
  }
}
.pay-main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // padding: 2rem 0 0.3rem;
  width: 6.3rem;
  height: 6.4rem;
  background: url("./img/pay-modal.png") no-repeat;
  background-size: 100% 100%;
  .pay-desc {
    text-align: center;
    color: #333;
    font-size: 0.36rem;
    margin: 2.9rem 0 0.74rem;
    span {
      color: #f1452e;
      font-weight: bold;
    }
  }
  .act-people {
    font-size: 0.24rem;
    color: #666;
    text-align: center;
    line-height: 0.36rem;
  }
  .pay-btn {
    width: 4rem;
    height: 0.8rem;
    background: url("./img/pay-btn.png") no-repeat center center;
    background-size: 100% 100%;
    position: absolute;
    bottom: 0.5rem;
    left: 1.15rem;
  }
}
.hemiGrid /deep/ .box .border-light .lh5 {
  padding: 1rem 0.1rem 0;
}
</style>

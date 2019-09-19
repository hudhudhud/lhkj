<template>
  <div>

    <back></back>
    <div class="background" :style="{'backgroundImage': 'url('+ templateConfig.background+')'}">
    </div>

    <div class="wap">
      <img class="banner" :src="templateConfig.banner" alt>

      <HemiGrid :act="act" :template-config="templateConfig" @open-message="openMessage"></HemiGrid>
      <template v-if="templateConfig.recordBtn">
        <div class="btn-div">
          <button class="win-record" @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
            :style="{'backgroundImage': 'url('+ templateConfig.recordBtn+')'}"></button>
          <button class="act-detail"  @click="ruleDialog=true"
            :style="{'backgroundImage': 'url('+ templateConfig.ruleBtn+')'}"></button>
        </div>
      </template>

    </div>
    <mt-popup
      class="Dialog"
      v-model="ruleDialog"
      position="center">
      <div class="ruleDialog" :style="{'background': 'url('+ templateConfig.ruleDialogBg +') center / 100% 100% no-repeat'}">
        <div class="close" @click="ruleDialog=false"><img :src="templateConfig.ruleDialogClose" alt=""></div>
        <div class="ruleContent" v-html="act.detail"></div>
      </div>
    </mt-popup>
    <mt-popup
      class="Dialog"
      v-model="prizeDialog"
      position="center">
      <div class="prizeDialog" v-if="prizeInfo.proType!=8" :style="{'background': 'url('+ templateConfig.prizeDialogBg +') center / 100% 100% no-repeat'}">
        <div class="close" @click="prizeDialog=false"><img :src="templateConfig.prizeImg" alt=""></div>
        <div class="prizeContent">
          <div class="prizeName">恭喜您获得{{prizeInfo.prizeName}}</div>
          <div class="prizeImg"><img :src="prizeInfo.standardImgUrl" alt=""></div>
          <div class="btn" @click="prizeDialog=false"></div>
        </div>
      </div>
      <div class="prizeDialog" v-else :style="{'background': 'url('+ templateConfig.thanksDialogBg +') center / 100% 100% no-repeat'}">
        <div class="close" @click="prizeDialog=false"><img :src="templateConfig.prizeImg" alt=""></div>
        <div class="thankContent">
          <div class="thankName"><img src="./img/thanks.png" alt=""></div>
          <div class="thankImg"><img :src="prizeInfo.standardImgUrl" alt=""></div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { MessageBox, Toast } from 'mint-ui';
import HemiGrid from './component/HemiGridCommon';
import { payUrl } from '@/config/';
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      payUrl: payUrl,
      order: null,
      orderCode: '',
      canPay: false,
      latestPayTime: null,
      latestPayTimeFormatted: '',
      PopupFlag: false,
      templateConfig: JSON.parse(this.act.templateConfig),
      ruleDialog: false,
      prizeDialog: false,
      prizeInfo: {}
    };
  },
  components: {
    HemiGrid
  },
  async created () {
  },
  methods: {
    openMessage (payload) {
      console.log(payload);
      if (payload.keyward == 'showBuyChance') {
        MessageBox({
          message: '是否花费' + payload.actualPrice + '购买一次抽奖机会',
          title: '抽奖机会不足',
          showCancelButton: true,
          cancelButtonText: '取消',
          confirmButtonText: '立即购买'
        }).then(action => {
          if (action == 'confirm') {
            this.payForChance(payload.prepayId);
          }
        });
      } else if (payload.keyward == 'showPrize') {
        this.prizeInfo = payload;
        this.prizeDialog = true;
      }
    },
    payForChance (prepayId) {
      let successUrl = `${window.location.protocol}//${window.location.host}/${
        this.$store.state.merchantAppid
      }/merchant/index/act/${this.act.actId}`;
      Toast('订单已生成...正在跳转支付');
      let payUrl = `${this.payUrl}${
        prepayId
      }?redirectUrl=${encodeURIComponent(successUrl)}`;
      window.location.href = payUrl;
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.Dialog{
  background: none;
}
.ruleDialog{
  width: 6.1rem;
  height: 9.24rem;
  position: relative;
  padding-top: 3.05rem;
  .close{
    width: 0.62rem;
    height: 0.62rem;
    top: 1.9rem;
    right: -0.3rem;
    position: absolute;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .ruleContent{
    width: 5.4rem;
    height: 5.7rem;
    padding: 0 0.2rem 0.3rem;
    font-size: 0.26rem;
    color: #893218;
    line-height: 0.4rem;
    overflow: auto;
    margin: 0 auto 0;
  }
}
.prizeDialog{
  width: 6.1rem;
  height: 8.15rem;
  position: relative;
  .close{
    width: 0.62rem;
    height: 0.62rem;
    top: 1.9rem;
    right: -0.3rem;
    position: absolute;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .prizeContent{
    text-align: center;
    padding-top: 3.5rem;
    .prizeName{
      font-size: 0.4rem;
      line-height: 0.4rem;
      color: #cf930b;
      margin-bottom: 0.3rem;
    }
    .prizeImg{
      margin-bottom: 0.6rem;
      width: 100%;
      img{
        height: 1.7rem;
        //max-width: 80%;
      }
    }
    .btn{
      width: 4.2rem;
      height: 1.54rem;
      background: url('./img/known-btn.png') center / 100% 100% no-repeat;
      margin: 0 auto;
    }
  }
  .thankContent{
    text-align: center;
    padding-top: 3.4rem;
    .thankName{
      margin-bottom: 0.1rem;
      img{
        width: 1.83rem;
      }
    }
    .thankImg{
      img{
        width: 3.04rem;
      }
    }
  }
}
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

<template>
  <div>
    <div class="massage" v-show="prizeInfoShow">
      <!-- <div class="close" @click="closeOrOpen('prizeInfoShow', 'showRules', 'closeFlag', false)" v-if="closeFlag">
        <img src="./lottery/close.png" alt="">
      </div> -->
      <!-- 购买机会 -->
      <div class="buyChance msgBox" v-if="buyChanceShow">
        <p>是否花费
          <i>¥{{payload.actualPrice}}
          </i>购买一次抽奖机会</p>
        <button @click="payForChance">立即购买</button>

      </div>
      <div class="showCommitPhoneNum msgBox">
        <div class="top-bar">请输入您的手机号</div>
        <div class="input">
          <label for=""> 手机号 <input type="text" v-model="tel">
          </label>
        </div>
        <div class="btn" @click="commitCustomTel">确定</div>
      </div>
      <!-- 抽中奖品 -->
      <!-- <img src="./lottery/circleLight.png" class="circleLight" v-if="havePrizeShow" alt=""> -->
      <div class="havePrize current-prize-dialog" v-if="havePrizeShow">
        <!-- 抽奖结果 -->
        <div class="modal-main">
          <img class="gratulation-pic" src="./imgs/gratulation-pic.png" alt="">
          <!-- <img class="prizePic" :src="payload.standardImgUrl" alt=""> -->
          <div class="gratulation">恭喜您</div>
          <div class="phone">
            手机号：{{ tel }}
          </div>
          <p>{{payload.prizeName}}</p>
        </div>
        <div class="info">已为您提交充值</div>
        <div class="btn" @click="lotterySure">
          <a>确定</a>
        </div>
      </div>
      <!-- 规则 -->
      <div class="letteryRules" v-if="showRules">
        <div class="main">
          <div class="title">活动规则</div>
          <div class="article">
            <div> <i>1</i> 只有指定到店客户通过手机银行APP成功完成二维码支付才可以参与抽奖，非二维码支付、非成功交易等不能参与抽奖。 </div>
            <div><i>2</i> 奖品设置有1元、2元、5元、10元、50元话费，中奖率100%。</div>
            <div> <i>3</i> 每位符合条件的客户每月有且仅有1次抽奖机会，由客户确认手机号后进行抽奖，手机号一经确认不可更改。</div>
            <div><i>4</i> 客户中奖后，点击“确认领取”即可领取话费，一般情况下话费实时到账，月初24小时内到账。</div>
            <div> <i>5</i> 由于客户未提供正确的手机号码导致客户无法获得手机话费，活动主办方不承担任何责任。</div>
            <div> <i>6</i> 对于活动细节如有疑问，请咨询中国银行福建省分行各营业网点。</div>
            <div><i>7</i> 凡参与本次活动即视为同意活动规则所述的各项规则，在法律允许的范围内中国银行福建省分行将保留修改本次活动条款、延迟或提前终止本活动而无须事先通知的权利。</div>
          </div>
          <div class="comfirm" @click="closeOrOpen('prizeInfoShow', 'showRules', 'closeFlag', false)">
            我知道了
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'
import bus from '@/lib/eventBus'
export default {
  name: 'MessageModal',
  props: {
    act: {
      require: true,
      type: Object
    },
    value: {
      require: true,
      type: Object
    }
  },
  watch: {
    value (val) {
      console.log(val.keyward)
      this.payload = val
      switch (val.keyward) {
        case 'showPrize':
          this.closeOrOpen('prizeInfoShow', 'havePrizeShow', true) // 弹出是否中奖
          break
        case 'showRules':
          this.closeOrOpen('prizeInfoShow', 'showRules', 'closeFlag', true)
          break
        case 'showBuyChance':
          this.closeOrOpen('prizeInfoShow', 'buyChanceShow', 'closeFlag', true)
          break
        case 'showCommitPhoneNum':
          this.closeOrOpen('prizeInfoShow', 'showCommitPhoneNum', 'closeFlag', true)
          break
      }
    }
  },
  data () {
    return {
      tel: '',
      payload: {},
      prizeInfoShow: false,
      buyChanceShow: false,
      havePrizeShow: false,
      showCommitPhoneNum: false,
      showRules: false,
      closeFlag: false
    }
  },
  methods: {
    payForChance () {
      bus.$emit('pay-for-chance')
    },
    lotterySure () {
      // this.$emit('charge')
      this.closeOrOpen('prizeInfoShow', 'havePrizeShow', false)
    },
    closeOrOpen () { // 消息开关
      const args = Array.from(arguments)
      var boolean = args.pop()
      var vm = this
      args.forEach(function (item) {
        vm[item] = boolean
      })
    },
    async commitCustomTel () {
      if (!this.tel) {
        Toast('请输入您的手机号')
      } else {
        let phoneReg = /^1[3456789]\d{9}$/
        if (phoneReg.test(this.tel)) {
          let rs = await this.$post('api/check/act_limit', {
            account: this.tel,
            actId: this.act.actId
          })
          if (rs.status == 200) {
            // this.$emit('setAccount', this.tel)
            this.$emit('setAccount', this.tel)
            this.closeOrOpen('prizeInfoShow', 'showCommitPhoneNum', false)
          } else {
            Toast(rs.error)
          }
        } else {
          Toast('请输入正确的手机号')
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.massage {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  .msgBox {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
  .buyChance {
    width: 6rem;
    height: 4rem;
    text-align: center;
    background: #fff;
    border: 0.1rem solid transparent;
    background: linear-gradient(white, white) padding-box,
      repeating-linear-gradient(
          45deg,
          #ffde00 0%,
          #ffde00 4.6%,
          #3eaaff 0,
          #3eaaff 10%
        )
        0 / 6.9rem 6.9rem;
    button {
      width: 2.4rem;
      height: 0.6rem;
      color: #fff;
      border-radius: 0.3rem;
      background: #3690e3;
      background-image: -webkit-linear-gradient(315deg, #32b2d7, #396def);
      background-image: -o-linear-gradient(315deg, #32b2d7, #396def);
      background-image: linear-gradient(135deg, #32b2d7, #396def);
      border: none;
    }
    p {
      font-size: 0.3rem;
      line-height: 1.8rem;
      i {
        color: #3690e3;
      }
    }
  }
  .showCommitPhoneNum {
    width: 5rem;
    height: 3.6rem;
    text-align: center;
    background: #fff;
    .top-bar {
      line-height: 0.8rem;
      color: #fff;
      text-align: center;
      background: url(./imgs/rule-title-bg.png) no-repeat;
    }
    .input {
      margin: 0.5rem auto 0.6rem;
      text-align: center;
    }
    input {
      width: 2.8rem;
      border-bottom: 1px solid #666;
      padding-left: 0.2rem;
      line-height: 0.5rem;
      font-size: 0.3rem;
    }
    .btn {
      width: 2rem;
      line-height: 0.56rem;
      margin: 0 auto;
      text-align: center;
      color: #fff;
      background: url(./imgs/btn.png) no-repeat;
      background-size: 100% 100%;
    }
  }

  .close {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    top: 1rem;
    right: 0.3rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .letteryRules {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    .main {
      width: 6.14rem;
      position: absolute;
      height: 9.8rem;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      background: #fff;
      // background: url(./imgs/dialog-bg.jpg) no-repeat;
      background-size: 100% 100%;
      font-size: 0.28rem;
      line-height: 0.4rem;
      box-sizing: border-box;
      .title {
        color: #fff;
        font-size: 0.32rem;
        text-align: center;
        line-height: 0.7rem;
        background: url(./imgs/rule-title-bg.png) no-repeat;
        margin-bottom: 0.3rem;
      }
      .article {
        padding: 0 0.2rem;
        height: 8rem;
        overflow: auto;
        color: #666;
        line-height: 0.5rem;
        overflow-y: scroll;
        // margin-bottom: 0.3rem;
        div {
          position: relative;
          padding-left: 0.5rem;
        }
        i {
          position: absolute;
          left: 0;
          top: 0.05rem;
          display: inline-block;
          font-style: normal;
          width: 0.4rem;
          height: 0.4rem;
          background: url(./imgs/circle.png) no-repeat;
          background-size: 100% 100%;
          line-height: 0.4rem;
          text-align: center;
          color: #fff;
        }
      }
      .comfirm {
        float: right;
        width: 1.6rem;
        height: 0.56rem;
        margin-right: 0.3rem;
        line-height: 0.56rem;
        color: #fff;
        text-align: center;
        background: #b50029;
      }
    }
  }
  .havePrize {
    width: 6.02rem;
    height: 5rem;
    padding-bottom: 0.4rem;
    border-radius: 0.1rem;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    text-align: center;
    background: #fff;
    .gratulation {
      color: #b50029;
      font-size: 0.6rem;
      padding-top: 0.2rem;
    }
    .info {
      padding-top: 0.3rem;
      font-size: 0.24rem;
      color: #666;
    }
    .phone {
      width: 3.6rem;
      margin: 0.3rem auto 0;
      color: #b50029;
      text-align: center;
      font-size: 0.3rem;
      line-height: 0.56rem;
      border-radius: 0.4rem;
      border: 2px solid #b50029;
    }
    p {
      color: #5f3b34;
      padding-top: 0.3rem;
      font-size: 0.32rem;
      font-weight: bold;
      color: #b50029;
    }
    .btn {
      width: 2.8rem;
      height: 0.8rem;
      margin: 0.2rem auto 0;
      background: url("./imgs/btn.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      a {
        font-size: 0.3rem;
        color: #fff;
        line-height: 0.76rem;
        text-align: center;
        font-weight: 600;
      }
    }
  }
}
.current-prize-dialog,
.receive-success-dialog {
  .gratulation-pic {
    width: 6.02rem;
    height: 2.57rem;
    margin-top: -2.1rem;
  }
  .prizePic {
    /*   width: 3.86rem;
        height: 1.96rem;
        margin-bottom: 0.2rem; */
    max-width: 3.8rem;
    margin: 0.4rem 0;
  }
}
</style>

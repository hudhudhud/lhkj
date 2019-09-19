<template>
  <div class="GoddessDialog">
    <Popup v-model="showDialog" lockScroll="true" pop-transition="popup-fade" modal="false"
           :closeOnClickModal="maskClicked">
      <div class="GoddessDialog-main">
        <span class="GoddessDialog-close" @click="close"></span>
        <p class="GoddessDialog-title">{{title}}</p>
        <div class="GoddessDialog-content" v-if="!type">
          <p v-for="(item,index) in rulesJson['actRules']" :key="index">{{item}}</p>
        </div>
        <div class="GoddessDialog-content" v-else>
          <div class="GoddessDialog-coupon">
            <img :src="couponPic" :class="{'cash':cash}" alt="">
            <p>{{couponPrice}}</p>
          </div>
          <div class="GoddessDialog-action" @click="confirm"></div>
          <p v-for="(item,index) in useTips" :key="index">{{item}}</p>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import {Popup} from 'mint-ui';
import rulesJson from '../rules.json'

export default {
  name: 'GoddessDialog',
  components: {
    Popup
  },
  props: {
    title: {
      type: String
    },
    type: {
      type: Boolean
      // 0:规则对话框，1：领取对话框
    }
  },
  data () {
    return {
      rulesJson,
      showDialog: false,
      maskClicked: false,
      couponPic: '',
      couponPrice: '',
      useTips: ['可用于中国建设银行手机银行-悦享生活-惠聚广东-约惠广州商城消费抵扣'],
      cash: false // 通用现金券20
    }
  },
  methods: {
    open () {
      this.showDialog = true;
    },
    close () {
      this.showDialog = false;
      this.$emit('close', this.cash);
    },
    confirm () {
      this.$emit('confirm', this.cash);
    },
    // 设置卡券图标
    setCoupon (sourceSrc) {
      this.couponPic = sourceSrc;
    },
    // 设置现金券使用规则
    setUseTips (sourceArr) {
      this.useTips = sourceArr;
    },
    // 设置圈金额
    setPrice (price) {
      this.couponPrice = price;
    },
    // 设置现金券 通用：true,特定：false
    setCash (cash) {
      this.cash = cash;
    },
    // 设置内容最大高度
    setContentMaxHeight (rem) {
      document.querySelector('.GoddessDialog-content').style.maxHeight = rem;
    }
  }
}
</script>

<style scoped lang="scss">
  .GoddessDialog {
    &-main {
      width: 6.23rem;
      font-family: SourceHanSansCN-Medium;
      position: relative;
      padding-bottom: 0.45rem;
    }

    &-close {
      position: absolute;
      top: -0.79rem;
      right: -0.2rem;
      display: block;
      width: 0.53rem;
      height: 0.53rem;
      border-radius: 50%;
      background-image: url("../img/dialog/close.png");
      background-size: cover;
    }

    &-title {
      padding: 0.42rem 0;
      text-align: center;
      font-size: 0.4rem;
      color: #fff;
      width: 6.23rem;
      height: 1.6rem;
      background-image: url("../img/dialog/title.png");
      background-size: cover;
    }

    &-content {
      font-size: 0.24rem;
      text-align: justify;
      color: #333;
      line-height: 0.36rem;
      padding: 0.45rem 0.38rem 0.66rem 0.38rem;
      -webkit-overflow-scrolling: touch;
      overflow-y: scroll;
      max-height: 5.25rem;

      p {
        line-height: 1.5;
      }
    }

    &-coupon {
      text-align: center;

      img {
        width: 1.8rem;
        height: 1.8rem;
        &.cash{
          width: 3.87rem;
          height: 1.99rem;
        }
      }
    }

    &-action {
      width: 2.3rem;
      height: 0.56rem;
      margin: 0.22rem auto;
      background-size: 100% 100%;
      background-image: url("../img/dialog/confirm.png");
    }

    /deep/ .mint-popup {
      border-radius: 0.29rem;
    }
  }
</style>

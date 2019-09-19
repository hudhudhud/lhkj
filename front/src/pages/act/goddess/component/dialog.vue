<template>
  <div class="GoddessDialog">
    <Popup
      v-model="showDialog"
      lockScroll="true"
      pop-transition="popup-fade"
      modal="false"
      :closeOnClickModal="maskClicked"
    >
      <div class="GoddessDialog-main">
        <span
          class="GoddessDialog-close"
          @click="close"
        ></span>
        <p class="GoddessDialog-title">{{title}}</p>
        <div class="GoddessDialog-content">
          <p
            v-for="(item,index) in rules"
            :key="index"
          >{{item}}</p>
        </div>
      </div>
    </Popup>
  </div>
</template>

<script>
import { Popup } from 'mint-ui';

export default {
  name: 'GoddessDialog',
  components: {
    Popup
  },
  props: {
    title: {
      type: String
    }
  },
  data () {
    return {
      rules: [
        '1.活动时间为2019年3月7日—3月31日。',
        '2.活动期间，每位用户进入“建行广州分行“微信公众号回复”女神“即可参与游戏领取女神津贴。',
        '3.每个用户共有5次参与游戏机会，首次测颜值可获得专属女神气质牌，并获得5元指定抵扣券，后4次通过龙支付支付0.01元一定概率获得5元指定抵扣券，完成5次游戏另外可获得20元通用现金抵用券。',
        '4.获得抵扣券后，用户可在中国建设银行手机银行APP-悦享生活-惠聚广东-“约惠广州”商城，使用龙支付消费购买商品，可用抵扣券抵扣减免，享受优惠（仅限龙支付钱包余额支付或绑定建行卡支付才能享受优惠）。每位注册用户领取的津贴礼券只可给本人龙支付账户使用。',
        '5.参与游戏后，用户可生成专属二维码女神气质海报，通过邀请好友参与最多的，将成为“独宠女王”，可获得终极大礼包',
        '6.本次活动抵扣券实时兑现，终极大礼将于活动结束后4月10号下午4点公布获奖人选后兑现。',
        '7.本次活动仅限广州地区龙支付用户参与，未开通龙支付的用户需前往中国建设银行手机银行APP开通龙支付。',
        '8.本次活动解释权归中国建设银行股份有限公司广州分行所有。'
      ],
      showDialog: false,
      maskClicked: false
    };
  },
  methods: {
    open () {
      this.showDialog = true;
    },
    close () {
      this.showDialog = false;
      this.$emit('close');
    },
    confirm () {
      this.$emit('confirm');
    },
    // 设置内容最大高度
    setContentMaxHeight (rem) {
      document.querySelector('.GoddessDialog-content').style.maxHeight = rem;
    }
  }
};
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
    background-image: url("../gimg/close.png");
    background-size: cover;
  }

  &-title {
    padding: 0.42rem 0;
    text-align: center;
    font-size: 0.4rem;
    color: #fff;
    width: 6.23rem;
    height: 1.6rem;
    background-image: url("../gimg/title.png");
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
      &.cash {
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
    background-image: url("../gimg/confirm.png");
  }

  /deep/ .mint-popup {
    border-radius: 0.29rem;
  }
}
</style>

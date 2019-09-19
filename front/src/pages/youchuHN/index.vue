<template>
  <div class="main">
    <back></back>
    <div class="header">
      <!-- <img
        src="./imgs/header.png"
        alt=""
      > -->
    </div>
    <div class="std-main">
      <div
        class="std-item"
        v-for="i in 4"
        :key="i"
        @click="showtip=true,mask=i"
      >
        <!-- -->
        <img
          :src="imgList[i-1]"
          alt=""
        ></div>
    </div>
    <div class="rule">
      <div
        class="title"
        @click="showRule=!showRule"
      >活动规则 <img
          :src="showRule?hideRule[0]:hideRule[1]"
          alt=""
        ></div>
      <div
        class="content"
        :class="{rulecontent:showRule}"
      >
        1、活动时间：2019年5月至2020年5月，每周六、周日上午9点起；<br>
        2、活动内容：湖南省邮储银行客户通过“邮储银行湖南分行”微信公众号在线缴纳话费、水费、电费、煤气费等，微信绑定湖南省内邮储银行卡支付，可享68折优惠，周末缴费老客户最高优惠5元、新客户最高优惠10元，先到先得，用完即止，非周末需原价支付哦。<br>
        3、活动流程：<br>
        （1）客户关注“邮储银行湖南分行”公众号，选择优惠区-生活缴费68折，进入活动专区；<br>
        （2）客户在活动专区首页，选择缴费类型后，微信支付方式选择邮储银行卡支付，支付页面提示为信用卡、储蓄卡两项，支付成功后即缴费成功；<br>
        （3）每个活动日投放补贴费用8500元，客户在补贴费用8500元名额内的情况下，每人每月可享1次68折优惠机会；<br>
        （4）2019年5月活动开展后，微信绑定邮储银行卡首次参与活动的视为新用户，最高减10元，活动前微信已绑定邮储银行卡的老用户最高减5元，已享受过新客优惠的客户，次月将享受老客户优惠，以实际优惠金额为准。<br>
        4、本次活动中缴费不成功的客户可拨打4009626962、0571-28274830进行咨询。
      </div>
    </div>
    <mt-popup
      v-model="showtip"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="tipmsg">
        <div class="tiptop">温馨提示</div>
        <div class="tipcontent"> 每周六周日上午9点起，使用湖南省内邮储银行卡支付才有机会享受68折优惠哦。</div>
        <div
          class="btnnext"
          @click="showtip=false,go()"
        ><img
            src="./imgs/btn-next.png"
            alt=""
          ></div>
      </div>
      <div
        class="tipclose"
        @click="showtip=false"
      ><img
          src="./imgs/close.png"
          alt=""
        ></div>
    </mt-popup>
  </div>
</template>
<script>
import img1 from './imgs/phone.png';
import img2 from './imgs/shui.png';
import img3 from './imgs/dian.png';
import img4 from './imgs/ranqi.png';
import top from './imgs/top.png';
import bottom from './imgs/bottom.png';
import { Popup } from 'mint-ui';
export default {
  data () {
    return {
      imgList: [img1, img2, img3, img4],
      hideRule: [top, bottom],
      showRule: true,
      showtip: false,
      mask: ''
    };
  },
  components: {
    [Popup.name]: Popup
  },
  watch: {
    showRule (val) {
      console.log(89899, val);
    }
  },
  methods: {
    go () {
      if (this.mask) {
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/youchuHN/recharge/${this.mask}`
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.tipclose {
  width: 0.52rem;
  height: 0.52rem;
  margin: 0.3rem auto;
  img {
    width: 100%;
  }
}
.tipmsg {
  width: 5.88rem;
  min-height: 4rem;
  background: url(./imgs/tip.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 0.001rem;
  padding-bottom: 0.5rem;
  .tipcontent {
    font-size: 0.26rem;
    color: #333;
    text-indent: 0.4rem;
    line-height: 0.45rem;
    width: 80%;
    margin: 0.3rem auto;
  }
  .tiptop {
    width: 100%;
    text-align: center;
    font-size: 0.4rem;
    font-weight: 700;
    margin: 0.3rem auto 1.1rem;
    color: #fff;
  }

  .btnnext {
    width: 3.43rem;
    height: 0.78rem;
    margin: 0.3rem auto 0;
    img {
      width: 100%;
    }
  }
}
.mypop {
  background: transparent;
}
.main {
  background: #ff141f;
  min-height: 100vh;
  padding-bottom: 0.3rem;
  .header {
    width: 100%;
    height: 4.47rem;
    background: url(./imgs/header.png) no-repeat;
    background-size: 100% 4.47rem;
    // img {
    //   width: 100%;
    //   height: 4.47rem;
    // }
  }
  .std-main {
    width: 95%;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: 0 auto;
    .std-item {
      margin-bottom: 0.1rem;
      img {
        display: block;
        width: 3.42rem;
        height: 1.82rem;
      }
    }
  }
  .rule {
    width: 100%;
    margin: 0.2rem auto 0;
    .title {
      width: 100%;
      font-size: 0.4rem;
      height: 0.44rem;
      color: #ffffff;
      text-align: center;
      line-height: 0.44rem;
      font-weight: 600;
      position: relative;
      padding-right: 0.35rem;
      img {
        width: 0.43rem;
        height: 0.44rem;
        position: absolute;
        top: 0;
        right: 35%;
      }
    }
    .content {
      width: 6.9rem;
      background: #fff;
      border-radius: 0.1rem;
      margin: 0.2rem auto;
      padding: 0.3rem;
      font-size: 0.3rem;
      line-height: 0.45rem;
      color: #2f2f2f;
      display: block;
    }
    .rulecontent {
      display: none;
    }
  }
}
</style>

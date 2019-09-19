<template>
  <div class="tiyanyouli">
    <back></back>
    <div
      class="btnrule"
      @click="$router.push(`/${$store.state.merchantAppid}/merchant/tiyanyouli/rule?actId=${secondActId}`)"
    > <img
        src="./imgs/btnrule.png"
        alt=""
      > </div>
    <div class="tip1"><img
        src="./imgs/tip1.png"
        alt=""
      ></div>
    <div
      class="btnregister"
      @click="$router.push(`/${$store.state.merchantAppid}/merchant/tiyanyouli/youli`)"
    ><img
        src="./imgs/btnregister.png"
        alt=""
      ></div>
    <p class="title">请先报名参与活动</p>
    <div class="tip2"><img
        src="./imgs/tip2.png"
        alt=""
      >
    </div>
    <div class="lettorytip">
      <div class="wrapper">
        <div class="wrap-item"><img
            :src="prizeImg[mask].img1"
            alt=""
          ></div>
        <div class="wrap-item"><img
            :src="prizeImg[mask].img2"
            alt=""
          ></div>
        <div class="wrap-item"><img
            :src="prizeImg[mask].img3"
            alt=""
          ></div>
      </div>
      <div class="btn-group">
        <div
          class="btnleft"
          @click="prev()"
        ><img
            src="./imgs/left.png"
            alt=""
          ></div>
        <div
          class="btnright"
          @click="next()"
        ><img
            src="./imgs/right.png"
            alt=""
          ></div>
      </div>
      <div
        class="btnlettory"
        @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/act/${secondActId}`)"
      ><img
          src="./imgs/btnlettory.png"
          alt=""
        ></div>
    </div>
    <div class="tip3"><img
        src="./imgs/tip3.png"
        alt=""
      >
    </div>
    <div class="btnget">
      <!-- @click='createOrder()' -->
      <img
        src="./imgs/btnget.png"
        alt=""
      >
    </div>
    <mt-popup
      v-model="popAct"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="signAct">
        <div
          class="btnbaoming"
          @click="popAct=false"
        ><img
            src="./imgs/btncanjia.png"
            alt=""
          ></div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import prize1 from './imgs/prize1.png';
import prize2 from './imgs/prize2.png';
import prize3 from './imgs/prize3.png';
import prize4 from './imgs/prize4.png';
import prize5 from './imgs/prize5.png';
import prize6 from './imgs/prize6.png';
import prize7 from './imgs/prize7.png';
import prize8 from './imgs/prize8.png';
import prize9 from './imgs/prize9.png';
import { getActDetail } from '@/lib/api';
import { Indicator, Toast, Popup } from 'mint-ui';
import { payUrl } from '@/config/';
export default {
  data () {
    return {
      prizeImg: [
        { img1: prize1, img2: prize2, img3: prize3 },
        { img1: prize4, img2: prize6, img3: prize8 },
        { img1: prize5, img2: prize7, img3: prize9 }
      ],
      mask: 0,
      popAct: false,
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 562662071 : 562662071,
      act: '',
      payUrl: payUrl
    };
  },
  components: {
    [Popup.name]: Popup
  },
  methods: {
    prev () {
      if (this.mask == 0) {
        this.mask = 2;
      } else {
        this.mask--;
      }
      console.log('mmmm', this.mask);
    },
    next () {
      if (this.mask == 2) {
        this.mask = 0;
      } else {
        this.mask++;
      }
      console.log('nnnn', this.mask);
    },
    async createOrder () {
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: this.secondActId,
        standardId: '',
        commodityNum: 1
      });
      if (rs.status === 200) {
        let successUrl = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/paysuccess/${rs.payload.orderCode}`;
        Toast('订单已生成...正在跳转支付');
        let payPath = `${payUrl}${
          rs.payload.prepayId
        }?redirectUrl=${encodeURIComponent(successUrl)}`;
        window.location.replace(payPath);
      } else {
        Toast('订单生成失败:' + rs.error);
      }
      Indicator.close();
    }
  },
  async created () {
    this.act = await getActDetail(this.secondActId);
    if (!sessionStorage.getItem('showAct')) {
      this.popAct = true;
    }
    sessionStorage.setItem('showAct', true);
  }
};
</script>
<style lang="scss" scoped>
.tiyanyouli {
  width: 100%;
  height: 25.24rem;
  background: url(./imgs/bg.jpg) no-repeat;
  background-size: 100% auto;
  padding-top: 5.06rem;
  position: relative;
  .btnrule {
    position: absolute;
    top: 0.3rem;
    right: 0;
    width: 1.81rem;
    height: 0.76rem;
    img {
      width: 100%;
    }
  }
  .tip1 {
    width: 7.5rem;
    height: 0.94rem;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .btnregister {
    width: 3.5rem;
    height: 0.8rem;
    margin: 0.3rem auto;
    img {
      width: 100%;
    }
  }
  .tip2 {
    width: 7.5rem;
    height: 4.74rem;
    margin: 0.3rem auto;
    img {
      width: 100%;
    }
  }
  .tip3 {
    width: 7.5rem;
    height: 3.67rem;
    margin: 0.3rem auto;
    img {
      width: 100%;
    }
  }
  .title {
    width: 100%;
    text-align: center;
  }
  .lettorytip {
    width: 7.5rem;
    height: 5.08rem;
    background: url("./imgs/lettorytip.png") no-repeat;
    background-size: 100% 100%;
    margin: 0.3rem auto;
    padding-top: 0.001rem;
    position: relative;
    .wrapper {
      width: 4.6rem;
      height: 1.8rem;
      display: flex;
      justify-content: space-around;
      margin: 1.6rem auto 0.3rem;
      .wrap-item {
        width: 1.69rem;
        height: 1.86rem;
        img {
          width: 100%;
        }
      }
    }
    .btn-group {
      width: 5.3rem;
      height: 0.39rem;
      display: flex;
      justify-content: space-between;
      top: 2.1rem;
      left: 0;
      right: 0;
      margin: auto;
      position: absolute;
      div {
        width: 0.2rem;
        height: 0.39rem;
        img {
          width: 100%;
        }
      }
    }
    .btnlettory {
      width: 3.5rem;
      height: 0.8rem;
      margin: 0rem auto 0;
      img {
        width: 100%;
      }
    }
  }
  .btnget {
    width: 3.5rem;
    height: 0.8rem;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}
.signAct {
  width: 6.8rem;
  height: 10rem;
  background: url("./imgs/popActbg.png") no-repeat;
  background-size: 100% auto;
  padding-top: 8.86rem;
  border-radius: 0.3rem;
  .btnbaoming {
    width: 3.5rem;
    height: 0.8rem;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
}
</style>

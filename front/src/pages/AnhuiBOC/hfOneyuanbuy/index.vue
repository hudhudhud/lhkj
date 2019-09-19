<template>
  <div
    class="phonebuy"
    :class="{active:showRule}"
  >
    <div
      class="btnrule"
      @click="showRule=true"
    ><img
        src="./imgs/btnrule.png"
        alt=""
      ></div>
    <div
      class="btnprize"
      @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/order`)"
    ><img
        src="./imgs/btnprize.png"
        alt=""
      ></div>
    <div class="coupon"><img
        src="./imgs/coupon.png"
        alt=""
      ></div>
    <div
      class="btnbuy"
      @click="buy()"
    ><img
        src="./imgs/btnbuy.png"
        alt=""
      ></div>
    <mt-popup
      v-model="showRule"
      class="mypop"
      popup-transition="popup-fade"
    >
      <div class="rule">
        <div
          class="close"
          @click="showRule=false"
        ><img
            src="./imgs/close.png"
            alt=""
          ></div>
        <template v-if="act">
          <div
            class="rulecontent"
            v-html="act.detail"
          >

          </div>
        </template>

      </div>
    </mt-popup>
  </div>
</template>
<script>
import { getActDetail, creatOrder } from '@/lib/api';
import { Toast, Popup } from 'mint-ui';
export default {
  components: {
    [Popup.name]: Popup
  },
  data () {
    return {
      secondActId: process.env.PUBLISH_ENV == 'prod' ? 563263214 : 563248669,
      act: '',
      showRule: false
    };
  },
  methods: {
    buy () {
      if (!this.act) {
        Toast('网络异常');
        return false;
      }
      let tel = null;
      if (this.$store.state.cust && this.$store.state.cust.tel) {
        tel = this.$store.state.cust.tel;
      }
      creatOrder({
        actId: this.secondActId,
        standardId: this.act.productList[0].standardList[0].id,
        account: tel,
        callbackPage: `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/index/order`
      });
    }
  },
  async created () {
    let act = await getActDetail(this.secondActId);
    localStorage.setItem('lastVisitactId', this.secondActId);
    this.act = act;
  }
};
</script>
<style lang="scss" scoped>
.phonebuy {
  width: 100%;
  min-height: 100vh;
  background: rgb(100, 188, 238) url(./imgs/bg.png) no-repeat;
  background-size: 100% auto;
  padding-top: 8.5rem;
  position: relative;
  .btnrule {
    position: absolute;
    top: 0.8rem;
    right: 0;
    width: 1.59rem;
    height: 0.65rem;
    img {
      width: 100%;
    }
  }
  .btnprize {
    position: absolute;
    top: 1.6rem;
    right: 0;
    width: 1.59rem;
    height: 0.65rem;
    img {
      width: 100%;
    }
  }
  .coupon {
    width: 4.69rem;
    height: 1.78rem;
    margin: 0rem auto;
    img {
      width: 100%;
    }
  }
  .btnbuy {
    width: 4.98rem;
    height: 1.02rem;
    margin: 0.4rem auto;
    img {
      width: 100%;
    }
  }
}
.mypop {
  background: transparent;
}
.rule {
  width: 5.88rem;
  height: 7.54rem;
  background: url(./imgs/rulebg.png) no-repeat;
  background-size: 100% auto;
  padding-top: 2rem;
  position: relative;
  .close {
    position: absolute;
    top: -0.6rem;
    right: -0.6rem;
    width: 0.58rem;
    height: 0.58rem;
    img {
      width: 100%;
    }
  }
  .rulecontent {
    width: 90%;
    height: 5.3rem;
    overflow: scroll;
    font-size: 0.26rem;
    color: #333;
    line-height: 0.45rem;
    margin: 0 auto;
  }
}
.active {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>

<template>
  <div class="lettery">
    <div class="bg">
      <img
        src="./imgs/BG.jpg"
        alt
      >
    </div>
    <div class="wapper">
      <div class="btn-group">
        <button
          class="my-prizes-btn"
          @click="openRule=true"
        ></button>
        <button
          class="lettery-rules-btn"
          @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/order?actId=${act.actId},${secondActId}`)"
        ></button>
        <!-- <button class="lettery-rules-btn" @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/order?actId=164,165`)"></button> -->
      </div>

      <div class="act-wrapper">
        <div class="act-title">
          <i></i>
          <div class="txt">首次登录领20元话费(限一次)</div>
          <i></i>
        </div>
        <div
          class="standard-list"
          v-for="(product, ind) in secondActList.productList"
          :key="'profirst'+ind"
        >
          <div
            class=""
            v-for="(std, ind1) in product.standardList"
            :key="'std'+ind1"
            :class="{'marginR': ind1 == 1}"
          >
            <img
              style="width: 4.26rem"
              :src="secondActList.actIcon"
              alt=""
              @click="createOrder(secondActId,std)"
            >
          </div>
        </div>
        <div
          class="act-title"
          style="margin-top: 0.6rem"
        >
          <i></i>
          <div class="txt">次月视频会员月卡月月领(三选一)</div>
          <i></i>

        </div>
        <div
          class="standard-list"
          v-for="(product, ind) in act.productList"
          :key="'pro'+ind"
        >
          <div
            class="standard-item"
            v-for="(std, ind1) in product.standardList"
            :key="'std'+ind1"
            :class="{'marginR': ind1 == 1}"
            @click="createOrder(act.actId,std)"
          >
            <img
              :src="std.standardActUrl"
              alt=""
            >
            <!--       <div class="price">
              <b>{{std.originalPrice}}</b>元
            </div>
            <div class="name">{{std.standardName}}</div>
            <div
              class="btn red-btn"
            >选我</div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="bg-wrap"></div>
    <rule
      :openRule="openRule"
      @close-rule="openRule=false"
    ></rule>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import jssdk from '@/lib/jssdk';
import { payUrl } from '@/config/';
import rule from './components/rule';
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    rule
  },
  data () {
    return {
      openRule: false,
      prizeName: '',
      index: -1,
      timeMap: {},
      transformFlag: false,
      merchantId: this.$store.state.merchantId,
      isReceive: false,
      actId: null,
      payUrl: payUrl,
      standardId: '',
      templateConfig: {},
      secondActId: 556246753,
      showRule: false,
      showRule1: false,
      showRule2: false,
      showRule3: false,
      showRule4: false,
      showPannel: false,
      loading: false,
      rotating: false,
      chances: null,
      prizeList: [],
      currentPrize: null,
      setting: {
        pannelImage: null,
        pointerImage: null,
        names: [], // 大转盘奖品名称
        icons: [],
        colors: [
          '#FFF4D6',
          '#FFFFFF',
          '#FFF4D6',
          '#FFFFFF',
          '#FFF4D6',
          '#FFFFFF'
        ], // 大转盘奖品区块对应背景颜色
        startAngle: 0, // 开始角度
        bRotate: false // false:停止;ture:旋转
      },
      secondActList: null
    };
  },
  methods: {
    async getLotteryInfo () {
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.act.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async lotteryDraw (i) {
      Indicator.open();
      let rs = await this.$post('api/lottery_draw', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        this.prizeName = rs.payload.prizeName;
        this.index = i;
        this.transformFlag = true;
      } else {
        Toast({
          message: rs.error,
          position: 'middle',
          duration: 1500
        });
      }
      Indicator.close();
    },

    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.secondActList = rs.payload;
      }
    },
    async createOrder (actId, standard) {
      Indicator.open();
      let rs = await this.$post('api/createOrder/', {
        actId: actId,
        standardId: standard.id,
        commodityNum: 1,
        account:
          this.$store.state.cust && standard.proType == 1
            ? this.$store.state.cust.tel
            : ''
      });
      if (rs.status === 200) {
        window.location.replace(
          `${window.location.protocol}//${window.location.host}/${
            this.$store.state.merchantAppid
          }/merchant/index/order`
        );
      } else {
        Toast('领取失败:' + rs.error);
      }
      Indicator.close();
    }
  },
  created () {
    this.loadAct(this.secondActId); // 杭州工行-见面有你20元话费
    // this.getLotteryInfo();
  },
  mounted () {
    Indicator.open();
    this.$store.commit('setIsReady', false);
    jssdk.jssdk.init('', this.merchantId, '6', val => {
      this.$jssdk.call('disableShare');
      Indicator.close();
    });
  },
  watch: {
    '$store.state.isReady': function (val) {
      if (val) {
        this.$jssdk.call('disableShare');
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.lottery-rotate {
  position: absolute;
  top: 7.2rem;
  left: 0;
  right: 0;
  bottom: 0;
  height: 7.3rem;
  z-index: 80;
  overflow: visible;
}
.lettery {
  position: relative;
  .bg {
    font-size: 0;
    img {
      width: 100%;
    }
  }
  .wapper {
    position: absolute;
    top: 3.4rem;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    img {
      display: block;
      width: 100%;
    }
    .btn-group {
      width: 5.4rem;
      margin: 0.3rem auto 0.52rem;
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.6rem;
      button {
        width: 2.5rem;
        height: 0.84rem;
        line-height: 0.5rem;
        color: #fff;
        border: none;
      }
      .my-prizes-btn {
        background: url(./imgs/rule@2x.png) no-repeat;
        background-size: 100% 100%;
      }
      .lettery-rules-btn {
        background: url(./imgs/BTN_WDFL.png) no-repeat;
        background-size: 100% 100%;
      }
    }

    .act-wrapper {
      padding-bottom: 0.2rem;
      &:last-child {
        margin-bottom: 0.14rem;
      }
    }
    .act-title {
      display: flex;
      justify-content: center;
      color: rgb(164, 115, 31);
      margin-bottom: 0.32rem;
      i {
        flex: 1;
        max-width: 1rem;
        height: 0.3rem;
        background: url(./imgs/icon-left@2x.png) no-repeat;
        background-size: 100% 100%;
        &:last-child {
          background: url(./imgs/icon-right@2x.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .txt {
        padding: 0 0.3rem;
        font-weight: bold;
      }
    }
    .standard-list {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      color: rgb(164, 115, 31);
      margin-bottom: 0.46rem;
      padding: 0 0.2rem;
      .standard-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 0;
        img {
          width: 2.12rem;
        }
        &.marginR {
          margin: 0 0.2rem;
        }
        .price {
          font-size: 0.22rem;
          b {
            font-size: 0.48rem;
          }
        }
        .name {
          line-height: 0.62rem;
          font-size: 0.22rem;
          background: #fdf5e0;
          padding: 0 0.2rem;
        }
        .btn {
          width: 1.84rem;
          height: 0.54rem;
          line-height: 0.54rem;
          text-align: center;
          color: #fff;
          background: url(./imgs/BTN_LJLQ_2@2x.png) no-repeat;
          background-size: 100% 100%;
        }
      }
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99;
    .msg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 5.52rem;
      height: 6rem;
    }
    .rule {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 5.56rem;
      height: 6.26rem;
      line-height: 0.3rem;
      background: url(./imgs/IMG_BG_HDNR@2x.png) no-repeat;
      background-size: 100% 100%;
      .title {
        font-size: 0.3rem;
        line-height: 0.5rem;
        text-align: center;
      }
      .txt {
        padding: 0 0.3rem 0.3rem;
        height: 4.5rem;
        line-height: 0.4rem;
        overflow: scroll;
      }
    }
    .close {
      position: relative;
      width: 0.72rem;
      height: 0.72rem;
      left: 5.1rem;
      top: -0.3rem;
      // background: url(./imgs/POP_BTN_CANCEL.png) no-repeat;
      background-size: 100% 100%;
    }
    .msg-box {
      width: 5.52rem;
      height: 2.54rem;
      color: rgb(164, 115, 31);

      &.rule1 {
        // background: url(./imgs/POP_BTN_ADD.png) no-repeat;
        background-size: 100% 100%;
      }
      &.rule2 {
        .desc {
          position: relative;
          bottom: 0.2rem;
          line-height: 0.4rem;
          text-align: center;
        }
        margin-top: 1rem;
        // background: url(./imgs/POP_BTN_ADD.png) no-repeat;
        background-size: 100% 100%;
      }
      &.rule4 {
        .btn-group {
          padding: 0.56rem 0.5rem 0;
          display: flex;
          justify-content: space-between;
        }
        .desc {
          text-align: center;
        }
        .cancel,
        .confirm {
          width: 1.8rem;
          height: 0.62rem;
        }
        .cancel {
          // background: url(./imgs/POP_BOTN_CANCEL.png) no-repeat;
          background-size: 100% 100%;
        }
        .confirm {
          // background: url(./imgs/queding.png) no-repeat;
          background-size: 100% 100%;
        }
        // background: url(./imgs/POP_BTN_ADD.png) no-repeat;
        background-size: 100% 100%;
      }
      .btn {
        width: 2.18rem;
        height: 0.62rem;
        margin: 0.1rem auto 0;
        // background: url(./imgs/POP_BOTN_KNOW.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
.gray-btn {
  filter: grayscale(90%);
}
.fan {
  transform: rotateY(-180deg);
}
</style>

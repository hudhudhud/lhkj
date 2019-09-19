<template>
  <div>
    <cbbHeader title="四季踏青"></cbbHeader>
    <div class="container">
      <div class="icon">
        <div
          class="icon-go"
          v-for="(item,i) in listtitle"
          :key="i"
          :class="{active:mask==i}"
          @click="changepage(i)"
        > {{item}}</div>
        <div class="hand"></div>
      </div>
      <div class="main">
        <div class="header">
          <div class="topheader">"答对三道题以上有机会获得<br>
            4.99-99.99元的现金抵用券"</div>
          <div class="topfont"><img
              src="./imgs/topfont.png"
              alt=""
            ></div>
        </div>
        <div class="wrapper">
          <div
            class="product"
            v-for="ind in list"
            :key="'product_'+ind"
          >
            <img
              class="iconUrl"
              :src="act.productList[ind].iconUrl"
              alt=""
            >
            <div
              v-for="(standard,ind2) in act.productList[ind].standardList"
              :key="'_standard_'+ind2"
            >
              <DrawCoupon
                :coupon="standard"
                :config="DrawLog"
                @action="buy(standard)"
              ></DrawCoupon>
            </div>
          </div>

        </div>
      </div>

      <!-- <div
        class="rule-btn"
        @click="$router.push(`/${$store.state.merchantAppid}/merchant/luckyStar/ruleCcb`) "
      ></div>
      <a href="https://mp.weixin.qq.com/s/C70zLKjga8MXZ2TbrYrYsQ">
        <div class="rule-btn resule-btn"></div>
      </a> -->

    </div>
  </div>
</template>

<script>
import bgBtn from './imgs/bgBtn.png';
import cbbHeader from '@/components/cbbHeader';
import DrawCoupon from '@/components/DrawCoupon';
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    cbbHeader,
    DrawCoupon
  },
  data () {
    return {
      DrawLog: {
        btnTxt: '购买',
        imgWidth: '1.56rem',
        btnWidth: '1.7rem',
        theme: '#4b71fb',
        bgBtn: bgBtn
      },
      mask: 1,
      listtitle: ['答题区', '兑奖区'],
      prizeList: [],
      list: [0, 1, 2]
    };
  },
  methods: {
    changepage (i) {
      this.mask = i;
      if (i == 0) {
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/jianhangDT/index`
        );
      }
    },
    buy (standard) {
      if (this.act) {
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/index/cbbBuy001/standard/${standard.id}?actId=${this.act.actId}`
        );
      }
    }
  },
  created () {
    this.productList = this.act.productList;
    console.log(this.productList);
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  background: #2db8f9;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  padding-top: 0.1rem;
}
.container {
  position: relative;
  background: #2db8f9 url(./imgs/top-banner1.png);
  background-size: 100% auto;
  padding-top: 5rem;
  // .banner {
  //   display: block;
  //   width: 100%;
  //   height: 5rem;
  //   overflow: hidden;
  //   img {
  //     width: 100%;
  //   }
  // }
  .icon {
    position: absolute;
    width: 5rem;
    height: 0.8rem;
    top: 3.1rem;
    border-radius: 0.5rem;
    left: 0;
    right: 0;
    margin: auto;
    .hand {
      width: 0.7rem;
      height: 0.7rem;
      background: url("./imgs/hand.jpg") no-repeat;
      background-size: 100% 100%;
      position: absolute;
      z-index: 100;
      top: 1rem;
      left: 0.9rem;
      animation: scale 1.5s linear infinite;
    }
    @keyframes scale {
      0% {
        top: 0.5rem;
        opacity: 1;
      }
      60% {
        top: 1rem;
        opacity: 0.2;
      }
      100% {
        top: 0.5rem;
        opacity: 1;
      }
    }
    .icon-go {
      width: 50%;
      float: left;
      text-align: center;
      line-height: 0.8rem;
      font-size: 0.3rem;
      background: #fff;
      color: #4b71fb;
      border: 0.03rem solid #4b71fb;
    }
    .icon-go:nth-child(1) {
      border-top-left-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }
    .icon-go:nth-child(2) {
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
    .active {
      background: #4b71fb;
      color: #fff;
    }
  }
  .header {
    position: relative;
    width: 100%;
    margin: 0.5rem auto 0;
    z-index: 10;
    .topheader {
      width: 6.88rem;
      height: 1rem;
      margin: 0rem auto;
      background: url("./imgs/topheader.png") no-repeat;
      background-size: 100% 100%;
      text-align: center;
      font-family: SourceHanSansCN-Medium;
      font-size: 0.32rem;
      line-height: 0.38rem;
      letter-spacing: 3px;
      color: #118ae8;
      padding-top: 0.1rem;
    }
    .topfont {
      width: 4.79rem;
      height: 0.44rem;
      margin: 0.3rem auto;
      img {
        width: 100%;
      }
    }
  }

  .product {
    background: #fff;
    padding: 0.2rem 0.1rem 0.1rem;
    border-radius: 0.2rem;
    margin-bottom: 0.3rem;
    .iconUrl {
      display: block;
      margin: 0.2rem auto 0.26rem;
      width: 4.62rem;
    }
  }
  // .rule-btn {
  //   position: absolute;
  //   top: 0.6rem;
  //   right: 0;
  //   margin-top: 0.35rem;
  //   width: 1.77rem;
  //   height: 0.92rem;
  //   background: url(./imgs/rule-bg.png) no-repeat;
  //   background-size: 100% 100%;
  //   z-index: 50;
  // }

  .wrapper {
    padding: 0 0.3rem 0.5rem;
  }
}
</style>

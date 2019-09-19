<template>
  <div class="lottery">
    <div class="cleanFixed"></div>
    <div class="header">
      <a
        class="btn btn-left"
        href="javascript:"
        @click="goBack"
      >
        <i class="icon icon-right"></i>
      </a>
      e享福建
      <!-- <div v-if="openShare" class="share" style="position:absolute;right:1.4rem; top:0;" @click="cbbShare"> 分享</div> -->
    </div>
    <div class="banner">
      <img
        :src="templateConfig.banner"
        alt
      >
    </div>
    <div class="gif-wapper">
      <img
        src="./imgs/welcome.gif"
        alt
      >
    </div>
    <div class="bg-wrap">
      <div class="box-bg">
        <HemiGrid
          :act="act"
          :template-config="templateConfig"
          @open-message="openMessage"
        ></HemiGrid>
        <MessageModal
          v-model="payloadModal"
          :act="act"
        ></MessageModal>
      </div>
      <div class="rule">
        <img
          src="./imgs/rule-btn.png"
          alt
        >
        <div
          class="detail"
          v-html="act.detail"
        ></div>
      </div>
    </div>
    <p style="height: 0.2rem;background: #eff0f1;margin-top:0.4rem;"></p>
    <!--    <div class="sale">
      <div class="item-title">
        <div>
          <img src="./imgs/zhuanqu_1.png" alt>
        </div>
      </div>
    </div> -->
    <!--  <div class="brand-wrapper">
      <div class="item item-flex">
        <img src="./imgs/mssy.png" @click="$router.push(`${saleActId}`)">
        <div>美食盛宴</div>
      </div>
      <div class="item m20">
        <img src="./imgs/ylst.png" @click="$router.push(`${saleActId}`)" alt>
        <div>娱乐视听</div>
      </div>
      <div class="item item-flex">
        <img src="./imgs/ddcx.png" @click="$router.push(`${saleActId}`)" alt>
        <div>滴滴出行</div>
      </div>
    </div> -->
    <!--   <div class="sale">
      <div class="item-title">
        <div>
          <img src="./imgs/zhuanqu.png" alt>
        </div>
      </div>
    </div>
    <div class="actGroupWrapper">
      <div class="actGroup" v-for="(act, actIndex) in actGroup" :key="'act'+actIndex">
        <div class="record-list" v-for="(product,ind) in act.productList" :key="'product_'+ind">
          <div
            class="record-item"
            :class="{'current-item': actGroup == []}"
            @click="buy(standard)"
            v-for="(standard,ind2) in product.standardList"
            :key="ind+'_standard_'+ind2"
          >
            <img :src="standard.standardImgUrl">
            <div class="flex-left">
              <div class="orginal-act">{{standard.standardName}}</div>
              <div class="expire-date">原价{{standard.originalPrice}}元</div>
            </div>
            <div class="flex-right">￥{{standard.currentPrice}}</div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import HemiGrid from '../hzghrylLottery/HemiGridICBC';
import MessageModal from '@/components/lotteryModal/MessageModal';
// import jssdk from '@/lib/jssdk'
import { Indicator } from 'mint-ui';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    HemiGrid,
    MessageModal
  },
  data () {
    return {
      // saleActId: 545135505,
      saleActId: 545224591,
      actGroup: [],
      actPayload: [],
      merchantId: this.$store.state.merchantId,
      templateConfig: JSON.parse(this.act.templateConfig),
      payloadModal: {}
    };
  },
  methods: {
    goBack () {
      window.history.go(-1);
    },
    buy (standard) {
      this.$router.push(
        `/${
          this.$store.state.merchantAppid
        }/merchant/index/cbbBuy001/standard/${standard.id}`
      );
    },
    async loadAct (actId) {
      Indicator.open();
      // let rs = await this.$get('http://rap2api.taobao.org/app/mock/21855/prizeInfo')
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.actGroup.push(rs.payload);
      } else {
        this.error = rs.error;
      }
      Indicator.close();
    },
    openMessage (payload) {
      this.payloadModal = payload;
    }
  },
  created () {
    this.loadAct(this.saleActId);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.lottery {
  .cleanFixed {
    height: 0.78rem;
  }
  .header {
    position: fixed;
    width: 100%;
    z-index: 99;
    top: 0;
    background: url(./imgs/top-bg.png);
    color: #fff;
    text-align: center;
    font-size: 0.3rem;
    font-weight: 700;
    line-height: 0.8rem;
    height: 0.8rem;
    color: #fff;

    .btn {
      display: block;
      position: fixed;
      height: 0.4rem;
      line-height: 0.4rem;
      top: 0.2rem;
      color: #fff;
      left: 0.2rem;
      z-index: 999;
      i {
        height: 0.4rem;
        width: 0.4rem;
        display: block;
        background: url(./imgs/icon-right.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  background: #fff;
  .banner {
    height: 3rem;
    img {
      width: 100%;
    }
  }
  .gif-wapper {
    height: 2.34rem;
    font-size: 0;
    text-align: center;
    margin-top: 0.26rem;
    img {
      position: relative;
      right: 0.02rem;
      width: 100%;
      margin-top: -0.26rem;
    }
  }
  .bg-wrap {
    width: 7rem;
    margin: 0 auto;
    background: url(./imgs/lettery-bg.jpg) no-repeat;
    background-size: 100% 100%;
    padding-top: 0.45rem;
    .rule {
      img {
        display: block;
        width: 1.85rem;
        margin: 0.2rem auto 0.1rem;
      }
      .detail {
        padding: 0 0.3rem 0.3rem;
        color: #fff;
        font-size: 0.28rem;
        line-height: 0.36rem;
      }
    }
  }
}
.sale {
  .item-title {
    @include flex(row, nowrap, center, center);
    height: 1.2rem;
    padding-left: 0.2rem;
    div {
      img {
        width: 1.83rem;
      }
    }
  }
}
.brand-wrapper {
  margin: 0 0.3rem 0.2rem;
  @include flex(row, nowrap, flex-start, center);
  box-shadow: 0 1px 4px 1px #ccc;
  border-radius: 0.1rem;
  padding: 0.2rem;
  color: rgb(77, 77, 77);
  .item-flex {
    flex: 1;
  }
  .item {
    @include flex(column, nowrap, center, center);
    img {
      width: 1.5rem;
    }
    div {
      line-height: 0.36rem;
      font-size: 0.28rem;
    }
  }
  .m20 {
    margin: 0 0.2rem;
  }
}
.record-list {
  padding: 0 0.28rem;

  .record-item {
    @include flex(row, nowrap, flex-start, center);
    @include border-1px(#ccc);
    // padding-top: 0.26rem;
    height: 1.82rem;
    &.current-item {
      &:last-child {
        &:after {
          border: 0;
        }
      }
    }
    img {
      width: 0.93rem;
      margin-right: 0.3rem;
    }
    div {
      &.flex-left {
        flex: 1;
        @include flex(column, nowrap, flex-start, flex-start);
      }
      &.flex-right {
        color: rgb(216, 5, 75);
        font-size: 0.36rem;
        justify-content: flex-end;
        padding-right: 0.2rem;
      }
      .orginal-act {
        color: #000;
        font-size: 0.28rem;
      }
      .tag {
        margin: 0.1rem 0;
        padding: 0.05rem 0.1rem;
        font-size: 0.22rem;
        text-align: center;
        border-radius: 0.05rem;
        color: #fff;
        &.tag-0 {
          background: #37b5f4;
        }
        &.tag-1 {
          background: rgb(247, 84, 118);
        }
        &.tag-2 {
          background: rgb(33, 191, 97);
        }
        &.tag-3 {
          background: #ffc83c;
        }
      }
      .expire-date {
        margin-top: 0.1rem;
        font-size: 0.22rem;
        color: rgb(66, 65, 65);
      }
    }
  }
}
.actGroup {
  &:last-child {
    .record-item {
      &:after {
        border: 0;
      }
    }
  }
}
.actGroupWrapper {
  min-height: 1rem;
  position: relative;
  bottom: 0.3rem;
}
</style>

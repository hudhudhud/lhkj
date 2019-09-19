<template>
  <div class="partner-wrapper">
    <cbbHeader title="手机银行合伙人"></cbbHeader>
    <div class="partner-head">
      <img src="./imgs/IMG_BG.jpg" alt>
    </div>
    <div class="partner-index">
      <div class="info">
        <img
          class="info-head"
          :src="'https://lianhai.coco.lianhaikeji.com/static/img/aaa-test-avatar.5b779fb.png'"
        >
        <div class="info-account">
          <div class="label">账号：</div>
          <div class="phone" v-if="cust">{{cust.tel}}</div>
        </div>
        <div class="share-credit">
          <div class="share" @click="$router.push(`ShareQrcode/${cust.id}/${cust.tel}`)">分享我的二维码</div>
          <div class="credit" @click="$router.push('recommendDetail')">推荐明细</div>
        </div>
        <div class="credit-detail">
          <div class="total">累计积分：{{accumulatedCredit}}</div>
          <div class="usable">剩余积分： {{useableCredit}}</div>
          <div class="coupon">
            <div
              class="btn"
              @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/coupons`)"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="task">
        <div class="ongoing">
          <div class="mission-list">
            <img src="./imgs/IMG_RW_1.png" alt>
            <div class="mission-number">任务1</div>
            <div
              class="buttonclick"
              @click="$router.push(`ShareQrcode/${cust.id}/${cust.tel}`)"
            >推荐好友</div>
          </div>
          <div class="mission-list">
            <img src="./imgs/IMG_RW_1.png" alt>
            <div class="mission-number">任务1</div>
            <div
              class="buttonclick"
              @click="$router.push(`ShareQrcode/${cust.id}/${cust.tel}`)"
            >推荐好友</div>
          </div>
        </div>
      </div>
      <div class="credit-more">
        <a @click="$router.push('taskList')">获得更多积分</a>
      </div>
      <div class="swiper-wrapper">
        <div class="swipe-wrapper">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(img, ind0) in bannerList" :key="'img_' +ind0">
              <img :src="img.url" alt>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
      <div class="partner-menu">
        <div class="index-nav">
          <div class="index-nav-item">
            <a class="index-nav-lnk" href="javascript: void(0)" @click="$router.push('credit')">
              <img class="index-nav-img" src="./imgs/ICON_1@2x.png"> 积分明细
            </a>
          </div>
          <div class="index-nav-item">
            <a
              class="index-nav-lnk"
              href="javascript: void(0)"
              @click="$router.push('recommendDetail')"
            >
              <img class="index-nav-img" src="./imgs/ICON_2@2x.png"> 推荐明细
            </a>
          </div>
          <div class="index-nav-item">
            <a class="index-nav-lnk" href="javascript: void(0)" @click="$router.push('rule')">
              <!-- <a class="index-nav-lnk" href="javascript: void(0)" @click="$router.push('share/rule')"> -->
              <img class="index-nav-img" src="./imgs/ICON_3@2x.png"> 活动规则
            </a>
          </div>
          <div class="index-nav-item">
            <a
              class="index-nav-lnk"
              href="javascript: void(0)"
              @click="$router.push(`/${$store.state.merchantAppid}/merchant/lego/f592c397fae6426a9dad4c5739939e53`)"
            >
              <img class="index-nav-img" src="./imgs/ICON_4@2x.png"> 积分商城
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';
import cbbHeader from '@/components/cbbHeader';
import banner from './imgs/BANNER.png';
import { getUserCredit } from '../share/api/api.js';

export default {
  data () {
    return {
      bannerList: [
        {
          url: banner
        }
      ],
      accumulatedCredit: 0,
      useableCredit: 0
    };
  },
  computed: {
    cust () {
      return this.$store.state.cust;
    }
  },
  components: {
    cbbHeader,
    Swipe,
    SwipeItem
  },
  created () {
    getUserCredit(this);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.partner-wrapper {
  background: #fff2da;
  .partner-head {
    img {
      width: 100%;
    }
  }
  .partner-index {
    position: relative;
    margin: 0 0.3rem;
    top: -2.2rem;
    height: 2.2rem;
    .info {
      position: absolute;
      width: 100%;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      height: 4.15rem;
      text-align: center;
      border-radius: 0.2rem;
      background: url(./imgs/IMG_BG_INFORMATION.png) no-repeat center 0;
      background-size: auto 4.15rem;
      padding-top: 1.2rem;
      .info-head {
        position: absolute;
        top: -0.7rem;
        left: 50%;
        transform: translateX(-50%);
        height: 1.4rem;
        width: 1.4rem;
        margin: 0 auto;
        border-radius: 50%;
      }
      .info-account {
        @include flex(row, nowrap, center, center);
        font-size: 0.34rem;
        padding-bottom: 0.52rem;
        .label {
          color: rgb(193, 205, 209);
        }
        .phone {
          color: rgb(83, 82, 82);
        }
      }
      .share-credit {
        padding: 0 0.3rem;
        @include flex(row, nowrap, center, center);
        color: rgb(50, 187, 248);
        font-size: 0.28rem;
        div {
          padding-left: 0.4rem;
          text-align: left;
          &.share {
            margin-right: 1.62rem;
            background: url(./imgs/ICON_CODE@2x.png) no-repeat 0 center;
            background-size: 0.34rem auto;
          }
          &.credit {
            background: url(./imgs/ICON_PHONE@2x.png) no-repeat 0 center;
            background-size: 0.34rem auto;
          }
        }
      }
      .credit-detail {
        position: absolute;
        bottom: 0.3rem;
        @include flex(row, nowrap, center, center);
        min-width: 100%;
        height: 1.15rem;
        color: rgb(197, 118, 32);
        font-size: 0.26rem;
        .total {
          margin-right: 0.62rem;
        }
        .usable {
          margin-right: 0.52rem;
        }
        .coupon {
          border-left: 1px solid rgb(197, 118, 32);
          .btn {
            width: 1.3rem;
            height: 0.46rem;
            margin-left: 0.24rem;
            background: url(./imgs/BTN_KQ.png) no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
  .main {
    .ongoing {
      width: 100%;
      padding: 0.3rem 0 0 0.1rem;
      .mission-list {
        position: relative;
        width: 7.28rem;
        margin-bottom: 0.3rem;
        img {
          width: 100%;
        }
        .mission-number {
          text-align: center;
          line-height: 0.64rem;
          position: absolute;
          top: 0.4rem;
          left: 0;
          width: 1.57rem;
          height: 0.64rem;
          background: url("./imgs/IMG_RW.png") no-repeat;
          background-size: 100% 100%;
          color: #ffffff;
          font-size: 0.35rem;
          font-weight: 800;
        }
        .buttonclick {
          position: absolute;
          bottom: 0.4rem;
          left: 50%;
          margin-left: -2rem;
          width: 4rem;
          height: 1.18rem;
          background: url("./imgs/BTN_BG.png") no-repeat;
          background-size: 100% 100%;
          text-align: center;
          line-height: 1.18rem;
          color: rgb(23, 130, 180);
          font-size: 0.4rem;
        }
      }
      .more {
        width: 100%;
        text-align: center;
        color: #999;
        font-size: 0.3rem;
      }
    }
    .credit-more {
      position: relative;
      height: 0.9rem;
      color: rgb(255, 83, 119);
      font-size: 0.28rem;
      text-align: center;
      &:after {
        @include arrow(0.28rem, 0.28rem, 50%, rgb(255, 83, 119), 45deg);
        top: 0.5rem;
        margin-right: -0.14rem;
      }
    }
    .swiper-wrapper {
      .swipe-wrapper {
        height: 2.7rem;
        width: 100%;
        margin-top: 0.34rem;
        img {
          width: 100%;
        }
      }
    }
    .partner-menu {
      padding: 0.3rem 0;
      .index-nav {
        @include flex(row, wrap, center, center);
        margin-top: 0.2rem;
        font-size: 0;
      }
      .index-nav-item {
        padding: 0.26rem 0;
        flex: 0 0 50%;
        border-bottom: 1px solid #f2f4f5;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .index-nav-lnk {
        font-size: 0.3rem;
        color: #040404;
        text-align: center;
      }

      .index-nav-img {
        display: inline-block;
        width: 0.48rem;
        vertical-align: -0.13rem;
        margin-right: 0.22rem;
      }
    }
  }
}
</style>

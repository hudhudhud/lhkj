<template>
  <div class="bg">
    <cbbHeader v-if="!templateConfig.removeTitle" :title="templateConfig.title || '领券'" :bg-color="templateConfig.headerBackground"></cbbHeader>
    <div v-if="templateConfig.banner" class="banner">
      <img class="banner-img" :src="templateConfig.banner">
    </div>
    <div v-else class="swipe-wrapper">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(img, ind0) in templateConfig.bannerList" :key="'img_' +ind0"><img :src="img.url" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="linkPlate" v-for="(product,ind) in act.productList" :key="'product_'+ind">
      <div class="plate-item" v-for="(standard,ind2) in product.standardList" :key="ind+'_standard_'+ind2">

        <div class="plate-info">
          <div class="item-img">
            <img :src="standard.standardImgUrl" />
          </div>
          <div class="item-detail">
            <div class="proName">{{standard.standardName}}
              <!-- <span>(每人限购一个)</span> -->
            </div>
            <!-- <div class="proDesc">认证生日即可领取</div> -->
            <div class="expire">
              <!--   <div class="currentPrice">
                    每天限量200份
                  </div> -->

            </div>
          </div>
          <div class="item-price">
            <!-- <span>￥{{standard.currentPrice}}</span> -->
            <!-- <b>￥{{standard.currentPrice}}</b> -->

          </div>
          <div class="item-btn">
            <!--       <div class="store" v-if="!timeStatusMap[std.id].isInTime">尚未开始</div>
                    <div class="storeMap" v-if="timeStatusMap[std.id].isInTime">剩余{{storeMap[std.id]}}件</div> -->
            <!-- <div class="btn" v-if="timeStatusMap[std.id].isInTime" @click="kill(std)"> -->
            <div class="btn gray-btn" v-if="isReceive">已领取</div>
            <div class="btn" v-else @click="receiveTicket(standard.id)"> 领取</div>
          </div>
        </div>
      </div>
    </div>
    <div class="act-rule">
      <div class="rule-title">活动规则</div>
      <div class="detail" v-html="act.detail"></div>
    </div>
  </div>
</template>

<script>

import cbbHeader from '@/components/cbbHeader'
import { Indicator, Toast } from 'mint-ui'
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    cbbHeader
  },
  data () {
    return {
      isReceive: false,
      templateConfig: JSON.parse(this.act.templateConfig),
      running: false
    }
  },
  methods: {
    async getReceiveState () {
      let rs = await this.$get('api/check/ticket/' + this.act.actId)
      if (rs.status == 200) {
        this.isReceive = rs.payload.isReceive
      }
    },
    async receiveTicket (standardId) {
      Indicator.open()

      let rs = await this.$post('/api/ticket_create_order', {
        standardId: standardId,
        actId: this.act.actId
      })
      if (rs.status == 200) {
        Toast('领取成功啦')
        this.isReceive = true
      } else {
        Toast(rs.error)
      }
      Indicator.close()
    }
  },
  beforeDestroy () {
  },
  created () {
    this.getReceiveState()
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.bg {
  position: absolute;
  padding-bottom: 55px;
  background: #fff;
  min-height: 100%;
}
.banner-img {
  display: block;
  max-width: 100%;
}
.group-title {
  line-height: 0.8rem;
  font-size: 0.26rem;
  padding-left: 0.3rem;
  @include border-1px(#d9d9d9);
  background-color: #fff;
}
.linkPlate {
  .item-title {
    height: 1.2rem;
    display: flex;
    align-items: center;
    div {
      img {
        width: 0.4rem;
        margin-right: 0.2rem;
      }
    }
  }
  .plate-item {
    background-color: #fff;
    margin-bottom: 0.1rem;
    .seckill-title {
      padding-top: 0.25rem;
      white-space: nowrap;
      line-height: 0.6rem;
      font-size: 0.32rem;
      color: #fff;
      .time-item {
        display: inline-block;
        font-size: 0;
        div {
          display: inline-block;
          text-align: center;
          width: 0.6rem;
          height: 0.6rem;
          line-height: 0.6rem;
          font-size: 0.32rem;
          &.time-bg {
            background-size: 100% 100%;
          }
        }
      }
    }
    .plate-info {
      display: flex;
      padding: 0.3rem 5%;
      align-items: center;
      .item-img {
        flex: 1;
        font-size: 0;
        max-width: 1.2rem;
        height: 1.2rem;
        margin-right: 3%;
        padding: 5px;
        background-size: 100%;
        border-radius: 50%;
        img {
          width: 1.12rem;
          height: 1.12rem;
          border-radius: 50%;
          margin-left: -6%;
          margin-top: -6%;
        }
      }
      .item-btn {
        width: 100;
        .btn {
          background-color: orange;
          color: white;
          border-radius: 0.1rem;
          text-align: center;
          padding: 0;
          width: 1.35rem;
          line-height: 0.56rem;
        }
        .storeMap {
          font-size: 0.24rem;
        }
        div {
          text-align: center;
        }
      }
      .item-detail {
        flex: 2;
        height: 1rem;
        line-height: 0.4rem;
        .proName {
          font-size: 0.3rem;
        }
        .proDesc {
          font-size: 0.26rem;
          line-height: 0.7rem;
        }
        .expire {
          display: flex;
          align-items: center;
          font-size: 0.24rem;
          .currentPrice {
            flex: 1;
          }
        }
      }
      .item-price {
        flex: 1;
        height: 1rem;
        b {
          color: #db1d34;
        }
      }
    }
  }
}
.act-rule {
  padding: 0 0.3rem 0.3rem;
  .rule-title {
    font-size: 0.36rem;
    padding: 0.3rem 0;
  }
}
.fan {
  transform: rotateY(-180deg);
}
.gray-btn {
  filter: grayscale(100%);
}
</style>

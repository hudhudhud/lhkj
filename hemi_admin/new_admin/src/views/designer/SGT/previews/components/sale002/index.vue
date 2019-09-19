<template>
  <div class="out-box" :style="{'background-color': tpl.pageColor}">
    <div class="container">
      <img class="rule-img" :src="tpl.ruleImg" v-highLight="'ruleImg'">
      <img class="banner-img" :src="tpl.banner" v-highLight="'banner'">
      <div class="product-box" :style="{'background-color': tpl.proBoxColor, 'border-color': tpl.proBoxBorder}" v-highLight="'proBoxColor'">
        <img class="product-title" :src="tpl.proTitle">
        <div class="product-list">
          <div class="product-item" v-for="n in 5">
            <div class="item-img">
              商品图片
            </div>
            <div class="item-mid">
              <span class="item-name">商品{{n}}</span>
              <span class="item-originalPrice">原价：1599</span>
              <span class="item-currentPrice">现价：<label>&yen;1599</label></span>
            </div>
            <div class="item-right">
              <span class="item-desc">商品详情 >></span>
              <img class="buy-btn" :src="tpl.buyBtn" v-highLight="'buyBtn'" />
            </div>
          </div>
        </div>
      </div>
      <div class="page-bottom">
        <img :src="tpl.orderImg" v-highLight="'orderImg'">
        <img :src="tpl.afterSale" v-highLight="'afterSale'">
      </div>
    </div>
  </div>
</template>

<script>
import { highLight } from "@/directive/highLight";

export default {
  props: {
    tpl: {
      type: Object,
      require: true
    }
  },
  directives: { highLight }
};
</script>

<style scoped lang="scss">
.out-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  .container {
    width: 100%;
    height: auto;
    .rule-img {
      height: 43px;
      position: absolute;
      right: 0;
      top: 146px;
    }
    .banner-img {
      display: block;
      width: 100%;
    }
    .product-box {
      box-sizing: border-box;
      margin: 0 10px;
      padding: 13px 11px 0 16px;
      border-radius: 10px;
      border: 1px solid #ee647c;
      background-color: #fff;
      .product-title {
        height: 20px;
        display: block;
        margin: 0 auto;
        margin-bottom: 19px;
      }
      .product-list {
        width: 100%;
        margin-top: 16px;
        .product-item {
          width: 100%;
          margin-bottom: 20px;
          color: #333;
          display: flex;
          justify-content: space-between;
          .item-img {
            display: inline-block;
            width: 79px;
            height: 79px;
            line-height: 79px;
            text-align: center;
            border: 1px solid #f0748a;
            border-radius: 5px;
          }
          .item-mid,
          .item-right {
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-top: 10px;
          }
          .item-mid {
            .item-name {
              font-size: 15px;
            }
            .item-originalPrice {
              font-size: 13px;
              text-decoration: line-through;
            }
            .item-currentPrice {
              font-size: 13px;
              label {
                color: #f20017;
                font-size: 25px;
              }
            }
          }
          .item-right {
            min-width: 88px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-end;
            padding-bottom: 4px;
            .item-desc {
              color: #f8748a;
              font-size: 12px;
            }
            .buy-btn {
              height: 27px;
            }
          }
        }
      }
    }
    .page-bottom {
      box-sizing: border-box;
      width: 100%;
      padding: 16px 27px 20px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      > img {
        height: 45px;
      }
    }
  }
}
</style>

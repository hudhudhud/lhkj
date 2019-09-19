<template>
  <div class="out-box" :style="{'background-color': tpl.pageColor}" v-highLight="'pageColor'">
    <div class="container" :style="{'background-image': 'url('+tpl.pageBg+')'}" v-highLight="'pageBg'">
      <img class="rule-img" :src="tpl.ruleImg" v-highLight="'ruleImg'">
      <img class="order-img" :src="tpl.orderImg" v-highLight="'orderImg'">
      <div class="product-box"
        :style="{'background-color': tpl.proBoxColor, 'border-color': tpl.proBoxBorder,'margin-top':topHeight}"
        v-highLight="'topHeight'">
        <img class="product-title" :src="tpl.proTitle" v-highLight="'proTitle'">
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
              <img class="buy-btn" :src="tpl.buyBtn" v-highLight="'buyBtn'" />
              <span class="item-store">剩余：20</span>
            </div>
          </div>
        </div>
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
  directives: { highLight },
  computed: {
    topHeight() {
      let height = this.tpl.proBoxTop;
      if (!height) {
        return "234px";
      }
      let v = height.replace(/\s/g, "");
      if (v) {
        if (v == "auto") {
          return v;
        }
        if (v.indexOf("rem") >= 0) {
          let val = v.replace("rem", "");
          return val * 50 + "px";
        } else if (v.indexOf("px") >= 0) {
          let val = v.replace("px", "");
          return val / 2 + "px";
        } else {
          return v;
        }
      } else {
        return "234px";
      }
    }
  }
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
    overflow-y: auto;
    background-repeat: no-repeat;
    background-size: 100%;
    .rule-img {
      height: 43px;
      position: absolute;
      right: 0;
      top: 23px;
    }
    .order-img {
      height: 43px;
      position: absolute;
      right: 0;
      top: 72px;
    }
    .product-box {
      box-sizing: border-box;
      margin: 0 10px 50px;
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
            font-size: 16px;
            border: 1px solid #2452d1;
            img {
              display: block;
              width: 100%;
            }
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
            max-width: 140px;
            .item-name {
              font-size: 15px;
              font-weight: 500;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
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
            align-items: flex-start;
            padding-bottom: 10px;
            .buy-btn {
              height: 35px;
            }
            .item-store {
              color: #4e4fcb;
              display: inline-block;
              font-size: 13px;
              margin-left: 5px;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <div>
    <cbbHeader title="约惠八桂"></cbbHeader>

    <div class="box">
      <div class="box_content">

        <div
          v-for="(act, actIndex) in actGroup"
          :key="'act'+actIndex"
        >
          <div
            class="record-list"
            v-for="(product,ind) in act.productList"
            :key="'product_'+ind"
          >

            <template v-for="(standard,ind2) in product.standardList">
              <div
                class="record-item"
                :class="{'current-item': actGroup == []}"
                @click="buy(standard, act.actId)"
                :key="ind+'_standard_'+ind2"
                v-if="standard.id ==site"
              >
                <div class="record">
                  <img
                    :src="product.homeImgUrl"
                    style="margin-bottom:2rem"
                  >
                  <div class="product">
                    <div class="titleheader">￥<span class="currentPrice">{{standard.currentPrice}}</span><span class="originalPrice">￥{{standard.originalPrice}}</span></div>
                    <div class="alljs">
                      <div class="navhead">
                        <p style="padding-left:0.1rem;margin-bottom:0.2rem">{{product.proName}}</p>
                        <p
                          v-if="act.actId=='558582055' || act.actId=='558927456'"
                          class="actId"
                        ><span class="actId_1">每日不限量</span><span class="actId_2">到店即提</span></p>
                        <p
                          v-if="act.actId=='558580913' || act.actId=='558923954'"
                          class="actId"
                        ><span class="actId_1">剩余{{standard.surplusStock}}张礼盒劵</span><span class="actId_2">到店即提</span></p>
                      </div>
                      <div class="gobtn">
                        <button @click="createOrder({'actId': act.actId, 'standardId': standard.id})">立即抢购</button>
                      </div>
                    </div>
                    <div v-if="act.actId=='558582055' || act.actId=='558927456'">
                      <p class="p_display1">可至蒂丽雪斯任意线下门店提货！</p>
                      <p class="p_display2">每位手机银行客户可多次购买！</p>
                    </div>
                    <div v-if="act.actId=='558580913' || act.actId=='558923954'">
                      <p class="p_display1">可至蒂丽雪斯任意线下门店提货！</p>
                      <p class="p_display2">每位手机银行客户仅限购买一次！</p>
                    </div>
                  </div>
                  <img :src="product.iconUrl">
                </div>
              </div>
            </template>

          </div>
        </div>
      </div>
    </div>

    <div class="footer">

    </div>
  </div>
</template>

<script>
import answer from './answer.json';
import cbbHeader from '@/components/cbbHeader';
import { createOrder } from '@/pages/buy/buy';
import { getActDetailNew } from '@/lib/api';

export default {
  data () {
    return {
      answer: answer,
      answers: [],
      actGroup: [],
      site: '',
      box_content_ul: [],
      arr: '',
      arrlist: [],
      createOrder: createOrder
    };
  },
  components: {
    cbbHeader
  },
  methods: {
    buy () {}
  },
  created () {
    this.site = localStorage.getItem('goodsduanwu');
    this.arr = localStorage.getItem('activeid');
    console.log(this.site, this.arr);
    getActDetailNew(this.arr, rs => {
      this.actGroup.push(rs.payload);
    });
  },
  mounted () {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";

.box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 0.8rem;
  overflow-y: auto;
  img {
    width: 100%;
  }
  .box_content {
    width: 100%;
    height: 100%;
    .box_content_ul {
      width: 100%;
      height: 100%;
    }
    .record {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 0.8rem;
      background: #f5f5f5;
      .product {
        position: absolute;
        top: 7.4rem;
        left: 3%;
        width: 95%;
        height: 3rem;
        background: #ffffff;
        border-radius: 0.15rem;
        .titleheader {
          width: 100%;
          height: 0.7rem;
          background: #04952d;
          border-radius: 0.15rem 0.15rem 0 0;
          line-height: 0.7rem;
          padding-left: 0.2rem;
          color: #ffffff;
          font-size: 12px;
          margin-bottom: 0.3rem;
          .currentPrice {
            font-size: 20px;
            color: #ffffff;
          }
          .originalPrice {
            text-decoration: line-through;
          }
        }
        .alljs {
          display: flex;

          .actId {
            // padding-left: 0.2rem;
            font-size: 12px;
            color: #666666;
            flex: 1;
            .actId_1 {
              margin-right: 0.2rem;
              background: url(./imgs/quan.jpg) no-repeat;
              background-size: 15%;
              padding-left: 0.4rem;
            }
            .actId_2 {
              background: url(./imgs/quan.jpg) no-repeat;
              background-size: 18%;
              padding-left: 0.4rem;
            }
          }
          .gobtn {
            // width: 50%;
            height: 100%;
            text-align: right;
            flex: 1;
            button {
              // width: 1.9rem;
              height: 0.8rem;
              background: #ef6b00;
              color: #fff;
              font-size: 16px;
              border-radius: 0.2rem;
              outline: none;
              border: none;
              margin-right: 0.15rem;
            }
          }
        }
        .p_display1 {
          width: 90%;
          border-top: 1px solid #e6e6e6;
          margin-left: 0.2rem;
          margin-top: 0.15rem;
          margin-bottom: 0.1rem;
          padding-top: 0.15rem;
          font-size: 12px;
          color: #666666;
        }
        .p_display2 {
          width: 90%;
          margin-left: 0.2rem;
          font-size: 12px;
          color: #666666;
        }
      }
    }
  }
}
.centerbox {
  position: absolute;
  top: 0.8rem;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 4rem 0.65rem 0 0.65rem;
  z-index: 98;
  .all_content {
    width: 100%;
    height: 70%;
    border: 2px solid #008836;
    background: #ffffff;
    padding: 0.3rem;
    position: relative;
    text-align: center;
    .cicle {
      width: 100%;
      height: 100%;
      border: 1px dashed #008836;
      button {
        position: absolute;
        top: -0.4rem;
        left: 30%;
        width: 40%;
        height: 0.8rem;
        outline: none;
        border: none;
        background: #008836;
        color: #ffffff;
        border-radius: 0.3rem;
      }
    }
  }
}
</style>

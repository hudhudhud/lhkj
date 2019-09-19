<template>
  <div>
    <cbbHeader title="约惠八桂"></cbbHeader>

    <div class="box">
      <img
        src="./imgs/lipin.jpg"
        alt
      >
      <div class="actGroupWrapper">
        <div
          class="actGroup"
          v-for="(act, actIndex) in actGroup"
          :key="'act'+actIndex"
        >
          <div
            class="record-list"
            v-for="(product,ind) in act.productList"
            :key="'product_'+ind"
          >
            <div
              class="record-item"
              :class="{'current-item': actGroup == []}"
              @click="buy(standard, act.actId)"
              v-for="(standard,ind2) in product.standardList"
              :key="ind+'_standard_'+ind2"
            >
              <div class="coning">
                <img :src="standard.standardActUrl">
                <div class="imgclass">
                  <p class="p_li"><span class="spans1">{{standard.standardName}}</span><span
                      v-if="act.actId=='558580913' || act.actId=='558923954'"
                      class="spans2"
                    >{{'剩余'+standard.surplusStock+'件'}}</span>
                  </p>
                  <p style="clear:both;margin-top:.3rem">
                    特价:<span class="current">￥{{standard.currentPrice}}</span><span
                      style="text-decoration:line-through"
                      class="origin"
                    >原价:{{standard.originalPrice}}</span><button
                      class="goprice"
                      @click="golist(standard.id,act.actId)"
                    >立即抢购</button>
                  </p>
                </div>
                <p
                  class="pclass"
                  v-if="act.actId=='558580913'|| act.actId=='558923954'"
                >注：每日限前30名用户，每个用户购买一次</p>
                <p
                  class="pclass"
                  v-if="act.actId=='558582055' || act.actId=='558927456'"
                >
                  注：每日不限量，不限制购买次数
                </p>

              </div>

            </div>
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
import { getActDetailNew } from '@/lib/api';

export default {
  data () {
    return {
      answer: answer,
      answers: [],
      id1: process.env.PUBLISH_ENV == 'prod' ? 558923954 : 558580913,
      id2: process.env.PUBLISH_ENV == 'prod' ? 558927456 : 558582055,
      actGroup: []
    };
  },
  components: {
    cbbHeader
  },
  methods: {
    golist (val, activeid) {
      window.location.href = `${window.location.protocol}//${
        window.location.host
      }/${this.$store.state.merchantAppid}/merchant/bagui/activevitylist`;
      localStorage.setItem('goodsduanwu', val);
      localStorage.setItem('activeid', activeid);
    },
    buy (val, id) {
      // console.log(val, id);
    }
  },
  created () {
    getActDetailNew(this.id1, rs => {
      this.actGroup.push(rs.payload);
      getActDetailNew(this.id2, rs => {
        this.actGroup.push(rs.payload);
      });
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
  .actGroupWrapper {
    width: 100%;
    // height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    // overflow-y: auto;
    z-index: 97;
    padding-top: 9.5rem;
    img {
      width: 100%;
    }
    .record-list {
      width: 80%;
      margin: 0 auto;
      .coning {
        position: relative;
      }
      .imgclass {
        position: absolute;
        bottom: 1.3rem;
        left: 12%;
        width: 78%;
        background: #bfe7cf;
        height: 1.2rem;
        border-radius: 0.15rem;
        padding: 0.09rem;
        margin-bottom: 0.2rem;
        .p_li {
          width: 100%;
          margin-bottom: 0.12rem;
          height: 0.2rem;
          .spans1 {
            float: left;
          }
          .spans2 {
            float: right;
            margin-right: 0.2rem;
            // width: 30%;
            // height: 100%;
            border: 1px solid #3a8c5f;
            border-radius: 0.09rem;
            color: #3a8c5f;
            text-align: center;
            font-size: 12px;
          }
          .spans2:after {
            display: block;
            clear: both;
            content: "";
            visibility: hidden;
            height: 0;
          }
          .spans1:after {
            display: block;
            clear: both;
            content: "";
            visibility: hidden;
            height: 0;
          }
        }
        .current {
          color: #ef6b00;
          font-size: 16px;
          margin-right: 0.12rem;
        }
        .origin {
          color: #666666;
          font-size: 12px;
        }
        .goprice {
          // width: 38%;
          background: #2a8454;
          color: #ffffff;
          border-radius: 0.2rem;
          height: 0.5rem;
          border: none;
          outline: none;
          float: right;
        }
      }
      .pclass {
        position: absolute;
        bottom: 0.7rem;
        left: 12%;
        width: 78%;
        text-align: left;
        // padding-left: 0.2rem;
        font-size: 0.24rem;
        font-weight: normal;
        color: #333333;
        // white-space: nowrap;
      }
    }
  }
}
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  img {
    width: 100%;
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

<template>
  <div class="goodlist">
    <ul :style="setting.ulStyle">
      <div v-for="(item, index) in productlist" :key="'item'+index">
        <li v-for="(pro, idx) in item.standardList" :key="'pro'+idx" :style="setting.liStyle">
          <div class="left"><img :src="pro.standardImgUrl" alt=""></div>
          <div class="center">
            <dl>
              <dt>{{pro.standardName}}</dt>
              <dd>原价￥{{pro.originalPrice}}</dd>
              <dd class="prizeNum"><div class="primsePrize">折扣价格:</div><span>￥<i>{{pro.currentPrice}}</i></span></dd>
            </dl>
          </div>
          <div :style="setting.btnStyle" @click="buy(pro)" class="button">{{setting.btnText || '购买'}}</div>
        </li>
      </div>

    </ul>
  </div>
</template>

<script>
import { getActDetailNew } from '@/lib/api';
export default {
  props: {
    setting: {}
  },
  data () {
    return {
      productlist: [],
      // actid: process.env.PUBLISH_ENV == 'prod' ? 559188141 : 559296381
      actid: this.setting.actid
    };
  },
  methods: {
    getActDetail () {
      getActDetailNew(this.actid, res => {
        this.productlist = res.payload.productList;
      })
    },
    buy (standard) {
      /* this.$router.push(
        `/${
          this.$store.state.merchantAppid
        }/merchant/index/convert/${standard.id}?actId=${
          this.actid
        }`
      ); */
      this.$router.push(
        `/${
          this.$store.state.merchantAppid
        }/merchant/index/cbbBuy001/standard/${standard.id}?couponCode=true`
      );
    }
  },
  created () {
    this.getActDetail()
  }
};
</script>

<style scoped lang="scss">
.goodlist{
  width: 100%;
  ul{
    padding: 0 0.25rem 0;
    li{
      width: 100%;
      height: 2.4rem;
      border-top: 0.011rem solid rgb(235, 235, 235);
      display: flex;
      .left{
        display: flex;
        height: 100%;
        float: left;
        align-items: center;
        img{
          display: block;
          width: 1.2rem;
          height: 1.2rem;
          float: left;
          margin: 0 0.2rem;
        }
      }
      .center{
        flex: 1;
        display: flex;
        height: 100%;
        float: left;
        align-items: center;
        overflow: hidden;
      }
      dl{
        width: 100%;
        height: 1.66rem;
        padding: 0.06rem 0.2rem 0;
        display: block;
        float: left;
        dt{
          font-size: 0.3rem;
          line-height: 0.4rem;
          color: #000000;
          margin-bottom: 0.14rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        dd{
          font-size: 0.28rem;
          line-height: 0.5rem;
          color: rgba(102,102,102,0.8);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .prizeNum{
          span{
            color: rgba(248,0,0,0.8);
            margin-right: 0.16rem;
            font-size: 0.4rem;
            i{
              font-style: normal;
              font-size: 0.5rem;
            }
          }
          .primsePrize{
            display: inline;
            margin-right: 0.1rem;
          }
        }
      }
      .button{
        width: 1.2rem;
        height: 0.56rem;
        background: rgba(248,0,0,0.8);
        text-align: center;
        color: #fff;
        font-size: 0.28rem;
        line-height: 0.56rem;
        border-radius: 0.3rem;
        float: right;
        margin-top: 0.92rem;
      }
    }
  }
}
</style>

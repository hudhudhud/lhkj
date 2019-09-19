<template>
  <div class="goodlist">
    <div class="Tab">
      <div class="tab" @click="changTab(index)" :class="{active: tab==index}" v-for="(tabinfo,index) in tabText" :key="'tab'+index">{{tabinfo}}</div>
    </div>
    <ul :style="setting.ulStyle">
      <div v-for="(item, index) in productlist" :key="'item'+index">
        <li @click="buy(pro)" v-for="(pro, idx) in item.standardList" :key="'pro'+idx" :style="setting.liStyle">
          <div class="left"><img :src="pro.standardImgUrl" alt=""></div>
          <div class="center">
            <dl>
              <dt>{{pro.standardName}}</dt>
              <dd>剩余库存：{{pro.surplusStock}}</dd>
              <!-- <dd>原价￥{{pro.originalPrice}}</dd>
              <dd class="prizeNum"><div class="primsePrize">折扣价格:</div><span>￥<i>{{pro.currentPrice}}</i></span></dd> -->
            </dl>
          </div>
          <div class="right">
            <dl>
              <dt>￥<span>{{pro.currentPrice}}</span></dt>
              <dd>原价:{{pro.originalPrice}}元</dd>
            </dl>
          </div>
        </li>
      </div>
      <li v-if="productlist.length==0">
        <p style="text-align:center;line-height:1.62rem;">暂无数据</p>
      </li>
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
      actid: this.setting.actid.split(','),
      tabText: this.setting.tabText.split(','),
      tab: 0
    };
  },
  methods: {
    changTab (index) {
      this.tab = index;
      this.getActDetail();
    },
    getActDetail () {
      getActDetailNew(this.actid[this.tab], res => {
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
  .Tab{
    height: 0.64rem;
    display: flex;
    flex-wrap: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    .tab{
      width: 1.7rem;
      height: 0.64rem;
      text-align: center;
      color: #222222;
      font-size: 0.3rem;
      line-height: 0.64rem;
      flex-shrink: 0;
      &.active{
        background: #0763e7;
        color: #ffffff;
        border-radius: 0.4rem;
      }
    }
  }
  ul{
    padding: 0;
    margin-top: 0.1rem;
    li{
      width: 100%;
      height: 1.62rem;
      border-bottom: 0.011rem solid rgb(235, 235, 235);
      .left{
        display: flex;
        height: 100%;
        float: left;
        align-items: center;
        img{
          display: block;
          width: 0.98rem;
          height: 0.98rem;
          float: left;
          margin: 0 0.4rem 0 0;
        }
      }
      .center{
        display: flex;
        height: 100%;
        float: left;
        align-items: center;
        dl{
          width: 3.8rem;
          padding: 0.06rem 0.2rem 0;
          display: block;
          float: left;
          dt{
            font-size: 0.32rem;
            line-height: 0.4rem;
            color: #333;
            margin-bottom: 0.14rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          dd{
            font-size: 0.24rem;
            line-height: 0.5rem;
            color: #999;
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
      }
      .right{
        display: flex;
        height: 100%;
        float: right;
        align-items: center;
        dl{
          text-align: right;
          padding-right: 0.2rem;
          dt{
            font-size: 0.26rem;
            color: #eb123b;
            line-height: 0.4rem;
            span{
              font-size: 0.4rem;
            }
          }
          dd{
            font-size: 0.24rem;
            color: #999;
            line-height: 0.48rem;
            text-decoration: line-through;
          }
        }
      }
    }
  }
}
</style>

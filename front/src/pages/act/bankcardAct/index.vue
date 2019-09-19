<template>
  <div class="newuserGift">
    <cbbHeader title="详情"></cbbHeader>
    <div class="card">
      <img :src="act.actIcon" alt="">
      <p>{{act.actName}}</p>
    </div>
    <div class="content">
      <ul class="tab">
        <li :class="{'active':tabIndex==0}" :style="{display: goodsList.length==0?'none':''}" @click="tabIndex=0">首刷礼</li>
        <li :class="{'active':tabIndex==1}" @click="tabIndex=1">超值活动</li>
      </ul>
      <div class="tab0" v-if="tabIndex==0">
        <div class="tag">新户大礼包：多选一(点击图片查看商品兑换说明)</div>
        <ul>
          <li v-for="(item,index) in goodsList" :key="index">
            <div class="giftnum">礼品</div>
            <img @click="goDetail(item)" :src="item.standardImgUrl" alt="">
            <div class="right">
              <div class="title">{{item.standardName}}</div>
              <div class="rightBottom">
                <div class="score">0积分</div>
                <div class="Receive">
                  <div class="btn" @click="buy(item)">立即领取</div>
                  <p>(支付{{item.currentPrice}}元领取)</p>
                </div>
                <!-- <div class="time">有效期：领取后1个月内</div> -->
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="tab1" v-if="tabIndex==1">
        <dl>
          <!-- <dt>1.境外消费笔笔返现1%，累计返现34%</dt> -->
          <!-- <dt>{{act.detail}}</dt> -->
          <dd v-for="(item,index) in detail" :key="index+'_detail'">{{item}}</dd>
        </dl>
        <!-- <dl>
          <dt>2.激活享惠购</dt>
          <dd>优享卡激活客199元换购市场价1790元Agnesb双肩包，即日起至2019年7月31日</dd>
        </dl> -->
        <div class="btn" @click="goCard">我要办卡</div>
      </div>
    </div>
    <div class="Dialog" v-if="buyDialog">
          <div class="dialog">
              <div class="close" @click="buyDialog=false"></div>
              <p>支付{{buyInfo.currentPrice}}元领取<span>{{buyInfo.standardName}}</span></p>
              <div class="btn" @click="gotoPay"></div>
          </div>
      </div>
  </div>
</template>

<script>
import cbbHeader from '@/components/cbbHeader';
export default {
  name: 'newuserGift',
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      tabIndex: 0, // 选项卡
      buyDialog: false, // 购买弹窗
      goodsList: [], // 商品列表
      buyInfo: null,
      detail: null
    };
  },
  components: {
    cbbHeader
  },
  methods: {
    goDetail (item) {
      item = JSON.stringify(item)
      this.$router.push(`/${this.$store.state.merchantAppid}/merchant/goodsDetail?item=${item}`)
    },
    goCard () {
      // window.location.href = 'http://hemitest.lianhaikeji.com/platform/ccb_sz/index.html#/card'
      if (this.act.activityFriendUrl) {
        window.location.href = this.act.activityFriendUrl;
      }
    },
    buy (item) {
      console.log(item);
      this.buyDialog = true;
      this.buyInfo = item;
    },
    gotoPay () {
      if (this.buyInfo.proType == 9) {
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/creditBuy/standard/${this.buyInfo.id}/${this.$route.params.actId}`
        );
      } else {
        this.$router.push(
          `/${
            this.$store.state.merchantAppid
          }/merchant/index/cbbBuy001/standard/${this.buyInfo.id}`
        );
      }
    }
  },
  created () {
    this.act.productList.forEach(val => {
      this.goodsList = this.goodsList.concat(val.standardList);
    });
    if (this.goodsList.length == 0) {
      this.tabIndex = 1;
    }
    this.detail = this.act.detail.split('<br/>')
    console.log(this.$route.params.actId);
  }
}

</script>
<style lang='scss' scoped>
  @import "@/styles/mixin.scss";

  .newuserGift {
    min-height: 100vh;
    background: #fff;
    .card {
      width: 100%;
      height: 4rem;
      background: rgb(244, 248, 250);
      overflow: hidden;

      img {
        width: 4.36rem;
        margin: 0.38rem auto 0;
        display: block;
      }

      p {
        text-align: center;
        font-size: 0.28rem;
        color: rgb(51, 51, 51);
        line-height: 0.28rem;
        margin: 0.2rem 0 0.4rem;
      }
    }

    .content {
      .tab {
        width: 100%;
        height: 0.86rem;
        text-align: center;
        padding: 0;
        border-bottom: 1px solid #dad7d7;
        display: flex;
        li {
          flex: 1;
          //width: 50%;
          height: 0.86rem;
          line-height: 0.86rem;
          font-size: 0.32rem;
          color: rgb(34, 34, 34);
          float: left;
          position: relative;

          &.active {
            color: rgb(31, 175, 239);

            &:after {
              content: ' ';
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                width: 1rem;
                margin: 0 auto;
                border-bottom: 2px solid rgb(31, 175, 239);
            }
          }
        }
      }

      .tab0 {
        .tag {
          width: 100%;
          height: 0.6rem;
          background: rgb(250, 240, 240);
          font-size: 0.24rem;
          line-height: 0.6rem;
          color: rgb(236, 80, 80);
          padding-left: 0.38rem;
        }

        ul {
          padding: 0.2rem;

          li {
            width: 100%;
            height: 2.82rem;
            background: url('./imgs/listbg.png') no-repeat;
            background-size: 100% 100%;
            padding: 0.1rem;

            .giftnum {
              width: 1.04rem;
              height: 0.66rem;
              background: url('./imgs/giftnum.png');
              background-size: 100% 100%;
              font-size: 0.26rem;
              color: #fff;
              line-height: 0.4rem;
              text-align: center;
              margin-bottom: 0.2rem;
            }

            img {
              width: 1.32rem;
              height: 1.32rem;
              margin-left: 0.2rem;
            }

            .right {
              width: 5.2rem;
              float: right;

              .title {
                font-size: 0.28rem;
                line-height: 0.28rem;
                color: rgb(51, 51, 51);
                font-weight: 700;
              }

              .rightBottom {
                margin-top: 0.14rem;

                .score {
                  font-size: 0.28rem;
                  color: rgb(233, 34, 34);
                  line-height: 0.28rem;
                  float: left;
                  width: 3rem;
                  margin-bottom: 0.5rem;
                }

                .time {
                  font-size: 0.24rem;
                  color: rgb(34, 34, 34);
                  line-height: 0.24rem;
                  float: left;
                  width: 3rem;
                }

                .Receive {
                  float: right;
                  text-align: center;
                  margin-right: 0.2rem;

                  .btn {
                    width: 1.82rem;
                    height: 0.72rem;
                    background: url('./imgs/btn.png') no-repeat;
                    background-size: 100% 100%;
                    font-size: 0.28rem;
                    color: rgb(255, 255, 255);
                    line-height: 0.6rem;
                  }

                  p {
                    font-size: 0.24rem;
                    color: rgb(167, 168, 171);
                  }
                }
              }
            }
          }

        }
      }

      .tab1 {
        padding: 0.48rem 0.4rem 0;

        dl {
          margin-bottom: 0.71rem;
          color: #000;

          dt {
            font-size: 0.28rem;
            line-height: 0.42rem;
            font-weight: 600;
          }

          dd {
            font-size: 0.26rem;
            line-height: 0.42rem;
          }
        }

        .btn {
          width: 5.6rem;
          height: 0.94rem;
          background: rgb(9, 182, 242);
          color: #fff;
          text-align: center;
          line-height: 0.94rem;
          font-size: 0.34rem;
          margin: 0.8rem auto;
          border-radius: 0.5rem;
        }
      }
    }
    .Dialog{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
        .dialog{
            width: 5.49rem;
            height: 4.16rem;
            background: url('./imgs/dialogBg.png') no-repeat;
            background-size: 100% 100%;
            position: relative;
            top: 50%;
            left: 50%;
            margin: -2.08rem 0 0 -2.74rem;
            padding-top: 2.14rem;
            .close{
                position: absolute;
                width: 0.52rem;
                height: 0.52rem;
                background: url('./imgs/close.png') no-repeat;
                background-size: 100% 100%;
                top: -0.2rem;
                right: 0rem;
            }
            p{
                font-size: 0.3rem;
                line-height: 0.4rem;
                color: rgb(0,0,0);
                text-align: center;
                position: absolute;
                bottom: 1.5rem;
                padding: 0 0.4rem;
                text-align: center;
                width: 100%;
                span{
                    color: rgb(245,21,21);
                }
            }
            .btn{
                width: 3.43rem;
                height: 0.78rem;
                background: url('./imgs/recharge.png') no-repeat;
                background-size: 100% 100%;
                margin: 1rem auto 0;
            }
        }
    }
  }

</style>

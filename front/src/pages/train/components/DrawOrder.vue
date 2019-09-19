<template>
  <div>
    <div class="order-main">

      <div class="order-flex">
        <div class="left">
          <div class="station">{{order.fromStation}}</div>
        </div>
        <div class="center">
          <div class="checi">
            {{order.trainNo}}
            <!-- <span>经停站</span> -->
          </div>

          <div class="arrow"></div>
          <!-- <div class="totalTime">历时</div> -->
        </div>
        <div class="right">
          <div class="toStation">{{order.toStation}}</div>
        </div>
      </div>
      <div class="kaidian">发车时间：&nbsp;{{order.drawTime}}</div>

    </div>
    <div class="order-purchaser">
      <div class="purchaser">
        <div class="name"><b>{{order.clientName}}</b>
          <template v-if="order.clientPapersType&&order.clientPapersType!=''">
            <span class="passenger">
              (中国居民身份证)
            </span>
          </template>
          <span class="passengerType">{{order.passengerType}}票</span>
        </div>
        <div class="seat">{{order.seatClass}}&nbsp;{{order.seatNo}}&nbsp;{{order.seatNumber}}</div>
      </div>
      <div class="afterSale">
        <div class="price">&yen;&nbsp;<b>{{order.price}}</b></div>
        <!-- <div class="title"><a href="">退改说明</a></div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DrawOrder',
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data () {
    return {};
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.order {
  &-main {
    white-space: nowrap;
    margin: 0 0.2rem;
    background: #fff;
    padding: 0.3rem 0.3rem 0.5rem;
    border-radius: 0.1rem;
    font-size: 0.3rem;
    color: #333;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);
  }
  &-flex {
    height: 0.8rem;
    line-height: 0.8rem;
    @include flex(row, nowrap, flex-start, center);
  }
  .left,
  .center,
  .right {
    flex: 1;
  }
  .right {
    text-align: right;
  }
  .left {
    text-align: left;
  }
  .center {
    text-align: center;

    .checi {
      padding: 0 0.2rem;
      display: inline-block;
      background: url(../imgs/arrowBig.png) no-repeat center 80%;
      background-size: 100% auto;
    }
  }
  .kaidian {
    margin-top: 0.3rem;
  }
  &-purchaser {
    padding: 0.4rem 0.5rem 0.6rem;
    position: relative;
    margin-bottom: 0.3rem;
    .purchaser {
      position: absolute;
      left: 0.5rem;
      .name {
        margin-bottom: 0.28rem;
        font-size: 0.3rem;
        .passenger {
          font-size: 0.24rem;
          color: #999;
        }
        .passengerType {
          display: inline-block;
          position: relative;
          top: -0.1rem;
          line-height: 1;
          padding: 0.06rem 0.1rem;
          font-size: 0.22rem;
          border-radius: 0.04rem;
          border: 1px solid #9bd6f9;
          color: #9bd6f9;
        }
      }
      .seat {
        color: #666;
        font-size: 0.28rem;
      }
    }
  }
  .afterSale {
    text-align: right;
    .price {
      color: #ff9a14;
      b {
        font-size: 0.34rem;
      }
    }
  }
}
</style>

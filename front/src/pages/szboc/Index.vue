<template>
    <div class="page">
        <div class="top">
            <div class="pic">
                <img :src="info.standardImgUrl" alt="">
            </div>
            <div class="info">
                <div class="text">
                    <div class="name">{{info.standardName}}</div>
                    <div class="tips">建行VIP专享价：<span>{{info.integralNum}}金币</span></div>
                </div>
                <div class="btn" @click="bindLink">立即购买</div>
            </div>
        </div>
        <div class="mid">
            <span></span>
            商品详情
            <span></span>
        </div>
        <img class="content" :src="info.standardActUrl" />
    </div>
</template>
<style lang="scss" scoped>
.top {
  .pic {
    height: 7.5rem;
    width: 7.5rem;
    img {
      width: 100%;
    }
  }
  .info {
    height: 1.5rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.3rem;
    .text {
      .name {
        font-size: 0.32rem;
        color: #2b2b2a;
        padding-bottom: 0.15rem;
      }
      .tips {
        font-size: 0.28rem;
        color: #333333;
        span {
          color: #ea2747;
        }
      }
    }
    .btn {
      width: 1.34rem;
      height: 0.5rem;
      line-height: 0.5rem;
      text-align: center;
      color: #fff;
      font-size: 0.28rem;
      border-radius: 0.04rem;
      background-color: #ea2747;
    }
  }
}
.mid {
  height: 0.8rem;
  background-color: #f5f5f5;
  color: #666;
  font-size: 0.24rem;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    width: 0.46rem;
    height: 1px;
    background-color: #666;
    margin: 0 0.1rem;
  }
}
.content {
  width: 100%;
}
</style>
<script>
import { Indicator } from 'mint-ui';

export default {
  data () {
    return {
      id: null,
      info: {}
    };
  },
  methods: {
    async loadStandard (rid) {
      let rs = await this.$get('api/getStandard/' + rid);
      this.info = rs.payload;
      Indicator.close();
    },
    bindLink () {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/creditBuy/standard/${
          this.info.standardId
        }/${this.info.actId}`
      );
    }
  },
  created () {
    Indicator.open();
    this.id = this.$route.params.id;
    this.loadStandard(this.id);
  }
};
</script>

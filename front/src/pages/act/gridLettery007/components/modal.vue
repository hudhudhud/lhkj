<template>
  <div
    class="mask"
    @touchmove="onTouchStart"
  >
    <div class="main">
      <div class="proImg">
        <img
          :src="prize.standardImgUrl"
          alt=""
          width="100%"
        >
      </div>
      <div class="proname"> <span>恭喜您获得</span><br>{{prize.prizeName}}</div>
      <div
        class="recharge"
        v-if="prize.proType==9"
      >
        <span @click="$router.push(`/${$store.state.merchantAppid}/merchant/address/list?targetPath=index/prize&orderCode=${prize.orderCode}&proName=${prize.prizeName}`)">填写收货地址</span>
      </div>
      <!-- <div
        class="recharge"
        v-else-if="prize.proType==2"
      >
        <span @click="handler">确定</span>
      </div> -->
      <div
        v-else
        class="recharge"
        @click="handler"
      >确定</div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['act', 'orderCode', 'prize'],
  data () {
    return {
      idCard: '',
      phone: '',
      name: ''
    };
  },
  computed: {
    tel () {
      return this.$store.state.cust.tel;
    }
  },
  methods: {
    onTouchStart (e) {
      e.preventDefault();
    },
    handler () {
      this.$emit('modal-handler');
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.mask {
  width: 100%;
  min-height: 100%;
  height: 12.1rem;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  overflow-y: hidden;
  .out {
    position: absolute;
    bottom: 0.8rem;
    left: 50%;
    margin-left: -0.43rem;
    width: 0.87rem;
    height: 0.87rem;
    img {
      width: 0.87rem;
    }
  }
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2rem 0 0.3rem;
    width: 6.38rem;
    height: 6.22rem;
    background: url("../img/modal-bg1.png") no-repeat;
    background-size: 100% 100%;
    .proImg {
      width: 1.5rem;
      margin: 0 auto;
    }
    .proname {
      width: 100%;
      font-family: PingFang-SC-Bold;
      font-size: 0.28rem;
      color: #333;
      text-align: center;
      margin: 0rem auto 0rem;
      // font-weight: 500;
      line-height: 0.5rem;
      span {
        color: #fe3f36;
      }
    }
    .recharge {
      width: 3rem;
      height: 0.74rem;
      background: url("../img/btn1.png") no-repeat center center;
      background-size: 100% 100%;
      border-radius: 0.2rem;
      text-align: center;
      line-height: 0.74rem;
      font-size: 0.34rem;
      color: #fff;
      margin: 0.1rem auto 0;
      font-weight: 600;
    }
  }
  h3,
  p {
    color: #fff;
    text-align: center;
  }
  h3 {
    font-size: 0.4rem;
    line-height: 0.68rem;
  }
  p {
    font-size: 0.26rem;
    padding: 0.2rem 0;
  }
}
</style>

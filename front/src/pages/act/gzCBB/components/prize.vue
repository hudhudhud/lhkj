<template>
  <div class="mask">
    <div
      class="main"
      :style="{'backgroundImage': 'url('+ bgUrl+')'}"
    >
      <div class="price">
        <span>支付:</span>
        <span class="num">¥1.0</span>
      </div>
      <div class="pay">
        <div class="phone">
          <input
            type="text"
            placeholder="请输入手机号"
            v-model="tel"
            readonly
          >
        </div>
        <div
          class="recharge"
          @click="pay"
        >支付充值</div>
      </div>
    </div>
    <div class="out">
      <img
        @click="prizeOut"
        src="../imgs/POP_BTN_CANCEL.png"
        alt
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['bgUrl'],
  data () {
    return {};
  },
  computed: {
    tel () {
      return this.$store.state.cust.tel;
    }
  },
  methods: {
    prizeOut () {
      this.$emit('prize-out');
    },
    pay () {
      this.$emit('pay');
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
    margin: 1rem auto;
    width: 6.68rem;
    height: 8.96rem;
    // background: url("../imgs/third.png") no-repeat;
    background-size: 100% 100%;
    padding: 1rem 0.3rem 0 0.3rem;
    .price {
      text-align: center;
      margin-top: 5.5rem;
      font-size: 0.26rem;
      color: rgb(243, 225, 144);
      .num {
        font-size: 0.43rem;
        color: rgb(243, 225, 144);
      }
    }
    .pay {
      display: flex;
      justify-content: space-around;
      margin-top: 0.2rem;
      .phone {
        width: 3.87rem;
        height: 0.93rem;
        background: url("../imgs/phonenum.png") no-repeat;
        background-size: 100% 100%;
        padding-left: 0.2rem;
        line-height: 0.93rem;
        input {
          width: 3rem;
          height: 0.8rem;
          font-size: 0.3rem;
          // line-height: 0.93rem;
        }
      }
      .recharge {
        width: 1.75rem;
        height: 0.93rem;
        background: url("../imgs/change.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 0.93rem;
        font-size: 0.34rem;
        color: rgb(125, 57, 34);
      }
    }
  }
}
</style>

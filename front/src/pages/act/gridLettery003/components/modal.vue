<template>
  <div
    class="mask"
    @touchmove="onTouchStart"
  >
    <div class="main">

      <div class="pay">
        <h3>登记资料</h3>
        <div class="ipt">
          <input
            type="text"
            placeholder="请输入姓名"
            v-model="name"
          >
        </div>
        <div class="ipt">
          <input
            type="text"
            placeholder="请输入手机号"
            v-model="phone"
          >
        </div>
        <div class="ipt">
          <input
            type="text"
            placeholder="请输入身份证号码"
            v-model="idCard"
          >
        </div>
        <div
          class="recharge"
          @click="order"
        >确定</div>
        <p>请务必填写个人完整信息，便于奖品发放。</p>
      </div>
    </div>
    <!--     <div class="out">
      <img
        @click="prizeOut"
        src="../imgs/POP_BTN_CANCEL.png"
        alt
      >
    </div> -->
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
export default {
  props: ['act', 'orderCode'],
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
    async order () {
      if (this.name == '' || this.phone == '' || this.idCard == '') {
        Toast('请填写信息');
        return;
      }
      if (!new RegExp(/^1[3456789]\d{9}$/).test(this.phone)) {
        Toast('您输入的手机号有误');
        return;
      }
      Indicator.open();
      let rs = await this.$post('api/activity/act/actPredate/save/table', {
        actId: this.act.actId,
        orderCode: this.orderCode,
        name: this.name,
        IDCard: this.idCard,
        mobile: this.phone
      });
      if (rs.status == 200) {
        Toast(rs.message);
        this.$emit('close');
      } else {
        Toast(rs.error);
      }
      Indicator.close();
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
    width: 6.51rem;
    background: url("../img/modal-bg.png") no-repeat;
    background-size: 100% 100%;
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
      .ipt {
        margin-bottom: 0.3rem;
        text-align: center;
        input {
          width: 80%;
          height: 0.72rem;
          border-radius: 0.4rem;
          line-height: 0.72rem;
          font-size: 0.3rem;
          padding-left: 0.4rem;
        }
      }
      .recharge {
        width: 5.02rem;
        height: 1.02rem;
        background: url("../img/btn.png") no-repeat center center;
        background-size: 100% auto;
        text-align: center;
        line-height: 1.02rem;
        font-size: 0.44rem;
        color: rgb(125, 57, 34);
        margin: 0 auto;
      }
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

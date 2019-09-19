<template>
  <div>
    <div class="lego-bgj">
      <div class="bgj-total">
        我的八桂金：
        <span>{{coinTotal}}</span>
      </div>
      <div
        class="bgj-item"
        v-for="(item, index) in userCreditList"
        v-if="index < 3"
        :key="'jin'+index"
        :style="{'backgroundImage': `url(${item.creditType.creditIconUrl})`}"
      >{{item.useableAmount}}</div>
      <div
        class="bgj-look"
        @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/credit`)"
      >查看</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      coinTotal: 0,
      userCreditList: []
    };
  },
  computed: {
    customId () {
      return this.$store.state.cust ? this.$store.state.cust.id : null;
    }
  },
  methods: {
    async getTotalCredit () {
      let rs = await this.$post('/api/user_credit/get', {
        customId: null
      });
      if (rs.status == 200) {
        this.coinTotal = rs.payload.useableCredit;
      } else {
        Toast(rs.error);
      }
    },
    async getUserCredit () {
      let rs = await this.$post(
        'api/credit/get/user_credit/availableCreditDetailList',
        {
          customId: null
        }
      );
      if (rs.status == 200) {
        this.userCreditList = rs.payload;
      } else {
        Toast(rs.error);
      }
    }
  },
  watch: {
    '$store.state.cust': function (val) {
      if (val) {
        this.getUserCredit();
        this.getTotalCredit();
      }
    }
  },
  mounted () {
    this.getUserCredit();
    this.getTotalCredit();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.lego-bgj {
  @include flex(row, noWrap, flex-start, center);
  height: 0.86rem;
  padding: 0 0.2rem;
  .bgj-total {
    padding: 0 0.2rem;
    line-height: 0.5rem;
    background: rgb(56, 180, 154);
    color: #fff;
    font-size: 0.28rem;
    border-radius: 0.3rem;
    white-space: nowrap;
    span {
      font-size: 0.3rem;
    }
  }
  .bgj-item {
    margin-left: 0.32rem;
    padding-left: 0.5rem;
    color: rgb(60, 178, 154);
    font-size: 0.3rem;
    line-height: 0.42rem;
    background-size: 0.34rem 100%;
    background-repeat: no-repeat;
  }

  .bgj-look {
    flex: 1;
    position: relative;
    right: 0.5rem;
    color: rgb(60, 178, 154);
    text-align: right;
    &:after {
      @include arrow(0.18rem, 0.18rem, -0.3rem, rgb(60, 178, 154), -45deg);
    }
  }
}
</style>

<template>
  <div>

    <div class="bgj-outline">
      <div class="bgj-counter">
        <div class="item">
          <b>{{accumulatedCredit}}</b>
          <div><img :src="setting.icon" alt="">累计收入</div>
        </div>
        <div class="line">
          <img class="avatar" :src="defaultAvatar" alt="" width="100%">
          <!--  <img
            src="./wang.png"
            class="wang"
            alt=""
          > -->
          <div class="tag">{{accumulatedCredit | BankClerk}}</div>
        </div>
        <div class="item">
          <b>{{useableCredit}}</b>
          <div><img :src="setting.icon" alt="">剩余CC币
          </div>
        </div>
      </div>
      <div class="account" v-if="cust&&cust.tel">账号：{{cust.tel}}</div>
    </div>

  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import defaultAvatar from './avatar.png';

export default {
  props: ['setting'],
  data () {
    return {
      useableCredit: 0,
      accumulatedCredit: 0,
      cust: this.$store.state.cust ? this.$store.state.cust : null,
      defaultAvatar: this.$store.state.cust
        ? this.$store.state.cust.headImgUrl
        : defaultAvatar
    };
  },
  methods: {
    async getTotalCredit () {
      let rs = await this.$post('/api/user_credit/get', {
        customId: null
      });
      if (rs.status == 200) {
        this.useableCredit = rs.payload.useableCredit;
        this.accumulatedCredit = rs.payload.accumulatedCredit;
      } else {
        Toast(rs.error);
      }
    }
  },
  mounted () {
    let token = this.$store.state.token;
    if (token) {
      this.getTotalCredit();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.bgj-outline {
  padding: 0.2rem 0 0;
  height: 4.2rem;
  .bgj-counter {
    @include flex(row, nowrap, center, center);
    margin: 0 auto;
    padding: 0 0.3rem 0rem;
    color: #fff;
    .item {
      text-align: center;
      img {
        width: 0.45rem;
        vertical-align: -0.04rem;
        margin-right: 0.08rem;
      }
    }
    .line {
      margin: 0.3rem 0.74rem 0;
      .avatar {
        width: 1.34rem;
        border-radius: 50%;
      }
      .tag {
        position: relative;
        top: -0.4rem;
        color: #723d0e;
        z-index: 3;
        display: block;
        width: 1.68rem;
        height: 0.44rem;
        line-height: 0.5rem;
        margin: 0 auto;
        font-size: 0.24rem;
        background: url(./wang.png) no-repeat;
        background-size: 100% auto;
      }
    }
    b {
      font-size: 0.64rem;
    }
  }
}
.account {
  color: #fff;
  font-size: 0.28rem;
  text-align: center;
}
</style>

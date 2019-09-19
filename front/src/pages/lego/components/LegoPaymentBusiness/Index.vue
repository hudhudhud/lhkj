<template>
  <div class="tab">
    <div
      class="tab-box"
      v-if="paymentType"
    >
      <div
        class="tab-item"
        v-for="(item, index) in paymentType"
        :key="index"
        @click="choose(index, item)"
        :class="{'active': index==isSelected, 'mgrl': index ==1, 'l':index == 0,'r':index == 2}"
      >
        缴{{item.name}}
      </div>
    </div>
    <div>
      <picker
        :paymentId="paymentId"
        @eimt-companyCode="acceptCompanyCode"
      ></picker>
    </div>
    <div class="tab-input">
      <input
        type="text"
        v-model="account"
        placeholder="请输入户号"
      />
      <div
        class="btn"
        @click="goCommit"
      >
      </div>
    </div>

    <div class="tab-tip">
      6-10位用户编号，请查看账单/短信
    </div>
  </div>
</template>

<script>
import picker from './picker';
import { getActDetail } from '@/lib/api';

export default {
  props: ['setting'],
  data () {
    return {
      isSelected: 0,
      count: 0,
      queryId: '',
      timer: null,
      errorMsg: '',
      paymentName: '',
      account: '',
      paymentId: '',
      companyCode: '',
      paymentType: null,
      act: null
    };
  },
  computed: {
    proStandardId () {
      return this.act ? this.act.productList[0].standardList[0].id : '';
    }
  },
  components: { picker },
  methods: {
    goCommit () {
      if (!this.companyCode || !this.account) {
        this.$toast('请完善信息');
      } else {
        // this.turns();
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/youchuHN/payment?companyId=${this.companyCode}&actId=${this.setting.actId}&proStandardId=${this.proStandardId}&account=${this.account}&paymentName=${this.paymentName}`
        );
      }
    },
    acceptCompanyCode (val) {
      this.companyCode = val;
    },
    choose (i, item) {
      this.isSelected = i;
      this.paymentName = item.name;
      this.paymentId = item.id;
    },
    async getPaymentType () {
      let rs = await this.$post('api/search/wec', {
        action: 'queryType'
      });
      if (rs.status == 200) {
        let payload = JSON.parse(rs.payload);
        if (payload.code == 200) {
          this.paymentType = payload.list;
          this.paymentId = payload.list[0].id;
          this.paymentName = payload.list[0].name;
        } else {
          this.$toast('系统出错');
        }
      } else {
        this.$toast(rs.error);
      }
    }
  },
  async created () {
    this.getPaymentType();
    this.act = await getActDetail(this.setting.actId);
    console.log(this.act);
  }
};
</script>

<style lang="scss" scoped>
.tab {
  max-width: 6.92rem;
  margin: 0 auto 0;
  &-box {
    display: flex;
    justify-content: center;
    margin: 0.2rem 0 0.4rem;
    text-align: center;
    color: #2f2f2f;
    font-size: 0.32rem;
    background: #fff;
  }

  &-item {
    width: 2.3rem;
    height: 0.56rem;
    line-height: 0.56rem;
    background: #eee;
    &.active {
      background: #40bd49;
      color: #fff;
    }
    &.l {
      border-radius: 0.1rem 0 0 0.1rem;
    }
    &.r {
      border-radius: 0 0.1rem 0.1rem 0;
    }
    &.mgrl {
      margin: 0 1px;
    }
  }
  &-input {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.3rem;
    input {
      border: 1px solid #999;
      border-radius: 0.2rem;
      padding: 0 0.4rem;
      height: 0.8rem;
      color: #434343;
      min-width: 5.6rem;
      &.coupon {
        height: 0.8rem;
        line-height: 0.8rem;
      }
    }
    .btn {
      display: flex;
      height: 1.05rem;
      width: 1.05rem;
      border-radius: 50%;
      background: url(./imgs/confirm.png) no-repeat;
      background-size: cover;
    }
  }
  &-tip {
    font-size: 0.26rem;
    color: #999;
  }
}
</style>

<template>
  <div>

    <div
      class="buy"
      v-if="act"
    >
      <div
        class="wrapper"
        v-for="(product,ind) in act.productList"
        :key="'pro_'+ind"
      >
        <!-- <div class="label">{{product.proName}}面额</div> -->
        <div class="product">
          <div
            class="product-item"
            v-for="(std, ind2) in product.standardList"
            :key="'std_'+std.id"
            @click="select(ind2, std)"
            :class="{'mR2': (ind2+1)%3!=0}"
          >
            <div class="currentPrice">{{std.standardName}}</div>
            <div class="originalPrice">售价:{{std.integralNum}}积分</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    setting: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      act: null,
      index: -1
    };
  },
  methods: {
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.act = rs.payload;
      } else {
      }
    },
    select (i, std) {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/creditBuy/standard/${
          std.id
        }/${this.setting.actId}`
      );
    }
  },
  created () {
    this.loadAct(this.setting.actId);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.buy {
  color: rgb(9, 179, 239);
  .wrapper {
    width: 6.84rem;
    margin: 0 auto;
  }
  .product {
    @include flex(row, wrap, flex-start, center);
    width: 100%;
    font-size: 0.32rem;
    .product-item {
      position: relative;
      @include flex(column, wrap, center, center);
      min-width: 2rem;
      max-width: 2rem;
      white-space: nowrap;
      border: 1px solid rgb(26, 76, 147);
      // border: 1px solid rgb(9, 179, 239);
      margin: 0.1rem 0;
      border-radius: 0.04rem;
      text-align: center;
      color: rgb(26, 76, 147);
      // color: rgb(9, 179, 239);
      height: 1.16rem;
      &.mR2 {
        margin-right: 0.2rem;
      }
      .currentPrice {
        margin-bottom: 0.1rem;
      }
      .originalPrice {
        // text-decoration: line-through;
        font-size: 0.22rem;
        line-height: 0.3rem;
      }
    }
  }
}
</style>

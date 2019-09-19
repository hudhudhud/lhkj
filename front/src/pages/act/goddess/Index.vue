<template>
  <div>
    <headerBar title="缤纷女神节"></headerBar>

    <div class="wrap">
      <div
        class="wrap-rule"
        @click="showRule"
      ></div>
      <div class="wrap-list">
        <div class="cell">
          <div
            class="cell-row"
            v-for="(item,index) in list"
            :key="index"
          >
            <div class="cell-icon">
              <img
                :src="item.standardImgUrl"
                alt=""
              >
            </div>
            <div class="cell-content">
              <p class="coupon-name">{{item.standardName}}</p>
              <p class="coupon-desc">券后最低价:</p>
              <p class="coupon-price"><span>&yen;</span>{{(item.originalPrice-20).toFixed(1)}}</p>
            </div>
            <div
              class="cell-btn"
              @click="buy(item,act.actId)"
            ></div>
          </div>
        </div>
      </div>
      <ruleDialog
        title="活动规则"
        ref="dialog"
      ></ruleDialog>
    </div>
  </div>

</template>

<script>
import ruleDialog from './component/dialog';
import headerBar from '@/components/headerBar';

export default {
  name: 'goddessApp',
  components: { ruleDialog, headerBar },
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      title: '女神节活动',
      list: []
    };
  },
  mounted () {
    this.list = this.act.productList[0].standardList;
  },
  methods: {
    buy (item, actId) {
      this.$router.push(
        `/${
          this.$store.state.merchantAppid
        }/merchant/index/cbbBuy001/standard/${item.id}?actId=${actId}`
      );
    },
    showRule () {
      this.$refs.dialog.open();
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 26rem;
  background-size: 100% 100%;
  background-image: url("./gimg/god_back.jpg");
  position: relative;
  &-rule {
    position: absolute;
    top: 0.46rem;
    right: 0;
    width: 1.84rem;
    height: 0.54rem;
    background-image: url("./gimg/rule.png");
    background-size: 100% 100%;
  }
  &-list {
    position: absolute;
    top: 12.43rem;
    left: 50%;
    transform: translateX(-50%);
    width: 7.1rem;
  }
}
.cell {
  &-row {
    padding: 0 0.3rem;
    display: flex;
    align-items: center;
    margin-bottom: 0.4rem;
  }
  &-icon {
    width: 1.7rem;
    height: 1.7rem;
    img {
      width: 100%;
    }
  }
  &-content {
    flex-grow: 1;
    margin-left: 0.3rem;
  }
  &-btn {
    width: 1.8rem;
    height: 0.6rem;
    background-image: url("./gimg/buy.png");
    background-size: 100% 100%;
  }
}
.coupon {
  &-name {
    font-size: 0.3rem;
    color: #000;
  }
  &-desc {
    font-size: 0.26rem;
    color: #000;
    margin-top: 0.32rem;
  }
  &-price {
    color: #c42303;
    font-size: 0.4rem;
  }
}
</style>

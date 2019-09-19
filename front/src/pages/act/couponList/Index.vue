<template>
  <div class="seckill">
    <cbbHeader
      v-if="!templateConfig.removeTitle"
      :title="templateConfig.title"
      :bg-color="templateConfig.headerBackground"
    ></cbbHeader>

    <div class="seckill-container">
      <div class="seckill-wrapper">
        <div class="linkPlate" v-for="(product,ind) in act.productList" :key="'product_'+ind">
          <div
            class="plate-item"
            v-for="(standard,ind2) in product.standardList"
            :key="ind+'_standard_'+ind2"
          >
            <div class="plate-info" @click="buy(standard, act.actId)">
              <img :src="standard.standardImgUrl">
            </div>
          </div>
        </div>
      </div>
      <div class="act-rule" v-if="act.detail">
        <div class="rule-title">活动规则</div>
        <div class="detail" v-html="act.detail"></div>
      </div>
    </div>
  </div>
</template>
<script>
import cbbHeader from '@/components/cbbHeader';
export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    cbbHeader
  },
  data () {
    return {
      templateConfig: JSON.parse(this.act.templateConfig),
      timeMap: {},
      timeStatusMap: {},
      running: false,
      storeMap: {}
    };
  },
  methods: {
    buy (standard, actId) {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/creditBuy/standard/${
          standard.id
        }/${actId}`
      );
    }
  },
  beforeDestroy () {},
  created () {
    console.log(this.templateConfig);
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.seckill {
  position: absolute;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  background: #fff;
  .seckill-container {
    width: 100%;
    padding-bottom: 55px;
    .seckill-wrapper {
      padding: 0.4rem 0.3rem;
      .linkPlate {
        .plate-item {
          border-bottom: 1px dashed #939393;
          &:nth-last-child(1) {
            border: none;
          }

          .plate-info {
            img {
              width: 100%;
              margin-bottom: 0.3rem;
            }
          }
        }
      }
    }
    .act-rule {
      padding: 0.3rem 0.3rem;
      .rule-title {
        font-size: 0.32rem;
        padding: 0.2rem 0;
      }
      .detail {
        line-height: 0.4rem;
      }
    }
  }
}
.banner-img {
  display: block;
  max-width: 100%;
}
.running-cover {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.1);
}
.running {
  position: fixed;
  z-index: 1988;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  background: #fff;
  padding: 1rem 0.4rem;
  text-align: center;
  font-size: 0.3rem;
  line-height: 0.5rem;
  border-radius: 0.2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>

<template>
  <div class="template">
    <div class="swipe-wrapper">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(img, ind0) in merchantConfig.banner" :key="'img_' +ind0"><img :src="img.url" alt=""></mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="pannel-list">
      <div class="pannel" v-for="(product,ind) in merchantConfig.actGroup" :key="'product_'+ind">
        <div class="pannel-title">
          <div class="pannel-title-name">
            <img :src="product.groupIcon" />{{product.groupName}}
          </div>
        </div>
        <div class="pannel-content">
          <div class="pannel-item" v-for="(act,ind2) in product.actList" :class="'pannel-item-'+ act.size" :key="'_standard_'+ind2" @click="$router.push(`index/act/${act.actId}`)">
            <img class="pannel-img" :class="'pannel-img-'+act.size" :src="act.cover" />
          </div>
        </div>
      </div>
    </div>
    <div class="service-hotline">
      <p>客服热线:{{hotline}}</p>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui'
export default {
  components: { Swipe, SwipeItem },
  data () {
    return {
      merchantConfig: this.$store.state.merchantConfig,
      hotline: '0571-58106068'
    }
  },
  methods: {
    directDetail: function () {
      window.history.pushState('3/template001')
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.template {
  background: #eee;
  .swipe-wrapper {
    height: 3.08rem;
    img {
      width: 100%;
    }
  }
  .service-hotline {
    height: 0.8rem;
    line-height: 0.8rem;
    p {
      text-align: center;
      color: #666;
      font-size: 0.28rem;
    }
  }
  .pannel-list {
    padding: 0.05rem 0;
    .pannel {
      padding: 0.6rem 0.17rem 0.3rem;
      box-sizing: border-box;
      background: #fff;
      display: flex;
      flex-direction: column;
      margin-bottom: 0.1rem;
      .pannel-title {
        font-size: 0.36rem;
        .pannel-title-name {
          padding: 0 0.12rem;
          color: #cc1b30;
          img {
            height: 0.4rem;
            width: 0.4rem;
            margin-right: 0.25rem;
            vertical-align: -0.09rem;
          }
        }
      }
      .pannel-content {
        flex: 1 0 auto;
        display: flex;
        flex-wrap: wrap;
        overflow: auto;
        .pannel-item {
          flex: 1;
          min-width: 50%;
          box-sizing: border-box;
          padding: 0.12rem;
          .pannel-img {
            display: block;
            width: 100%;
            border-radius: 0.06rem;
          }
        }
        .pannel-item-100 {
          min-width: 100%;
        }
      }
    }
  }
}
</style>

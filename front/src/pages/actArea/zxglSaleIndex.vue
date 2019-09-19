<template>
  <div class="container">
    <cbbHeader title="中信国旅"></cbbHeader>
    <div class="banner">
      <img src="./img/banner.png" alt="">
    </div>
    <div class="brand">
      <img src="./img/brand.png" alt="">
    </div>
    <div class="item-btn">
      <div class="btn" @click="open">
        预约</div>
    </div>
    <div class="desc">
      <h4> 产品说明：</h4>
      <p> 亚特兰蒂号全新启航，10天9夜的阿根廷-南极群岛之行。看见 第一抹晨光由海平面而来，进入冰与水的奇幻秘境，鲸鱼浅游、 企鹅群徙，体验大自然不同的生命之美。 由百年剧院改造的书店“雅典人”、最南端海港“乌斯怀亚”、原 始国家公园火地岛、当地风情探戈舞，独特的文化沉淀与你来一 次心与心的碰撞。
      </p>
    </div>
    <div class="detail">
      <a href="https://static.lianhaikeji.com/h5/zhongxingguolv/index.htm">查看详情&nbsp;>></a>
    </div>

  </div>
</template>

<script>
import cbbHeader from '@/components/cbbHeader'
export default {
  components: {
    cbbHeader
  },
  methods: {
    open () {
      // window.location.href = ''
      // this.$router.push(`/${this.$store.state.merchantAppid}/merchant/index/act/80`)
      this.$router.push(`/${this.$store.state.merchantAppid}/merchant/index/act/48`)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  padding-bottom: 0.2rem;
  .banner img {
    width: 100%;
  }
  .brand {
    margin: 0.1rem 0.2rem;
    text-align: center;
    img {
      width: 100%;
    }
  }
  .desc {
    padding: 0.3rem 0.3rem 0;
    font-size: 0.24rem;

    p {
      padding-top: 0.2rem;
      color: #666666;
      line-height: 0.4rem;
    }
  }
  .item-btn {
    margin: 0.1rem 0.2rem;
    text-align: right;
    .btn {
      display: inline-block;
      width: 1.8rem;
      background-color: #ff7e00;
      color: white;
      border-radius: 0.1rem;
      text-align: center;
      padding: 0.12rem 0.2rem;
    }
  }
  .detail {
    font-size: 0.24rem;
    color: #3260aa;
    text-align: right;
    padding-right: 0.3rem;
    font-weight: bold;
  }
}
</style>

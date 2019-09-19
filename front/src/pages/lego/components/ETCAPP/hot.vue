<template>
  <div class="hot">
    <div class="cont">
      <div class="big-pic" @click="bindItem(hotBig)">
        <img :src="hotBig.standardImgUrl" />
        <div class="price">
          <img src="./imgs/price-bg.png" />
          <span>仅需:{{hotBig.integralNum}}龙点</span>
        </div>
      </div>
      <div class="small-pic">
        <div class="pic" v-for="(item, index) in hotList" :key="index" @click="bindItem(item)">
          <img :src="item.standardImgUrl" />
          <div class="price">
            <img src="./imgs/price-bg.png" />
            <span>仅需:{{item.integralNum}}龙点</span>
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
      required: true
    }
  },
  data () {
    return {
      hotId: null, // 热门推荐id
      hotList: [],
      hotBig: {},
      actId: null,
      hrefUrl: null
    };
  },
  methods: {
    async loadAct () {
      let rs = await this.$get('api/getActDetails/' + this.hotId);
      if (rs.status === 200) {
        this.actId = rs.payload.actId;
        let arr = rs.payload.productList[0].standardList;
        this.hotBig = arr.shift();
        this.hotList = arr;
      }
    },
    bindItem (e) {
      console.log(
        `${this.hrefUrl}/merchant/ETCCreditBuy/standard/${e.id}/${this.actId}`
      );
      window.location.href = `${this.hrefUrl}/merchant/ETCCreditBuy/standard/${
        e.id
      }/${this.actId}`;
    }
  },
  async created () {
    this.hotId = this.setting.actId;
    await this.loadAct();
    this.hrefUrl =
      'https://' +
      window.location.host +
      '/' +
      window.location.pathname.split('/')[1];
  }
};
</script>
<style lang="scss" scoped>
.hot {
  .cont {
    margin-top: 0.3rem;
    padding: 0 0.16rem;
    height: 3.34rem;
    display: flex;
    justify-content: space-between;
    .price {
      width: 1.95rem;
      height: 0.6rem;
      position: absolute;
      top: 0.1rem;
      left: 0;
      span {
        font-size: 0.26rem;
        font-weight: bold;
        color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        height: 0.6rem;
        width: 1.95rem;
        text-align: center;
        line-height: 0.6rem;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    .big-pic {
      width: 3.6rem;
      height: 3.34rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .small-pic {
      .pic {
        width: 3.04rem;
        height: 1.6rem;
        margin-bottom: 0.14rem;
        position: relative;
        &:last-child {
          margin-bottom: 0;
        }
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
  }
}
</style>

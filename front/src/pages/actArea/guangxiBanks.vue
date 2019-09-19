<template>
  <div class="bg">
    <cbbHeader title="
    区域活动专区"></cbbHeader>
    <div class="title">区域活动专区</div>
    <div class="wrapper">
      <div class="container">
        <div
          class="area-item"
          v-for="(item, index) in list"
          :key="index"
          @click="jumpUrl(item.jumpUrl)"
        >

          <img
            :src="item.localPicUrl ||defaultIcon "
            alt
          >
          <!-- <div v-if="item.localName">{{item.localName || '更多'}}</div> -->

        </div>
      </div>
    </div>
    <img
      src="./img/bg2.jpg"
      alt=""
      width="100%"
      style="margin-top: -1.5rem;"
    >
  </div>
</template>

<script>
import cbbHeader from '@/components/cbbHeader';
import defaultIcon from './img/defaultNew.png';
export default {
  data () {
    return {
      defaultIcon: defaultIcon,
      merchantId: this.$store.state.merchantId,
      list: [],
      bankBranchlist: []
    };
  },
  components: {
    cbbHeader
  },
  methods: {
    jumpUrl (url) {
      if (url) {
        window.location.href = url;
      } else {
        this.$toast('敬请期待~');
      }
    },
    async getLocalBanks () {
      let rs = await this.$post('api/activity/get_first_institution', {
        merchantId: this.merchantId
      });
      if (rs.status == 200) {
        let maximum = rs.payload.length % 3;
        if (maximum > 0) {
          for (var i = 0; i < 3 - maximum; i++) {
            rs.payload.push({});
          }
        }
        this.list = rs.payload;
      }
    }
  },
  created () {
    this.getLocalBanks();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bg {
  position: absolute;
  width: 100%;
  bottom: 0;
  top: 0;
  background: #e1f0ea;
}
.title {
  padding-top: 0.34rem;
  padding-bottom: 0.4rem;
  line-height: 0.44rem;
  color: rgb(77, 77, 77);
  font-size: 0.3rem;
  padding-left: 0.24rem;
  background: url(./img/bg1.jpg) repeat;
  background-size: 100% auto;
}
.wrapper {
  position: relative;
  z-index: 8;
  background: #fff;
  border-radius: 0.1rem;
  padding: 0.3rem 0 0.2rem;
  margin: 0rem 0.2rem 0.1rem;
  box-shadow: 0px 0px 2px 2px #ccc;
}
.container {
  display: flex;
  flex-wrap: wrap;
  border-radius: 0.2rem;
  margin: 0 auto;
  padding-left: 0.2rem;
  .area-item {
    width: 33.3333%;
    text-align: center;
    margin-bottom: 0.16rem;
    img {
      display: block;
      width: 1.1rem;
      margin: 0 auto;
    }
    div {
      /*   position: absolute;
      left: 50%;
      transform: translateX(-50%); */
      display: inline-block;
      white-space: nowrap;
      margin: 0.2rem auto;
      line-height: 0.45rem;
      color: #fff;
      font-size: 0.26rem;
      padding: 0 0.2rem;
      background: rgb(56, 179, 153);
      border-radius: 0.05rem;
    }
  }
}
</style>

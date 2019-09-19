<template>
  <div class="bg">
    <cbbHeader title></cbbHeader>
    <div class="title">地方行活动专区</div>
    <div class="wrapper">
      <div class="container">
        <div class="area-item" v-for="(item, index) in list" :key="index">
          <template v-if="item.localName">
            <a href="javascript:" @click="$href(`/index/actArea/cityActIndex?id=${item.id}&city=${item.localName}`)">
              <img :src="item.icon ||defaultIcon " alt>
              <div v-if="item.localName">{{item.localName | getCityName}}专区</div>
            </a>
          </template>
          <template v-else>
            <a href="javascript:">
              <img :src="item.icon ||defaultIcon " alt>
              <div v-if="item.localName">{{item.localName | getCityName}}专区</div>
            </a>
          </template>
        </div>
      </div>
    </div>
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
      list: []
    };
  },
  components: {
    cbbHeader
  },
  methods: {
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
  bottom: 55px;
  top: 0;
  background: #ebf2f7;
  overflow-x: scroll;
}
.title {
  margin-top: 0.34rem;
  line-height: 0.44rem;
  border-left: 0.1rem solid #da1c3e;
  color: rgb(77, 77, 77);
  font-size: 0.3rem;
  padding-left: 0.24rem;
}
.wrapper {
  width: 7.28rem;
  min-height: 9.62rem;
  margin: 0.5rem auto 0;
  background: url(./img/bgRed.png) no-repeat;
  background-size: 100% auto;
  padding: 2.8rem 0.4rem;
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
      width: 1.2rem;
      height: 1.2rem;
      margin: 0 auto;
      border-radius: 50%;
    }
    div {
      width: 1.3rem;
      margin: 0.2rem auto;
      line-height: 0.45rem;
      color: #fff;
      font-size: 0.26rem;
      background: #da1c3e;
      border-radius: 0.05rem;
    }
  }
}
</style>

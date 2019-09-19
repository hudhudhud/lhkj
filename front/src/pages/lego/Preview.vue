<template>
  <div class="lego-page">
    <div class="lego-page-error" v-if="loadFailed">
      <img class="lego-page-error-face" src="./imgs/failed.png">
      <div class="lego-page-error-msg">页面加载失败,原因:{{errorMsg}}</div>
      <div class="lego-page-error-btn" @click="loadPage">点击重试</div>
    </div>
    <LegoRenderer v-for="(comp,ind) in componentList" :comp="comp" :key="'comp_'+ind"></LegoRenderer>
  </div>
</template>

<script>
import LegoRenderer from './LegoRenderer';
import { Indicator } from 'mint-ui';

export default {
  components: { LegoRenderer },
  data () {
    return {
      loadFailed: false,
      errorMsg: '',
      componentList: []
    };
  },
  watch: {
    '$route.params.pageKey': function (val) {
      this.loadPage();
    }
  },
  methods: {
    async loadPage () {
      this.loadFailed = false;
      Indicator.open();
      try {
        let rs = await this.$get(
          'api/lego/getLegoPreviewPage/' + this.$route.params.pageKey
        );
        if (rs.status == 200) {
          this.componentList = JSON.parse(rs.payload);
        } else {
          this.loadFailed = true;
          this.errorMsg = rs.error;
        }
      } catch (error) {
        this.loadFailed = true;
        this.errorMsg = error;
      }
      Indicator.close();
    }
  },
  created () {
    this.loadPage();
  }
};
</script>

<style scoped>
.lego-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: #fff;
}
.lego-page-error {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.lego-page-error-face {
  display: block;
  width: 20vw;
  margin: 10vw auto;
  opacity: 0.5;
}
.lego-page-error-msg {
  width: 80vw;
  line-height: 20px;
  font-size: 16px;
  color: #999;
  text-align: center;
}
.lego-page-error-btn {
  height: 30px;
  line-height: 30px;
  width: 20vw;
  margin: 10vw auto;
  font-size: 16px;
  color: #666;
  border: 1px solid #ccc;
  text-align: center;
}
</style>

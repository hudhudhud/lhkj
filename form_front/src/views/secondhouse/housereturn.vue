<template>
  <div class="banners_box">
    <Header title="二手房交易资金托管线上排队预约"></Header>
    <div class="banners">
      <div class="banners_content">
        <h4>您已取消预约</h4>
      </div>
      <div class="cancel">
        <button @click="goback">返回</button>
      </div>

    </div>
  </div>
</template>
<script>
import Header from "@/views/header";
export default {
  data() {
    return {
      url:
        process.env.PUBLISH_ENV == "prod"
          ? "https://hemi.lianhaikeji.com/8b53bbcb7b36483eb057de927b84edb4/merchant/houseHome"
          : "http://hemitest.lianhaikeji.com/106f4a50063247f58d221abff52a7b84/merchant/houseHome"
    };
  },
  components: {
    Header
  },
  methods: {
    goback() {
      window.location.href = this.url + "?formId=17";
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.banners_box {
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow-y: auto;
  position: absolute;
  top: 0;
  left: 0;
  background: #2462ee;
  background-size: cover;
  .banners {
    width: 100%;
    height: 100%;
    background: url(./images/banners.png) repeat-y;
    background-size: cover;
    padding-top: 4rem;

    h4 {
      text-align: center;
      font-size: 24px;
      font-weight: normal;
      color: #fff;
      margin-bottom: 5rem;
    }
    .cancel {
      width: 100%;
      text-align: center;
      button {
        width: 75%;
        height: 1rem;
        border: none;
        outline: none;
        background: #6feaff;
        font-size: 16px;
        color: #fffffb;
        border-radius: 0.15rem;
      }
    }
  }
}
</style>



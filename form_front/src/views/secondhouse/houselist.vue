<template>
  <div class="banners_box">
    <Header title="二手房交易资金托管线上排队预约"></Header>
    <img
      src="./images/banner.png"
      alt=""
    >
    <div class="banners">
      <div class="banners_content">
        <div class="childrenone">
          <button @click="$router.push('/17?cb=/secondhouse/houselogin')">
            预约
          </button>
        </div>
        <div class="childrentwo">
          <button @click="$router.push('houseactive')">
            查询和撤销
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/views/header";
export default {
  data() {
    return {};
  },
  components: {
    Header
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
  img {
    width: 7.5rem;
  }
  .banners {
    width: 100%;
    // height: 100%;
    // background: url(./images/banner.png) repeat-y;
    // background-size: cover;
    .banners_content {
      position: fixed;
      bottom: 2rem;
      left: 0;
      display: flex;
      width: 100%;
      .childrenone {
        flex: 1;
        text-align: center;
        button {
          background: #fff;
          width: 3rem;
          height: 1rem;
          outline: none;
          border: none;
          font-size: 16px;
          color: #4064d3;
          border-radius: 0.2rem;
        }
      }
      .childrentwo {
        flex: 1;
        text-align: center;
        button {
          background: #fff;
          width: 3rem;
          height: 1rem;
          outline: none;
          border: none;
          font-size: 16px;
          color: #4064d3;
          border-radius: 0.2rem;
        }
      }
    }
  }
}
</style>



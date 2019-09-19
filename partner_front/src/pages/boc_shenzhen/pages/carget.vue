<template>
  <div class="carget">
    <div class="carget-header">
      <div>办卡</div>
    </div>
    <div class="nav">
      <div class="nav-item"
           :class="{'nav-item-active':currentTab=='shuzi'}"
           @click="currentTab='shuzi'"
      >中银数字信用卡</div>
      <div class="nav-item"
           :class="{'nav-item-active':currentTab=='gaoxiao'}"
           @click="currentTab='gaoxiao'"
      >高校认同卡</div>
      <div
        class="nav-item"
        :class="{'nav-item-active':currentTab=='zhongyin'}"
        @click="currentTab='zhongyin'"
      >中银赞卡</div>
      <div
        class="nav-item"
        :class="{'nav-item-active':currentTab=='naiba'}"
        @click="currentTab='naiba'"
      >中银神偷奶爸卡</div>
      <div
        class="nav-item"
        :class="{'nav-item-active':currentTab=='dushi'}"
        @click="currentTab='dushi'"
      >都市缤纷卡</div>
      <div
        class="nav-item"
        :class="{'nav-item-active':currentTab=='zhuojun'}"
        @click="currentTab='zhuojun'"
      >卓隽卡</div>
      <div
        class="nav-item"
        :class="{'nav-item-active':currentTab=='quanzhi'}"
        @click="currentTab='quanzhi'"
      >全职高手信用卡</div>
    </div>
    <div class="cartype">
      <div v-show="currentTab=='shuzi'">
        <div class="cartype-item">
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/mQJZNz">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/zhuzicard.jpg">
            </a>
          </div>
        </div>
      </div>
      <div v-show="currentTab=='gaoxiao'">
        <div class="cartype-item">
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/aQnYz2">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/school1.png" alt>
            </a>
          </div>
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/emmqUz">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/school2.png" alt>
            </a>
          </div>
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/63eQby">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/school3.png" alt>
            </a>
          </div>
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/iaQfue">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/school4.png" alt>
            </a>
          </div>
          <div class="item-pic" @click="gotocardetail(1)">
            <div class="clickGetCar">了解详情</div>
            <img src="./imgs/school5.png" alt>
          </div>
          <div class="item-pic" @click="gotocardetail(2)">
            <div class="clickGetCar">了解详情</div>

            <img src="./imgs/school6.png" alt>
          </div>
        </div>
      </div>
      <div v-show="currentTab=='zhongyin'">
        <div class="cartype-item">
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/qyuQve">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/zanka1.png" alt>
            </a>
          </div>
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/MRZJja">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/zanka2.png" alt>
            </a>
          </div>
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/Ire6Nb">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/zanka3.png" alt>
            </a>
          </div>
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/myeAVv">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/zanka4.png" alt>
            </a>
          </div>
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/BfYRbu">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/zanka5.png" alt>
            </a>
          </div>
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/fUN7Vn">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/zanka6.png" alt>
            </a>
          </div>
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/BJ7Brq">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/zanka7.png" alt>
            </a>
          </div>
        </div>
      </div>
      <div v-show="currentTab=='naiba'">
        <div class="cartype-item">
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/3aEJBv">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/naiba.png" alt>
            </a>
          </div>
        </div>
      </div>
      <div v-show="currentTab=='dushi'">
        <div class="cartype-item">
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/Yjieqi ">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/man.png" alt>
            </a>
          </div>
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/BRNnUb ">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/woman.png" alt>
            </a>
          </div>
        </div>
      </div>
      <div v-show="currentTab=='zhuojun'">
        <div class="cartype-item">
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/ARnume">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/zhuojun.png" alt>
            </a>
          </div>
        </div>
      </div>
      <div v-show="currentTab=='quanzhi'">
        <div class="cartype-item">
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/q6beYv">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/qzgslogo.png" alt>
            </a>
          </div>
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/FFbMvm">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/Qbjmx.png" alt>
            </a>
          </div>
          <div class="item-pic">
            <a href="https://apply.mcard.boc.cn/apply/uIRRna">
              <div class="clickGetCar">点击办卡</div>
              <img src="./imgs/jmx.png" alt>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentTab: 'shuzi'
    };
  },
  methods: {
    gotocardetail (page) {
      this.$router.push({
        name: 'carddetail',
        params: {
          page: page
        }
      }); // 去积分商城
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.carget {
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: 100%;
  overflow-y: auto;
  .carget-header {
    position: relative;
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #fff;
    background-color: red;
    .carget-out {
      position: absolute;
      top: 0.4rem;
      right: 0.3rem;
      height: 0.3rem;
      width: 0.3rem;
    }
  }
  .nav {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 0 0 0.4rem 0.4rem;
    border-bottom: 0.01rem solid rgb(235, 239, 240);
    .nav-item {
      height: 0.64rem;
      line-height: 0.64rem;
      padding: 0 0.2rem;
      background-color: rgba(235, 239, 240, 0.8);
      margin-right: 0.36rem;
      margin-top: 0.4rem;
      border: 0.01rem solid rgb(235, 239, 240);
      border-radius: 0.32rem;
    }
    .nav-item-active {
      color: rgb(247, 37, 57);
    }
  }
  .cartype {
    font-family: "simhei";
    width: 100%;
    min-height: 100%;
    height: 100%;
    background: url("./imgs/carbg.png") no-repeat;
    background-size: 100% 100%;
    padding: 0.4rem 0 0.4rem 0;
    .cartype-item {
      .item-pic {
        width: 6.86rem;
        height: 1.9rem;
        margin: 0 auto;
        margin-bottom: 0.25rem;
        position: relative;
        img {
          width: 100%;
        }
        .clickGetCar {
          position: absolute;
          top: 1.2rem;
          right: 0.4rem;
          width: 1.6rem;
          height: 0.5rem;
          text-align: center;
          line-height: 0.5rem;
          background: url("./imgs/button.png") no-repeat;
          background-size: 100% 100%;
          color: #fff;
          font-size: 0.26rem;
        }
      }
    }
  }
}
</style>

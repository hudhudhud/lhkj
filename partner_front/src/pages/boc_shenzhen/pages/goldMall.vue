<template>
  <div class="page">
    <div class="banner">
      <img src="./imgs/banner.png" alt="">
    </div>
    <div class="cont">
      <div class="title"><img src="./imgs/goldMall-icon.png" />特惠商品</div>
      <div class="discount">
        <div class="item">
          <img src="./imgs/goldMall-subx.png" alt="">
        </div>
        <div class="item">
          <img src="./imgs/goldMall-jd.png" alt="">
        </div>
      </div>
      <div class="tab">
        <div class="bd">
          <div class="item" :class="active=='tab1'?'ac':''" @click="tabClick(1)">全部</div>
          <div class="item" :class="active=='tab2'?'ac':''" @click="tabClick(2)">美食餐饮</div>
          <div class="item" :class="active=='tab3'?'ac':''" @click="tabClick(3)">影视娱乐</div>
          <div class="item" :class="active=='tab4'?'ac':''" @click="tabClick(4)">旅游出行</div>
        </div>
        <div class="hd">
          <mt-tab-container v-model="active" :swipeable="true">
            <mt-tab-container-item id="tab1">
              <div class="list">
                <div class="item">
                  <img src="./imgs/goldMall-yk.png" alt="">
                  <button class="btn"></button>
                </div>
                <div class="item">
                  <img src="./imgs/goldMall-aqy.png" alt="">
                  <button class="btn"></button>
                </div>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab2">
              <div class="list">
                <div class="item">
                  <img src="./imgs/goldMall-yk.png" alt="">
                  <button class="btn"></button>
                </div>
                <div class="item">
                  <img src="./imgs/goldMall-aqy.png" alt="">
                  <button class="btn"></button>
                </div>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab3">
              <div class="list">
                <div class="item">
                  <img src="./imgs/goldMall-yk.png" alt="">
                  <button class="btn"></button>
                </div>
                <div class="item">
                  <img src="./imgs/goldMall-aqy.png" alt="">
                  <button class="btn"></button>
                </div>
              </div>
            </mt-tab-container-item>
            <mt-tab-container-item id="tab4">
              <div class="list">
                <div class="item">
                  <img src="./imgs/goldMall-yk.png" alt="">
                  <button class="btn"></button>
                </div>
                <div class="item">
                  <img src="./imgs/goldMall-aqy.png" alt="">
                  <button class="btn"></button>
                </div>
              </div>
            </mt-tab-container-item>
          </mt-tab-container>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      active: 'tab1'
    };
  },
  methods: {
    tabClick (e) {
      this.active = 'tab' + e;
    }
  }
};
</script>
<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: url(./imgs/goldMall-bg.jpg) no-repeat center top;
  background-size: 100%;
  //   box-sizing: border-box;
  padding-top: 0.2rem;
  padding-bottom: 0.8rem;
  .banner {
    width: 7.11rem;
    height: 2.54rem;
    margin: 0 auto;
    img {
      width: 100%;
    }
  }
  .cont {
    width: 7.11rem;
    margin-top: 0.35rem;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 4px 0px 0px rgba(44, 140, 255, 0.4);
    border-radius: 20px;
    padding-top: 0.35rem;
    padding-bottom: 0.4rem;
    .title {
      font-size: 0.34rem;
      color: #222;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        margin-right: 0.1rem;
        width: 0.3rem;
        height: 0.35rem;
      }
    }
    .discount {
      margin-top: 0.4rem;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-evenly;
      padding-bottom: 0.47rem;
      position: relative;
      &:after {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        content: "";
        display: block;
        width: 6.73rem;
        height: 1px;
        background-color: #c7ecfa;
      }
      .item {
        width: 3.3rem;
        height: 1.84rem;
        img {
          width: 100%;
        }
      }
    }
    .tab {
      width: 7.11rem;
      margin: 0 auto;
      .bd {
        margin-top: 0.44rem;
        height: 0.68rem;
        line-height: 0.68rem;
        display: flex;
        justify-content: space-around;
        .item {
          font-size: 0.3rem;
          color: #222222;
          height: 0.68rem;
          border-radius: 0.34rem;
          &.ac {
            padding: 0 0.52rem;
            background-color: #e22319;
            font-size: 0.34rem;
            color: #fff;
          }
        }
      }
      .hd {
        margin-top: 0.38rem;
        .list {
          .item {
            position: relative;
            width: 6.96rem;
            margin: 0 auto;
            margin-bottom: 0.24rem;
            height: 1.84rem;
            img {
              width: 100%;
              float: left;
            }
            .btn {
              position: absolute;
              height: 100%;
              width: 1.25rem;
              height: 1.84rem;
              right: 0;
              top: 0;
              background: none;
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>

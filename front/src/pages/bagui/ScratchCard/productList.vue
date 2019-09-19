<template>
  <div class="container">
    <div class="top-bar">
      <div class="act-title">八桂金币超值兑换，惊喜不容错过!</div>
      <div class="act-content">可至“兑换专区”使用八桂金进行兑换卡券</div>
      <div class="act-content">可至贺州地区泰兴超市任意线下门店提货!</div>
      <div class="producr-btn"></div>
    </div>
    <div class="product-group" v-for="product in products" :key="product.id">
      <div class="group-top">
        <label>{{product.proName}}</label>
        <span @click="viewMore(product.standardList)">更多</span>
      </div>
      <div class="product-list">
        <template v-for="(item, index) in product.standardList">
          <div class="list-item" v-if="index<2" :key="item.id">
            <div class="img-box">
              <img :src="item.standardImgUrl" :alt="item.standardName">
            </div>
            <span>{{item.standardName}}</span>
          </div>
        </template>
      </div>
    </div>
    <transition name="slide">
      <div class="product-detail" v-show="isOpen">
        <div class="close-btn" @click="close">关闭</div>
        <div class="detail-item" v-for="item in currentList" :key="item.id">
          <div><img :src="item.standardImgUrl" :alt="item.standardName"></div>
          <span>{{item.standardName}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import ScratchCard from './scratch-card';
import { getActDetailNew } from '@/lib/api';
import { Toast } from 'mint-ui';
export default {
  components: { ScratchCard },
  data () {
    return {
      actId: null,
      products: [],
      isOpen: false,
      currentList: []
    };
  },
  methods: {
    viewMore (data) {
      this.currentList = [...data];
      this.isOpen = true;
    },
    close () {
      this.isOpen = false;
      this.currentList = [];
    }
  },
  created () {
    this.actId = process.env.PUBLISH_ENV == 'prod' ? 562751039 : 562653277;
    getActDetailNew(this.actId, rs => {
      if (rs.status == 200) {
        this.products = rs.payload.productList;
      } else {
        Toast('网络异常');
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 23rem;
  background: url("//static.lianhaikeji.com/images/20190709/15f440650ca04bd7bc3f79e7b487c1d9.jpg")
    no-repeat;
  background-size: 100% 23rem;
  .top-bar {
    display: inline-block;
    width: 74.6%;
    height: 2.88rem;
    margin: 4.06rem 0 0.6rem 13%;
    box-sizing: border-box;
    padding-top: 0.45rem;
    color: #717171;
    font-size: 0.26rem;
    text-align: center;
    .act-title {
      font-size: 0.32rem;
      color: #ff9600;
      margin-bottom: 0.1rem;
    }
    .act-content {
      line-height: 0.4rem;
    }
    .producr-btn {
      display: inline-block;
      width: 50.35%;
      height: 0.76rem;
      background: url("//static.lianhaikeji.com/images/20190709/6d9573d9adcb4cbd92207b41d141f064.png")
        no-repeat;
      background-size: 100%;
      margin-top: 0.36rem;
    }
  }
  .product-group {
    width: 100%;
    height: 4.8rem;
    .group-top {
      height: 0.88rem;
      margin-bottom: 0.32rem;
      > label {
        display: inline-block;
        width: 3.84rem;
        height: 0.85rem;
        background: url("//static.lianhaikeji.com/images/20190709/d2896c42b46b41a3b277be5a1c1cc22c.png")
          no-repeat;
        background-size: 100%;
        box-sizing: border-box;
        line-height: 0.8rem;
        padding-left: 0.3rem;
        font-size: 0.34rem;
        color: #333;
        margin-left: 0.15rem;
      }
      > span {
        float: right;
        position: relative;
        color: #93bf36;
        font-size: 0.28rem;
        margin-top: 0.2rem;
        margin-right: 0.75rem;
        &::after {
          display: inline-block;
          content: " ";
          height: 0.18rem;
          width: 0.18rem;
          border-width: 0.02rem 0.02rem 0 0;
          border-color: #93bf36;
          border-style: solid;
          transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
          position: absolute;
          top: 3px;
        }
      }
    }
    .product-list {
      display: flex;
      width: 92%;
      height: 3.3rem;
      justify-content: space-around;
      margin-left: 3.8%;
      .list-item {
        width: 39.86%;
        > .img-box {
          box-sizing: border-box;
          border: 4px solid #f8efc7;
          border-radius: 8px;
          img {
            width: 100%;
          }
        }
        > span {
          display: inline-block;
          width: 100%;
          height: auto;
          text-align: center;
          font-size: 0.3rem;
          color: #333;
          margin-top: 0.2rem;
        }
      }
    }
  }
}
.product-detail {
  box-sizing: border-box;
  padding-top: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff8da;
  overflow: auto;
  .close-btn {
    position: absolute;
    top: 0.35rem;
    right: 0.5rem;
    font-size: 0.36rem;
  }
  .detail-item {
    display: inline-block;
    width: 42%;
    height: 3.5rem;
    margin-left: 5%;
    text-align: center;
    > div {
      width: 100%;
      height: 2.75rem;
      box-sizing: border-box;
      border: 4px solid #f8efc7;
      border-radius: 8px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    > span {
      display: inline-block;
      width: 100%;
      height: auto;
      text-align: center;
      font-size: 0.3rem;
      color: #333;
      margin-top: 0.1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

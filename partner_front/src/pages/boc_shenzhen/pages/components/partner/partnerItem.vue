<template>
  <div class="item">
    <div class="left">
      <div class="pic">
        <img :src="item.imgUrl" alt="">
      </div>
      <div class="text">
        <div class="tel">{{item.name}}</div>
        <div class="state">被邀请</div>
        <div class="time">{{item.bindTime}}</div>
      </div>
    </div>
    <div class="right coin" v-if="item.isAdd">+<span>5金</span></div>
  </div>
</template>
<script>
export default {
  name: 'partnerItem',
  props: {
    item: {
      type: Object
    }
  }
};
</script>
<style lang="scss" scoped>
.item {
  width: 6.86rem;
  height: 1.68rem;
  background-color: #ffffff;
  box-shadow: 0px 4px 0px 0px rgba(44, 140, 255, 0.4);
  border-radius: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding-left: 0.26rem;
  padding-right: 0.36rem;
  margin-bottom: 0.3rem;
  .left {
    display: flex;
    align-items: center;
    .pic {
      width: 1.2rem;
      height: 1.2rem;
      background-color: #eee;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      margin-left: 0.24rem;
      .tel {
        font-size: 0.34rem;
        height: 0.34rem;
        color: #333;
        margin-bottom: 0.08rem;
      }
      .state {
        font-size: 0.28rem;
        color: #333;
        margin-bottom: 0.18rem;
      }
      .time {
        font-size: 0.28rem;
        color: #bababd;
      }
    }
  }
  .right {
    &.coin {
      font-size: 0.28rem;
      color: #f72539;
      span {
        font-size: 0.44rem;
      }
    }
    &.fail {
      text-align: right;
      span {
        font-size: 0.34rem;
        color: #b3afaf;
      }
      .btn {
        width: 1.68rem;
        height: 0.68rem;
        line-height: 0.68rem;
        background-color: #e22319;
        border-radius: 0.34rem;
        font-size: 0.34rem;
        text-align: center;
        letter-spacing: -0.02rem;
        color: #fdfeff;
        margin-top: 0.14rem;
      }
    }
  }
}
</style>

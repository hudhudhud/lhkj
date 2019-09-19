<template>
  <div>
    <cbbHeader title="活动"></cbbHeader>
    <div class="order">
      <div class="nav">
        <div class="nav-item" :class="{'nav-item-active':currentTab==''}" @click="currentTab=''">进行中</div>
        <div
          class="nav-item"
          :class="{'nav-item-active':currentTab=='prize'}"
          @click="currentTab='prize'"
        >已完成</div>
        <!-- <div class="nav-item" :class="{'nav-item-active':currentTab=='charge'}" @click="currentTab='charge'">直充</div>
        <div class="nav-item" :class="{'nav-item-active':currentTab=='card'}" @click="currentTab='card'">卡密</div>-->
      </div>
      <div class="ongoing" v-if="currentTab == ''">
        <div class="mission-list">
          <img src="./imgs/IMG_RW_1.png" alt>
          <div class="mission-number">任务1</div>
          <div class="buttonclick">推荐好友</div>
        </div>
        <div class="mission-list">
          <img src="./imgs/IMG_RW_1.png" alt>
          <div class="mission-number">任务1</div>
          <div class="buttonclick">推荐好友</div>
        </div>
        <div class="mission-list">
          <img src="./imgs/IMG_RW_1.png" alt>
          <div class="mission-number">任务1</div>
          <div class="buttonclick">推荐好友</div>
        </div>
        <div class="more">更多活动敬请期待</div>
      </div>
      <div class="finished" v-else-if="currentTab =='prize'">
        <div class="finished-list">
          <img src="./imgs/IMG_RW_1.png" alt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cbbHeader from '@/components/cbbHeader';
export default {
  components: {
    cbbHeader
  },
  data () {
    return {
      currentTab: ''
    };
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.order {
  position: absolute;
  top: 0.8rem;
  left: 0;
  right: 0;
  bottom: 0.55rem;
  padding-top: 1rem;
  .nav {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1rem;
    display: flex;
    background: #fff;
    font-size: 0.3rem;
    &:after {
      content: " ";
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      border-bottom: 0.02rem solid #efefef;
    }
    .nav-item {
      position: relative;
      flex: 1 1 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(51, 51, 51);
    }
    .nav-item-active {
      color: rgb(29, 180, 248);
      &:after {
        content: " ";
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 50%;
        margin-left: -1.03rem;
        right: 0;
        width: 2.06rem;
        border-bottom: 2px solid rgb(29, 180, 248);
      }
    }
  }
  .ongoing {
    width: 100%;
    padding: 0.3rem 0 0 0.1rem;
    .mission-list {
      position: relative;
      width: 7.28rem;
      margin-bottom: 0.3rem;
      img {
        width: 100%;
      }
      .mission-number {
        text-align: center;
        line-height: 0.64rem;
        position: absolute;
        top: 0.4rem;
        left: 0;
        width: 1.57rem;
        height: 0.64rem;
        background: url("./imgs/IMG_RW.png") no-repeat;
        background-size: 100% 100%;
        color: #ffffff;
        font-size: 0.35rem;
        font-weight: 800;
      }
      .buttonclick {
        position: absolute;
        bottom: 0.4rem;
        left: 50%;
        margin-left: -2rem;
        width: 4rem;
        height: 1.18rem;
        background: url("./imgs/BTN_BG.png") no-repeat;
        background-size: 100% 100%;
        text-align: center;
        line-height: 1.18rem;
        color: rgb(23, 130, 180);
        font-size: 0.4rem;
      }
    }
    .more {
      width: 100%;
      text-align: center;
      color: #999;
      font-size: 0.3rem;
    }
  }
  .finished {
    width: 100%;
    padding: 0.3rem 0 0 0.1rem;
    .finished-list {
      position: relative;
      width: 7.28rem;
      margin-bottom: 0.3rem;
      img {
        width: 100%;
      }
    }
  }
}
</style>

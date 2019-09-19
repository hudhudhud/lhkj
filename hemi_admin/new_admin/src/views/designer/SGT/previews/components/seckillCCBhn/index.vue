<template>
  <div class="out-box">
    <img class="bg-img" :src="tpl.background" v-highLight="'background'">
    <div class="container">
      <div class="container-time" :style="{'background-image': 'url('+tpl.timeBg+')'}" v-highLight="'timeBg'">
        <p class="list-extra">
          限时秒杀：
          <span><label>06</label>:</span>
          <span><label>12</label>:</span>
          <span><label>39</label></span>
        </p>
      </div>
      <div class="standard-list">
        <div class="standard-item">
          <div class="standard-content">
            <div class="standard-name">20元话费代金券</div>
            <div class="standard-price">秒杀价:&yen;0.01</div>
            <div class="standard-limit">库存20</div>
          </div>
          <div class="standard-action" v-highLight="'btnText'">{{tpl.btnText}}</div>
        </div>
      </div>
      <div class="container-rule">
        <div class="rule-label" :style="{'background-image': 'url('+tpl.ruleTitle+')'}" v-highLight="'ruleTitle'"></div>
        <div class="rule-content"></div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import { highLight } from "@/directive/highLight";

export default {
  props: {
    tpl: {
      type: Object,
      require: true
    }
  },
  directives: { highLight }
};
</script>

<style scoped lang="scss">
.out-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  .bg-img {
    position: absolute;
    top: 0;
    max-width: 100%;
  }
}
.container {
  position: absolute;
  width: 100%;
  &-time {
    text-align: center;
    color: #fff;
    background-image: url("http://static.lianhaikeji.com/release/hemi_front_test/time-bg.5f2633a.png");
    width: 180px;
    height: 40px;
    line-height: 48px;
    margin: 245px auto 0;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
    padding-left: 15px;
    p {
      font-size: 12px;
      label {
        display: inline-block;
        background-color: #fff;
        color: red;
        line-height: 15px;
        padding: 0 2px;
        border-radius: 2px;
      }
    }
  }

  .standard-list {
    width: 278px;
    margin: 0 auto;
    .standard-item {
      position: relative;
      width: 100%;
      height: 100px;
      background-image: url(//static.lianhaikeji.com/images/20190725/d9d7046a219945a590dfc423d1cedd65.png);
      background-size: 100%;
      background-repeat: no-repeat;
      background-position: center;
      margin-top: 10px;
      .standard-content {
        box-sizing: border-box;
        height: 100%;
        margin-left: 75px;
        color: #f8f8f8;
        padding: 20px 7px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .standard-name {
          font-size: 15px;
        }
        .standard-price {
          font-size: 14px;
        }
        .standard-limit {
          font-size: 12px;
        }
      }
      .standard-action {
        position: absolute;
        width: 65px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        color: #ff5b26;
        font-size: 12px;
        background-color: #fff;
        border-radius: 4px;
        right: 13px;
        top: 37px;
      }
    }
  }
  &-rule {
    position: relative;
    width: 340px;
    height: 250px;
    border-radius: 10px;
    margin: 25px auto 0;
    background-color: rgba(255, 255, 255, 0.6);
    padding: 40px 15px 15px;
    .rule-label {
      position: absolute;
      top: -2px;
      left: 50%;
      transform: translateX(-50%);
      width: 154px;
      height: 35px;
      background-image: url(http://static.lianhaikeji.com/release/hemi_front_test/rule-label.fdb6f4f.png);
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .rule-content {
      max-height: 190px;
      font-size: 13px;
      line-height: 18px;
      overflow-y: auto;
    }
  }
}
</style>

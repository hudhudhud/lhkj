<template>
  <transition name="fade">
    <div
      class="dialog"
      @touchmove="onTouchStart"
      v-if="openRule"
    >
      <div class="join">

        <div class="close">
          <img
            src="../imgs/close.png"
            alt
            @click="close"
          >
        </div>
        <div class="wrapper">
          <div class="rule">
            <div class="act-title">
              <i></i>
              <div class="txt">活动主题</div>
              <i></i>

            </div>
            <p>员工e家见面礼
              <br />话费福利首登送，视频月卡月月领
            </p>
            <div class="act-title">
              <i></i>
              <div class="txt">活动时间</div>
              <i></i>
            </div>
            <p>2019年3月1日至12月31日</p>
            <div class="act-title">
              <i></i>
              <div class="txt">活动形式和内容</div>
              <i></i>

            </div>
            <div class="desc">客户登陆员工e家公众号，点击活动入口进入活动页面，页面中展示可领取权益。 <br />领取规则：<br />
              1、首次登陆可领取20元话费。 <br />
              2、领取话费后次月可开始选3选1权益（每月），3选1为腾讯视频月卡、优酷视频月卡和爱奇艺视频月卡。</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'rule',
  props: {
    openRule: {
      type: Boolean,
      require: true
    }
  },
  data () {
    return {
      mobile: '',
      name: ''
    };
  },
  methods: {
    close () {
      this.$emit('close-rule');
    },
    onTouchStart (e) {
      e.preventDefault();
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";

.dialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  .join {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5.6rem;
    height: 9.7rem;
    background: url(../imgs/rule-bg.png) no-repeat;
    background-size: 100% 100%;
    .wrapper {
      text-align: center;
      color: #fff;
      padding-top: 2rem;
      .rule {
        padding-top: 0.5rem;
        text-align: center;
        color: rgb(141, 88, 51);
        font-size: 0.26rem;
        .act-title {
          display: flex;
          justify-content: center;
          align-items: center;
          color: rgb(164, 115, 31);
          margin-bottom: 0.26rem;
          i {
            flex: 1;
            max-width: 0.8rem;
            height: 0.22rem;
            background: url(../imgs/icon-left@2x.png) no-repeat;
            background-size: 100% 100%;
            &:last-child {
              background: url(../imgs/icon-right@2x.png) no-repeat;
              background-size: 100% 100%;
            }
          }
          .txt {
            font-size: 0.3rem;
            font-weight: bold;
            padding: 0 0.3rem;
          }
        }
        p {
          padding: 0 0.26rem;
          line-height: 0.38rem;
          margin-bottom: 0.36rem;
        }
        .desc {
          padding: 0 0.26rem;
          line-height: 0.38rem;
          text-align: left;
        }
      }
    }
    .close {
      position: absolute;
      right: 0;
      top: 0;
      width: 0.5rem;
      height: 0.5rem;
      font-size: 0;
      img {
        width: 100%;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

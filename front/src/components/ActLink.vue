<template>
  <div
    class="mask"
    v-if="showOutLink"
  >
    <div class="content">
      <div class="close">
        <img
          @click="close"
          src="./img/close.jpg"
          alt=""
        >
      </div>

      <div class="txt">您还可以参加</div>
      <div class="banner">
        <a :href="linkPayload.activityFriendUrl"><img
            :src="linkPayload.actvityFriendPicture"
            alt=""
          ></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActLink',
  props: {
    linkPayload: {
      require: false,
      type: Object
    },
    showOutLink: {
      require: false,
      type: Boolean
    }
  },
  methods: {
    close () {
      this.$emit('close');
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  .content {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6.36rem;
    height: 3.42rem;
    background: #fff;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    padding: 0 0.2rem;
    border-radius: 0.2rem;
    .txt {
      font-size: 0.3rem;
      text-align: center;
      margin: -0.38rem 0 0.5rem;
    }
    .banner img {
      display: block;
      width: 100%;
    }
    .close {
      position: relative;
      left: 5.2rem;
      top: -1.1rem;
      width: 0.72rem;
      height: 0.72rem;
      font-size: 0;
      &:after {
        position: absolute;
        top: 0.72rem;
        left: 50%;
        transform: translateX(-50%);
        display: inline-block;
        content: "";
        height: 0.38rem;
        border-left: 1px solid #fff;
      }
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

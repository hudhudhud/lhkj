<template>
  <div
    class="jindan"
    @click="action"
    :style="{ backgroundImage:((payload.changeImg && payload.index == index)?'url(' + payload.bgImg1+')' :'url(' + payload.bgImg2+')' )}"
  >
    <div
      class="tamp"
      :class="{'active': payload.index == index}"
    > <img
        :src="payload.tamp"
        alt=""
      > </div>
  </div>
</template>
<script>
export default {
  name: 'jindan',
  props: {
    payload: {
      type: Object,
      require: true
    },
    index: {
      type: Number,
      require: true
    }
  },
  data () {
    return {};
  },
  methods: {
    action () {
      this.$emit('action');
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.jindan {
  width: 2.09rem;
  height: 2.77rem;
  background-size: 100% 100%;
}
.tamp {
  position: absolute;
  width: 2.26rem;
  height: 1.93rem;
  top: -0.8rem;
  left: 59%;
  opacity: 0;
  z-index: 100;
  img {
    width: 100%;
  }
}
.active {
  animation: scale 1.5s linear 2;
}
@keyframes scale {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  30% {
    transform: scale(0.8) rotate(8deg);
  }
  60% {
    transform: rotate(-8deg) translateX(-0.5rem) translateY(0.7rem);
    opacity: 1;
  }
  90% {
    // transform: rotate(8deg);
  }
  100% {
    transform: rotate(0);
    opacity: 0.8;
  }
}
</style>

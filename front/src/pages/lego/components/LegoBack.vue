<template>
  <div>
    <a
      @click="goBack"
      href="javascript:"
      id="back-left"
    >
      <img :src="imgUrl" />
    </a>
  </div>
</template>

<script>
import png from '../imgs/arrow.png';
export default {
  props: {
    setting: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgUrl () {
      return this.setting.imgUrl || png;
    }
  },

  methods: {
    goBack () {
      if (this.$route.query.noQuit == 'true') {
        this.$jssdk.call('back');
      } else {
        this.$jssdk.call('back', true);
      }
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";

#back-left {
  position: relative;
  font-size: 0;
  width: 0.7rem;
  height: 0.7rem;
  display: block;
  z-index: 99;
  img {
    width: 100%;
  }
}
</style>

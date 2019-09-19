<template>
  <div>
    <router-view></router-view>
    <!-- <div class="tips">敬请期待</div> -->
    <div v-if="isRe" class="re_btn" id="re_btn" @click="rePgae">
      <img src="./imgs/back.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isRe: false
    };
  },
  methods: {
    rePgae () {
      if (window.history.length <= 1) {
        let url = window.location.href;
        url = url.substring(0, url.indexOf('szzh') + 4);
        window.location.replace(url);
      } else {
        this.$router.go(-1);
      }
    }
  },
  created () {
    if (window.location.pathname != '/partner/szzh/home') {
      this.isRe = true;
    } else {
      this.isRe = false;
    }
  },
  watch: {
    $route (to, from) {
      if (this.$route.path != '/partner/szzh/home') {
        this.isRe = true;
      } else {
        this.isRe = false;
      }
    }
  }
};
</script>
<style lang="scss">
#app {
  height: auto !important;
}
.re_btn {
  position: absolute;
  top: 0.2rem;
  left: 0.3rem;
  width: 0.6rem;
  height: 0.6rem;
  background-color: #666;
  border-radius: 50%;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 0.4rem;
    height: 0.4rem;
  }
}
</style>

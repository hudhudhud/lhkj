<template>
  <div>
    <a
      @click="goBack"
      href="javascript:"
      ref="backLeft"
      id="back-left"
      data-fixed="fixed"
    ><img
        src="../img/left.png"
        alt=""
      ></a>
  </div>
</template>

<script>
export default {
  name: "back",
  methods: {
    goBack() {
      let backUrl = this.$route.query.defineBackUrl;
      if (backUrl && backUrl != undefined) {
        window.location.href = backUrl;
      } else {
        window.history.go(-1);
      }
    },
    handleScroll() {
      var obj = this.$refs.backLeft;
      var ot = obj && obj.offsetTop;
      document.onscroll = function() {
        var st = document.body.scrollTop || document.documentElement.scrollTop;
        obj && obj.setAttribute("data-fixed", st >= ot ? "" : "fixed");
      };
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("scroll", this.handleScroll());
    });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
#back-left {
  position: fixed;
  top: 0.4rem;
  left: 0.2rem;
  font-size: 0;
  display: inline-block;
  z-index: 9999;
  opacity: 0;
  transition: all ease-in 0.2s;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 50%;
  padding: 0.1rem;
  img {
    width: 0.54rem;
    height: 0.54rem;
  }
}

#back-left[data-fixed="fixed"] {
  // position: fixed;
  opacity: 1;
}
</style>

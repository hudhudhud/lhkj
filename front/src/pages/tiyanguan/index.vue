<template>
  <div class="tuyanguan">
    <back></back>
    <div
      class="btnbaoming"
      @click="open('/hjgdCbb/tiyanguan/register')"
    ><img
        src="./imgs/baomingtiyan.png"
        alt=""
      ></div>
  </div>
</template>
<script>
export default {
  data () {
    return {};
  },
  methods: {
    open (path) {
      this.$router.push(`/${this.$store.state.merchantAppid}/merchant` + path);
    }
  }
};
</script>
<style lang="scss" scoped>
.tuyanguan {
  width: 100%;
  min-height: 23.22rem;
  background: #2872dc url("./imgs/mbg.jpg") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.001rem;
  .btnbaoming {
    width: 6.6rem;
    height: 0.88rem;
    margin: 21.8rem auto 0;
    img {
      width: 100%;
    }
  }
}
</style>

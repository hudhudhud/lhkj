<template>
  <!-- <div> -->
  <div>
    <div
      class="header"
      :style="headerStyle"
    >
      <a
        class="btn btn-left"
        href="javascript:"
        @click="goBack"
      >
      <i :style="iconStyle"></i>
        <!-- <i class="icon icon-right"></i> -->
      </a>{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["title", "headerStyle", "iconStyle"],
  data() {
    return {};
  },
  watch: {
    title: function (newval) { // 修改网页标题
      this.setTitle(newval);
    }
  },
  methods: {
    goBack() {
      if (
        window.location.href.indexOf("/buy/standard") > -1 &&
        navigator.userAgent.indexOf("boc") > -1
      ) {
        window.location.replace(
          `${window.location.protocol}//${window.location.host}/${
            this.$store.state.merchantAppid
          }/merchant/index`
        );
      } else {
        window.history.go(-1);
      }
    },
    setTitle(val) {
      document.title = val;
      const iframe = document.createElement('iframe')
      iframe.src = ''
      iframe.style.display = 'none'
      iframe.onload = () => {
        setTimeout(() => {
          iframe.remove()
        }, 9)
      }
      document.body.appendChild(iframe)
    }
  },
  mounted () {
    this.setTitle(this.title);
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: #000000;
  text-align: center;
  font-size: 0.3rem;
  font-weight: 700;
  line-height: 0.8rem;
  height: 0.8rem;
  color: #000000;
  z-index: 99;
  background: #ffffff;
  .btn {
    position: absolute;
    height: 0.4rem;
    line-height: 0.4rem;
    top: 0.2rem;
    color: #000000;
    left: 0.2rem;
    i {
      height: 0.4rem;
      width: 0.4rem;
      display: block;
      background: url(./secondhouse/images/rightarrow.jpg) no-repeat;
      background-size: 100%;
    }
  }
}
</style>

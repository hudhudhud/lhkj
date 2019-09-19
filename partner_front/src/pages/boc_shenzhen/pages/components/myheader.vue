<template>
    <div class="header">
      <a  href="javascript:" class="back-left" @click='back' v-if='showBack'></a>
      <span>{{title}}</span>
    </div>
</template>
<script>
export default {
  props: {
    title: String,
    showBack: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    back () {
      window.history.go(-1)
    }
  }
}
</script>
<style lang='scss' scoped>
  .header {
    font-family: "simhei";
    position: relative;
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #fff;
    background-color: red;
    .back-left{
       position:absolute;
       width:.5rem;
       height:.5rem;
       top:.25rem;
       left:.3rem;
       background:url(../imgs/back.png) no-repeat;
       background-size: 100% 100%;
    }
  }
</style>

<template>
  <div class="rule">
    <back></back>
    <div class="bg">
      <div class="header"><img
          src="./imgs/ruleheader.png"
          alt=""
        ></div>
      <div class="ruledetail">
        <template v-if="act">
          <div
            class="content"
            v-html="act.detail"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import { getActDetail } from '@/lib/api';
export default {
  data () {
    return {
      actId: this.$route.query.actId,
      act: ''
    };
  },
  async created () {
    console.log(1111);
    let act = await getActDetail(this.$route.query.actId);
    this.act = act;
  }
};
</script>
<style lang="scss" scoped>
.rule {
  width: 100%;
  min-height: 100vh;
  background: url(./imgs/repeatbg.jpg) repeat;
  background-size: 100% auto;
  padding: 0.001rem;
  .bg {
    width: 100%;
    min-height: 100vh;
    background: url("./imgs/rulebg.png") no-repeat;
    background-size: 100% auto;
    padding-top: 0.001rem;
    .header {
      width: 2.95rem;
      height: 0.94rem;
      margin: 1.14rem auto 0.34rem;
      img {
        width: 100%;
      }
    }
    .ruledetail {
      width: 100%;
      min-height: calc(100vh - 2.42rem);
      background: url("./imgs/bottom.png") no-repeat;
      background-size: 100% auto;
      background-position: bottom;
      .content {
        padding: 0 1rem;
        line-height: 0.5rem;
        font-size: 0.26rem;
        color: #333;
      }
    }
  }
}
</style>

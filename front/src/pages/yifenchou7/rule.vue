<template>
  <div class="bg">
    <back></back>
    <div class="rule">
      <div class="header"><img
          src="./imgs/ruleheader.png"
          alt=""
        ></div>
      <template v-if="act">
        <div
          class="content"
          v-html="act.detail"
        >

        </div>
      </template>

    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      secondActId: this.$route.query.actId,
      act: ''
    };
  },
  methods: {
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.act = rs.payload;
      }
    }
  },
  created () {
    this.loadAct(this.secondActId);
  }
};
</script>
<style lang="scss" scoped>
.bg {
  padding: 0.3rem 0.4rem 0.3rem;
  background: url("./imgs/rulebg.jpg") no-repeat;
  background-size: 100% auto;
  .rule {
    width: 100%;
    min-height: 100vh;
    background: #fff;
    padding-top: 0.001rem;
    margin: 0 auto;
    .header {
      width: 1.59rem;
      height: 0.38rem;
      margin: 0.3rem auto;
      img {
        width: 100%;
      }
    }
    .content {
      padding: 0.2rem;
      font-size: 0.28rem;
      color: #333;
      line-height: 0.45rem;
      h4 {
        margin: 0;
        margin-bottom: 0.2rem;
      }
    }
  }
}
</style>

<template>
  <div class="tiyan-register">
    <back></back>
    <div class="register">
      <div class="title"><img
          src="./imgs/acttitle.png"
          alt=""
        ></div>
      <register
        :theme='color'
        @handlesure='allLeaderLisr'
        :showdepart='showdepart'
      ></register>
    </div>
  </div>
</template>
<script>
import register from '@/components/register';
import { Toast } from 'mint-ui';
export default {
  components: {
    register
  },
  data () {
    return {
      color: '#ffb900',
      actId: process.env.PUBLISH_ENV == 'prod' ? 562205272 : 557915650, // 校园体验官,
      showdepart: true
    };
  },
  methods: {
    async allLeaderLisr (msg) {
      this.mark = msg.mark;
      if (!this.mark) {
        Toast('您还未输入学号！');
        return;
      }
      let rs = await this.$get(
        'api/activity/sign_up?mark=' + this.mark + '&actId=' + [this.actId]
      );
      if (rs.status == 200) {
        Toast('报名成功！');
      } else {
        Toast(rs.error);
      }
      setTimeout(() => {
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/hjgdCbb/tiyanguan/tiyan`
        );
      }, 1000);
    }
  }
};
</script>
<style lang="scss" scoped>
.tiyan-register {
  width: 100%;
  height: 100vh;
  background: #2872dc url("./imgs/baomingbg.png") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.001rem;
  .register {
    width: 100%;
    height: 4rem;
    margin: 6.5rem auto 0;
    .title {
      width: 1.43rem;
      height: 0.37rem;
      margin: 0.3rem auto;
      img {
        width: 100%;
      }
    }
  }
}
</style>

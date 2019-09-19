<template>
  <div class="page">
    <!-- <a href="https://apply.mcard.boc.cn/apply/26VrIz" class="item">
      <div class="left">
        <img src="./imgs/hd-icon3.png" alt="">
        <span>中银赞卡</span>
      </div>
      >
      <img src="./imgs/" />
    </a> -->
    <a class="item" href="https://apply.mcard.boc.cn/apply/26VrIz">
      <img src="./imgs/getCard-img1.png" alt="">
    </a>
    <a class="item" href="https://apply.mcard.boc.cn/apply/iUNj2y">
      <img src="./imgs/getCard-img2.png" alt="">
    </a>
    <a class="item" href="https://apply.mcard.boc.cn/apply/3qeyMz">
      <img src="./imgs/getCard-img3.png" alt="">
    </a>
    <a class="item" href="https://apply.mcard.boc.cn/apply/vUfEv2">
      <img src="./imgs/getCard-img4.png" alt="">
    </a>
    <a class="item" href="https://apply.mcard.boc.cn/apply/Jriuqe">
      <img src="./imgs/moer-card.png" alt="">
    </a>
  </div>
</template>
<style lang="scss" scoped>
.page {
  background: url(./imgs/partner-bg.jpg) no-repeat center top;
  min-height: 100vh;
  background-attachment: fixed;
  padding-top: 1rem;
  .item {
    display: block;
    width: 6.7rem;
    margin: 0 auto;
    margin-bottom: 0.35rem;
    img {
      width: 100%;
    }
  }
  .moer {
    text-align: center;
    font-size: 0.3rem;
    a {
      color: #666;
    }
  }
  // .item {
  //   margin: 0 auto;
  //   width: 6.7rem;
  //   height: 1.4rem;
  //   background-color: rgba(255, 255, 255, 0.9);
  //   box-shadow: 0px 0.04rem 0px 0px rgba(44, 140, 255, 0.4);
  //   border-radius: 0.15rem;
  //   display: flex;
  //   align-items: center;
  //   justify-content: space-between;
  //   box-sizing: border-box;
  //   padding: 0 0.25rem;
  //   .left {
  //     display: flex;
  //     align-items: center;
  //     img {
  //       width: 1.04rem;
  //       height: 1.04rem;
  //     }
  //     span {
  //       margin-left: 0.14rem;
  //       font-size: 0.34rem;
  //       color: #333;
  //     }
  //   }
}
</style>
<script>
import jssdk from '@/lib/jssdk';
export default {
  created () {
    let link =
      `${window.location.protocol}//${
        window.location.host
      }/partner/szzh/home?share=` + this.$store.state.cust.id;
    this.shareConfig = {
      title: '深圳中行信用卡合伙人', // 分享标题
      desc: '玩转合伙人，大奖随心领', // 分享描述
      link: link, // 分享，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `https://static.lianhaikeji.com/images/20190711/ab2e3535c8cb4d978e44446681e94d78.png` // 分享图标
    };
    jssdk.jssdk.init('', this.merchantId, '1', val => {
      this.$jssdk.call('share', this.shareConfig);
    });
  }
};
</script>

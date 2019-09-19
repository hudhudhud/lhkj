<template>
  <div class="rule">
    <div class="page-img-container">
      <img class="page-img" src="./imgs/web-main-bg.jpg" alt>
    </div>
    <div class="page-main">
      <div class="page-intro">
        <div class="page-intro-txt">
          <p>1.注册成为建行手机银行推手，发挥你的营销才华，推荐你身边的同学成为建行手机银行活跃用户，让你的朋友天天享受建行的优惠活动，你还可以获得丰厚的积分奖励，积分奖励可兑换话费、视频会员、星巴克券、善融商城券等奖品。
            <br>2.2018年9月开始至12月31日，被推荐者包括未开通手机银行用户及已开通但未活跃用户。
            <br>3.2019年1月1日至2019年3月31日，被推荐者仅限未开通手机银行用户。
            <br>4.推荐成功一户的奖励分是5000分。
          </p>
        </div>
      </div>
      <div class="group-btn-section">
        <!-- <button class="yellow-btn" @click="showLogin = true">成为推手</button> -->
        <!-- <button class="yellow-btn" @click="becomePushHand">推手主页</button> -->
        <!-- <button class="yellow-btn" @click="showLogin = true">推手主页</button> -->
        <!-- <button class="yellow-btn" @click="$router.push(`/${$store.state.merchantAppid}/merchant/share/Rule`)">营销小手册</button> -->
        <button class="yellow-btn" @click="$href('/indexGuide', $route.params.customId)">营销小手册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {};
  }
};
</script>

<style scoped>
.rule {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  /* bottom: 0; */
}
.page-img-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.page-img {
  display: block;
  width: 100%;
  height: 100%;
}
.page-main {
  padding-top: 9rem;
}
.page-intro {
  margin: 0 auto;
  width: 6.52rem;
  background: url(./imgs/ac-intro-bg.png) no-repeat center;
  background-size: 100% 100%;
}

.page-intro-txt {
  padding: 0.3rem 0.24rem 0.24rem;
  line-height: 0.45rem;
  font-size: 0.24rem;
  text-align: justify;
  color: #bb4b20;
}
.group-btn-section {
  margin: 0.2rem auto 0;
  display: flex;
  justify-content: space-between;
  width: 90%;
}

.yellow-btn {
  display: block;
  margin: 0.2rem auto 0.4rem;
  border: none;
  width: 45%;
  line-height: 0.96rem;
  font-size: 0.36rem;
  color: #bb4b20;
  font-weight: bold;
  text-align: center;
  background: url(./imgs/yellow-btn-bg.png) no-repeat center;
  background-size: 100% 100%;
}
</style>

<template>
  <div class="over">
    <div class="ren"></div>
    <div class="content">
      你的祝福绣球已经传递成功啦<br>
      系统将以短信形式提醒对方查收<br>
      你也可以告诉ta登录建行手机银行<br>
      第一时间领取你的祝福哦

    </div>

    <div
      class="btnsongfu"
      @click="$router.push(`/${$store.state.merchantAppid}/merchant/xiuqiu/index`)"
    >
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.over {
  width: 100%;
  min-height: 100vh;
  background: url("./imgs/overbg.jpg") no-repeat;
  background-size: 100% 100%;
  padding-top: 0.01rem;
  position: relative;
  .ren {
    position: absolute;
    width: 4.16rem;
    height: 3.97rem;
    margin: 3rem auto 0;
    left: 0;
    right: 0;
    background: url("./imgs/ren3.png") no-repeat 0.5rem;
    background-size: 100% 100%;
  }
  .content {
    width: 5.7rem;
    height: 3.81rem;
    margin: 6.2rem auto 0.8rem;
    background: url("./imgs/rule-bg.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    padding: 0.9rem 0.2rem 0.2rem 0.2rem;
    line-height: 0.5rem;
  }
  .btnsongfu {
    width: 4rem;
    height: 0.8rem;
    background: url("./imgs/btnsongfuqiu.png") no-repeat;
    background-size: 100% 100%;
    margin: 0rem auto;
  }
}
</style>

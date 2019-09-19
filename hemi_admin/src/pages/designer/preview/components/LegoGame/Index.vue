<template>
  <div class="page-wrapper" v-cloak>
    <div class="page-bg">
      <img class="page-bg-img" src="./imgs/page-bg.jpg">
    </div>
    <div class="game-rules">
      <button class="game-rule-txt" @click="showRule = true">游戏规则</button>
    </div>

    <div class="box" @click="getRandom" v-if="showLhj">
      <transition-group name="list" tag="ul">
        <li v-for="item in randomList" v-bind:key="item.id" class="list-item">
          {{ item.num }}
        </li>
      </transition-group>
    </div>

    <!--底部信息栏-->
    <div class="bottom-bar third-chance" v-if="showBottomBar">
      <p class="prize-infos" v-if="state==3">恭喜！您已冲关结束</p>
      <div class="button-section" v-else>
        <button class="blue-btn have-third-chance" :class="{'bounce':chances>0}" type="button" @click="play">点击冲关</button>
        <p class="left-chance">您有
          <span class="left-chance-dig">{{chances}}</span>次冲关夺宝的机会</p>
      </div>
    </div>

    <!--移动动物-->
    <img :style="{top:position[animatedState].top,left:position[animatedState].left,transitionDuration: animatedState+'s'}" class="animal shake-animal" src="./imgs/animal.png" alt="" ref="animalImg">

    <!--购买游戏机会-->
    <div class="prize-popup buy-game" v-if="showPayDialog">
      <div class="page-mask"></div>
      <div class="prize-content ">
        <div class="prize-inner ">
          <p class="prize-title ">恭喜获得xx元话费优惠价</p>
          <p class="game-again-info">￥0.01元</p>
          <div class="input-row input-btn-row ">
            <button class="blue-btn" type="button" @click="buy">点击购买</button>
          </div>
        </div>
        <div class="close-btn-row ">
          <a class="close-btn " href="javascript: void(0) " @click="cancelPay">关闭</a>
        </div>
      </div>
    </div>

    <!--弹出点击领奖信息-->
    <div class="prize-popup" v-if="showChargeDialog">
      <div class="page-mask"></div>
      <div class="prize-content">
        <div class="prize-inner">
          <div>
            <p class="prize-title" v-if="state==1">恭喜您获得5元话费</p>
            <p class="prize-title" v-else-if="state==2">恭喜您获得5元话费</p>
            <p class="prize-title " v-else-if="state==3">恭喜您获得20元话费</p>
          </div>
          <div class="input-row phone-input-row">
            <input class="phone-ipt" type="tel" maxlength="11" placeholder="请输入您的手机号" v-model="account">
          </div>
          <div class="input-row input-btn-row">
            <button class="blue-btn" type="button" @click="charge">确认领取</button>
          </div>
        </div>
        <div class="close-btn-row">
          <a class="close-btn" href="javascript: void(0)" @click="showChargeDialog = false">关闭</a>
        </div>
      </div>
    </div>
    <!--游戏规则 v-if="showRule"-->
    <div class="rule-wrapper" v-if="showRule">
      <div class="page-mask" @click="showRule = false"></div>
      <div class="score-inner" @click.stop>
        <div class="rule-close-btn-row">
          <a class="rule-close-btn" href="javascript: void(0)" @click="showRule=false">关闭</a>
        </div>
        <div class="rule-txt">
          <div class="rule-txt-inner">
            <p class="rule-title">游戏规则</p>
            <p>这是个好玩的游戏，好玩，玩,这是个好玩的游戏</p>
            <p>这是个好玩的游戏，好玩，玩</p>
            <p>这是个好玩的游戏，好玩，玩</p>
            <p>这是个好玩的游戏，好玩，玩</p>
            <p>这是个好玩的游戏，好玩，玩</p>
            <p>这是个好玩的游戏，好玩，玩,这是个好玩的游戏</p>
            <p>这是个好玩的游戏，好玩，玩</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      random: 1,
      randomList: [{
        num: 0,
        id: 0
      }],
      randomAnimateStart: 0,
      randomAnimating: false, // 能否继续转老虎机
      animatedState: 0, // 企鹅位置状态
      state: 0, // 当前闯关状态0-3
      chances: 0, // 当前拥有机会
      account: "", // 充值账号
      showPayDialog: false, // 是否显示支付确认对话框
      showChargeDialog: false, // 是否显示充值对话框
      showBottomBar: true, // 是否显示底部的点击冲关
      showLhj: false, // 是否显示老虎机
      showRule: false, // 是否显示游戏规则弹窗
      position: [{
        top: "128vw",
        left: "52vw"
      }, {
        top: "100vw",
        left: "71vw"
      }, {
        top: "74vw",
        left: "27.5vw"
      }, {
        top: "58vw",
        left: "75vw"
      }]
    }
  },
  watch: {
    state (val) {
      if (val == this.animatedState) {
        return
      }
      var vm = this
      var animate = function () {
        if (vm._ind) {
          clearTimeout(vm._ind)
        }
        if (vm.state > vm.animatedState) {
          vm.animatedState++
          vm._ind = setTimeout(animate, 1500)
        } else {
          setTimeout(function () {
            vm.showLhj = false
            vm.showBottomBar = true
            vm.showPayDialog = true
          }, 500)
        }
      }
      animate()
    }
  },
  methods: {
    getRandom: function (num) {
      if (this.randomAnimating) {
        return
      };
      this.random = num
      this.randomAnimating = true
      this.randomAnimateStart = Date.now()
      this.next()
    },
    next: function () {
      let num = this.randomList[0].num
      num = num + 1
      if (num > 3) {
        num = 1
      }
      this.randomList.splice(0, 1)
      this.randomList.push({
        id: Math.random(),
        num: num
      })
      let d = Date.now() - this.randomAnimateStart
      if (num != this.random || d < (1000 * 2)) {
        setTimeout(this.next, (Math.abs(2500 - d) / 2500) * 300 + 100)
      } else {
        // 闯关状态改为  当前闯关状态+传入的数字
        this.state = this.state + this.random
        this.randomAnimating = false
      }
    },
    loadState: function () {
      // 页面初始化加载当前状态和机会
      // 演示代码

      // 当前企鹅所在状态0-3 同时修改state和animatedState则直接到位,只修改state则企鹅会一关关跳过去
      this.animatedState = this.state = 0
      // 当前有的机会
      this.chances = 3

      // 支付弹框
      this.showPayDialog = false
      // 充值弹框
      this.showChargeDialog = false
    },
    play: function () {
      // 开始游戏
      // 演示代码,减少机会,过一关
      this.chances--
      this.showBottomBar = false
      this.showLhj = true
      // 指定这一次跳几格
      this.getRandom(1)
    },
    buy: function () {
      // 确认购买,去支付界面

      // 演示代码,直接添加机会
      alert("购买成功")
      this.showPayDialog = false
      this.showChargeDialog = true
      this.chances++
      this.showPayDialog = false
    },
    charge: function () {
      // 充值操作
      if (!this.account) {
        alert("请输入手机号码")
        return
      }
      alert("充值成功: " + this.account)
      this.showChargeDialog = false
    },
    cancelPay: function () {
      this.showPayDialog = false
    }
  },
  created: function () {
    this.loadState()
  }
}
</script>

<style scoped>
.page-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 440px;
  margin: 0 auto;
}

.page-bg {
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  width: 100%;
}

.page-bg-img {
  display: block;
  width: 100%;
  height: auto;
}

.game-rules {
  position: absolute;
  left: 0;
  top: 25%;
  width: 100%;
}

.game-rule-txt {
  border: none;
  padding: 0 12px;
  font-size: 13px;
  color: #fff;
  text-align: left;
  line-height: 32px;
  background: #1266b5;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}

.bottom-bar {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
}

.left-chance {
  font-size: 14px;
  color: #333;
}

.left-chance-dig {
  font-size: 18px;
  font-weight: bold;
  color: #0564b8;
}

.block {
  display: block;
}

.prize-infos {
  padding-top: 15px;
  padding-bottom: 15px;
  line-height: 26px;
  font-size: 18px;
  color: #606060;
  letter-spacing: 2px;
  text-align: center;
}

.button-section {
  margin-top: 2px;
  padding-top: 10px;
  padding-bottom: 12px;
  text-align: center;
}

.blue-btn {
  display: inline-block;
  width: 150px;
  line-height: 30px;
  font-size: 16px;
  text-align: center;
  color: #d1f0fa;
  background: #0564b8;
  border-radius: 25px;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  -ms-border-radius: 25px;
  -o-border-radius: 25px;
  border: 3px solid #97d1fc;
}

.small-blue-btn {
  width: 38%;
  line-height: 36px;
  font-size: 13px;
}

.animal {
  position: absolute;
  top: 128vw;
  left: 52vw;
  width: 10vw;
  height: auto;
  transition-property: all;
  transition-duration: 1s;
}

.animal-position-one {
  position: absolute;
  top: 100vw;
  left: 71vw;
  width: 10vw;
  height: auto;
}

.animal-position-two {
  position: absolute;
  top: 74vw;
  left: 27.5vw;
  width: 10vw;
  height: auto;
}

.animal-position-three {
  position: absolute;
  top: 58vw;
  left: 75vw;
  width: 10vw;
  height: auto;
}

.step-star-first {
  position: absolute;
  width: 100%;
  left: 0;
  top: 48.5%;
}

.star-img-one {
  position: absolute;
  top: 0;
  right: 20%;
  width: 8%;
  height: auto;
}

.lock-star-img-one {
  position: absolute;
  top: 0;
  right: 18%;
  width: 14%;
  height: auto;
}

.step-star-second {
  position: absolute;
  width: 100%;
  left: 0;
  top: 31%;
}

.lock-star-img-two {
  position: absolute;
  top: 0;
  left: 24%;
  width: 20%;
  height: auto;
}

.star-img-two {
  position: absolute;
  top: 0;
  left: 24%;
  width: 18%;
  height: auto;
}

.step-star-third {
  position: absolute;
  width: 100%;
  left: 0;
  top: 23.5%;
}

.lock-star-img-three {
  position: absolute;
  top: 0;
  right: 10%;
  width: 30%;
  height: auto;
}

.star-img-three {
  position: absolute;
  top: 0;
  right: 10%;
  width: 28%;
  height: auto;
}

.page-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1;
}

.prize-popup {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.prize-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  margin: 0 auto;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  z-index: 9;
  background: url(./imgs/popup-bg.png) no-repeat;
  background-size: 100% 100%;
}

.prize-inner {
  padding-bottom: 20px;
  border-radius: 10px;
  -webkit-border-radius: 10px;
  -moz-border-radius: 10px;
  -ms-border-radius: 10px;
  -o-border-radius: 10px;
}

.prize-title {
  padding-top: 25px;
  line-height: 42px;
  font-size: 20px;
  color: #606060;
  text-align: center;
}

.big-prize-title {
  color: #fc632d;
}

.orange-title {
  color: #fc632d;
}

.prize-next {
  margin-bottom: 10px;
  line-height: 40px;
  font-size: 16px;
  color: #999999;
  text-align: center;
}

.prize-finished {
  color: #fc632d;
}

.game-again-info {
  margin-bottom: 10px;
  line-height: 40px;
  font-size: 26px;
  color: #ff621d;
  text-align: center;
}

.phone-input-row {
  margin: 10px 0;
}

.phone-ipt {
  display: block;
  margin: 0 auto;
  padding: 6px 10px;
  width: 78%;
  font-size: 15px;
  line-height: 22px;
  border: 1px solid #606060;
  border-radius: 15px;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  -ms-border-radius: 15px;
  -o-border-radius: 15px;
}

.input-btn-row {
  text-align: center;
  padding-bottom: 10px;
}

.close-btn-row {
  position: absolute;
  width: 100%;
  top: -5px;
  left: 0;
}

.close-btn {
  display: block;
  width: 34px;
  height: 34px;
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 0;
  background: url(./imgs/close-popup-btn.png) no-repeat center;
  background-size: 100% 100%;
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translateZ(0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.bounce {
  animation-duration: 1s;
  animation-fill-mode: both;
  animation-name: bounce;
  transform-origin: center bottom;
}

@keyframes shake {
  0%,
  to {
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translate3d(-10px, 0, 0);
    -webkit-transform: translate3d(-10px, 0, 0);
    -moz-transform: translate3d(-10px, 0, 0);
    -ms-transform: translate3d(-10px, 0, 0);
    -o-transform: translate3d(-10px, 0, 0);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translate3d(10px, 0, 0);
    -webkit-transform: translate3d(10px, 0, 0);
    -moz-transform: translate3d(10px, 0, 0);
    -ms-transform: translate3d(10px, 0, 0);
    -o-transform: translate3d(10px, 0, 0);
  }
}

.shake {
  animation-duration: 0.8s;
  animation-fill-mode: both;
  animation-name: shake;
}

.shake-animal {
  animation-duration: 2s;
  animation-fill-mode: both;
  animation-name: bounce;
  animation-iteration-count: infinite;
}

.rule-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
}

.rule-wrapper .score-inner {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 400px;
  z-index: 10;
  background: url(./imgs/rule-bg.png) no-repeat center center;
  background-size: 100% 100%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  -ms-border-radius: 5px;
  -o-border-radius: 5px;
}

.rule-txt {
  position: relative;
  margin-top: 20px;
  font-size: 12px;
  color: #666666;
  line-height: 18px;
  z-index: 10;
  height: 400px;
  overflow: hidden;
  text-align: justify;
}

.rule-txt-inner {
  width: 100%;
  padding: 0 32px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 44px;
  overflow: auto;
}

.rule-title {
  padding-top: 6px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 15px;
}

.rule-close-btn-row {
  position: absolute;
  right: 0%;
  top: -1%;
  z-index: 9;
}

.rule-close-btn {
  display: block;
  width: 34px;
  height: 34px;
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 0;
  background: url(./imgs/close-popup-btn.png) no-repeat center;
  background-size: 100% 100%;
}

.box {
  position: absolute;
  bottom: 10px;
  left: 50%;
  height: 80px;
  width: 250px;
  background: url(./imgs/lhj-bg.png) no-repeat left center;
  background-size: 100% 100%;
  transform: translateX(-50%);
  overflow: hidden;
}

.box li {
  position: absolute;
  top: 0;
  left: 50%;
  margin-left: -30px;
  display: block;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 20px;
  width: 60px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.list-enter {
  opacity: 0;
  transform: translateY(100%);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>

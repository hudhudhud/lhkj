<template>
  <div
    id="indexRoot"
    class="goddess clearfix"
  >
    <div class="goddess-person left"></div>
    <div class="goddess-person right"></div>
    <div class="goddess-action">
      <div
        class="goddess-action-btn"
        @click="showRule"
      ></div>
      <div
        class="goddess-action-btn"
        @click="showReward"
      ></div>
    </div>
    <div class="goddess-produce">
      <div
        class="goddess-txt"
        :class="animateClass"
      ></div>
    </div>
    <!--   <div
      class="goddess-topay"
      @click="toRegist"
    ></div> -->
    <div
      class="goddess-topay"
      @click="toGames"
    ></div>
    <template v-if="!$route.query.ownerId && !$store.state.token">
      <div
        class="goddess-invite"
        @click="toAuth"
      >
        <p>登录查看</p>
      </div>
    </template>
    <template v-else>
      <div class="goddess-invite">
        <p>{{invited}}</p>
      </div>
    </template>
    <ruleDialog
      :type="type"
      title="活动规则"
      ref="dialog"
    ></ruleDialog>
  </div>
</template>

<script>
import ruleDialog from './component/dialog';
import { gotoAuth } from '@/router/index';
import { Indicator } from 'mint-ui';
import jssdk from '@/lib/jssdk';
export default {
  name: 'home',
  components: {
    ruleDialog
  },
  data () {
    return {
      type: false,
      invited: 0,
      animateClass: [],
      env: process.env.PUBLISH_ENV,
      actId: process.env.PUBLISH_ENV == 'prod' ? '551876916' : '551753187'
    };
  },
  created () {},
  mounted () {
    let link = window.location.href;
    this.shareConfig = {
      title: '38缤纷女神节，建行邀您站C位', // 分享标题
      desc: '建行广州分行，让你众星捧月做女神，颜值担当 舍你其谁 快来测一测吧', // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `${
        window.location.protocol
      }//static.lianhaikeji.com/images/20190308/c5ba62dd8409456bbfde6fdc9da85228.jpg` // 分享图标
    };
    jssdk.jssdk.init('', this.merchantId, '1', val => {
      this.$jssdk.call('share', this.shareConfig);
      // Indicator.close()
    });
    this.loadDynamicScript();
    let ownerId = this.$route.query.ownerId;
    if (ownerId) {
      this.getInvitedPerson();
      this.bindUsers(ownerId);
    }
    this.animateClass.push('fadeIn');
    // setTimeout(() => {
    //   this.animateClass.pop();
    //   this.animateClass.push('fadeOut');
    //   this.wait(3000);
    //   console.log('3s后开始左边人物动画')
    //   this.wait(2000);
    //   console.log('2s后开始右边人物动画')
    // }, 5000)
  },
  methods: {
    showRule () {
      // if (this.env == 'prod') {
      //   return this.$toast('活动暂未开放，敬请期待！')
      // }
      this.$refs.dialog.setContentMaxHeight('7rem');
      this.$refs.dialog.open();
    },
    toAuth () {
      // if (this.env == 'prod') {
      //   return this.$toast('活动暂未开放，敬请期待！')
      // }
      gotoAuth();
    },
    showReward () {
      // if (this.env == 'prod') {
      //   return this.$toast('活动暂未开放，敬请期待！')
      // }
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/goddess/reward`
      );
    },
    toGames () {
      // if (this.env == 'prod') {
      //   return this.$toast('活动暂未开放，敬请期待！')
      // }
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/goddess/games`
      );
    },
    close () {
      this.$refs.dialog.close();
    },
    // 获取邀请人数
    async getInvitedPerson () {
      Indicator.open();
      let rs = await this.$post('api/activity/search/user/bind/number', {
        actId: this.actId // 扫脸抽奖
      });
      if (rs.status === 200) {
        this.invited = rs.payload;
      } else {
        this.$toast(rs.error);
      }
      Indicator.close();
    },
    // 绑定用户 ,ownerId 分享人的Id
    async bindUsers (ownerId) {
      // 当前用户id
      let custId = this.$store.state.cust.id;
      // 自己不用绑定
      if (custId === ownerId) {
        return;
      }
      Indicator.open();
      let rs = await this.$post('api/activity/bind/user/relation', {
        actId: this.actId, // 扫脸抽奖
        mainCustomId: ownerId
      });
      if (rs.status === 200) {
        console.log('绑定用户成功');
      } else {
        this.$toast(rs.error);
      }
      Indicator.close();
    },
    loadDynamicScript () {
      let rootEl = document.getElementById('indexRoot');
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = '//ccb.kerlala.com/resources/scripts/gather.source.js';
      rootEl.appendChild(script);
      script.onload = () => {
        window.gather.init('', 'https://ccb.kerlala.com');
      };
    },
    toRegist () {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/goddess/regist`
      );
    },
    // 等待时间
    wait (time) {
      let start = new Date().getTime();
      while (new Date().getTime() < start + time) {}
    }
  }
};
</script>

<style scoped lang="scss">
.goddess {
  background-image: url("./img/index/index_back.png");
  background-size: cover;
  width: 100%;
  height: 24.84rem;
  &-person {
    background-size: 100% 100%;
    position: absolute;
    top: 1.6rem;
    &.left {
      width: 1.23rem;
      height: 4.05rem;
      left: 0.97rem;
      background-image: url("./img/index/left.png");
      animation: fadeInLeft 1s ease-in-out;
    }
    &.right {
      width: 1.49rem;
      height: 4.02rem;
      right: 0.08rem;
      background-image: url("./img/index/right.png");
      animation: fadeInRight 1s ease-in-out;
    }
  }
  &-action {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 5.8rem;
    width: 100%;

    &-btn {
      width: 2.26rem;
      height: 0.6rem;
      background-size: cover;

      &:nth-child(1) {
        background-image: url("./img/btn_rule.png");
        margin-right: 0.64rem;
      }

      &:nth-child(2) {
        background-image: url("./img/btn_reward.png");
      }
    }
  }

  &-produce {
    position: absolute;
    top: 7rem;
    left: 1.43rem;
    width: 4.94rem;
    height: 3.92rem;
    overflow: hidden;
  }

  &-txt {
    width: 4.94rem;
    height: 3.92rem;
    background-image: url("./img/index/txt.png");
    background-size: 100% 100%;

    &.fadeIn {
      animation: txtSlideIn 5s ease-in-out;
    }

    &.fadeOut {
      animation: fadeOut 3s ease-in-out;
    }
  }

  &-topay {
    width: 3.84rem;
    height: 0.95rem;
    background: url("./img/topay.png");
    background-size: cover;
    position: absolute;
    top: 11.35rem;
    left: 50%;
    margin-left: -25%;
    animation: btnShake 1s alternate infinite linear;
    transform-origin: 20% 40%;
  }

  &-invite {
    position: absolute;
    top: 13.95rem;
    width: 3.59rem;
    height: 0.57rem;
    left: 50%;
    transform: translateX(-50%);
    p {
      font-size: 0.3rem;
      color: #fff;
      padding-left: 2.2rem;
      height: 0.57rem;
      line-height: 0.57rem;
    }
  }
}

@keyframes btnShake {
  0% {
    transform: rotate(0) translateY(-0.1rem);
  }

  25% {
    transform: rotate(5deg) translateY(-0.2rem);
  }

  50% {
    transform: rotate(10deg) translateY(0rem);
  }

  70% {
    transform: rotate(-5deg) translateY(0.1rem);
  }

  100% {
    transform: rotate(-10deg) translateY(0.2rem);
  }
}

@keyframes txtSlideIn {
  from {
    transform: translateY(5.12rem);
  }
  to {
    transform: translateY(0rem);
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

@keyframes fadeInLeft {
  from {
    transform: translateX(-2rem);
  }
  to {
    transform: translateY(0rem);
  }
}

@keyframes fadeInRight {
  from {
    transform: translateX(3.75rem);
  }
  to {
    transform: translateY(0rem);
  }
}
</style>

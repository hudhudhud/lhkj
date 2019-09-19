<template>
  <div class="container">
    <back></back>
    <div class="card-box">
      <div class="card-body">
        <scratch-card element-id='scratchWrap' :ratio="0.4" :move-radius="30" :clear-callback="clearDone">
          <div slot='result' class="prize-result">
            {{ result.value ? prizes[result.value] : "很遗憾，未能中奖！"}}
          </div>
        </scratch-card>
      </div>
      <div v-show="isBtnShow" class="start-scratch" @click="startScratch"></div>
    </div>
    <div class="prize-desc"></div>
    <div class="view-act-rule" @click="ruleView"></div>
    <div id="rule-box" v-show="isRuleShow" class="rule-holder">
      <div class="act-time">
        即日起至2019年12月31日
      </div>
      <div class="act-user">
        广西建行贺州分行受邀客户
      </div>
      <div class="rule-desc" v-html="ruleDesc">
      </div>
    </div>
    <transition name="fade">
      <div class="dialog" v-show="isOpen">
        <div class="main">
          <img class="prize-img" :src="result.img" alt="奖品">
          <div class="dialog-info">
            您已获得{{result.name}}，<br />可在“我的八桂金”查看。
          </div>
          <div class="close-btn" @click="closeDialog"></div>
          <div class="view-btn" @click="tonext"></div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import ScratchCard from './scratch-card';
import { getActDetailNew, loadChance, lotteryDraw } from '@/lib/api';
import { Toast } from 'mint-ui';
export default {
  components: { ScratchCard },
  data () {
    return {
      actId: null,
      isRuleShow: false,
      isBtnShow: true,
      isOpen: false,
      ruleDesc: '',
      result: { name: '', img: '', value: null },
      prizes: {
        213: '一等奖',
        107: '二等奖',
        53: '三等奖'
      },
      chance: 0
    };
  },
  methods: {
    ruleView () {
      this.isRuleShow = !this.isRuleShow;
      if (this.isRuleShow) {
        setTimeout(() => {
          document.getElementById('rule-box').scrollIntoView();
        }, 200);
      }
    },
    startScratch () {
      if (this.isBtnShow && this.chance > 0) {
        lotteryDraw(this.actId, prizeRes => {
          this.result.name = prizeRes.payload.prizeName;
          this.result.img = prizeRes.payload.standardImgUrl;
          this.result.value = prizeRes.payload.creditValue;
          this.chance--;
          this.isBtnShow = false;
        });
      } else {
        Toast('您没有抽奖资格！');
      }
    },
    clearDone () {
      this.isOpen = true;
    },
    closeDialog () {
      this.isOpen = false;
    },
    tonext () {
      this.$router.push('baguijin_change');
    }
  },
  created () {
    this.actId = process.env.PUBLISH_ENV == 'prod' ? 562750947 : 562651715;
    getActDetailNew(this.actId, rs => {
      if (rs.status == 200) {
        this.ruleDesc = rs.payload.detail;
        loadChance(this.actId, rs => {
          if (rs.status == 200) {
            this.chance = rs.payload.chances;
          } else {
            Toast('网络异常');
          }
        });
      } else {
        Toast('网络异常');
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 13.34rem;
  background: url("//static.lianhaikeji.com/images/20190709/5d992aa4f03f425bafe4a639fedcbdd8.jpg")
    no-repeat;
  background-size: 100% 22rem;
  .card-box {
    position: relative;
    display: inline-block;
    width: 6.38rem;
    height: 4.2rem;
    background: url("//static.lianhaikeji.com/images/20190708/5b57fa8be3a142a18a8e229a48dbe8d7.png")
      no-repeat;
    background-position: center;
    background-size: cover;
    margin-top: 4.4rem;
    margin-left: 7.5%;
    .card-body {
      position: absolute;
      background: #c9c9c9;
      width: 4.6rem;
      height: 3.66rem;
      top: 0.26rem;
      left: 1.3rem;
      .prize-result {
        color: #f00;
        font-size: 0.5rem;
        text-align: center;
        margin-top: 1.5rem;
        font-weight: bold;
      }
    }
    .start-scratch {
      position: absolute;
      z-index: 10;
      width: 4.6rem;
      height: 3.66rem;
      background: url("//static.lianhaikeji.com/images/20190708/2c75d2bb102141c4922724097e8d87fd.png")
        no-repeat;
      background-position: center;
      top: 0.26rem;
      left: 1.28rem;
      background-size: 80%;
    }
  }
  .prize-desc {
    display: inline-block;
    width: 5.72rem;
    height: 3rem;
    background: url("//static.lianhaikeji.com/images/20190710/8b6e74c26de64aa492dd3c4d4884aa95.png")
      no-repeat;
    background-size: cover;
    background-position: center;
    margin: 0.3rem 0.89rem 0.36rem;
  }
  .view-act-rule {
    width: 2.8rem;
    height: 0.7rem;
    display: inline-block;
    background: url("//static.lianhaikeji.com/images/20190708/44c233f1f7ce4aacbc87b6e3dd22f3fc.png")
      no-repeat;
    background-size: cover;
    background-position: center;
    margin: 0 2.35rem;
  }
  .rule-holder {
    height: 8.58rem;
    color: #333;
    font-size: 0.3rem;
    position: relative;
    > div {
      position: absolute;
      display: inline-block;
      width: 81.3%;
      line-height: 0.5rem;
    }
    .act-time {
      top: 1.28rem;
      left: 0.75rem;
    }
    .act-user {
      top: 3.05rem;
      left: 0.75rem;
    }
    .rule-desc {
      top: 4.8rem;
      left: 0.7rem;
    }
  }
}
.dialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 99;
  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 83.46%;
    height: 6.33rem;
    transform: translate(-50%, -50%);
    background: url(//static.lianhaikeji.com/images/20190709/e48f14fd7e6a44029eb8ea7a86b64620.png)
      no-repeat;
    background-size: 100%;
    .prize-img {
      display: inline-block;
      width: 1.75rem;
      height: 1.75rem;
      margin-top: 1.3rem;
      margin-left: 35.5%;
    }
    .dialog-info {
      display: inline-block;
      color: #fc575a;
      font-size: 0.28rem;
      width: 52.7%;
      line-height: 0.4rem;
      margin-top: 0.2rem;
      margin-left: 27%;
    }
    .close-btn {
      width: 0.6rem;
      height: 0.6rem;
      background: url(//static.lianhaikeji.com/images/20190709/c04d6229bc25483c99c399c1beffd662.png)
        no-repeat;
      background-size: 100%;
      position: absolute;
      top: -0.7rem;
      right: -0.1rem;
    }
    .view-btn {
      width: 54.3%;
      height: 0.86rem;
      background: url(//static.lianhaikeji.com/images/20190709/f000de6bd2a44032b8386cd1e39a0584.png)
        no-repeat;
      background-size: 100%;
      position: absolute;
      bottom: 0.26rem;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>

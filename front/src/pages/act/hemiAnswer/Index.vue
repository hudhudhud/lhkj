<template>
  <div>
    <div class="answer-cont">
      <cbbHeader title="趣味游戏"></cbbHeader>
      <div class="bg">
        <img
          src="./imgs/IMG_BG_GAME.jpg"
          alt
        >
      </div>
      <div class="main">
        <!-- <div class="timer">
          <span>18</span>
        </div>-->
        <div
          id="timeCountX"
          class="time-count-x"
        >
          <svg
            viewBox="0 0 440 440"
            class="center"
          >
            <defs>
              <linearGradient
                x1="1"
                y1="0"
                x2="0"
                y2="0"
                id="gradient1"
              >
                <stop
                  offset="100%"
                  stop-color="rgb(255,168,29)"
                ></stop>
              </linearGradient>
            </defs>
            <g transform="matrix(0,-1,1,0,0,440)">
              <circle
                cx="220"
                cy="220"
                r="170"
                stroke-width="30"
                stroke="#fff"
                fill="none"
                stroke-dasharray="1069 1069"
              ></circle>
              <circle
                cx="220"
                cy="220"
                r="170"
                stroke-width="12"
                stroke="url('#gradient1')"
                fill="none"
                :stroke-dasharray="dasharray"
              ></circle>
            </g>
          </svg>
          <span
            id="timeSecond"
            class="time-second"
          >{{timerTimeCount}}</span>
        </div>
        <div
          class="answer-main"
          v-if="questionList.length"
        >
          <div class="current-sub">{{indexQ+1}}/{{questionList.length}}</div>
          <div class="questions">Q{{indexQ+1}}.“{{questionList[indexQ].questionName}}”</div>
          <div
            class="chose-item"
            v-for="(answer,ind) in questionList[indexQ].optionsList"
            :key="'a'+ind"
            @click="select(ind, answer.optionsNumber, questionList[indexQ].id)"
            :class="{'chose-item-active': isSelected== ind}"
          >{{sort[ind]}}{{answer.options}}</div>
          <div
            class="btn"
            @click="stashAnswer"
          >确定</div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div
        class="dialog"
        v-if="openDialog"
      >
        <div class="join">
          <div class="wrapper">
            <div class="result">
              <div class="right-num">
                <div class="txt">正确</div>
                <div class="ball">{{rightAnswerNum}}</div>
              </div>
              <div class="error-num">
                <div class="txt">错误</div>
                <div class="ball">{{errorAnswerNum}}</div>
              </div>
            </div>
            <div class="message">{{msg}}</div>
            <div
              class="btn"
              @click="replaceUrl"
            >确定</div>
            <div class="close">
              <img
                src="./imgs/close.png"
                alt
                @click="replaceUrl"
              >
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import cbbHeader from '@/components/cbbHeader';
import { Toast, Indicator, MessageBox } from 'mint-ui';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      rightAnswerNum: '00',
      errorAnswerNum: '00',
      relationActId: '',
      openDialog: false,
      sort: ['A.', 'B.', 'C.', 'D.'],
      indexQ: 0,
      answerId: null,
      questionId: null,
      answersList: [],
      isSelected: null,
      isAnswered: false,
      questionList: [],
      timerTimeCount: 40,
      timer: null,
      msg: '',
      dasharray: '1069, 1069'
    };
  },
  watch: {
    async answersList (val) {
      if (val.length == this.questionList.length) {
        Indicator.open();
        let rs = await this.$post('api/activity/game_question/check_answer', {
          answersList: this.answersList,
          relationActId: this.relationActId,
          merchantId: this.$store.state.merchantId,
          actId: this.act.actId
        });
        if (rs.status == 200) {
          // 答对并抽奖
          if (rs.payload.award.creditValue == 0) {
            this.msg = '真遗憾，下次再接再厉吧';
          } else {
            this.msg = `恭喜您获得了${rs.payload.award.creditValue}个八桂金`;
          }
        } else {
          this.msg = rs.error;
        }
        let result = rs.payload.answer;
        this.errorAnswerNum = '0' + result.errorAnswerNum;
        this.rightAnswerNum = '0' + result.rightAnswerNum;
        this.$nextTick(() => {
          this.isAnswered = true;
          this.openDialog = true;
        });
        Indicator.close();
      }
    }
  },
  methods: {
    replaceUrl () {
      window.history.go(-1);
    },
    async stashAnswer () {
      if (this.isAnswered) {
        Toast('您已经答过该题喽');
        return;
      }
      if (!this.questionId || !this.answerId) {
        Toast('您还没有选择答案哦');
        return;
      }
      if (this.timerTimeCount < 1) {
        MessageBox.confirm('答题时间已用尽,再来一次?').then(action => {
          this.replaceUrl();
        });
        return;
      }
      let qLen = this.questionList.length;
      if (this.answersList.length < qLen) {
        this.answersList.push({
          questionId: this.questionId,
          answer: this.answerId
        });
        if (this.indexQ < qLen - 1) {
          this.indexQ++;
        }
        this.isSelected = null;
        this.questionId = this.answerId = null;
      }
    },
    select (i, id, questionId) {
      this.isSelected = i;
      this.answerId = id;
      this.questionId = questionId;
    },
    async loadQuestions () {
      let rs = await this.$post('api/activity/game_question/get_question', {
        actId: this.act.actId
      });
      if (rs.status == 200) {
        this.questionList = rs.payload.question;
        this.relationActId = rs.payload.relationActId;
      } else {
        Toast(rs.error);
      }
    }
  },
  components: {
    cbbHeader
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  created () {
    this.loadQuestions();
  },
  mounted () {
    this.$nextTick(() => {
      if (!this.timer) {
        let _this = this;
        this.timer = setInterval(() => {
          this.timerTimeCount -= 1;
          this.dasharray = (1069 / 30) * this.timerTimeCount + ', 1069';
          if (this.timerTimeCount == 0) {
            clearInterval(_this.timer);
          }
        }, 1000);
      }
    });
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.answer-cont {
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 0;
  .bg img {
    width: 100%;
  }
  .main {
    position: absolute;
    top: 1.26rem;
    width: 100%;
    .time-count-x {
      position: relative;
      text-align: center;
    }
    svg {
      transform: rotate(-0.05deg);
    }
    .center {
      width: 1.32rem;
      height: 1.32rem;
    }
    circle {
      transition: stroke-dasharray 0.2s;
    }

    .time-second {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      text-align: center;
      font-size: 0.44rem;
      color: #fff;
    }
  }
  .answer-main {
    width: 5.6rem;
    margin: 0 auto;
    color: #333;
    font-size: 0.28rem;
    .current-sub {
      margin: 0.44rem 0;
      color: rgb(22, 163, 196);
      font-size: 0.44rem;
      font-weight: bold;
    }
    .questions {
      width: 100%;
      font-size: 0.32rem;
    }
    .chose-item {
      margin: 0.28rem auto 0;
      width: 100%;
      padding-left: 0.28rem;
      line-height: 0.77rem;
      border-radius: 0.5rem;
      border: 1px solid rgb(22, 163, 196);
      &.chose-item-active {
        background: rgb(22, 163, 196);
        color: #fff;
      }
    }
    .btn {
      width: 3rem;
      line-height: 0.77rem;
      color: #fff;
      text-align: center;
      background: rgb(255, 168, 29);
      font-size: 0.32rem;
      margin: 0.38rem auto 0;
      border-radius: 0.5rem;
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
  .join {
    position: relative;
    top: 1.2rem;
    margin: 0 auto;
    width: 5.2rem;
    height: 7.16rem;
    background: url(./imgs/POP_BG.png) no-repeat;
    background-size: 100% auto;
    .wrapper {
      padding-top: 3rem;
      text-align: center;
      color: #fff;
    }
    .result {
      @include flex(row, noWrap, center, center);
      font-size: 0.3rem;
      .right-num {
        margin-right: 0.48rem;
      }
      .ball {
        width: 1.16rem;
        height: 1.16rem;
        margin-top: 0.14rem;
        border-radius: 50%;
        background: #fff;
        color: rgb(255, 166, 69);
        font-size: 0.44rem;
        line-height: 1.16rem;
        font-weight: bold;
        letter-spacing: 0.1em;
      }
    }
    .message {
      margin-top: 0.3rem;
      font-size: 0.28rem;
      height: 0.3rem;
    }
    .btn {
      width: 3.46rem;
      height: 0.8rem;
      line-height: 0.8rem;
      margin: 0.7rem auto 0;
      font-size: 0.32rem;
      border-radius: 0.4rem;
      background: rgb(255, 168, 29);
    }
    .close {
      position: relative;
      left: 0.44rem;
      margin: 0.4rem auto 0;
      width: 0.88rem;
      height: 0.94rem;
      border-left: 1px solid #fff;
      font-size: 0;
      img {
        position: relative;
        right: 0.44rem;
        top: 0.94rem;
        width: 100%;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

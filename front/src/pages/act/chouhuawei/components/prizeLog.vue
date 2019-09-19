<template>
  <transition name="fade">
    <div
      class="dialog"
      v-if="openDialog"
      @touchmove="onTouchStart"
    >
      <div class="close">
        <img
          src="../imgs/close2.png"
          alt
          @click="close"
        >
      </div>
      <div class="join">
        <div class="conglts"></div>

        <div class="wrapper">
          <div class="conslts">
          </div>
          <div class="prize-wrap">
            <img
              :src="prize.standardImgUrl"
              alt=""
            >
            <p>{{prize.prizeName}}</p>
          </div>
          <div
            class="ipts first"
            v-show="this.prize.proType==2"
          >
            <input
              type="text"
              v-model="name"
              placeholder="请输入姓名"
            >
          </div>
          <div class="ipts">
            <input
              type="text"
              v-model="mobile"
              readonly
            >
          </div>
          <!--  <div class="cust">
            <div>获奖手机号</div>
            <div>{{mobile}}</div>
          </div> -->
          <div class="ipts">
            <div
              class="btn"
              @click="postName"
            >确认信息</div>

          </div>
          <div class="rule">
            <h1>使用方式:</h1>
            <div
              class="ruleDetail"
              v-html="prize.standardInstruction"
            ></div>

          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'prizeLog',
  props: {
    openDialog: {
      type: Boolean,
      require: true
    },
    prize: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      name: ''
    };
  },
  computed: {
    mobile () {
      return this.$store.state.cust.tel;
    }
  },
  methods: {
    postName () {
      this.$emit('post-name', this.name);
    },
    close () {
      this.$emit('close-dialog');
    },
    onTouchStart (e) {
      if (e.target) {
        e.target.className !== 'ruleDetail'
          ? e.preventDefault()
          : e.stopPropagation();
      }
    }
  },
  created () {
    console.log(this.prize.proType);
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";

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
  .close {
    position: absolute;
    right: 0.1rem;
    top: 0.2rem;
    width: 0.92rem;
    height: 0.92rem;
    font-size: 0;
    img {
      width: 100%;
    }
  }
  .join {
    position: relative;
    top: 1.2rem;
    margin: 0 auto;
    width: 6.46rem;
    height: 10.8rem;
    overflow-y: scroll;
    background: url(../imgs/logbg.png) no-repeat;
    background-size: 100% 100%;
    .wrapper {
      text-align: center;
      color: #fff;
      padding-top: 0.2rem;
      .conslts {
        position: relative;
        width: 3.06rem;
        height: 0.88rem;
        margin: 0 auto 0.14rem;
        background: url("../imgs/title.png") no-repeat;
        background-size: 100% 100%;
      }
      .prize-wrap {
        position: relative;
        width: 4.6rem;
        height: 2.44rem;
        margin: 0 auto;
        border-radius: 0.7rem;
        background: rgba(249, 70, 112, 0.1);
        margin: 0 auto 0.24rem;
        p {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          font-size: 0.28rem;
          font-family: SimHei;
          font-weight: 500;
          color: rgb(34, 34, 34);
          padding: 0.14rem 0rem;
          text-align: center;
          background: url("../imgs/btn-name.png") no-repeat;
          background-size: 100% 100%;
        }
        img {
          width: 1.68rem;
          margin-top: 0.1rem;
        }
      }
      .ipts {
        &.first {
          margin: 0 0 0.24rem;
        }
        input,
        .btn {
          width: 5.06rem;
          height: 0.86rem;
          border-radius: 0.8rem;
          padding-left: 0.2rem;
          line-height: 0.86rem;
          font-size: 0.28rem;
          border: 0.01rem solid rgb(249, 70, 112);
        }
        .btn {
          background: rgb(249, 70, 112);
          font-size: 0.44rem;
          font-family: SimHei;
        }
      }
    }
    .rule {
      width: 6rem;
      margin: 0 auto;
      text-align: left;
      padding: 0 0.3rem 0.2rem;
      font-size: 0.26rem;
      color: rgb(51, 51, 51);
      h1 {
        font-size: 0.28rem;
        color: rgb(208, 96, 130);
      }
      div {
        line-height: 0.34rem;
      }
    }
    .cust {
      color: #b52127;
      div:first-child {
        margin: 0.2rem 0 0.1rem;
      }
      div:last-child {
        font-size: 0.36rem;
        font-weight: bold;
      }
    }
    .message {
      margin-top: 0.3rem;
      font-size: 0.28rem;
      height: 0.3rem;
    }
    .btn {
      width: 2.68rem;
      height: 0.72rem;
      margin: 0.3rem auto 0.2rem;
      font-size: 0.3rem;
      color: #fff;
      text-align: center;
      line-height: 0.68rem;
      background: url(../imgs/receive.png) no-repeat;
      background-size: 100% 100%;
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

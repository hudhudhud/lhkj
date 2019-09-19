<template>
  <div class="hemi-grid">
    <!-- <p class="chances">剩余抽奖机会: {{chances}}</p> -->
    <!-- <div class="box"> -->
    <div class="box" v-highLight="'pannel'" :style="{'backgroundImage': 'url(' + templateConfig.pannel+')', }">
      <!-- <div class="border-light"> -->
      <div class="border-light">
        <div v-for="(imgLi, index) in prizeList" v-highLight="index==4?'button':'prizeBackground'" :key="'imgLi'+index"
          ref="pice" :class="{'active': index == arrNum[lottery.index]} "
          :style="{'backgroundImage':'url('+imgLi.bgSrc+')'}">
          <img :src="imgLi.standardImgUrl" v-if="imgLi.standardImgUrl" />
          <div :class="imgLi.defineStyle">{{imgLi.prizeName}}</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { highLight } from "@/directive/highLight";

export default {
  name: "HemiGrid",
  props: {
    templateConfig: {
      require: true,
      type: Object
    }
  },
  directives: { highLight },
  data() {
    return {
      lottery: {
        index: "",
        timer: null,
        prizeStandardId: "",
        ring: 4
      },
      lightTimer: null,
      timeFlag: 0, // 时间标记，抽奖请求时间过长，则返回错误
      actualPrice: "",
      prepayId: "",
      prizePayload: {},
      lightFlag: true,
      clickFlag: true,
      chances: 0,
      prizeList: [],
      list: [
        {
          standardImgUrl: "//static.lianhaikeji.com/lib/imgs/default.jpg",
          prizeName: "测试"
        },
        {
          standardImgUrl: "//static.lianhaikeji.com/lib/imgs/default.jpg",
          prizeName: "测试"
        },
        {
          standardImgUrl: "//static.lianhaikeji.com/lib/imgs/default.jpg",
          prizeName: "测试"
        },
        {
          standardImgUrl: "//static.lianhaikeji.com/lib/imgs/default.jpg",
          prizeName: "测试"
        },
        {
          standardImgUrl: "//static.lianhaikeji.com/lib/imgs/default.jpg",
          prizeName: "测试"
        },
        {
          standardImgUrl: "//static.lianhaikeji.com/lib/imgs/default.jpg",
          prizeName: "测试"
        },
        {
          standardImgUrl: "//static.lianhaikeji.com/lib/imgs/default.jpg",
          prizeName: "测试"
        },
        {
          standardImgUrl: "//static.lianhaikeji.com/lib/imgs/default.jpg",
          prizeName: "测试"
        }
      ],
      arrNum: [0, 1, 2, 5, 8, 7, 6, 3] // 定义转动的顺序
    };
  },
  methods: {
    renderPrize() {
      this.list.forEach(item => {
        if (item.prizeName.length > 7) {
          this.$set(item, "defineStyle", "lh5");
        }
        // this.$set(item, 'bgSrc', noSelect)
        this.$set(item, "bgSrc", this.templateConfig.prizeBackground);
      });
      this.list.splice(4, 0, " ");
      this.prizeList = this.list;
      this.$nextTick(() => {
        this.$refs.pice[0].style.backgroundImage =
          "url(" + this.templateConfig.prizeActive + ")";
        this.$refs.pice[4].style.backgroundImage =
          "url(" + this.templateConfig.button + ")";
        // this.$refs.pice[4].style.backgroundImage = 'url(' + lotteryBtn + ')'
        this.$refs.pice[4].onclick = () => {
          // 绑定抽奖按钮事件
        };
      });
    }
  },
  watch: {
    "templateConfig.prizeBackground": function() {
      this.$refs.pice.forEach((el, index) => {
        if (index != 0 && index != 4) {
          el.style.backgroundImage =
            "url(" + this.templateConfig.prizeBackground + ")";
        }
      });
    },
    "templateConfig.prizeActive": function() {
      this.$refs.pice[0].style.backgroundImage =
        "url(" + this.templateConfig.prizeActive + ")";
    },
    "templateConfig.button": function() {
      this.$refs.pice[4].style.backgroundImage =
        "url(" + this.templateConfig.button + ")";
    }
  },
  created() {
    this.renderPrize();
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.box {
  width: 311px;
  height: 311px;
  padding-left: 5px;
  padding-top: 5px;
  margin: 0 auto;
  background-size: 100% 100%;
  .border-light {
    width: 300px;
    height: 300px;
    padding-top: 22px;
    padding-left: 25px;
    background-size: 100% 100%;
    div {
      float: left;
      width: 80px;
      height: 80px;
      margin-right: 5px;
      margin-bottom: 6px;
      background-size: 100%;
      background-repeat: no-repeat;

      position: relative;
      font-size: 12px;
      color: #802520;
      &:nth-child(3n) {
        margin-right: 0;
      }
      &:nth-child(7),
      &:nth-child(8),
      &:nth-child(9) {
        margin-bottom: 0;
      }
      box-sizing: border-box;
      img {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      div {
        line-height: 25px;
        text-align: center;
        padding-top: 50px;
        &.lh5 {
          line-height: 14px;
        }
      }
    }
  }
}
</style>

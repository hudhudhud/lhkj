<template>
  <div ref="questionImg" class="img-container bg-common">
    <!-- 下载 隐藏 -->
    <a class="download" hidden></a>
    <!-- 答题有奖 -->
    <div class="img-title bg-common"></div>
    <!-- 活动介绍 -->
    <div class="activity-desc bg-common">
      <div class="desc-item">
        <label class="time-icon bg-common"></label>
        <span>截止至{{time}}</span>
      </div>
      <div class="desc-item prize-item">
        <label class="prize-icon bg-common"></label>
        <div class="prize-desc">
          <div class="desc-text">
            奖励<span class="one">5</span>个CC币
          </div>
          <div class="other-desc">问题回答对，再赚5CC币</div>
        </div>
      </div>
      <!-- 二维码 -->
      <div class="qrcode-bg bg-common">
        <img class="qrcode" :src="qrcode" alt="二维码">
      </div>
      <p>答案就在文中，仅有一次答题机会哦。</p>
    </div>
    <!-- 题目介绍 -->
    <div class="question-desc">
      <div class="question-num-box">
        本文题目<span class="question-num">#{{questionData.id}}</span>
      </div>
      <div class="question-content">
        <p>答题有奖:{{questionData.questionName}}</p>
        <p v-for="item in questionData.optionsList" :key="item.optionsNumber">
          {{ item.optionsNumber | NumToLetter}}、{{item.options}}
        </p>
      </div>
    </div>
    <!-- 二维码文字 -->
    <div class="qrcode-desc">
      长按二维码，答题领CC币
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  name: "ImgPreview",
  props: {
    time: {
      require: true,
      type: String
    },
    questionData: {
      require: true,
      type: Object
    },
    qrcode: {
      require: true,
      type: String
    }
  },
  methods: {
    createImg() {
      let _canvas = document.createElement("canvas");
      let imgBox = document.querySelector(".img-container");
      let w = parseInt(window.getComputedStyle(imgBox).width);
      let h = parseInt(window.getComputedStyle(imgBox).height);
      // 将canvas画布放大若干倍，然后盛放在较小的容器内，就显得不模糊了
      _canvas.width = w * 5;
      _canvas.height = h * 5;
      _canvas.style.width = w + "px";
      _canvas.style.height = h + "px";
      let context = _canvas.getContext("2d");
      context.scale(5, 5);
      html2canvas(this.$refs.questionImg, {
        canvas: _canvas,
        useCORS: true,
        scale: 5,
        width: w, // 设置width
        height: h // 设置height
      }).then(canvas => {
        let link = document.querySelector(".download");
        link.href = canvas.toDataURL();
        link.setAttribute("download", "题目#" + this.questionData.id + ".png");
        link.click();
      });
    }
  }
};
</script>

<style scoped>
.bg-common {
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.img-container {
  box-sizing: border-box;
  display: inline-block;
  width: 375px;
  min-height: 500px;
  padding: 30px 20px;
  background-image: url("//static.lianhaikeji.com/images/20190627/660b5b8726bc4f37ab84d9275813970e.jpg");
}
.img-title {
  width: 100%;
  height: 56px;
  background-image: url("//static.lianhaikeji.com/images/20190627/f54cf01be59046b796e3bae68b2fe1dd.png");
  background-size: contain;
}
.activity-desc {
  position: relative;
  box-sizing: border-box;
  margin-top: 18px;
  padding: 14px;
  width: 100%;
  height: 120px;
  background-image: url("//static.lianhaikeji.com/images/20190627/392874774e6244829ee8c008d6b58611.png");
}
.activity-desc > p {
  font-size: 12px;
  color: #ffffff;
  padding: 0;
  margin: 0;
  margin-left: 24px;
  margin-top: 4px;
}
.desc-item {
  display: flex;
  align-items: start;
  color: #fdfbf8;
  margin-bottom: 12px;
  height: 18px;
  font-size: 16px;
}
.desc-item label {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  margin-top: 2px;
}
.prize-item {
  height: auto;
  margin-bottom: 0;
}
.time-icon {
  background-image: url("//static.lianhaikeji.com/images/20190627/949f147a385e4755af01d181009da473.png");
}
.prize-icon {
  background-image: url("//static.lianhaikeji.com/images/20190627/0db67ef4b4144236bb1796db9959c62f.png");
}
.prize-desc {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
.one {
  display: inline-block;
  width: 20px;
  line-height: 20px;
  border-radius: 50%;
  background-color: #ffe2b9;
  color: #ff2a00;
  text-align: center;
  font-size: 16px;
}
.other-desc {
  display: inline-block;
  background-color: #f85658;
  padding: 2px 4px;
  color: #fff;
  font-size: 14px;
}

.question-desc {
  width: 100%;
  min-height: 210px;
  background-color: #fff5ec;
}
.question-num-box {
  display: inline-block;
  line-height: 21px;
  color: #53310f;
  background-color: #fbdec0;
  padding-left: 10px;
  padding-right: 16px;
  margin-top: 2px;
  border-radius: 0 50px 50px 0;
  font-size: 12px;
}
.question-num {
  color: #fa702b;
}
.question-content {
  padding: 10px 20px;
  color: #333;
}
.question-content p {
  margin: 0 0 14px;
}
.question-content p:last-child {
  margin-bottom: 0;
}
.qrcode-desc {
  width: 100%;
  line-height: 35px;
  background-color: #ffd1a0;
  font-size: 15px;
  text-align: center;
  color: #7d5937;
}
.qrcode-bg {
  position: absolute;
  top: 14px;
  right: 10px;
  display: inline-block;
  width: 90px;
  height: 90px;
  background-image: url("//static.lianhaikeji.com/images/20190627/47d027ebcb6847d8b94f71a8744b2e39.png");
  background-size: contain;
}
.qrcode {
  width: 70px;
  height: 70px;
  margin-top: 8px;
  margin-left: 9px;
}
</style>

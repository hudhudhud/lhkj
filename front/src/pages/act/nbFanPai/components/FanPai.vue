<template>
  <div>
    <div
      class="fc_wrapper"
      @click="action"
    >
      <div
        class="fc_inner"
        :class="{'fan': payload.transformFlag && payload.index == index}"
      >
        <div
          class="fc_front"
          :style="{'width': payload.w,'height': payload.h, 'backgroundImage': 'url(' + payload.pannel+')'}"
        ></div>
        <div
          class="fc_back"
          :style="{'width': payload.w,'height': payload.h,'backgroundImage': 'url(' + payload.pannelBack+')'}"
        >
          <template>
            <div
              class="prizeTitle"
              v-if="res.prize.proType==8"
            >谢谢惠顾</div>
            <div
              class="prizeTitle"
              v-else
            >恭喜中奖</div>
          </template>

          <div class="prizeImg"><img
              :src="res.prize.standardImgUrl"
              alt=""
            ></div>
          <div class="prizename">{{res.prize.prizeName}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FanPai',
  props: {
    payload: {
      type: Object,
      require: true
    },
    res: {
      type: Object,
      require: true
    },
    index: {
      type: Number,
      require: true
    }
  },
  methods: {
    action () {
      this.$emit('action');
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.fc_wrapper {
  width: 100%;
  height: 100%;
  line-height: 0.5rem;
  font-size: 0.24rem;
  box-sizing: border-box;
  perspective: 1000px;
  margin: 0.1rem;
}
/* .fc_wrapper:hover .fc_inner {
      transform: rotateY(-180deg);
    } */
.fc_inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  transform-origin: center center;
  transition: transform 0.8s;
}
.fc_front {
  position: absolute;
  z-index: 4;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  backface-visibility: hidden;
}
.fc_back {
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  transform-origin: center center;
  transform: rotateY(180deg);
  backface-visibility: hidden;
}
.fc_back {
  padding-top: 0.3rem;
  text-align: center;
  border-radius: 0.1rem;
  background-repeat: no-repeat;

  // background: url(./imgs/prizePai.png) no-repeat;
  background-size: cover;
}
.fan {
  transform: rotateY(-180deg);
}
.prizeTitle {
  font-size: 0.28rem;
  color: rgb(252, 0, 55);
  font-weight: 500;
  width: 100%;
  text-align: center;
  margin: 0.3rem auto 0.2rem;
}
.prizeImg {
  margin: 0 auto;
  width: 60%;
  img {
    display: block;
    width: 100%;
  }
}
.prizename {
  width: 100%;
  text-align: center;
  font-size: 0.18rem;
  color: #333;
}
</style>

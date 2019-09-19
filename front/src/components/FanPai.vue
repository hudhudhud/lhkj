<template>
  <div>
    <div class="fc_cont">
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
            <div></div>
            <div class="prizeName"></div>
          </div>
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
.fc_cont {
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 0.3rem;
  width: 100%;
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
    .prizeName {
      color: #ff8c40;
    }
  }
  .fc_back {
    padding-top: 0.3rem;
    text-align: center;
    border-radius: 0.1rem;
    background-repeat: no-repeat;

    // background: url(./imgs/prizePai.png) no-repeat;
    background-size: cover;
  }
}
.fan {
  transform: rotateY(-180deg);
}
</style>

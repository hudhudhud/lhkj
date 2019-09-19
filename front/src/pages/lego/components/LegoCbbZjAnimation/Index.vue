<template>
  <div>
    <div class="animate-line"> <img src="./imgs/line.jpg" alt="">
    </div>
    <div class="center-container">
      <div class="title">
        欢乐冲关&nbsp;赢话费
      </div>
      <div class="act">30元话费等你来拿</div>
      <div class="ocean">
        <img src="./imgs/boat.png" class="boat" alt="">
        <img src="./imgs/penguin.png" class="penguin" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.animate-line {
  margin: 0 auto 0.4rem;
  overflow: hidden;
}
.animate-line img {
  display: block;
  margin: 0 auto;
  position: relative;
  animation: mymove 2s infinite;
}

@keyframes mymove {
  0% {
    left: -50%;
  }
  100% {
    left: 100%;
  }
}

.center-container {
  text-align: center;
  .hot {
    img {
      width: 1.6rem;
    }
  }
  .title {
    padding: 0.2rem 0;
    color: rgb(53, 60, 85);
    font-size: 0.36rem;
  }
  .act {
    color: #666;
    font-size: 0.22rem;
    padding-bottom: 0.4rem;
  }
  .ocean {
    position: relative;
    padding-bottom: 0.54rem;
    background: url(./imgs/ocean.png) no-repeat;
    background-size: 100% auto;
    .boat {
      position: absolute;
      top: 0.1rem;
      left: 0.6rem;
      width: 1rem;
    }
    .penguin {
      width: 0.8rem;
      position: relative;
      animation: jump 1s infinite;
    }
  }
}
@keyframes jump {
  0% {
    bottom: 0;
  }
  100% {
    bottom: 10px;
  }
}
</style>

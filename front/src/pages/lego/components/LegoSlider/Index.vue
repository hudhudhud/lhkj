<template>
  <div>

    <div
      style="position:relative;height: 3.3rem;"
      @touchmove="onTouchMove"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div
        v-for="(list, index) in gorupList"
        :key="'list'+index"
        style="position:absolute;top:0;left:0;    width: 100%;"
      >
        <transition name="slide">
          <selector
            :list="list"
            v-show="index == currentSub"
            @close="showSelector = false"
          ></selector>
        </transition>

      </div>
    </div>
    <div class="wrap">
      <div
        class="state"
        v-for="(list, index2) in gorupList"
        :key="index2"
        :class="{'active': currentSub==index2}"
      ></div>

    </div>
  </div>
</template>

<script>
import selector from '@/components/actSelector';

export default {
  props: ['setting'],
  data () {
    return {
      currentSub: 0,
      show: true,
      gorupList: JSON.parse(this.setting.json),
      showSelector: false,
      startPoint: '',
      endPoint: ''
    };
  },
  components: { selector },
  methods: {
    flag () {
      this.show = false;
      this.showSelector = true;
    },
    onTouchEnd (e) {
      console.log(this.startPoint - this.endPoint);
      if (this.endPoint > 0) {
        if (this.startPoint - this.endPoint > 50) {
          if (this.currentSub < this.gorupList.length - 1) {
            this.currentSub++;
          }
        }
        if (this.endPoint - this.startPoint > 50) {
          if (this.currentSub > 0) {
            if (this.currentSub < this.gorupList.length) {
              this.currentSub--;
            }
          }
        }
        this.startPoint = ''
        this.endPoint = ''
      }
      // e.preventDefault();
    },
    onTouchStart (e) {
      this.startPoint = e.touches[0].clientX;
      // e.preventDefault();
    },
    onTouchMove (e) {
      this.endPoint = e.touches[0].clientX;
      // e.preventDefault();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.container {
  .bg {
    font-size: 0;
    img {
      width: 100%;
    }
  }
  .wrapper {
    position: absolute;
    width: 100%;
    left: 50%;
    top: 1.2rem;
    transform: translateX(-50%);
    padding: 0 0.5rem;
    color: #fff;
    font-size: 0.24rem;
    .title,
    .title-sub {
      text-align: center;
    }
    .title-sub img {
      width: 3.14rem;
      margin: 0.22rem 0 0.1rem;
    }
    .main {
      line-height: 0.42rem;
    }
    .title img {
      width: 3.75rem;
      margin-bottom: 0.2rem;
    }
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0.5;
}
.wrap {
  text-align: center;
}
.state {
  display: inline-block;
  width: 0.5rem;
  height: 0.08rem;
  background: rgb(228, 230, 238);
}
.active {
  background: #181ecc;
}
</style>

<template>
  <div class="swip" :style="{'height':setting.swipHeigth || '40vw'}">
    <div class="swip-container" :class="{'swip-animating':animating}" :style="{'transform':'translateX('+translateX+'px)'}">
      <template>
        <div class="swip-item" :style="{'transform':`scale(${item.scale},${item.scale})`,'backgroundImage': `url(${item.localPicUrl})`,'height':setting.swipItemHeigth || '30vw','width':setting.swipItemWidth || '30vw', 'margin': setting.margin || '5vw'}"
          :class="{'swip-animating':animating,['swip-item-'+ind]:true,'swip-item-active':item.isActive}" v-for="(item,ind) in list"
          :key="ind" @click="goUrl(item.jumpUrl)"></div>
      </template>

    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { Toast } from 'mint-ui';
export default {
  props: {
    setting: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      sw: 0,
      startX: 0,
      storedTranslateX: 0,
      translateX: 0,
      animating: false,
      currentIndex: 1,
      icon:
        '//static.lianhaikeji.com/images/20181030/0e56552b307b44a590c38b83b80fe83b.png',
      currentCity: '',
      merchantId: this.$store.state.merchantId,
      currentSpeed: 0,
      prevTime: 0,
      prevX: 0,
      arrow: '',
      // 切换的最小速度
      minSpeed: this.setting.minSpeed ? this.setting.minSpeed : 1
    };
  },
  computed: {
    list () {
      console.log(this.setting.list);
      return JSON.parse(this.setting.list);
    }
  },
  methods: {
    goUrl (url) {
      if (url) {
        window.location.href = url;
      } else {
        Toast('敬请期待');
      }
    },
    onTouchStart (e) {
      this.animating = false;
      this.prevX = this.startX = e.touches[0].clientX;
      this.prevTime = Date.now();
      this.currentSpeed = 0;
      // e.preventDefault()
    },
    onTouchMove (e) {
      let nowX = e.touches[0].clientX;
      this.translateX = this.storedTranslateX + nowX - this.startX;
      // 上一次移动到现在的位移差和时差
      let dx = Math.abs(nowX - this.prevX);
      let dtime = Date.now() - this.prevTime;
      let speed = dx / dtime;
      let arrow = '';
      if (this.prevX < nowX) {
        arrow = 'left';
      } else {
        arrow = 'right';
      }
      if (arrow == this.arrow) {
        this.speed = this.speed + speed;
      } else {
        this.speed = 0;
      }
      this.arrow = arrow;
      this.prevX = nowX;
      this.prevTime = Date.now();
      this.calcScale();

      e.preventDefault();
    },
    onTouchEnd (e) {
      // 如果停留超过1s,则不做移动
      if (Date.now() - this.prevTime > 1000) {
        this.speed = 0;
        this.arrow = '';
      }
      this.storedTranslateX = this.translateX;
      this.alignItem();
    },
    calcScale () {
      for (let i = 0; i < this.list.length; i++) {
        let item = this.list[i];
        let el = item.el;

        let _dx = Math.abs(
          this.sw / 2 - (el.offsetLeft + this.translateX + el.offsetWidth / 2)
        );
        if (_dx < el.offsetWidth / 2) {
          item.scale =
            1 + 0.2 * ((el.offsetWidth / 2 - _dx) / (el.offsetWidth / 2));
        } else {
          item.scale = 1;
        }
      }
    },
    alignItem () {
      let dx = this.sw;
      let targetTranslateX = 0;
      // 设置切换最小速度
      if (this.arrow == 'left' && this.speed > this.minSpeed) {
        // 向左切换
        this.arrow = 'left';
      } else if (this.arrow == 'right' && this.speed > this.minSpeed) {
        // 向右切换
        this.arrow = 'right';
      } else {
        // 恢复当前
        this.arrow = '';
      }
      // 取最近的元素
      let nearlestInd = 0;
      // 元素宽度
      let elWidth = 0;
      // 间隙
      let space = 0;
      for (let i = 0; i < this.list.length; i++) {
        let item = this.list[i];
        let el = item.el;
        elWidth = el.offsetWidth;
        if (i > 0) {
          space = el.offsetLeft - this.list[i - 1].el.offsetLeft - elWidth;
        }
        let _dx = Math.abs(
          this.sw / 2 - (el.offsetLeft + this.translateX + el.offsetWidth / 2)
        );
        if (_dx < dx) {
          nearlestInd = i;
          dx = _dx;
          targetTranslateX = this.sw / 2 - (el.offsetLeft + el.offsetWidth / 2);
        }
      }

      if (this.arrow == 'left' && nearlestInd > 0) {
        // 往左
        targetTranslateX = targetTranslateX + elWidth + space;
      } else if (this.arrow == 'right' && nearlestInd < this.list.length - 1) {
        // 往左
        targetTranslateX = targetTranslateX - elWidth - space;
      }
      for (let i = 0; i < this.list.length; i++) {
        let item = this.list[i];
        let el = item.el;
        let _dx = Math.abs(
          this.sw / 2 - (el.offsetLeft + targetTranslateX + el.offsetWidth / 2)
        );
        if (_dx < el.offsetWidth / 2) {
          item.scale =
            1 + 0.2 * ((el.offsetWidth / 2 - _dx) / (el.offsetWidth / 2));
        } else {
          item.scale = 1;
        }
      }
      this.animating = true;
      this.storedTranslateX = this.translateX = targetTranslateX;
    },

    async operateList () {
      if (this.list.length > 0) {
        this.list.forEach((element, index) => {
          this.$set(element, 'scale', 1);
          this.$set(element, 'isActive', false);
          this.$set(element, 'el', null);
        });
      }
      this.$nextTick(() => {
        this.sw = this.$el.offsetWidth; // 容器宽度
        console.log('sw:' + this.sw);
        for (let i = 0; i < this.list.length; i++) {
          // 准备元素
          this.list[i].el = this.$el.querySelector(`.swip-item-${i}`);
        }
        console.log('el:' + this.list[1].el.offsetLeft);
        this.$el.addEventListener('touchstart', this.onTouchStart);
        this.$el.addEventListener('touchmove', this.onTouchMove);
        this.$el.addEventListener('touchend', this.onTouchEnd);
        if (this.list.length == 3) {
          this.translateX =
            this.sw / 2 -
            this.list[1].el.offsetWidth / 2 -
            this.list[1].el.offsetLeft;
          this.list[1].scale = 1.2;
        }
      });
    }
  },
  created () {
    this.operateList();
  },
  mounted () {},
  beforeDestroy () {
    this.$el.removeEventListener('touchstart', this.onTouchStart);
    this.$el.removeEventListener('touchmove', this.onTouchMove);
    this.$el.removeEventListener('touchend', this.onTouchEnd);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.swip {
  overflow: hidden;
}
.swip-container {
  white-space: nowrap;
  overflow: visible;
}
.swip-animating {
  transition: transform 0.5s;
}
.swip-item {
  display: inline-block;
  vertical-align: middle;
  background-size: 100% 100%;
}
.marginLeft {
  &:first-child {
    margin-right: 0;
  }
}
</style>

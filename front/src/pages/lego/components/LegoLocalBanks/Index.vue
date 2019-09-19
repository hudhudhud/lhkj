<template>
  <div class="swip" :style="{'height':setting.swipHeigth || '40vw'}">
    <div class="swip-container" :class="{'swip-animating':animating}"
      :style="{'transform':'translateX('+translateX+'px)'}">

      <template v-if="merchantId== 16">

        <div class="swip-item"
          :style="{'transform':`scale(${item.scale},${item.scale})`,'backgroundImage': `url(${item.localPicUrl})`,'height':setting.swipItemHeigth || '30vw','width':setting.swipItemWidth || '30vw', 'margin': setting.margin || '5vw'}"
          :class="{'swip-animating':animating,['swip-item-'+ind]:true,'swip-item-active':item.isActive}"
          v-for="(item,ind) in list" :key="ind" @click="jumpTarget(ind, item)"></div>
      </template>
      <template v-else>
        <div class="swip-item"
          :style="{'transform':`scale(${item.scale},${item.scale})`,'backgroundImage': `url(${item.localPicUrl})`,'height':setting.swipItemHeigth || '30vw','width':setting.swipItemWidth || '30vw', 'margin': setting.margin || '5vw'}"
          :class="{'swip-animating':animating,['swip-item-'+ind]:true,'swip-item-active':item.isActive}"
          v-for="(item,ind) in list" :key="ind" @click="goUrl(item.jumpUrl)"></div>
      </template>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { Toast } from 'mint-ui';
import { getCurrentLocation } from '@/utils/index';
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
      list: []
    };
  },
  methods: {
    jumpTarget (i, item) {
      if (item.id == 67) {
        this.$router.push(
          '/' +
            this.$store.state.merchantAppid +
            '/merchant/index/actArea/localBanksList'
        );
      } else {
        this.$router.push(
          '/' +
            this.$store.state.merchantAppid +
            '/merchant/index/actArea/cityActIndex?id=' +
            item.id +
            '&city=' +
            item.localName
        );
      }
    },
    goUrl (url) {
      if (url) {
        window.location.href = url;
      } else {
        Toast('敬请期待~');
      }
    },
    onTouchStart (e) {
      this.animating = false;
      this.startX = e.touches[0].clientX;
      // e.preventDefault()
    },
    onTouchMove (e) {
      let nowX = e.touches[0].clientX;
      this.translateX = this.storedTranslateX + nowX - this.startX;

      this.calcScale();

      e.preventDefault();
    },
    onTouchEnd (e) {
      this.storedTranslateX = this.translateX;
      this.alignItem();
      // e.preventDefault()
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
      for (let i = 0; i < this.list.length; i++) {
        let item = this.list[i];
        let el = item.el;
        let _dx = Math.abs(
          this.sw / 2 - (el.offsetLeft + this.translateX + el.offsetWidth / 2)
        );
        if (_dx < dx) {
          dx = _dx;
          targetTranslateX = this.sw / 2 - (el.offsetLeft + el.offsetWidth / 2);
        }
      }
      for (let i = 0; i < this.list.length; i++) {
        let item = this.list[i];
        let el = item.el;
        console.log(item.el);
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
    getCity () {},
    async getLocalBanks () {
      let rs = await this.$post('api/activity/get_first_institution', {
        merchantId: this.merchantId
      });
      if (rs.status == 200) {
        let _this = this;

        let result = rs.payload.filter(element => {
          return element.localNum == _this.currentCity;
        });
        console.log(result);
        if (result.length < 1) {
          _this.currentCity = 179;
        }
        rs.payload.forEach((element, index) => {
          this.$set(element, 'scale', 1);
          this.$set(element, 'isActive', false);
          this.$set(element, 'el', null);
          if (element.localNum == _this.currentCity) {
            if (this.merchantId == 16 || this.merchantId == 167) {
              rs.payload.splice(index, 1);
              rs.payload.splice(0, 0, element);
              rs.payload.splice(4, 0, rs.payload[rs.payload.length - 1]);
            } else {
              element.scale = 1.2;
              rs.payload.splice(index, 1);
              rs.payload.splice(1, 0, element);
            }
          }
        });
        if (this.merchantId == 16 || this.merchantId == 167) {
          rs.payload.splice(5);
          this.list = rs.payload;
        } else {
          this.list = rs.payload;
        }

        if (this.merchantId != 16 && this.list.length == 0) {
          this.list = rs.payload.splice(0, 3);
        }
        this.$nextTick(() => {
          this.sw = this.$el.offsetWidth; // 容器宽度
          for (let i = 0; i < this.list.length; i++) {
            // 准备元素
            this.list[i].el = this.$el.querySelector(`.swip-item-${i}`);
            // 八桂&浙江
            if (this.list[i].localNum == this.currentCity) {
              if (this.merchantId == 16 || this.merchantId == 167) {
                return false;
              }
              this.translateX =
                this.sw / 2 -
                this.list[i].el.offsetWidth / 2 -
                this.list[i].el.offsetLeft;
              this.list[i].scale = 1.2;
            }
          }
          if (this.merchantId == 16 || this.merchantId == 167) {
            return false;
          } else {
            this.$el.addEventListener('touchstart', this.onTouchStart);
            this.$el.addEventListener('touchmove', this.onTouchMove);
            this.$el.addEventListener('touchend', this.onTouchEnd);
          }
        });
      }
    }
  },
  created () {
    getCurrentLocation(result => {
      this.currentCity = result.code;
      console.log(result);
      console.log('当前定位城市:' + this.currentCity);
      this.getLocalBanks();
    });
  },
  mounted () {},
  beforeDestroy () {
    if (this.merchantId == 16 || this.merchantId == 167) {
      return false;
    } else {
      this.$el.removeEventListener('touchstart', this.onTouchStart);
      this.$el.removeEventListener('touchmove', this.onTouchMove);
      this.$el.removeEventListener('touchend', this.onTouchEnd);
    }
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
    margin-left: -4vw !important;
  }
}
</style>

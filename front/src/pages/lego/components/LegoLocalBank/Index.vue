<template>
  <div>
    <div class="branch-container">
      <div class="branch-banks">
        <div
          v-for="(item, ind) in bankBranchlist"
          :key="item.id"
          :id="item.id"
          :class="{'active': index == ind}"
          @click="getLocalBanksAct(item.id, ind)"
        >{{ item.localName}}</div>
      </div>

      <div
        class="wrap"
        v-if="actList.length>0"
      >
        <div
          class="swip"
          :style="{'height':'40vw'}"
        >
          <div
            class="swip-container"
            :class="{'swip-animating':animating}"
            :style="{'transform':'translateX('+translateX+'px)'}"
          >
            <div
              class="swip-item"
              v-for="(item,ind) in actList"
              :style="{'transform':`scale(${item.scale},${item.scale})`,'backgroundImage': `url(${item.actUrl})`,'height':'30vw','width':'30vw'}"
              :class="{'swip-animating':animating,['swip-item-'+ind]:true,'swip-item-active':item.isActive}"
              :key="ind"
              @click="openTarget(item.actJumpUrl)"
            ></div>
          </div>
        </div>
      </div>
      <div
        v-if="noMore"
        class="order-nomore"
      >更多活动敬请期待哦</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      index: 0,
      merchantId: this.$store.state.merchantId,
      bankBranchlist: [],
      actList: [],
      noMore: false,
      sw: 0,
      startX: 0,
      storedTranslateX: 0,
      translateX: 0,
      animating: false,
      currentIndex: 1
    };
  },
  methods: {
    openTarget (url) {
      window.location.href = url;
    },
    goUrl (url) {
      if (url) {
        window.location.href = url;
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
      for (let i = 0; i < this.actList.length; i++) {
        let item = this.actList[i];
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
      for (let i = 0; i < this.actList.length; i++) {
        let item = this.actList[i];
        let el = item.el;

        let _dx = Math.abs(
          this.sw / 2 - (el.offsetLeft + this.translateX + el.offsetWidth / 2)
        );
        if (_dx < dx) {
          dx = _dx;
          targetTranslateX = this.sw / 2 - (el.offsetLeft + el.offsetWidth / 2);
        }
      }
      for (let i = 0; i < this.actList.length; i++) {
        let item = this.actList[i];
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
    async getLocalBanks () {
      let rs = await this.$post('api/activity/get_first_institution', {
        merchantId: this.merchantId
      });

      this.bankBranchlist = rs.payload;
      this.$nextTick(() => {
        this.getLocalBanksAct(this.bankBranchlist[0].id, 0);
      });
    },
    async getLocalBanksAct (id, i) {
      let rs = await this.$post('api/activity/get_act', {
        institutionNum: id
      });
      if (rs.status == 200) {
        this.index = i;
        if (rs.payload.length < 1) {
          this.noMore = true;
        } else {
          this.noMore = false;
        }
        rs.payload.forEach((element, index) => {
          this.$set(element, 'scale', 1);
          this.$set(element, 'isActive', false);
          this.$set(element, 'el', null);
          /* if (element.localNum == _this.currentCity) {
          element.scale = 1.2;
          rs.payload.splice(index, 1);
          rs.payload.splice(1, 0, element);
        } */
        });
        this.actList = rs.payload;

        this.$nextTick(() => {
          this.sw = this.$el.offsetWidth; // 容器宽度
          for (let i = 0; i < this.actList.length; i++) {
            // 准备元素
            this.actList[i].el = this.$el.querySelector(`.swip-item-${i}`);
          }
          this.$el.addEventListener('touchstart', this.onTouchStart);
          this.$el.addEventListener('touchmove', this.onTouchMove);
          this.$el.addEventListener('touchend', this.onTouchEnd);
        });
      }
    }
  },
  created () {
    this.getLocalBanks();
  },
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
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
}
.marginLeft {
  &:first-child {
    margin-left: 4vw;
  }
}
.branch-container {
  .branch-banks {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: #ebf2f7;
    color: rgb(77, 77, 77);
    font-size: 0.26rem;
    margin-bottom: 0.34rem;
    text-align: center;
    div {
      flex: 1;
      max-width: 1.8rem;
      white-space: nowrap;
      margin: 0 0.2rem;
      height: 0.68rem;
      line-height: 0.68rem;
      &.active {
        color: rgb(239, 73, 57);
        border-bottom: 3px solid rgb(239, 73, 57);
      }
    }
  }
  .branch-act {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    img {
      display: inline-block;
      width: 48.5%;
      height: 1.4rem;
      margin-bottom: 0.28rem;
    }
  }
}
.order-nomore {
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: #999;
}
</style>

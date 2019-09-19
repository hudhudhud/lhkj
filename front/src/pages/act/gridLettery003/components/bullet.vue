<template>
  <div>
    <div
      class="bullet-box"
      v-if="flyList.length"
    >
      <div class="bullet-main">
        <div
          class="list"
          :style="{top:-bulletTop+'px'}"
        >
          <div
            class="bullet"
            :style="{'color': theme||'#fff'}"
            v-for="(bullet,ind) in flyList"
            :key="ind"
          >
            恭喜{{bullet.tel| hidden}}获得{{bullet.prizeName}}
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  name: 'bullet',
  props: {
    act: {
      require: true,
      type: Object
    },
    theme: {
      require: false,
      type: String
    }
  },
  data () {
    return {
      timer: null,
      bulletList: [],
      bulletTop: -30,
      flyList: [],
      noMore: false
    };
  },
  methods: {
    startBullet () {
      if (this.bulletList.length) {
        let key = this.bulletList.length * Math.random();
        let bullet = this.bulletList[parseInt(key)];
        let fly = {
          name: bullet.rechargeAccount,
          prizeName: bullet.proStandardName,
          tel: bullet.tel
        };
        this.flyList.push(fly);
      }
      this.bulletTop += 10 * parseInt(3 * Math.random());
      this.timer = setTimeout(this.startBullet, 1000);
    },
    async loadOrder () {
      let rs = await this.$post('/api/getAllOrderList?', {
        actId: this.act.actId,
        status: 2
      });
      if (rs.status === 200) {
        let list = rs.payload.list;
        if (!list || list.length === 0) {
          this.noMore = true;
        } else {
          this.bulletList = [];
          list.forEach(item => {
            this.bulletList.push(item);
          });
        }
        this.startBullet();
      }
    }
  },
  created () {
    this.loadOrder();
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  }
};
</script>
<style lang="scss" scoped>
.bullet-box {
  position: relative;
  overflow: hidden;
  width: 5.83rem;
  text-align: center;
  margin: 0.1rem auto;
  height: 0.98rem;
  line-height: 0.62rem;
  color: #fff;
  text-align: center;
  font-size: 0.26rem;
  background: url("../img/bulletbg.png") no-repeat;
  background-size: 100% 100%;
  .bullet-main {
    position: relative;
    width: 5.83rem;
    height: 0.7rem;
    overflow: hidden;
    margin: 0.1rem auto;
    .list {
      position: absolute;
      width: 4rem;
      top: 0;
      left: 53%;
      transform: translateX(-50%);
      transition: all 5s;
      transition-timing-function: linear;
      & .bullet-fly {
        bottom: 100%;
      }
    }
  }
}
.bullet {
  font-size: 0.26rem;
  color: rgb(240, 37, 81);
  height: 0.62rem;
  line-height: 0.62rem;
}
</style>

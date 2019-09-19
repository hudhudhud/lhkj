<template>
  <div>
    <div
      class="bullet-box"
      v-if="flyList.length"
    >
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
          恭喜{{bullet.tel}}获得{{bullet.prizeName}}
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
        let tel = bullet.tel
          ? bullet.tel.replace(/([\d]{3})([\d]{5})([\d]{3})/, '$1*****$3')
          : '**';
        let fly = {
          name: bullet.rechargeAccount,
          prizeName: bullet.proStandardName,
          tel: tel
        };
        this.flyList.push(fly);
      }
      this.bulletTop += 10 * parseInt(3 * Math.random());
      this.timer = setTimeout(this.startBullet, 1000);
    },
    async loadOrder () {
      if (!this.$store.state.token && this.$store.state.merchantId == 191) {
        return;
      }
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
  width: 5rem;
  text-align: center;
  margin: 0.3rem auto 0;
  background-size: 100% 100%;
  height: 0.62rem;
  line-height: 0.62rem;
  text-align: left;
  // padding-left: 0.2rem;
  font-size: 0.26rem;
  .list {
    position: absolute;
    width: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: all 5s;
    transition-timing-function: linear;
    & .bullet-fly {
      bottom: 100%;
    }
  }
}
.bullet {
  font-size: 0.26rem;
  color: rgb(240, 37, 81);
  height: 0.62rem;
  line-height: 0.62rem;
  text-align: center;
}
</style>

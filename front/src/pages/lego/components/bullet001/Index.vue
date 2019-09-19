<template>
  <!-- bullet -->
  <div class="bullet-box" v-if="flyList.length">
    <div class="list" :style="{top:-bulletTop+'px'}">
      <div class="bullet" v-for="(bullet,ind) in flyList" :key="ind">
        {{bullet}}
      </div>
    </div>

  </div>
</template>
<script>
import { getCreditBullet } from '@/lib/api';
export default {
  data () {
    return {
      timer: null,
      showpayMsg: false,
      flyList: [],
      bulletTop: 0,
      bulletList: null
    };
  },
  methods: {
    getCreditBullet () {
      getCreditBullet(rs => {
        this.bulletList = rs.payload;
        console.log(this.bulletList);
        this.startBullet();
      });
    },
    startBullet () {
      if (this.bulletList.length) {
        let key = this.bulletList.length * Math.random();
        let bullet = this.bulletList[parseInt(key)];
        if (bullet.length > 18) {
          while (bullet.length > 17) {
            let sub = bullet.indexOf('**') > -1 ? 22 : 18;
            this.flyList.push(bullet.substring(0, sub));
            bullet = bullet.substring(sub);
          }
          this.flyList.push(bullet);
        } else {
          this.flyList.push(bullet);
        }
      }
      this.bulletTop += 10 * parseInt(3 * Math.random());
      this.timer = setTimeout(this.startBullet, 1000);
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  },
  created () {
    this.getCreditBullet();
    // this.startBullet();
  }
};
</script>

<style lang="scss" scoped>
.bullet-box {
  position: relative;
  overflow: hidden;
  margin: 0.3rem auto 0;
  height: 0.54rem;
  line-height: 0.54rem;
  text-align: left;
  .list {
    position: absolute;
    width: 100%;
    top: 0;
    transition: all 5s;
    transition-timing-function: linear;
    & .bullet-fly {
      bottom: 100%;
    }
  }
}
.bullet {
  /* overflow: hidden;
  text-overflow: ellipsis; */
  font-size: 0.26rem;
  height: 0.54rem;
  white-space: nowrap;
  line-height: 0.54rem;
}
</style>

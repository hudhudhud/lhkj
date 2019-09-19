<template>
  <div>
    <div class="bullet-box" v-if="flyList.length">

      <div class="list" :style="{top:-bulletTop+'px'}">
        <div class="bullet" :style="{'color':'#fff'}" v-for="(bullet,ind) in flyList" :key="ind">
          {{bullet.txt}}
        </div>
      </div>

    </div>
  </div>

</template>
<script>export default {
  data() {
    return {
      timer: null,
      showpayMsg: false,
      flyList: [],
      bulletTop: 0,
      bulletList: [
        { txt: '恭喜155****3457用户抵购获得肯德基30元抵用券' },
        { txt: '恭喜185****2379用户抵购获得优酷会员月卡' },
        { txt: '恭喜152****8624用户抵购获得网易云音乐会员' },
        { txt: '恭喜133****5679用户抵购获得星巴克30元代金券' },
        { txt: '恭喜137****3918用户抵购获得哈根达斯50元代金券' },
        { txt: '恭喜156****3610用户抵购获得必胜客50元代金券' }
      ]
    };
  },
  methods: {
    startBullet() {
      if (this.bulletList.length) {
        let key = this.bulletList.length * Math.random();
        let bullet = this.bulletList[parseInt(key)];
        let fly = {
          txt: bullet.txt
        };
        this.flyList.push(fly);
      }
      this.bulletTop += 10 * parseInt(3 * Math.random());
      this.timer = setTimeout(this.startBullet, 1000);
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
  created() {
    this.startBullet();
  }
};
</script>
<style lang="scss" scoped>
.bullet-box {
  position: relative;
  overflow: hidden;
  text-align: center;
  margin: 15px auto 0;
  background-size: 100% 100%;
  height: 31px;
  line-height: 31px;
  text-align: left;
  // padding-left: 0.2rem;
  font-size: 14px;
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
  font-size: 14px;
  color: rgb(240, 37, 81);
  height: 31px;
  line-height: 31px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}
</style>

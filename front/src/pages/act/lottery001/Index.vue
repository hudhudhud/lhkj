<template>
  <div>
    <img
      :src="templateConfig.background"
      alt=""
      width="100%"
    >
    <Back type="toIndex"></Back>
    <div class="lottery">
      <div class="btn-group">
        <button
          class="my-prizes-btn"
          @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
        ></button>
        <button
          class="lettery-rules-btn"
          @click="showRules(act.detail)"
        ></button>
      </div>
      <HemiRotate
        ref="myRotate"
        v-if="showPannel"
        :setting="setting"
        @start="start"
        @end="rotateEnd"
        class="lottery-pannel"
        :templateConfig="templateConfig"
      ></HemiRotate>
      <!-- <p class="chances">剩余抽奖机会：{{chances}}</p> -->
      <div
        class="bullet"
        :class="{'bullet-fly':bullet.fly}"
        :style="{top:bullet.top+'px'}"
        v-for="(bullet,ind) in flyList"
        :key="ind"
      >
        恭喜:{{bullet.name}}获得:{{bullet.prizeName}}
      </div>
    </div>
  </div>
</template>

<script>
import pannelImage from './imgs/bg.png';
import pointerImage from './imgs/pointer.png';
import HemiRotate from '@/components/HemiRotate';
import { Indicator, Toast } from 'mint-ui';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    HemiRotate
  },
  data () {
    return {
      templateConfig: JSON.parse(this.act.templateConfig),
      showPannel: false,
      loading: false,
      rotating: false,
      chances: 0,
      prizeList: this.act.productList,
      currentPrize: null,
      setting: {
        pannelImage: pannelImage,
        pointerImage: pointerImage,
        names: this.act.productList.map(item => item.prizeName), // 大转盘奖品名称
        icons: this.act.productList.map(item => item.standardImgUrl),
        colors: [
          '#FFF4D6',
          '#FFFFFF',
          '#FFF4D6',
          '#FFFFFF',
          '#FFF4D6',
          '#FFFFFF'
        ], // 大转盘奖品区块对应背景颜色
        startAngle: 0, // 开始角度
        bRotate: false // false:停止;ture:旋转
      },
      bulletList: [],
      flyList: []
    };
  },
  computed: {
    actId () {
      return this.$route.params.actId;
    }
  },
  methods: {
    async buyChance () {
      Indicator.open();
      let rs = await this.$post('/api/buy_lottery', {
        actId: this.actId,
        num: '1'
      });
      if (rs.status === 200) {
        this.$dialog({
          state: true,
          content: {
            type: 'buy-lettery-chance',
            actualPrice: rs.payload.actualPrice,
            actId: this.actId,
            prepayId: rs.payload.prepayId,
            merchantAppid: this.$store.state.merchantAppid
          }
        });
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    showRules (txt) {
      this.$dialog({
        state: true,
        content: {
          type: 'lottery-rules-dialog',
          article: txt
        }
      });
    },
    initBullet () {
      let nameArr = ['赵', '钱', '孙', '李', '周', '吴', '郑', '王'];
      for (let i = 0; i < 100; i++) {
        this.bulletList.push({
          name: nameArr[i % nameArr.length] + '先生',
          prizeName: parseInt(Math.random() * 100) + '话费'
        });
      }
      this.startBullet();
    },
    startBullet () {
      let bulletInd = parseInt(this.bulletList.length * Math.random());
      let bullet = this.bulletList[bulletInd];
      let fly = {
        name: bullet.name,
        prizeName: bullet.prizeName,
        top: 10 * parseInt(10 * Math.random()),
        fly: false
      };
      this.flyList.push(fly);
      setTimeout(() => {
        fly.fly = true;
      });
      setTimeout(this.startBullet, 1000);
    },
    rotateEnd (prize) {
      this.rotating = false;
      // Toast('恭喜中奖:' + this.currentPrize.prizeName)
      this.$dialog({
        state: true,
        content: {
          proType: this.currentPrize.proType,
          type: 'current-prize-dialog',
          prizeName: this.currentPrize.prizeName,
          prizePic: this.currentPrize.standardImgUrl,
          titlePic: 1
        }
      });
    },
    async loadAct () {
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      }
      Indicator.close();
    },
    async start () {
      if (this.loading || this.rotating) {
        return;
      }
      Indicator.open();
      let result = await this.$get('api/get_lottery_info/' + this.actId);
      if (result.status === 200) {
        if (result.payload.chances < 1) {
          this.buyChance();
          Indicator.close();
          return;
        }
      }
      this.loading = true;
      let rs = await this.$post('api/lottery_draw', {
        actId: this.actId
      });
      if (rs.status === 200) {
        let standardId = rs.payload.standardId;
        this.chances--;
        this.prizeList.forEach((item, ind) => {
          if (item.standardId === standardId) {
            this.currentPrize = item;
            this.rotating = true;
            this.$refs.myRotate.rotate(ind);
          }
        });
      } else {
        Toast(rs.error);
      }
      this.loading = false;
      Indicator.close();
    }
  },
  created () {
    this.setting.names = [];
    this.setting.icons = [];
    this.act.productList.forEach(item => {
      this.setting.names.push(item.prizeName);
      this.setting.icons.push(item.standardImgUrl);
    });
    this.showPannel = true;
    this.loadAct();
    // this.initBullet()
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
img {
  display: block;
}
.lottery {
  position: absolute;
  top: 4.48rem;
  left: 0;
  right: 0;
  bottom: 0;
  height: 7.3rem;
  z-index: 80;
  overflow: visible;
  p {
    text-align: center;
    line-height: 0.5rem;
  }
  .btn-group {
    width: 3.8rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.18rem;
    button {
      width: 1.62rem;
      height: 0.5rem;
      line-height: 0.5rem;
      color: #fff;
      border: none;
    }
    .my-prizes-btn {
      background: url(./imgs/my-prizes-button.png) no-repeat;
      background-size: 100% 100%;
    }
    .lettery-rules-btn {
      background: url(./imgs/lettery-rules-button.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .bullet {
    position: absolute;
    top: 0;
    right: -2rem;
    transition: all 5s;
    transition-timing-function: linear;
    height: 0.3rem;
    line-height: 0.3rem;
    width: 2rem;
  }
  .bullet-fly {
    right: 100%;
  }
}
/* .bullet {
    position: absolute;
    top: 0;
    right: -2rem;
    transition: all 5s;
    transition-timing-function: linear;
    height: 0.3rem;
    line-height: 0.3rem;
    width: 2rem;
  }
  .bullet-fly {
    right: 100%;
  } */
/* .bullet {
    position: absolute;
    top: 0;
    right: -200px;
    transition: all 5s;
    transition-timing-function: linear;
    height: 30px;
    line-height: 30px;
    width: 200px;
  } */
</style>

<template>
  <div>
    <img :src="templateConfig.background" alt="" width="100%">
    <Back></Back>
    <div class="lottery">
      <div class="btn-group">
        <button class="lettery-rules-btn" @click="openMessage({keyward: 'showRules', detail: act.detail})">查看规则</button>
      </div>
      <HemiRotate ref="myRotate" v-if="showPannel" :setting="setting" @start="start" @end="rotateEnd" class="lottery-pannel"></HemiRotate>
      <MessageModal v-model="payloadModal" :act="act" @setAccount="setAccount"></MessageModal>
      <!-- <div class="chances">
        您还有{{chances}}次抽奖机会
      </div> -->
      <div class="bullet-box">
        <span>中奖名单：</span>
        <div class="list" :style="{top:-bulletTop+'px'}">
          <div class="bullet" v-for="(bullet,ind) in flyList" :key="ind">
            恭喜:{{bullet.name | formatPhone}}获得{{bullet.prizeName}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pannelImage from './imgs/pannel.png'
import pointerImage from './imgs/pointer.png'
import HemiRotate from './HemiRotate'
import { Indicator, Toast } from 'mint-ui'
import MessageModal from './lotteryModal/MessageModal'

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    HemiRotate, MessageModal
  },
  data () {
    return {
      payloadModal: {},
      account: '',
      error: '',
      templateConfig: JSON.parse(this.act.templateConfig),
      showPannel: false,
      loading: false,
      rotating: false,
      chances: 1,
      noMore: '',
      prizeList: this.act.productList,
      currentPrize: null,
      timer: null,
      orderCode: '',
      currentPage: 1,
      setting: {
        pannelImage: pannelImage,
        pointerImage: pointerImage,
        names: this.act.productList.map(item => item.prizeName), // 大转盘奖品名称
        icons: this.act.productList.map(item => item.standardImgUrl),
        colors: ['#ffeab0', '#FFFFFF', '#ffeab0', '#FFFFFF', '#ffeab0', '#FFFFFF'], // 大转盘奖品区块对应背景颜色
        startAngle: 0, // 开始角度
        bRotate: false // false:停止;ture:旋转
      },
      bulletList: [],
      bulletTop: 0,
      bulletFlag: false,
      flyList: [],
      prize: null
    }
  },
  computed: {
    actId () {
      return this.$route.params.actId
    }
  },
  methods: {
    setAccount (arg) {
      this.account = arg
      console.log(arg)
    },
    openMessage (payload) {
      console.log(payload)
      this.payloadModal = payload
    },
    async buyChance () {
      Indicator.open()
      let rs = await this.$post('/api/buy_lottery', {
        actId: this.actId,
        num: '1'
      })
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
        })
      } else {
        Toast(rs.error)
      }
      Indicator.close()
    },
    showRules (txt) {
      this.$dialog({
        state: true,
        content: {
          type: 'lottery-rules-dialog',
          article: txt
        }
      })
    },
    initBullet () {
      this.loadOrder()
    },
    startBullet () {
      if (this.bulletList.length) {
        let bullet = this.bulletList[parseInt(this.bulletList.length * Math.random())]
        let fly = {
          name: bullet.rechargeAccount,
          prizeName: bullet.proStandardName
        }
        this.flyList.push(fly)
      }
      this.bulletTop += 30
      this.timer = setTimeout(this.startBullet, 2500)
    },
    rotateEnd () {
      this.rotating = false
      this.prize.keyward = 'showPrize'
      this.openMessage(this.prize)
      this.loadOrder()
    },
    async loadAct () {
      Indicator.open()
      let rs = await this.$get('api/get_lottery_info/' + this.actId)
      if (rs.status === 200) {
        // this.chances = rs.payload.chances
      }
      Indicator.close()
    },
    async loadOrder () {
      let rs = await this.$post('/api/getAllOrderList?', {
        actId: this.act.actId,
        actType: '2,4,5',
        pageSize: 10,
        currentPage: this.currentPage
      })

      if (rs.status === 200) {
        let list = rs.payload.list
        if (!list || list.length === 0) {
          this.noMore = true
        } else {
          this.bulletList = []
          list.forEach((item) => {
            this.bulletList.push(item)
          })
        }
        // this.currentPage++
      }
      this.startBullet()
    },
    async start () {
      if (this.loading || this.rotating) {
        return
      }
      if (this.chances == 0) {
        // this.buyChance()
        Toast('很遗憾，您的机会已用尽')
        return
      }
      this.loading = true
      let rs = await this.$post('api/lottery_draw', {
        actId: this.actId,
        account: this.account
      })
      if (rs.status === 200) {
        this.prize = rs.payload
        let standardId = rs.payload.standardId
        this.orderCode = rs.payload.orderCode
        this.chances--
        this.prizeList.forEach((item, ind) => {
          if (item.standardId === standardId) {
            this.currentPrize = item
            this.rotating = true
            this.$refs.myRotate.rotate(ind)
          }
        })
      } else {
        Toast(rs.error)
      }
      this.loading = false
    }
  },
  created () {
    this.setting.names = []
    this.setting.icons = []
    this.act.productList.forEach(item => {
      this.setting.names.push(item.prizeName)
      this.setting.icons.push(item.standardImgUrl)
    })
    this.showPannel = true
    this.loadAct()
    this.initBullet()
  },
  mounted () {
    this.openMessage({keyward: 'showCommitPhoneNum'})
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
img {
  display: block;
}
.lottery {
  position: absolute;
  top: 3.4rem;
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
    margin-bottom: 0.18rem;
    text-align: center;
    button {
      width: 1.62rem;
      height: 0.6rem;
      line-height: 0.55rem;
      color: #fff;
      font-size: 0.24rem;
      border: none;
    }
    .my-prizes-btn {
      background: url(./imgs/btn.png) no-repeat;
      background-size: 100% 100%;
    }
    .lettery-rules-btn {
      background: url(./imgs/btn.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  .chances {
    width: 4rem;
    margin: 0.3rem auto;
    text-align: center;
    height: 0.6rem;
    line-height: 0.6rem;
    background: url(./imgs/chance-bg.png) no-repeat;
    background-size: 100% 100%;
    color: #fff;
  }
  .bullet-box {
    // position: relative;
    position: relative;
    overflow: hidden;
    width: 6rem;
    text-align: center;
    margin: 0 auto;
    background: url(./imgs/bullte-bg.png) no-repeat;
    background-size: 100% 100%;
    // border-radius: 0.3rem;
    height: 0.62rem;
    line-height: 0.62rem;
    text-align: left;
    padding-left: 0.2rem;
    // opacity: 0.3;
    span {
      color: #f48e0e;
    }
    .list {
      position: absolute;
      top: 0;
      left: 1.6rem;
      transition: all 5s;
      transition-timing-function: linear;
      & .bullet-fly {
        bottom: 100%;
      }
    }
  }
  .bullet {
    color: #fff;
    height: 0.62rem;
    line-height: 0.62rem;
    // width: 2rem;
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

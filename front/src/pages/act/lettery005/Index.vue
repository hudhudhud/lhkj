<template>
  <div>
    <img
      :src="templateConfig.background"
      alt=""
      width="100%"
    >
    <Back></Back>

    <div class="lottery">
      <div class="chance">
        您获得&nbsp;<b>{{chances}}</b>&nbsp;次抽奖机会
      </div>
      <div class="my-prize">
        <img
          src="./imgs/my-prize.png"
          alt=""
          @click="$router.push(`/${$store.state.merchantAppid}/merchant/index/prize`)"
        >
      </div>
      <HemiRotate
        ref="myRotate"
        v-if="showPannel"
        :setting="setting"
        @start="start"
        @end="rotateEnd"
        class="lottery-pannel"
      ></HemiRotate>
      <div class="rule">
        <img
          src="./imgs/rule-pic.png"
          alt=""
        >
      </div>
    </div>

    <MessageModal
      v-model="payloadModal"
      :act="act"
    ></MessageModal>

  </div>
</template>

<script>
import HemiRotate from './HemiRotate';
import { Indicator, Toast } from 'mint-ui';
import { initWXShare } from '@/utils';
import MessageModal from './lotteryModal/MessageModal';

export default {
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  components: {
    HemiRotate,
    MessageModal
  },
  data () {
    return {
      payloadModal: {},
      account: this.$store.state.cust ? this.$store.state.cust.tel : '',
      error: '',
      templateConfig: JSON.parse(this.act.templateConfig),
      showPannel: false,
      loading: false,
      rotating: false,
      chances: 0,
      noMore: '',
      prizeList: this.act.productList,
      currentPrize: null,
      timer: null,
      orderCode: '',
      currentPage: 1,
      setting: {
        pannelImage: JSON.parse(this.act.templateConfig).pannel,
        pointerImage: JSON.parse(this.act.templateConfig).pointer,
        names: this.act.productList.map(item => item.prizeName), // 大转盘奖品名称
        icons: this.act.productList.map(item => item.standardImgUrl),
        colors: ['#8fb8fa', '#fff', '#8fb8fa', '#fff', '#8fb8fa', '#fff'], // 大转盘奖品区块对应背景颜色 // 大转盘奖品区块对应背景颜色
        /*   colors: [
          'transparent',
          'transparent',
          'transparent',
          'transparent',
          'transparent',
          'transparent'
        ], */ startAngle: 0, // 开始角度
        bRotate: false // false:停止;ture:旋转
      },
      bulletList: [],
      bulletTop: 0,
      bulletFlag: false,
      flyList: [],
      prize: null,
      shareConfig: null
    };
  },
  computed: {
    actId () {
      return this.$route.params.actId;
    }
  },
  methods: {
    async loadOrder () {
      let rs = await this.$post('/api/getOrderList?', {
        actId: this.actId,
        status: 2
      });
      if (rs.status === 200 && rs.payload.list) {
        let list = rs.payload.list;
        this.prize = list[0];
        this.prize.keyward = 'payPrizeShow';
        this.openMessage(this.prize);
      }
    },
    openMessage (payload) {
      console.log(payload);
      this.payloadModal = payload;
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

    rotateEnd () {
      this.rotating = false;
      this.prize.keyward = 'showPrize';
      this.timer = setTimeout(() => {
        this.openMessage(this.prize);
      }, 2000);
    },

    async loadAct () {
      Indicator.open();
      let rs = await this.$get('api/get_lottery_info/' + this.actId);
      if (rs.status === 200) {
        this.chances = rs.payload.chances;
      } else {
        this.$toast(rs.error);
      }
      Indicator.close();
    },
    // 绑定用户 ,ownerId 分享人的Id
    async bindUsers (ownerId) {
      // 当前用户id
      let custId = this.$store.state.cust.id;
      // 自己不用绑定
      if (custId === ownerId) {
        return;
      }
      Indicator.open();
      let rs = await this.$post('api/activity/bind/user/relation', {
        actId: this.act.actId, // 扫脸抽奖
        mainCustomId: ownerId
      });
      if (rs.status === 200) {
        console.log('绑定用户成功');
      } else {
        this.$toast(rs.error);
      }
      Indicator.close();
    },
    async start () {
      if (this.loading || this.rotating) {
        return;
      }
      this.loading = true;
      let rs = await this.$post('api/lottery_draw', {
        actId: this.actId
      });
      if (rs.status === 200) {
        this.prize = rs.payload;
        let standardId = rs.payload.standardId;
        this.orderCode = rs.payload.orderCode;
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
    this.loadOrder();
  },
  mounted () {
    if (navigator.userAgent.indexOf('MicroMessenger') > 0) {
      let link =
        window.location.href.replace(window.location.search, '') +
        '?ownerId=' +
        this.$store.state.cust.id;
      let shareConfig = {
        title: '微信新绑卡，建行送好礼', // 分享标题
        desc: '手机话费，华为P30送不停', // 分享描述
        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl:
          window.location.protocol +
          '//static.lianhaikeji.com/images/20190425/3366772264194469ae2a87329786e7ec.jpg',
        success: function () {}
      };
      initWXShare(shareConfig);
    }
    let ownerId = this.$route.query.ownerId;
    if (ownerId) {
      this.bindUsers(ownerId);
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
img {
  display: block;
}
.lottery {
  position: absolute;
  top: 4.8rem;
  left: 0;
  right: 0;
  bottom: 0;
  height: 7.3rem;
  z-index: 80;
  overflow: visible;
  .chance {
    text-align: center;
    padding-bottom: 0.2rem;
    color: #fff;
    font-size: 0.26rem;
    b {
      color: rgb(251, 203, 66);
      font-family: "PingFang SC";
    }
  }
  .my-prize {
    position: absolute;
    top: -0.4rem;
    right: 0;
    img {
      width: 2rem;
    }
  }
  p {
    text-align: center;
    line-height: 0.5rem;
  }
}
.rule {
  width: 6.94rem;
  margin: 0.2rem auto 0;
  img {
    width: 100%;
  }
}
</style>

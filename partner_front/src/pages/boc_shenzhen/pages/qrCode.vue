<template>
  <div class="page">
    <div class="cont">
      <div class="pic">
        <img :src="headImgUrl" alt="">
      </div>
      <!-- <img class="forward" src="./imgs/forward.png" /> -->
      <div class="text">用户：<span>{{nickname}}</span></div>
      <div class="text">等级：<span>{{rankName}}</span></div>
      <div class="qrcode">
        <img :src="src" alt="">
        <span>扫码开启青春航行吧</span>
      </div>
      <div class="tips">
        <div class="title"></div>
        <div class="text"><span>津贴一:</span>将你的个人二维码发送给周围的朋友、同学、同事等，邀请TA们成为你的合伙人，成功邀请1位获得5金币（每年通过分享最高可获得200金币），被邀请人成功注册，同时获得50金币。</div>
        <div class="text"><span>津贴二:</span>如果你推荐的合伙人从未办理过中行信用卡、邀请TA办卡一起体验，成功后你将获得200金币。</div>
        <div class="text"><span>注：</span>金币有效期为1年。</div>

      </div>
    </div>
  </div>
</template>
<script>
import jssdk from '@/lib/jssdk';
import config from '../config';
export default {
  name: 'qrCode',
  data () {
    return {
      merchantId: config.merchantId,
      headImgUrl: null,
      nickname: null,
      src: null,
      rankName: '',
      rankList: [
        '纯真小学生',
        '青春中学生',
        '睿智高中生',
        '科研大学生',
        '智慧研究生'
      ]
    };
  },
  methods: {
    getheadImgUrl () {
      this.headImgUrl = this.$store.state.cust.headImgUrl;
      this.nickname = this.$store.state.cust.nickname;
    },
    loadEwm () {
      let cusid = this.$store.state.cust.id;
      let linkQrcode =
        window.location.protocol +
        '//' +
        window.location.host +
        '/partner/szzh?share=' +
        cusid;
      this.src = `//hmurl.cn/qrcode/get?text=${encodeURIComponent(
        linkQrcode
      )}&width=400&margin=0&correction=L`;
    },
    // 剩余积分
    async getTotalCredit () {
      let rs = await this.$post('/user_credit/get', {
        customId: this.$store.state.cust.id
      });
      if (rs.status == 200) {
        let accumulatedCredit = rs.payload.accumulatedCredit || 0;
        let i = parseInt(accumulatedCredit / 1000);
        i = i >= this.rankList.length ? this.rankList.length - 1 : i;
        this.rankName = this.rankList[i];
      } else {
        this.$toast(rs.error);
      }
    }
  },
  created () {
    this.getheadImgUrl();
    this.loadEwm();
    this.getTotalCredit();
    let link =
      `${window.location.protocol}//${
        window.location.host
      }/partner/szzh/home?share=` + this.$store.state.cust.id;
    this.shareConfig = {
      title: '深圳中行信用卡合伙人', // 分享标题
      desc: '玩转合伙人，大奖随心领', // 分享描述
      link: link, // 分享，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `https://static.lianhaikeji.com/images/20190711/ab2e3535c8cb4d978e44446681e94d78.png` // 分享图标
    };
    jssdk.jssdk.init('', this.merchantId, '1', val => {
      this.$jssdk.call('share', this.shareConfig);
    });
  }
};
</script>
<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: url(./imgs/qrcode-bg.jpg) no-repeat center top;
  background-size: 100% 100%;
  padding-top: 3.26rem;
  padding-bottom: 0.64rem;
  .forward {
    position: absolute;
    top: 0.3rem;
    right: 0;
    width: 1.25rem;
  }
  .cont {
    height: 12.39rem;
    width: 7.11rem;
    background: url(./imgs/qrcode-cont-bg.png) no-repeat center bottom;
    background-size: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .pic {
      height: 1.76rem;
      width: 1.76rem;
      background-color: #83f4de;
      border-radius: 50%;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0.1rem;
      img {
        border-radius: 50%;
        display: block;
        width: 1.52rem;
        height: 1.52rem;
        background-color: #eee;
        border: 0.08rem solid #389dbd;
        box-sizing: content-box;
      }
    }
    .text {
      font-size: 0.28rem;
      margin-top: 0.02rem;
      color: #222;
      span {
        font-size: 0.4rem;
        color: #222;
      }
    }
    .qrcode {
      width: 4.72rem;
      height: 4.72rem;
      border-radius: 0.2rem;
      border: solid 1px #222222;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      margin-top: 0.18rem;
      img {
        width: 4.18rem;
        height: 4.18rem;
      }
      span {
        position: absolute;
        right: -0.4rem;
        top: 0.27rem;
        font-size: 0.26rem;
        color: #f14349;
        display: block;
        width: 0.26rem;
      }
    }
    .tips {
      margin-top: 0.3rem;
      width: 6.52rem;
      background-color: rgba(244, 162, 171, 0.1);
      border-radius: 0.3rem;
      .title {
        margin-top: 0.38rem;
        height: 0.33rem;
        background: url(./imgs/qrcode-tips-title.png) no-repeat center;
        background-size: 3.71rem 0.33rem;
        margin-bottom: 0.26rem;
      }
      .text {
        font-size: 0.26rem;
        color: #222;
        width: 5.75rem;
        margin: 0 auto;
        text-align: justify;
        line-height: 0.36rem;
        margin-bottom: 0.2rem;
        span {
          font-size: 0.28rem;
          color: #da6b6f;
        }
      }
    }
  }
}
</style>

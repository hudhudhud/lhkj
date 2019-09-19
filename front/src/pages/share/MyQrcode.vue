<template>
  <div class="bg">
    <div class="main">
      <div class="share-content">
        <div class="qrcode-msg">
          <img class="user-share-img" :src="cust.headImgUrl || avatarImg">
          <span>{{$route.params.phoneNum}}请你助力</span>
        </div>
        <div class="qrcode-con">
          <div class="qrcode-box">
            <img :src="src"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatarImg from './imgs/aa-test-avatar.jpg'
import jssdk from '@/lib/jssdk'
import {Indicator} from 'mint-ui'
export default {
  data () {
    return {
      link: '',
      src: '',
      merchantId: this.$store.state.merchantId,
      customId: this.$store.state.cust ? this.$store.state.cust.id : null,
      shareConfig: {},
      cust: this.$store.state.cust,
      avatarImg: avatarImg
    }
  },
  methods: {
    qrcode () {
      this.src = `//hmurl.cn/qrcode/get?text=${encodeURIComponent(this.link)}&width=400&margin=0`
    }
  },
  mounted () {
    this.link = window.location.href.split(this.$route.params.customId)[0] + this.$store.state.cust.id + '/acEntrance'
    this.qrcode()
    Indicator.open()
    this.$store.commit('setIsReady', false)
    this.shareConfig = {
      title: '建行龙虎榜,揭榜有大礼', // 分享标题
      desc: '点击参与', // 分享描述
      link: this.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `${window.location.protocol}//static.lianhaikeji.com/images/20180910/7e01933e409b42a6a03e50ea97aaefe2.jpg` // 分享图标
    }
    jssdk.jssdk.init('', this.merchantId, '1', (val) => {
      this.$jssdk.call('share', this.shareConfig)
      Indicator.close()
    })
  }
}
</script>

<style scoped>
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    background: #5a70f8;
    width: 100%;
    height: 100%;
  }

  .main {
    background: url("./imgs/ewm_bg.jpg") no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 12.06rem;
  }

  .background img {
    display: block;
    width: 100%;
  }

  .share-content {
    padding-top: 6.65rem;
  }

  /*.qrcode-msg {
    margin-bottom: 0.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 0.28rem;
  }*/

  .qrcode-msg {
    display: none;
  }

  .user-share-img {
    margin-right: 0.2rem;
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    vertical-align: middle;
    border: 0.08rem solid rgba(255, 255, 255, 0.7);
    border-radius: 50%;
  }

  .qrcode-con {
    position: relative;
    font-size: 0;
    text-align: center;
  }

  .qrcode-box {
    margin: 0 auto;
    width: 3rem;
    height: 3rem;
  }

  .qrcode-box img {
    width: 3rem;
    height: 3rem;
  }
</style>

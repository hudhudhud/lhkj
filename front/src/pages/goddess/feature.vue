<template>
  <div class="feature">
    <img id="featureBack" @load="loadImg" src="" alt="" style="display:none">
    <img id="featureBody" @load="loadImg" src="" alt="" style="display:none">
    <img id="featureTips" @load="loadImg" src="" alt="" style="display:none">
    <img id="featureQua" @load="loadImg" src="" alt="" style="display:none">
    <img id="featureCommon" @load="loadImg" src="" alt="" style="display:none">
    <img class="feature-res" :src="resSrc" alt="" style="width:100%">
    <div id="qrcode" style="display: none"></div>
    <img id="code" src="" alt="" style="display: none">
    <canvas id="canvas" style="display: none"></canvas>
      <div class="feature-action">
        <div class="feature-footer">
          <div class="feature-action_txt"></div>
          <div class="feature-action_btn" @click="toGetReward"></div>
        </div>
      </div>
  </div>
</template>

<script>
import q1 from './img/feature/q1.png';
import q2 from './img/feature/q2.png';
import q3 from './img/feature/q3.png';
import q4 from './img/feature/q4.png';
import q5 from './img/feature/q5.png';
import q6 from './img/feature/q6.png';
import q7 from './img/feature/q7.png';
import s1 from './img/feature/s1.png';
import s2 from './img/feature/s2.png';
import s3 from './img/feature/s3.png';
import s4 from './img/feature/s4.png';
import s5 from './img/feature/s5.png';
import s6 from './img/feature/s6.png';
import s7 from './img/feature/s7.png';
import featureBackUrl from './img/feature/feature_back.jpg';
import featureTipsUrl from './img/feature/tips.png';
import featureCommonUrl from './img/feature/common.png';
import jssdk from '@/lib/jssdk';

export default {
  name: 'feature',
  data () {
    return {
      featureBackPrefix: 'q',
      featureBack: '',
      picSrc: '',
      picArr: [q1, q2, q3, q4, q5, q6, q7],
      saySrc: [s1, s2, s3, s4, s5, s6, s7],
      resSrc: '',
      loadedCount: 0
    }
  },
  mounted () {
    let link = `${window.location.protocol}//${window.location.host}/${this.$store.state.merchantAppid}/merchant/goddess/index`;
    this.shareConfig = {
      title: '38缤纷女神节，建行邀您站C位', // 分享标题
      desc: '建行广州分行，让你众星捧月做女神，颜值担当 舍你其谁 快来测一测吧', // 分享描述
      link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: `${window.location.protocol}//static.lianhaikeji.com/images/20190308/c5ba62dd8409456bbfde6fdc9da85228.jpg` // 分享图标
    }
    jssdk.jssdk.init('', this.merchantId, '1', (val) => {
      this.$jssdk.call('share', this.shareConfig)
      // Indicator.close()
    });
    let no = this.$route.query.no || '1';
    this.picSrc = this.picArr[no - 1];
    this.saySrc = this.saySrc[no - 1];
    this.buildCanvas();
  },
  methods: {
    toGetReward () {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/goddess/card?no=${this.$route.query.no}`
      );
    },
    // 生成二维码,并画入canvas
    buildCode (canvas, ctx, dpr) {
      let storeCode = this.$store.state.merchantAppid;
      let ownerId = '';
      if (this.$store.state.cust) {
        ownerId = this.$store.state.cust.id;
      }
      console.log('feature:' + ownerId);
      let linkQrcode = `${window.location.protocol}\/\/${window.location.host}\/${storeCode}\/merchant\/goddess\/index?ownerId=${ownerId}`;
      console.log('linkQr:' + linkQrcode);
      try {
        let codeEl = document.getElementById('code');
        codeEl.setAttribute('crossOrigin', 'anonymous');
        codeEl.setAttribute('src', `//hmurl.cn/qrcode/get?text=${encodeURIComponent(linkQrcode)}&width=400&margin=0`);
        codeEl.onload = () => {
          ctx.drawImage(codeEl, 93 * dpr, 1169 * dpr, 85 * dpr, 85 * dpr);
          let url = canvas.toDataURL('image/png');
          this.resSrc = url;
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 等待所有静态资源加载完成，再绘制canvas,否则绘画顺序可能成为灾难
    loadImg () {
      this.loadedCount++;
      if (this.loadedCount === 5) {
        this.buildCanvas();
      }
    },
    // 构建canvas,把原图让canvas画出来
    buildCanvas () {
      let canvas = document.getElementById('canvas');
      let context = canvas.getContext('2d');
      let featureBack = document.getElementById('featureBack');
      let featureBody = document.getElementById('featureBody');
      let featureTips = document.getElementById('featureTips');
      let featureQua = document.getElementById('featureQua');
      let featureCommon = document.getElementById('featureCommon');
      let dpr = window.devicePixelRatio;
      featureBack.crossOrigin = 'anonymous';
      featureBody.crossOrigin = 'anonymous';
      featureTips.crossOrigin = 'anonymous';
      featureQua.crossOrigin = 'anonymous';
      featureCommon.crossOrigin = 'anonymous';
      featureBack.src = featureBackUrl;
      featureBody.src = this.picSrc;
      featureTips.src = featureTipsUrl;
      featureQua.src = this.saySrc;
      featureCommon.src = featureCommonUrl;
      canvas.width = 750 * dpr;
      canvas.height = 1334 * dpr;
      context.drawImage(featureBack, 0, 0, featureBack.width * dpr, featureBack.height * dpr);
      context.drawImage(featureBody, 100.5 * dpr, 150 * dpr, featureBody.width * dpr, featureBody.height * dpr);
      context.drawImage(featureTips, 235 * dpr, 970 * dpr, featureTips.width * dpr, featureTips.height * dpr);
      context.drawImage(featureQua, 57 * dpr, 1024 * dpr, featureQua.width * dpr, featureQua.height * dpr);
      context.drawImage(featureCommon, 227 * dpr, 1185 * dpr, featureCommon.width * dpr, featureCommon.height * dpr);
      // let url = canvas.toDataURL('image/png');
      // this.resSrc = url;
      // 画完其他图案后，再画二维码
      this.buildCode(canvas, context, dpr);
    }
  }
}
</script>

<style scoped lang="scss">
  #canvas {
    width: 7.5rem;
    height: 13.34rem;
  }

  .feature {
    position:relative;
    width: 100%;
    height: 13.34rem;
    &-footer{
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    &-action{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      height: 2.5rem;
      background-color: rgba(80,0,97,0.63);
      z-index: 10;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      &_txt{
        width: 6.28rem;
        height: 0.77rem;
        background-image: url('./img/feature/feature-footer.png');
        background-size: 100% 100%;
      }
      &_btn{
        width: 2.66rem;
        height: 0.66rem;
        background-image: url('./img/feature/gift_btn.png');
        background-size: 100% 100%;
        margin-top: 0.2rem;
      }
    }
  }
</style>

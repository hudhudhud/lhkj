<template>
  <div style="background: #132E87; height: 100%; width: 100%">
    <img :src="src" style="width: 100%;"/>
  </div>
</template>

<script>
import imgUploadUrl from './imgs/ewm.png';

export default {
  data () {
    return {
      qrImg: '',
      bgImg: '',
      src: ''
    }
  },
  methods: {
    loadQR () {
      let cusid = this.$store.state.cust.id
      if (cusid) {
        let linkQrcode = window.location.protocol + '//' + window.location.host + '/partner/rfyh?share=' + cusid;
        let qrsrc = `//hmurl.cn/qrcode/get?text=${encodeURIComponent(linkQrcode)}&width=400&margin=0`
        let ewm = new Image()
        ewm.crossOrigin = 'anonymous'
        ewm.setAttribute('src', qrsrc)
        this.qrImg = ewm
        ewm.onload = () => {
          this.loadBG()
        }
      }
    },
    loadBG () {
      let bg = new Image()
      bg.crossOrigin = 'anonymous';
      bg.src = imgUploadUrl;
      this.bgImg = bg;
      bg.onload = () => {
        this.qrcode()
      }
    },
    qrcode () {
      try {
        let dpr = window.devicePixelRatio;
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        // 绘制
        canvas.width = 750 * dpr;
        canvas.height = 1334 * dpr;
        context.drawImage(this.bgImg, 0, 0, 750 * dpr, 1334 * dpr);
        context.drawImage(this.qrImg, 280 * dpr, 1120 * dpr, 200 * dpr, 180 * dpr);
        this.src = canvas.toDataURL('image/png');
      } catch (e) {
        alert(e);
      }
    }
  },
  mounted () {
    this.loadQR()
  }
}
</script>

<style scoped>
</style>

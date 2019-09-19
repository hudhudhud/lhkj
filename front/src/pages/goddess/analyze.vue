<template>
  <div class="analyze">
    <div class="analyze-avatar" id="preview">
      <img id="origin" src="./img/photo.png" style="width:100%" alt="">
      <div class="analyze-border"></div>
    </div>
    <div class="analyze-mask" v-show="scanning">
      <div class="analyze-scanner" id="scanner"></div>
    </div>
    <div class="analyze-action" v-show="!uploading" ></div>
    <input type="file" id="uploadFile" @change="onFileChange" @click="upload" accept="image/*">
  </div>
</template>

<script>
export default {
  name: 'analyze',
  data () {
    return {
      scanning: false,
      uploading: false,
      no: ''
    }
  },
  mounted () {
    this.uploading = false;
    setTimeout(() => {
      this.$toast('请上传正脸照片');
    }, 500)
  },
  methods: {
    upload () {
      // let uploadBtn = document.getElementById('uploadFile');
      // this.$toast('请上传正脸照片');
      // setTimeout(() => {
      //   uploadBtn.click();
      // }, 500);
    },
    onFileChange (e) {
      let self = this;
      let file = null;
      try {
        if (e) {
          file = e.target;
        } else {
          file = document.querySelector('input[type=file]').files[0];
        }
        const previewEl = document.getElementById('preview');
        let imgEl = document.createElement('img');
        imgEl.setAttribute('id', 'img');
        imgEl.setAttribute(
          'style',
          'width:5.2rem;height:5.2rem;transform:scale(0.9)'
        );
        if (file.files && file.files[0]) {
          previewEl.appendChild(imgEl);
          let img = document.getElementById('img');
          img.onload = function () {
            img.width = 520;
            img.height = 520;
          }
          let reader = new FileReader();
          reader.onload = function (evt) {
            previewEl.removeChild(document.getElementById('origin'));
            img.src = evt.target.result;
          }
          reader.onloadend = function (e) {
            console.log('文件读取完成，可以渲染了');
            self.$toast('正在检测您的女神气质');
            let random = Math.floor(Math.random() * 7 + 1);
            self.no = random;
            console.log('您的幸运数字是：' + random);
            self.uploading = true;
            setTimeout(() => {
              self.scanning = true;
            }, 1500);
            setTimeout(() => {
              self.$toast('哈哈，结果出来了你竟然是....');
              self.$router.push(
                `/${self.$store.state.merchantAppid}/merchant/goddess/result?no=${self.no}`
              );
            }, 6000)
          }
          reader.onprogress = function (e) {
            console.log('正在读取文件，已读取：' + e.loaded + '一共：' + e.total);
          }
          reader.readAsDataURL(file.files[0]);
        }
      } catch (e) {
        alert(JSON.stringify(e));
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .analyze {
    position: relative;
    width: 100%;
    height: 13.34rem;
    background-image: url("./img/games_back.jpg");
    background-size: 100% 100%;

    &-avatar {
      position: absolute;
      top: 6.66rem;
      left: 50%;
      transform: translateX(-50%);
      width: 5.2rem;
      height: 5.2rem;
    }
    &-border{
      position: absolute;
      z-index: 100;
      top: 0.55rem;
      left: 50%;
      transform: translateX(-50%);
      width: 4rem;
      height: 4rem;
      background-image:url("./img/photo_back.png");
      background-size: 100% 100%;
    }
    &-mask {
      position: absolute;
      top: 6.66rem;
      left: 50%;
      transform: translateX(-50%);
      width: 5.2rem;
      height: 5.2rem;
      background: rgba(0, 0, 0, .5);
      z-index: 10;
    }

    &-scanner {
      width: 4rem;
      height: 0.04rem;
      background: pink;
      position: absolute;
      top: 0.25rem;
      left: 50%;
      margin-left: -2rem;
      animation: scan 5s ease-in-out;
    }

    &-action {
      width: 3.26rem;
      height: 0.7rem;
      position: absolute;
      top: 12.22rem;
      left: 50%;
      z-index: 100;
      transform: translateX(-50%);
      background-image: url("./img/upload_btn.png");
      background-size: cover
    }
    input{
      width: 3.26rem;
      height: 0.7rem;
      position: absolute;
      top: 12.22rem;
      left: 50%;
      z-index: 101;
      transform: translateX(-50%);
      opacity: 0;
    }
  }

  @keyframes scan {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(4.75rem);
    }
    100% {
      transform: translateY(0);
    }
  }
</style>

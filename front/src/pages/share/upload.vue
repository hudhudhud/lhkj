<template>
  <div class="main">
    <div class="upload form">
      <div class="upload-title">请上传您的二维码</div>
      <div class="form-row">
        <div class="form-label">活动名称</div>
        <div class="form-input">
          <input type="text" placeholder="请输入活动名称" v-model='imgName'>
        </div>
      </div>
      <div class="upload-content">
        <div class="upload-wrap">
          <div class="upload-img">
            <img src="./imgs/addImg.png">
            <input type="file" @change="imgPreview" style="opacity: 0;width: 100%;height: 100%;position: absolute;z-index: 100;" name='file' accept="image/*" />
          </div>
          <img :src="imgSrc" v-if='imgSrc'>
        </div>
      </div>
      <div class="upload-action" @click='uploadData'>上传二维码</div>
      <div class="upload-action" style="margin: -0.5rem auto 1rem auto" @click="$router.push('seeDimensionalCode')">查看二维码</div>
    </div>
  </div>
</template>

<script>
import {MessageBox, Indicator} from 'mint-ui';
import request from '@/lib/Request'
export default {
  name: 'upload',
  data () {
    return {
      imgSrc: '',
      imgName: '',
      file: null,
      resultUrl: ''
    }
  },
  methods: {
    imgPreview (e) {
      let reader, _that;
      // 判断是否支持FileReader
      if (window.FileReader) {
        reader = new FileReader();
      } else {
        MessageBox('您的设备不支持图片预览功能，如需该功能请升级您的设备！');
      }
      // 本地获取文件
      this.file = document.querySelector('input[type=file]').files[0];
      let imageType = /^image\//;
      // 是否为图片
      if (!imageType.test(this.file.type)) {
        MessageBox('请选择二维码图片！');
        return;
      }
      // 本地读取完成
      _that = this;
      reader.onload = function (e) {
        // 图片路径设置为读取的图片
        _that.imgSrc = e.target.result;
      };
      reader.readAsDataURL(this.file);
    },
    uploadData () {
      if (!this.imgName) {
        MessageBox({
          message: '请输入活动名称',
          title: '温馨提示',
          showCancelButton: false,
          confirmButtonText: '确定'
        });
      } else {
        if (!this.file) {
          MessageBox({
            message: '请选择需要上传的图片',
            title: '温馨提示',
            showCancelButton: false,
            confirmButtonText: '确定'
          });
          return;
        }
        let param = new FormData();
        param.append('file', this.file);
        console.log('判断传入值', param.get('file'));
        Indicator.open();
        request.post('file/upload', param).then(res => {
          if (res.status == 200) {
            this.resultUrl = res.payload;
            request.post('api/referee/saveImg', {
              cusId: this.$store.state.cust.id,
              imgName: this.imgName,
              imgUrl: this.resultUrl
            }).then(res => {
              if (res.status == 200) {
                MessageBox({
                  message: '二维码上传成功',
                  title: '成功提示',
                  showCancelButton: false,
                  confirmButtonText: '确定'
                });
              }
              Indicator.close();
            });
          }
        });
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: 14.5rem;
    background: #eaf1f7;
  }
  .upload {
    width: 100%;
    height: 13.34rem;
    background: url(./imgs/bg.png) no-repeat;
    background-size: 100% 100%;
    &-title {
      width: 100%;
      height: 2.2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
      font-weight: normal;
      color: rgba(0, 0, 0, 0.5);
    }
    &-content {
      width: 100%;
      height: 6rem;
      display: flex;
      justify-content: center;
    }
    &-wrap {
      width: 4.9rem;
      height: 5.4rem;
      padding-top: 0.4rem;
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      &>img {
        width: 5rem;
        height: 5rem;
        position: absolute;
      }
    }
    &-img {
      width: 5rem;
      height: 5rem;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    &-action {
      width: 65%;
      margin: 1rem auto;
      height: 0.7rem;
      line-height: 0.7rem;
      background-image: linear-gradient(-90deg, #fe3f3f 0%, #ff6447 28%, #ff884e 100%), linear-gradient(#085f23, #085f23);
      box-shadow: 0.05rem 0.03rem 0.09rem 0 rgba(124, 124, 124, 0.23);
      border-radius: 0.15rem;
      text-align: center;
      font-size: 0.32rem;
      color: #fff;
    }
  }

  .form {
    input,
    select {
      width: 100%;
      height: 0.7rem;
      line-height: 0.7rem;
      padding-left: 0.2rem;
      background: transparent;
      border: none;
      outline: none;
      background: #fff;
    }
    &-row {
      display: flex;
      align-items: center;
      padding: 0 0.8rem;
      margin: 0.85rem 0;
    }
    &-label {
      flex: none;
      width: 1.5rem;
    }
    &-input {
      flex-grow: 1;
      height: 0.7rem;
      line-height: 0.7rem;
      border-radius: 0.2rem;
    }
  }
</style>

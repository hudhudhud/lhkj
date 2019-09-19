<template>
  <div>
    <div class="upload form">
      <div class="upload-title">查看二维码</div>
      <div class="form-row">
        <div class="form-label">选择二维码</div>
        <div class="form-input">
          <select name="category" id="category" @change="getCarModel" v-model='parentCategory'>
                <option v-for="(item,index) in imgSrcArr" :value="index" :key='index'>{{ item.imgName }}</option>
          </select>
        </div>
      </div>
      <div class="upload-content">
        <div class="upload-wrap">
          <div class="upload-img" v-if='imgSrcArr.length<=0'>
            暂无二维码
          </div>
          <img :src="imgSrcArr[checkedIndex].imgUrl" alt="" v-else>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'upload',
  data () {
    return {
      imgSrcArr: [],
      checkedIndex: 0,
      parentCategory: 0
    }
  },
  methods: {
    getCarModel () {
      this.checkedIndex = this.parentCategory;
    },
    async getReceiveState () {
      let res = await this.$post('api/referee/queryImg', {
        cusId: this.$store.state.cust.id
      });
      if (res.status == 200) {
        console.log('返回的数组', res.payload);
        this.imgSrcArr = res.payload;
      }
    }
  },
  created () {
    this.getReceiveState();
  }
}
</script>

<style scoped lang="scss">
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
      justify-content: center;
      align-items: center;
      &>img {
        width: 100%;
        height: 100%;
      }
    }
    &-img {
      width: 1.6rem;
      height: 1.6rem;
      display: flex;
      justify-content: center;
      align-items: center;
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

<template>
  <div
    class="content"
    v-if="standard"
  >
    <div
      class="topic"
      v-if="standard.proType == 9"
    >收货地址</div>
    <div
      class="address"
      v-if="standard.proType == 9"
    >
      <div
        class="addinfo"
        v-if="this.address"
      >
        <div class="info">
          <div
            class="pretermit"
            v-if="this.address.isDefault==1"
          >默认</div>
          <div class="add">
            {{this.address.name}}
            <span>{{this.address.phone}}</span>
            <p>{{this.address.provinceName}}{{this.address.cityName}}{{this.address.areaName}}{{this.address.detailAddress}}</p>
          </div>
        </div>
        <div
          class="editor"
          @click="gotoaddressList"
        >
          <img
            src="./img/arrow.png"
            alt
          >
        </div>
      </div>
    </div>
    <div
      class="add-btn"
      v-if="standard.proType == 9 && !address"
      @click="gotoaddressList"
    >
      <b>+</b>请填写收货地址
    </div>
  </div>
</template>
<script>
export default {
  name: 'Address',
  props: {
    standard: {
      require: false,
      type: Object
    },
    act: {
      require: false,
      type: Object
    },
    address: {
      require: false,
      type: Object
    }
  },

  methods: {
    gotoaddressList () {
      this.$emit('add-address');
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.content {
  .topic {
    padding-left: 0.32rem;
    font-size: 0.3rem;
    margin-top: 0.3rem;
  }
  .address {
    padding: 0.2rem 0.32rem 0.32rem;
    p {
      font-size: 0.28rem;
      color: rgb(51, 51, 51);
      margin-bottom: 0.25rem;
    }
    .addinfo {
      display: flex;
      justify-content: space-between;
      font-size: 0.3rem;
      color: rgb(51, 51, 51);
      .info {
        display: flex;
        .pretermit {
          width: 0.64rem;
          height: 0.34rem;
          color: rgb(232, 81, 81);
          background-color: rgb(248, 227, 220);
          text-align: center;
          line-height: 0.34rem;
          font-size: 0.24rem;
        }
        .add {
          margin-left: 0.16rem;
          span {
            font-size: 0.28rem;
            color: rgb(179, 182, 188);
          }
          p {
            margin-top: 0.16rem;
          }
        }
      }
    }
    .editor {
      text-align: center;
      width: 0.78rem;
      img {
        width: 0.48rem;
      }
    }
  }
  .add-btn {
    width: 3.6rem;
    border-radius: 0.4rem;
    height: 0.7rem;
    color: #fff;
    font-size: 0.3rem;
    line-height: 0.7rem;
    background: #5fb534;
    text-align: center;
  }
}
</style>

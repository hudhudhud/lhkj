<template>
  <div class="carinfo">
    <div class="carinfo-header">
      <div>推荐办卡信息</div>
    </div>
    <div class="nav">
      <div
        class="nav-item"
        :class="{'nav-item-active':currentTab=='recommended'}"
        @click="getAll"
      >已推荐</div>
      <div class="nav-item" :class="{'nav-item-active':currentTab==''}" @click="getcarapplyed">已办卡</div>
    </div>
    <div class="carinfo-main">
      <div class="list" v-show="currentTab==''">
        <div class="list-item" v-for="(item , index) in carapplyedList" :key="'inx' + index">
          <img :src="item.headImgUrl">
          <div class="flex-left">
            <div class="orginal-act">{{item.uname}}</div>
            <div class="phone-num">{{item.mobile.substr(0,3) + "****" + item.mobile.substr(7)}}</div>
            <div class="date">{{item.ctime}}</div>
          </div>
          <!-- <div class="flex-right" v-if="item.applicationCardTime < item.ctime">
            <p>老客户</p>
          </div>-->
          <!-- v-if="item.applicationCardTime > item.ctime" -->
          <div class="flex-right">
            <p>成功推荐</p>
          </div>
          <!-- <div class="flex-right">已办卡</div> -->
        </div>
      </div>
      <div class="list" v-show="currentTab=='recommended'">
        <div class="list-item" v-for="(item , index) in carapplyedList" :key="'inx' + index">
          <img :src="item.headImgUrl">
          <div class="flex-left">
            <div class="orginal-act">{{item.uname}}</div>
            <div class="phone-num">{{item.mobile.substr(0,3) + "****" + item.mobile.substr(7)}}</div>
            <div class="date">{{item.ctime}}</div>
          </div>
          <div class="flex-right" v-if="item.applicationCardStatus == '0' ">
            <p>已推荐</p>
            <p v-if="item.ctime.substr(0,10) != nowTime">未办卡</p>
          </div>
          <div v-if="item.applicationCardStatus == '1'">
            <div class="flex-right old" v-if="item.isOldClients==1">
              <p>老客户</p>
            </div>
            <div class="flex-right" v-else>
              <p>已推荐</p>
              <p>已办卡</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
export default {
  data () {
    return {
      currentTab: 'recommended',
      applicationCardStatus: '', // 1 已办卡  ''所有的用户
      carapplyedList: [],
      nowTime: ''
    };
  },
  methods: {
    async carapplyed () {
      let rs = await this.$post('/binding/get/list', {
        applicationCardStatus: this.applicationCardStatus
      });
      if (rs.status == 200) {
        this.carapplyedList = rs.payload;
      } else {
        Toast(rs.error);
      }
    },
    // 已办卡
    async getcarapplyed () {
      this.currentTab = '';
      this.applicationCardStatus = 1;
      await this.carapplyed();
    },
    // 已推荐
    async getAll () {
      this.currentTab = 'recommended';
      this.applicationCardStatus = '';
      let date = new Date();
      let mon = date.getMonth() + 1;
      let day = date.getDate();
      this.nowTime =
        date.getFullYear() +
        '-' +
        (mon < 10 ? '0' + mon : mon) +
        '-' +
        (day < 10 ? '0' + day : day);

      await this.carapplyed();
    }
  },
  // 获取当前时间
  async created () {
    Indicator.open();
    await this.carapplyed();
    Indicator.close();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.carinfo {
  position: absolute;
  width: 100%;
  min-height: 100%;
  height: 100%;
  overflow-y: auto;
  .carinfo-header {
    position: relative;
    font-size: 0.3rem;
    height: 1rem;
    line-height: 1.2rem;
    text-align: center;
    color: #fff;
    background-color: red;
  }
  .nav {
    position: relative;
    height: 1rem;
    display: flex;
    background: #fff;
    font-size: 0.3rem;
    border: 0.01rem solid #efefef;
    .nav-item {
      position: relative;
      flex: 1 1 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(51, 51, 51);
    }
    .nav-item-active {
      color: rgb(247, 37, 57);
      font-size: 0.3rem;
      &:after {
        content: " ";
        position: absolute;
        z-index: 2;
        bottom: 0.05rem;
        left: 50%;
        margin-left: -0.4rem;
        right: 0;
        width: 0.8rem;
        border-bottom: 0.04rem solid rgb(247, 37, 57);
      }
    }
  }
  .carinfo-main {
    padding: 0.22rem 0.32rem 0 0.32rem;
    .list {
      width: 100%;
      .list-item {
        width: 100%;
        display: flex;
        margin-bottom: 0.5rem;
        img {
          width: 1.2rem;
          height: 1.2rem;
          margin-right: 0.24rem;
        }
        div {
          &.flex-left {
            flex: 1;
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            justify-content: flex-start;
            align-items: flex-start;
            .orginal-act {
              font-size: 0.3rem;
              color: rgb(247, 37, 57);
              margin-top: 0.08rem;
            }
            .phone-num,
            .date {
              margin-top: 0.14rem;
              font-size: 0.26rem;
              color: rgb(51, 51, 51);
            }
          }
          &.flex-right {
            display: flex;
            flex-direction: column;
            justify-content: center;
            color: rgb(255, 142, 42);
            font-size: 0.26rem;
            &.old {
              line-height: 1.2rem;
            }
            p {
              margin-top: 0.1rem;
            }
          }
        }
      }
    }
  }
}
</style>

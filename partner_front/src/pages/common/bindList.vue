<template>
  <div class="carinfo">
    <div class="carinfo-header">
      <div>推荐办卡信息</div>
      <div class="back" @click="$router.back()">&lt;</div>
    </div>
    <div class="nav">
      <div class="nav-item" :class="{'nav-item-active':currentTab=='all'}" @click="getAll">已推荐</div>
      <div class="nav-item" :class="{'nav-item-active':currentTab=='appliedCard'}" @click="getAppliedCard">
        已办卡</div>
    </div>
    <div class="carinfo-main">
      <div class="list">
        <div class="list-item" v-for="(item , index) in dataList" :key="'inx' + index">
          <img :src="item.imgUrl">
          <div class="flex-left">
            <div class="orginal-act">{{item.name}}</div>
            <div class="phone-num">{{item.mobile}}</div>
            <div class="date">{{item.bindTime}}</div>
          </div>
          <div class="flex-right" v-if="item.applyCard == 'Y' ">
            已办卡
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
      applyCard: '', // 'Y' 已办卡  ''所有的用户
      dataList: [],
      nowTime: ''
    };
  },
  methods: {
    async loadData () {
      let rs = await this.$post('/new_partner/listBoundUser', {
        apply_card: this.applyCard
      });
      if (rs.status == 200) {
        this.dataList = rs.payload;
      } else {
        Toast(rs.error);
      }
    },
    // 已办卡
    async getAppliedCard () {
      this.currentTab = 'appliedCard';
      this.applyCard = 'Y';
      await this.loadData();
    },
    // 全部
    async getAll () {
      this.currentTab = 'all';
      this.applyCard = '';
      await this.loadData();
    }
  },
  async created () {
    Indicator.open();
    await this.loadData();
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
    .back {
      font-weight: bolder;
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      position: absolute;
      top: 0;
      left: 0;
      font-size: 0.5rem;
    }
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
            .phone-num {
              margin-top: 0.1rem;
            }
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
          }
        }
      }
    }
  }
}
</style>

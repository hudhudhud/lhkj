<template>
  <div class="store">
    <cbbHeader title="联海商城" :bgColor="'#5FB534'"></cbbHeader>
    <div class="banner">
      <img src="./imgs/banner.png" alt>
    </div>
    <div class="nav" v-if="actList.length == 4">
      <div
        class="nav-item"
        v-for="(item, index) in actTitle"
        :key="'nav'+index"
        :class="{'nav-item-active':currentTab==index}"
        @click="select(index)"
      >{{item}}</div>
    </div>
    <div class="main">
      <div class="actGroup" v-for="(act, actIndex) in actGroup" :key="'act'+actIndex">
        <div
          class="main-item"
          v-for="(standard,ind2) in act.productList[0].standardList"
          :key="'_standard_'+ind2"
        >
          <div class="prize">
            <div class="pro">
              <img :src="standard.standardImgUrl" alt>
            </div>
            <div class="title">{{standard.standardName}}</div>
          </div>
          <div class="exchange" @click="buy(standard,act.actId)">兑换</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cbbHeader from '@/components/cbbHeader';
export default {
  data () {
    return {
      actGroup: [],
      currentTab: 0,
      // actList: ['546870122', '546870242', '546869916'],
      // actTitle: ['视频娱乐', '实物充值', '餐饮购物']
      actList: ['546869916', '546870122', '546870242', '546870369'],
      actTitle: ['餐饮购物', '视频娱乐', '实物充值', '实物礼品']
    };
  },
  methods: {
    select (i) {
      this.currentTab = i;
      this.actGroup.splice(0);
      // if (i == 0) {
      //   this.getActGroup();
      // } else {
      //   this.loadAct(this.actList[i - 1]);
      // }
      this.loadAct(this.actList[i]);
    },
    async getActGroup () {
      let i = 0;
      let arr = this.actList;
      for (; i < arr.length;) {
        await this.loadAct(arr[i]);
        i++;
        console.log('actGroup', this.actGroup);
      }
    },
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.actGroup.push(rs.payload);
        console.log('actGroup', this.actGroup);
      } else {
      }
      return true;
    },
    buy (standard, actId) {
      this.$router.push(`card/${standard.id}/${actId}`);
    }
  },

  components: {
    cbbHeader
  },
  created () {
    // this.getActGroup();
    this.loadAct(this.actList[0]);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.store {
  .banner {
    img {
      width: 7.5rem;
    }
  }
  .nav {
    position: relative;
    height: 0.86rem;
    display: flex;
    background: #fff;
    font-size: 0.25rem;
    .nav-item {
      position: relative;
      flex: 1 1 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      color: rgb(51, 51, 51);
    }
    .nav-item-active {
      color: rgb(40, 173, 57);
      &:after {
        content: " ";
        position: absolute;
        z-index: 2;
        bottom: 0.05rem;
        left: 50%;
        margin-left: -0.55rem;
        right: 0;
        width: 1.1rem;
        border-bottom: 2px solid rgb(40, 173, 57);
      }
    }
  }
  .main {
    background-color: #f5f8fa;
    padding: 0.4rem 0rem 0 0rem;

    .actGroup {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .main-item {
        width: 2.96rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 0rem 0.54rem 0.53rem;
        .prize {
          width: 2.96rem;
          height: 2.72rem;
          background-color: #fff;
          border-radius: 0.2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .pro {
            width: 1.16rem;
            height: 1.03rem;
            img {
              width: 100%;
            }
          }
          .title {
            margin-top: 0.28rem;
            font-size: 0.28rem;
            color: rgb(51, 51, 51);
            line-height: 0.35rem;
          }
          .point {
            font-size: 0.3rem;
            color: rgb(257, 37, 57);
            line-height: 0.45rem;
          }
        }
        .exchange {
          width: 1.86rem;
          height: 0.64rem;
          background: url("./imgs/exchange.png") no-repeat;
          background-size: 100% 100%;
          text-align: center;
          line-height: 0.64rem;
          color: #fff;
          margin-top: 0.24rem;
        }
      }
    }
  }
  .bottom {
    width: 100%;
    height: 1rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
  }
}
</style>

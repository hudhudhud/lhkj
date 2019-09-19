<template>
  <div class="gift">
    <div class="cont">
      <div class="tab-nav">
        <div class="nav-item" v-for="(item, index) in tabList" :key="index" :class="tabAc == index?'ac':''" @click="bindTab(index)">{{item}}</div>
      </div>
      <div class="tab-cont">
        <div class="left-list">
          <div class="item" @click="bindList(index)" v-for="(item, index) in showNav" :key="index">{{item.proName}}</div>
          <!-- <div class="item">母婴专区</div> -->
        </div>
        <div class="right-list">
          <div class="item" @click="bindItem(item)" v-for="(item, index) in showList" :key="index">
            <div class="pic">
              <img :src="item.standardImgUrl" />
            </div>
            <div class="name">{{item.standardName}}</div>
            <div class="num">{{item.integralNum}}龙点</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    setting: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tabList: ['礼品卡券', '时尚百货'],
      tabAc: 0,
      Navs: [],
      showNav: [],
      showList: [],
      hrefUrl: null
    };
  },
  methods: {
    bindTab (e) {
      this.tabAc = e;
      this.showNav = this.Navs[e];
      this.showList = this.showNav[0].standardList;
    },
    async loadAct (e) {
      let rs = await this.$get('api/getActDetails/' + e);
      if (rs.status === 200) {
        this.Navs.push(rs.payload.productList);
      }
    },
    bindList (e) {
      this.showList = this.showNav[e].standardList;
    },
    bindItem (e) {
      window.location.href = `${this.hrefUrl}/merchant/ETCCreditBuy/standard/${
        e.id
      }/${this.hotId[this.tabAc]}`;
    }
  },
  async created () {
    this.hotId = this.setting.actId.split(',');
    for (var i = 0; i < this.hotId.length; i++) {
      await this.loadAct(this.hotId[i]);
    }
    this.showNav = this.Navs[0];
    this.showList = this.showNav[0].standardList;
    this.hrefUrl =
      'https://' +
      window.location.host +
      '/' +
      window.location.pathname.split('/')[1];
  }
};
</script>
<style lang="scss" scoped>
.gift {
  .cont {
    .tab-nav {
      margin-top: 0.4rem;
      height: 0.7rem;
      display: flex;
      position: relative;
      .nav-item {
        display: flex;
        justify-content: center;
        width: 50%;
        font-size: 0.28rem;
        color: #9a9999;
        height: 0.7rem;
        line-height: 0.7rem;
        &.ac {
          font-size: 0.34rem;
          color: #000;
          font-weight: bold;
          &:after {
            content: "";
            margin: 0 auto;
            display: block;
            width: 0.8rem;
            height: 0.06rem;
            background-color: #1fafef;
            border-radius: 0.03rem;
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
          }
        }
      }
    }
    .tab-cont {
      width: 6.85rem;
      min-height: 6rem;
      background-color: #eaf6ff;
      border-radius: 0.1rem;
      margin: 0 auto;
      box-sizing: border-box;
      padding-top: 0.48rem;
      padding-bottom: 0.34rem;
      margin-top: 0.15rem;
      display: flex;
      .left-list {
        padding-top: 0.05rem;
        width: 1.98rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: 0.01rem solid #c6dff2;
        min-height: 5.16rem;
        .item {
          width: 1.68rem;
          height: 0.54rem;
          line-height: 0.54rem;
          border-radius: 0.27rem;
          border: 1px solid #1d72f3;
          margin-bottom: 0.26rem;
          font-size: 0.3rem;
          color: #1d72f3;
          text-align: center;
        }
      }
      .right-list {
        width: 4.7rem;
        margin-left: 0.13rem;
        display: flex;
        flex-wrap: wrap;
        .item {
          margin-right: 0.23rem;
          width: 2.1rem;
          .pic {
            height: 1.9rem;
            width: 2.1rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .name {
            font-size: 0.24rem;
            color: #000;
            margin-top: 0.05rem;
          }
          .num {
            font-size: 0.24rem;
            color: #0061f4;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>

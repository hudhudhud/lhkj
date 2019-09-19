<template>
  <div>
    <div class="pic-tab">
      <div class="cont">
        <img @click="bindtabList(0)" src="./imgs/WechatIMG67.png" alt="">
        <img @click="bindtabList(1)" src="./imgs/WechatIMG68.png" alt="">
      </div>
    </div>
    <div class="act-tab">
      <div class="tab">
        <!-- <template v-if="$store.state.merchantId==193">
          <div class="nav" style="color: rgba(154, 45, 47, 0.7)" v-if="actList.length == 4">
            <div class="nav-item" v-for="(item, index) in actTitle" :key="'nav'+index" :class="{'nav-item-active-001':currentTab==index}"
              @click="select(index)">{{item}}</div>
          </div>
        </template> -->
        <template>
          <div class="nav">
            <div class="nav-item" v-for="(item, index) in actTitle" :key="'nav'+index" :class="{'nav-item-active':currentTab==index}"
              @click="select(index)">{{item}}</div>
          </div>
        </template>
      </div>
      <div class="actGroupWrapper">
        <div class="actGroup">
          <!-- <div class="record-list">
          <template>
            <div class="record-item banner" @click="buy(standard)" v-for="(standard,ind2) in standardList" :key="ind2">
              <img :src="standard.standardImgUrl">
            </div>
          </template>
        </div> -->
          <div class="record-list" :class="showList =='0'?'':'ac'" v-if="standardList">
            <!-- -->
            <div class="record-item banner" @click="buy(item)" v-for="(item,index) in standardList" :key="'std'+index">
              <div class="pic">
                <img :src="item.standardImgUrl">
              </div>
              <div class="name">{{item.standardName}}</div>
              <div class="number">{{item.integralNum}}金币</div>
            </div>
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
      actGroup: [],
      currentTab: 0,
      showList: 0,
      actList: [],
      actLists: [],
      actTitle: [],
      actTitles: [
        ['全部', '美食', '购物'],
        ['全部', '美容彩妆', '母婴专区', '数码家电']
      ],
      standardList: []
    };
  },
  methods: {
    bindtabList (e) {
      this.actList = [];
      this.actTitle = ['全部'];
      this.standardList = [];
      this.actList = this.actLists[e].split(',');
      this.currentTab = 0;
      this.showList = e;
      this.getActGroup(true);
    },
    select (i) {
      this.currentTab = i;
      this.standardList = [];
      // this.actGroup.splice(0);
      if (i == 0) {
        this.getActGroup();
      } else {
        this.loadAct(this.actList[i - 1]);
      }
    },
    async getActGroup (e) {
      let i = 0;
      let arr = this.actList;
      for (; i < arr.length;) {
        await this.loadAct(arr[i], e);
        i++;
      }
    },
    async loadAct (actId, e) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        if (e) {
          this.actTitle.push(rs.payload.actName);
        }
        let id = rs.payload.actId;
        for (var i = 0; i < rs.payload.productList.length; i++) {
          let items = rs.payload.productList[i].standardList;
          for (var k = 0; k < items.length; k++) {
            items[k].actId = id;
            this.standardList.push(items[k]);
          }
        }
      }
    },
    buy (standard) {
      if (standard.proType === '9') {
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/bocsz/szbocdeta/${
            standard.id
          }`
        );
      } else {
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/creditBuy/standard/${
            standard.id
          }/${standard.actId}`
        );
      }
    }
  },
  created () {
    var arr = this.setting.actId.split('/');
    this.actList = arr[0].split(',');
    this.actLists = arr;
    this.actTitle = ['全部'];
    this.getActGroup(true);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.pic-tab {
  height: auto;
  background: rgb(255, 255, 255);
  border-radius: 0.2rem;
  width: 7.1rem;
  position: relative;
  margin: 0px auto 0.34rem;
  .cont {
    height: auto;
    overflow-x: hidden;
    padding: 0px 0.04rem;
    text-align: center;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      display: inline-block;
      height: 1.84rem;
      width: 3.3rem;
    }
  }
}
.act-tab {
  background: #fff;
  .nav {
    @include flex(row, nowrap, flex-start, flex-start);
    height: 0.68rem;
    line-height: 0.68rem;
    color: rgb(66, 65, 65);
    font-size: 0.3rem;
    text-align: center;
    padding: 0 0.2rem;
    .nav-item {
      flex: 1;
      position: relative;
    }
    .nav-item-active {
      background-color: #e22319;
      border-radius: 0.34rem;
      color: #fff;
    }
    .nav-item-active-001 {
      color: #9a2d2f;
      &:after {
        @include after-border(#9a2d2f, 2px, 0.7rem);
      }
    }
  }

  .record-list {
    width: 7.1rem;
    margin: 0 auto;
    padding-bottom: 0.4rem;
    .record-item {
      width: 6.7rem;
      margin: 0 auto;
      line-height: auto !important;
      @include flex(row, nowrap, flex-start, center);
      // @include border-1px(#ccc);
      padding-top: 0.26rem;
      height: 1.82rem;
      .pic {
        height: 1.82rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          height: 100%;
          width: auto !important;
        }
      }
      &.banner {
        position: static;
        height: auto;
        img {
          display: block;
          width: 100%;
        }
      }
      img {
        width: 1.08rem;
      }
      div {
        &.flex-left {
          flex: 1;
          @include flex(column, nowrap, flex-start, flex-start);
        }
        &.flex-right {
          color: rgb(216, 5, 75);
          font-size: 0.36rem;
          justify-content: flex-end;
        }
        .orginal-act {
          color: #000;
          font-size: 0.28rem;
        }
        .tag {
          margin: 0.1rem 0;
          padding: 0.05rem 0.1rem;
          font-size: 0.22rem;
          text-align: center;
          border-radius: 0.05rem;
          color: #fff;
          &.tag-0 {
            background: #37b5f4;
          }
          &.tag-1 {
            background: rgb(247, 84, 118);
          }
          &.tag-2 {
            background: rgb(33, 191, 97);
          }
          &.tag-3 {
            background: #ffc83c;
          }
        }
        .expire-date {
          margin-top: 0.1rem;
          font-size: 0.22rem;
          color: rgb(66, 65, 65);
        }
      }
    }
    &.ac {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      .record-item {
        margin: 0;
        width: 2rem;
        flex-direction: column;
        margin-top: 0.2rem;
        margin-left: 0.24rem;
        .pic {
          width: 2rem;
          height: 2rem;
          box-sizing: border-box;
          border: 1px solid #bfbfc6;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 100% !important;
            height: auto !important;
          }
        }
        .name {
          font-size: 0.3rem;
          color: #000;
          line-height: 0.32rem;
          height: 0.6rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          width: 100%;
          text-align: left;
          margin-top: 0.15rem;
        }
        .number {
          margin-top: 0.15rem;
          font-size: 0.3rem;
          color: #e22319;
          height: 0.3rem;
          width: 100%;
          text-align: left;
        }
      }
    }
  }
  .actGroup {
    &:last-child {
      .record-item {
        &:after {
          border: 0;
        }
      }
    }
  }
  .actGroupWrapper {
    min-height: 1rem;
  }
}
</style>

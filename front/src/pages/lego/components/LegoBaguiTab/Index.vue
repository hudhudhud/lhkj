<template>
  <div class="act-tab">
    <div class="tab">
      <div class="nav">
        <div
          class="nav-item"
          v-for="(item, index) in actList"
          :key="'nav'+index"
          :class="{'nav-item-active':currentTab==index}"
          @click="select(index)"
        >
          <img :src="mapList[index].icon" alt>
          {{mapList[index].title}}
        </div>
      </div>
    </div>
    <div class="actGroupWrapper">
      <div class="actGroup" v-for="(act, actIndex) in actGroup" :key="'act'+actIndex">
        <div class="record-list" v-for="(product,ind) in act.productList" :key="'product_'+ind">
          <div
            class="record-item"
            :class="{'current-item': actGroup == []}"
            @click="buy(standard, act.actId)"
            v-for="(standard,ind2) in product.standardList"
            :key="ind+'_standard_'+ind2"
          >
            <img :src="standard.standardImgUrl">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mapList from './map.json';
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
      mapList: mapList,
      currentTab: 0,
      actList: this.setting.actId.split(',')
    };
  },
  methods: {
    select (i) {
      this.currentTab = i;
      this.actGroup.splice(0);
      this.loadAct(this.actList[i]);
    },
    async getActGroup () {
      let i = 0;
      let arr = this.actList;
      for (; i < arr.length;) {
        await this.loadAct(arr[i]);
        i++;
      }
    },
    async loadAct (actId) {
      let rs = await this.$get('api/getActDetails/' + actId);
      if (rs.status === 200) {
        this.actGroup.push(rs.payload);
      } else {
      }
      return true;
    },
    buy (standard, actId) {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/creditBuy/standard/${
          standard.id
        }/${actId}`
      );
    }
  },
  created () {
    this.loadAct(this.actList[0]);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.act-tab {
  background: #fff;
  /*  .tab {
    box-shadow: #cccccc 0px 2px 1px 0px;
  } */
  .nav {
    @include flex(row, nowrap, flex-start, flex-start);
    line-height: 0.76rem;
    padding-top: 0.05rem;
    font-size: 0.3rem;
    text-align: center;
    .nav-item {
      flex: 1;
      position: relative;
      color: #000;
      img {
        display: block;
        position: relative;
        right: 0.05rem;
        margin: 0 auto;
        width: 0.88rem;
      }
    }
    .nav-item-active {
      color: rgb(33, 191, 97);
      &:after {
        @include after-border(rgb(33, 191, 97), 2px, 75%);
      }
    }
  }

  .record-list {
    padding: 0.2rem 0.28rem;
    min-height: 5rem;
    .record-item {
      @include flex(row, nowrap, flex-start, center);
      @include border-1px(#ccc);
      padding-top: 0.26rem;
      &.current-item {
        &:last-child {
          &:after {
            border: 0;
          }
        }
      }
      img {
        width: 100%;
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
          padding-right: 0.2rem;
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

<template>
  <div class="act-tab">
    <div class="tab">
      <div
        class="nav"
        :style="theme"
      >
        <template v-if="$store.state.merchantId==212">
          <div
            class="nav-item"
            :class="{'nav-item-active-001':currentTab==-1}"
            @click="select(-1)"
          >
            全部
          </div>
          <div
            class="nav-item"
            v-for="(item, index) in actTitle"
            :key="'nav'+index"
            :class="{'nav-item-active-001':currentTab==index}"
            @click="select(index)"
          >{{item}}</div>
        </template>
        <!-- 避免海南跟兴业id相同。。。 -->
        <!-- <template v-else-if="$store.state.merchantId==212"> -->
        <!--     <template v-if="$store.state.merchantId==212">
          <div
            class="nav-item"
            v-for="(item, index) in actTitle"
            :key="'nav'+index"
            :class="{'nav-item-active-002':currentTab==index}"
            @click="select(index)"
          >{{item}}</div>
        </template> -->
        <template v-else>
          <div
            class="nav-item"
            :class="{'nav-item-active':currentTab==-1}"
            @click="select(-1)"
          >
            全部
          </div>
          <div
            class="nav-item"
            v-for="(item, index) in actTitle"
            :key="'nav'+index"
            :class="{'nav-item-active':currentTab==index}"
            @click="select(index)"
          >{{item}}</div>
        </template>

      </div>
    </div>
    <div class="actGroupWrapper">
      <div
        class="actGroup"
        v-for="(act, actIndex) in actGroup"
        :key="'act'+actIndex"
      >
        <div
          class="record-list"
          v-for="(product,ind) in act.productList"
          :key="'product_'+ind"
        >
          <template v-if="$store.state.merchantId==212">
            <div
              class="record-item current-item"
              @click="buy(standard,act.actId)"
              v-for="(standard,ind2) in product.standardList"
              :key="ind+'_standard_'+ind2"
              :style="{'margin-bottom': '0.3rem'}"
            >
              <img
                :src="standard.standardImgUrl"
                :style="{'width': '100%'}"
              >
            </div>
          </template>
          <template v-else>
            <div
              class="record-item"
              :class="{'current-item': actGroup == []}"
              @click="buy(standard,act.actId)"
              v-for="(standard,ind2) in product.standardList"
              :key="ind+'_standard_'+ind2"
            >
              <img :src="standard.standardImgUrl">

              <div class="flex-left">
                <div class="orginal-act">{{standard.standardName}}</div>
                <div
                  class="tag"
                  :class="'tag-'+actIndex"
                  v-if="actList.length == 4"
                >{{act.actName}}</div>
                <div class="expire-date">原价{{standard.originalPrice}}元</div>
              </div>
              <div class="flex-right">￥{{standard.currentPrice}}</div>
            </div>
          </template>

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
      actTitle: [],
      actGroup: [],
      theme: this.setting.theme ? JSON.parse(this.setting.theme) : '',
      currentTab: this.$store.state.merchantId == 212 ? 0 : -1,
      actList: this.setting.actId.split(',')
    };
  },
  methods: {
    select (i) {
      this.currentTab = i;
      this.actGroup.splice(0);
      if (i == -1) {
        this.getActGroup();
      } else {
        this.loadAct(this.actList[i]);
      }
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
      if (
        this.$store.state.merchantId == 176 ||
        this.$store.state.merchantId == 212
      ) {
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/creditBuy/standard/${
            standard.id
          }/${actId}`
        );
      } else {
        this.$router.push(
          `/${
            this.$store.state.merchantAppid
          }/merchant/index/cbbBuy001/standard/${standard.id}`
        );
      }
    }
  },
  async created () {
    // if (this.$store.state.merchantId == 212) {
    //   this.loadAct(this.actList[0]);
    // } else {
    await this.getActGroup();
    this.actGroup.forEach(element => {
      this.actTitle.push(element.actName);
    });
    // }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.act-tab {
  .nav {
    @include flex(row, nowrap, flex-start, flex-start);
    height: 0.76rem;
    line-height: 0.76rem;
    color: #333;
    font-size: 0.3rem;
    text-align: center;
    box-shadow: #cccccc 0px 0px 5px 0;
    .nav-item {
      flex: 1;
      position: relative;
    }
    .nav-item-active {
      /*  color: rgb(230, 67, 50);
      &:after {
        @include after-border(rgb(230, 67, 50), 2px, 1.4rem);
      } */
      background: url(./yezi.png) no-repeat center center;
      background-size: 1.35rem 100%;
      height: 0.9rem;
      color: #fff;
    }
    .nav-item-active-001 {
      color: rgb(0, 161, 232);
      &:after {
        @include after-border(rgb(0, 161, 232), 2px, 75%);
      }
    }
    .nav-item-active-002 {
      color: rgb(26, 76, 147);
      &:after {
        @include after-border(rgb(26, 76, 147), 2px, 75%);
      }
    }
  }

  .record-list {
    padding: 0 0.38rem;

    .record-item {
      @include flex(row, nowrap, flex-start, center);
      // @include border-1px(#ccc);
      padding-top: 0.26rem;
      height: 1.82rem;

      &.current-item {
        &:last-child {
          &:after {
            border: 0;
          }
        }
      }
      &.banner {
        position: static;
        margin: 0.2rem auto;
        height: auto;
        img {
          display: block;
          width: 100%;
        }
      }
      img {
        width: 1.08rem;
        margin-right: 0.3rem;
      }
      div {
        &.flex-left {
          flex: 1;
          @include flex(column, nowrap, flex-start, flex-start);
        }
        &.flex-right {
          color: rgb(230, 67, 50);
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
    min-height: 4rem;
  }
}
</style>

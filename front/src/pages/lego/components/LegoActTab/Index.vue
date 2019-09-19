<template>
  <div class="act-tab">
    <div class="tab">
      <template v-if="$store.state.merchantId==193">
        <div class="nav" style="color: rgba(154, 45, 47, 0.7)" v-if="actList.length == 4">
          <div class="nav-item" v-for="(item, index) in actTitle" :key="'nav'+index"
            :class="{'nav-item-active-001':currentTab==index}" @click="select(index)">{{item}}</div>
        </div>
      </template>
      <!-- 229 测式广东积分商户 -->
      <template v-else-if="$store.state.merchantId==218">
        <div class="
        nav">
          <div class="nav-item" v-for="(item, index) in actTitle1" :key="'nav'+index"
            :class="{'nav-item-active-002':currentTab==index}" @click="select(index)">{{item}}</div>
        </div>
      </template>
      <template v-else>
        <div class="nav" v-if="actList.length == 4">
          <div class="nav-item" v-for="(item, index) in actTitle" :key="'nav'+index"
            :class="{'nav-item-active':currentTab==index}" @click="select(index)">{{item}}</div>
        </div>
      </template>

    </div>
    <div class="actGroupWrapper">
      <div class="actGroup" v-for="(act, actIndex) in actGroup" :key="'act'+actIndex">
        <div class="record-list" :class="{'nopadding': $store.state.merchantId == 218}"
          v-for="(product,ind) in act.productList" :key="'product_'+ind">
          <template v-if="actList.length == 4 && $store.state.merchantId != 176 && $store.state.merchantId != 225">
            <div class="record-item" :class="{'current-item': actGroup == []}" @click="buy(standard,act.actId)"
              v-for="(standard,ind2) in product.standardList" :key="ind+'_standard_'+ind2">
              <img :src="standard.standardImgUrl">

              <div class="flex-left">
                <div class="orginal-act">{{standard.standardName}}</div>
                <div class="tag" :class="'tag-'+actIndex" v-if="actList.length == 4">{{act.actName}}</div>
                <div class="expire-date">原价{{standard.originalPrice}}元</div>
              </div>
              <div class="flex-right">￥{{standard.currentPrice}}</div>
            </div>
          </template>
          <template v-else-if="$store.state.merchantId == 171">
            <div class="record-item" :class="{'current-item': actGroup == []}" @click="buy(standard)"
              v-for="(standard,ind2) in product.standardList" :key="ind+'_standard_'+ind2">
              <img :src="standard.standardImgUrl">

              <div class="flex-left">
                <div class="orginal-act">{{standard.standardName}}</div>
                <div class="tag" :class="'tag-'+actIndex" v-if="actList.length == 4">{{act.actName}}</div>
                <div class="expire-date">原价{{standard.originalPrice}}元</div>
              </div>
              <div class="flex-right">￥{{standard.currentPrice}}</div>
            </div>
          </template>
          <template v-else-if="$store.state.merchantId == 218">
            <div style="margin-top:0.32rem;" :class="{'inlineWrap': $store.state.merchantId == 218}"
              @click="buy(standard,act.actId)" v-for="(standard,ind2) in product.standardList"
              :key="ind+'_standard_'+ind2">
              <template v-if="ind2%2 == 0">
                <div style="text-align:left">
                  <img :src="standard.standardImgUrl">
                </div>
                <div class="">
                  <div class="orginal-act" style="font-size:0.3rem;color:#333;margin-bottom: 0.1rem">
                    {{standard.standardName}}</div>
                </div>
                <div style="font-size:0.3rem;color:#b90b0b">
                  <!--  <span style="color:rgb(239,32,31);font-size:0.32rem;">{{standard.integralNum}}币
                  </span> +{{standard.currentPrice}}元 -->
                </div>
              </template>
              <template v-else>
                <div style="text-align:right">
                  <img :src="standard.standardImgUrl">
                </div>
                <div class="rightItem">
                  <div class="orginal-act" style="font-size:0.3rem;color:#333;margin-bottom: 0.1rem">
                    {{standard.standardName}}</div>
                </div>
                <div class="rightItem">
                  <!--  <div style="font-size:0.3rem;color:#b90b0b"><span style="color:rgb(239,32,31);font-size:0.32rem;">{{standard.integralNum}}币
                    </span> +{{standard.currentPrice}}元</div> -->
                </div>
              </template>

            </div>
          </template>

          <template v-else>
            <div class="record-item banner" :class="{'current-item': actGroup == []}" @click="buy(standard,act.actId)"
              v-for="(standard,ind2) in product.standardList" :key="ind+'_standard_'+ind2">
              <img :src="standard.standardImgUrl">
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { checkTerminal } from '@/utils/index';

export default {
  props: {
    setting: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      Terminal: checkTerminal(),
      actGroup: [],
      currentTab: 0,
      actList: this.setting.actId.split(','),
      actTitle: ['全部', '娱乐', '美食', '出行', '购物'],
      actTitle1: ['美食餐饮', '娱乐视听', '购物出行']
    };
  },
  methods: {
    select (i) {
      this.currentTab = i;
      this.actGroup.splice(0);
      if (this.$store.state.merchantId == 218) {
        this.loadAct(this.actList[i]);
      } else {
        if (i == 0) {
          this.getActGroup();
        } else {
          this.loadAct(this.actList[i - 1]);
        }
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
        this.$store.state.merchantId == 218 ||
        this.$store.state.merchantId == 225
      ) {
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/creditBuy/standard/${standard.id}/${actId}`
        );
      } else {
        this.$router.push(
          `/${this.$store.state.merchantAppid}/merchant/index/cbbBuy001/standard/${standard.id}`
        );
      }
    }
  },
  async created () {
    if (this.$store.state.merchantId == 218) {
      this.loadAct(this.actList[0]);
    } else {
      this.getActGroup();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "@/styles/mixin.scss";
.act-tab {
  background: #fff;
  .tab {
    height: 0.76rem;
  }
  .nav {
    @include flex(row, nowrap, flex-start, flex-start);
    @include border-1px(#ccc);
    height: 0.76rem;
    line-height: 0.76rem;
    color: rgb(66, 65, 65);
    font-size: 0.3rem;
    text-align: center;
    box-shadow: #cccccc -1px 0px 5px 1px;

    .nav-item {
      flex: 1;
      height: 0.76rem;
      position: relative;
    }
    .nav-item-active {
      color: rgb(33, 191, 97);
      &:after {
        @include after-border(rgb(33, 191, 97), 2px, 0.7rem);
      }
    }
    .nav-item-active-001 {
      color: #9a2d2f;
      &:after {
        @include after-border(#9a2d2f, 2px, 0.7rem);
      }
    }
    .nav-item-active-002 {
      color: #007fee;
      &:after {
        @include after-border(#007fee, 2px, 0.7rem);
      }
    }
  }

  .record-list {
    padding: 0 0.38rem;

    .record-item {
      @include flex(row, nowrap, flex-start, center);
      @include border-1px(#ccc);
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
    min-height: 3rem;
    padding-bottom: 0.2rem;
  }
}
.inlineWrap {
  display: inline-block;
  width: 50%;
  div {
    width: 100%;
    font-size: 0;
    img {
      width: 3.3rem;
      margin-bottom: 0.2rem;
    }
  }
}
.nopadding {
  padding: 0 !important;
}
.rightItem {
  text-align: right;
  div {
    display: inline-block;
    text-align: left;
    width: 3.3rem;
  }
}
</style>

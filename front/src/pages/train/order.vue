<template>
  <div>
    <headerBar
      title="订单列表"
      :bgColor="'#19a0f0'"
    ></headerBar>
    <div class="order">

      <div class="order-tab">
        <div
          class="order-tabItem"
          @click="currentTab=0"
        >
          <span :class="{'activeTab': currentTab == 0}">全部</span>
        </div>
        <div
          class="order-tabItem"
          @click="currentTab=2"
        >
          <span :class="{'activeTab': currentTab == 2}">已完成</span>
        </div>
        <div
          class="order-tabItem"
          @click="currentTab=3"
        >
          <span :class="{'activeTab': currentTab == 3}">已取消</span>
        </div>
        <div
          class="order-tabItem"
          @click="currentTab=1"
        >
          <span :class="{'activeTab': currentTab == 1}">未支付</span>
        </div>
      </div>
      <div
        class="order-list"
        v-infinite-scroll="loadOrder"
        infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="noMore"
        infinite-scroll-distance="10"
      >
        <div
          v-for="(order,ind) in list"
          :key="'order'+ind"
        >
          <OrderItem
            :order="order"
            :actId="actId"
          ></OrderItem>
        </div>
      </div>
      <div
        class="order-noMore"
        v-if="noMore"
      >
        <span></span>&nbsp;&nbsp;已经是最后一页了&nbsp;&nbsp;<span></span>
      </div>
    </div>
  </div>

</template>
<script>
import headerBar from '@/components/headerBar';
import OrderItem from './components/OrderItem';
import { Indicator, Toast } from 'mint-ui';

export default {
  data () {
    return {
      currentTab: 0,
      loading: false,
      actId: this.$route.query.actId,
      currentPage: 1,
      pageSize: 10,
      payStatus: null,
      orderState: null,
      noMore: false,
      list: []
    };
  },
  watch: {
    currentTab (val) {
      this.currentPage = 1;
      this.list.splice(0);
      this.payStatus = null;
      this.orderState = null;
      switch (val) {
        case 1:
          this.payStatus = 10; // 未支付
          break;
        case 2:
          this.orderState = 30; // 已完成
          break;
        case 3:
          this.orderState = 20; // 已取消
          break;
      }
      this.loadOrder();
    }
  },
  components: {
    headerBar,
    OrderItem
  },
  methods: {
    async loadOrder () {
      Indicator.open();
      this.loading = true;
      let rs = await this.$post('api/order/ticket/forUser/list', {
        actId: this.actId,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        payStatus: this.payStatus,
        orderState: this.orderState
      });
      if (rs.status == 200) {
        let list = rs.payload.list;
        if (!list || list.length === 0) {
          this.noMore = true;
        } else {
          list.forEach(item => {
            this.list.push(item);
          });
        }
        this.currentPage++;
      } else {
        Toast(rs.error);
      }
      this.loading = false;

      Indicator.close();
    }
  },
  created () {
    this.loadOrder();
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.order {
  position: absolute;
  width: 100%;
  top: 0.8rem;
  bottom: 0;
  overflow-y: scroll;
  background: rgb(236, 235, 235);
  &-tab {
    @include flex(row, nowrap, center, center);
    color: #666;
    font-size: 0.32rem;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    background: #fff;
  }
  &-tabItem {
    flex: 1;
    span {
      display: inline-block;
      position: relative;
      height: 0.9rem;
      &.activeTab {
        &:after {
          @include after-border(#19a0f0, 2px, 100%);
        }
      }
    }
  }
  &-list {
    padding: 0.2rem 0 0;
    background: #ecebeb;
  }
  &-noMore {
    text-align: center;
    color: #999;
    line-height: 0.8rem;
    span {
      display: inline-block;
      border-bottom: 1px solid #c5c4c4;
      width: 2rem;
      vertical-align: middle;
    }
  }
}
</style>

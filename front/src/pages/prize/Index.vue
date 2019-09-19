<template>
  <div>
    <cbbHeader title="奖品详情"></cbbHeader>
    <div class="order">
      <div class="order-list" v-infinite-scroll="loadOrder" infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="noMore" infinite-scroll-distance="10">
        <PrizeItem v-for="(order, ind) in orderList" :key="'order_'+ind" :order-info="order" :show-prize="showPrize"
          @draw-order="drawOrder(order)" @get-address="getAddress(order)" @draw-account="drawAccount(order)">
        </PrizeItem>
        <div v-if="noMore" class="order-nomore">没有更多了</div>
        <!-- <div v-if="oldSysFlag == '1'" class="order-old-btn" @click="getOldOrder">查看历史奖品</div> -->
      </div>
      <DrawPrize v-model="showDraw" :order="order" :payload="payload" @charge="order.fishState='1'"></DrawPrize>
      <DrawAccount v-model="showDrawAccount" :order="order"></DrawAccount>

    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import PrizeItem from './PrizeItem';
import DrawPrize from './DrawPrize';
import DrawAccount from './DrawAccount';

import cbbHeader from '@/components/cbbHeader';
export default {
  components: {
    PrizeItem,
    cbbHeader,
    DrawAccount,
    DrawPrize
  },
  data () {
    return {
      showDrawAccount: false,
      showPrize: false,
      currentTab: '',
      loading: false,
      noMore: false,
      orderList: [],
      currentPage: 1,
      type: '',
      status: '',
      showDraw: false,
      order: null,
      oldSysFlag: this.$store.state.payload.oldSysFlag,
      payload: []
    };
  },
  watch: {
    currentTab (val, oldVal) {
      this.orderList = [];
      this.currentPage = 1;
      this.noMore = false;
      if (this.currentTab === 'charge') {
        this.type = '1';
        this.status = '';
      } else if (this.currentTab === 'card') {
        this.type = '2';
        this.status = '';
      } else if (this.currentTab === 'notpay') {
        this.type = '';
        this.status = '1';
      } else {
        this.type = '';
        this.status = '';
      }
      this.loadOrder();
    }
  },
  methods: {
    drawAccount (order) {
      this.order = order;
      this.showDrawAccount = true;
    },
    async getOldOrder () {
      let rs = await this.$post('/api/old_sys/order_search/path/get', {
        tel: this.$store.state.cust.tel,
        admin_id: this.$store.state.payload.oldSysId
      });
      if (rs.status == 200) {
        window.location.href = rs.payload;
      } else {
        Toast(rs.error);
      }
    },
    async drawOrder (order) {
      this.order = order;
      this.showDraw = true;
    },
    async getAddress (order) {
      this.loading = true;
      let rs = await this.$post('api/order/show/address/detail', {
        orderCode: order.orderCode
      });
      if (rs.status === 200) {
        let address = rs.payload;
        let str =
          address.provinceName +
          address.cityName +
          address.areaName +
          address.detailAddress;
        this.$set(order, 'addressDetail', str);
        this.order = order;
        this.showDraw = true;
      } else if (rs.status == 70009) {
        this.order = order;
        this.showDraw = true;
        // Toast('该订单未填写收货地址哦');
      } else {
        Toast(rs.error);
      }

      this.loading = false;
    },
    async loadOrder () {
      Indicator.open();
      this.loading = true;

      let rs = await this.$post('/api/getOrderList?', {
        actId: this.$route.query.actId || '',
        type: this.type,
        status: this.status,
        actType: '2,4,5',
        pageSize: 10,
        currentPage: this.currentPage
      });

      if (rs.status === 200) {
        let list = rs.payload.list;

        if (!list || list.length === 0) {
          this.noMore = true;
        } else {
          list.forEach(item => {
            this.orderList.push(item);
          });
        }
        this.currentPage++;
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

<style scoped>
.order {
  position: absolute;
  top: 0.8rem;
  left: 0;
  right: 0;
  bottom: 55px;
  overflow: hidden;
}
.nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1rem;
  display: flex;
  background: #fff;
  font-size: 0.3rem;
}
.nav:after {
  content: " ";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 2px solid #efefef;
}
.nav-item {
  position: relative;
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999;
}
.nav-item-active:after {
  content: " ";
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  right: 0;
  border-bottom: 2px solid rgb(9, 182, 242);
}
.order-list {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.order-nomore {
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: #999;
}
.order-old-btn {
  width: 3rem;
  border-radius: 0.3rem;
  border: 1px solid #ccc;
  line-height: 0.6rem;
  text-align: center;
  margin: 0.2rem auto;
}
</style>

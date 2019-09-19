<template>
  <div>
    <cbbHeader title="订单详情"></cbbHeader>
    <div class="order">
      <div class="nav">
        <div class="nav-item" :class="{'nav-item-active':currentTab==''}" @click="currentTab=''">全部</div>
        <div v-if="$store.state.merchantId!=1" class="nav-item" :class="{'nav-item-active':currentTab=='prize'}" @click="currentTab='prize'">我的奖品</div>
        <!-- <div class="nav-item" :class="{'nav-item-active':currentTab=='charge'}" @click="currentTab='charge'">直充</div>
        <div class="nav-item" :class="{'nav-item-active':currentTab=='card'}" @click="currentTab='card'">卡密</div>-->
        <div class="nav-item" :class="{'nav-item-active':currentTab=='notpay'}" @click="currentTab='notpay'">未支付</div>
      </div>
      <div class="order-list" v-infinite-scroll="loadOrder" infinite-scroll-immediate-check="false"
        infinite-scroll-disabled="noMore" infinite-scroll-distance="10">
        <OrderItem v-for="(order, ind) in orderList" :key="'order_'+ind" :order-info="order" @draw-order="drawOrder(order)"
          @get-address="getAddress(order)" @get-signInfo="getSignInfo(order)" @draw-account="drawAccount(order)"></OrderItem>
        <div v-if="noMore" class="order-nomore">没有更多了</div>
        <!-- <div v-if="oldSysFlag == '1'" class="order-old-btn" @click="getOldOrder">查看历史订单</div> -->
      </div>
      <DrawOrder v-model="showDraw" :order="order" :payload="payload" @charge="updateOrder"></DrawOrder>
      <DrawAccount v-model="showDrawAccount" :order="order"></DrawAccount>
    </div>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui';
import OrderItem from './OrderItem';
import DrawOrder from './DrawOrder';
import DrawAccount from './DrawAccount';
import cbbHeader from '@/components/cbbHeader';
export default {
  components: {
    OrderItem,
    cbbHeader,
    DrawAccount,
    DrawOrder
  },
  data () {
    return {
      showDrawAccount: false,
      currentTab: '',
      loading: false,
      noMore: false,
      orderList: [],
      currentPage: 1,
      type: '',
      actType: '1,3,2,4,5',
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
      switch (this.currentTab) {
        case 'notpay':
          this.type = '';
          this.status = '1';
          this.actType = '1,3';
          break;
        case 'prize':
          this.type = '';
          this.status = '';
          this.actType = '2,4,5';
          break;
        default:
          this.type = '';
          this.status = '';
          this.actType = '1,3,2,4,5';
      }
      this.loadOrder();
    }
  },
  methods: {
    updateOrder (account) {
      this.order.fishState = '1';
      this.order.rechargeAccount = account;
    },
    async getAddress (order) {
      Indicator.open();
      let rs = await this.$post('api/order/show/address/detail', {
        orderCode: order.orderCode
      });
      if (rs.status === 200 || rs.status === 70009) {
        Object.assign(order, rs.payload);
        this.order = order;
        this.showDraw = true;
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async getSignInfo (order) {
      Indicator.open();
      let rs = await this.$post('api/activity/order/predate', {
        orderCode: order.orderCode
      });
      if (rs.status === 200) {
        let payload = JSON.parse(rs.payload);
        Object.assign(order, payload);
        this.order = order;
        this.showDraw = true;
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    },
    async checkSys () {
      let rs = await this.$post('api/old_sys/order_search/path/get', {
        admin_id: '',
        tel: this.$store.state.tel
      });
      if (rs == 200) {
        console.log(rs);
      }
    },
    async drawOrder (order) {
      this.order = order;
      this.showDraw = true;
    },
    drawAccount (order) {
      this.order = order;
      this.showDrawAccount = true;
    },
    async loadOrder () {
      Indicator.open();
      this.loading = true;

      let rs = await this.$post('/api/getOrderList?', {
        actId: this.$route.query.actId || '',
        type: this.type,
        status: this.status,
        actType: this.actType,
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
  top: 50px;
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

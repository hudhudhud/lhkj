<template>
  <div class="order">
    <div class="order-list" v-infinite-scroll="loadOrder" infinite-scroll-immediate-check="false" infinite-scroll-disabled="noMore" infinite-scroll-distance="10">
      <PrizeItem v-for="(order, ind) in orderList" :key="'order_'+ind" :order-info="order" :show-prize="showPrize" @draw-order="drawOrder(order)"></PrizeItem>
      <div v-if="noMore" class="order-nomore">没有更多了</div>
      <div v-if="oldSysFlag == '1'" class="order-old-btn" @click="getOldOrder">查看历史奖品</div>
    </div>
    <DrawPrize v-model="showDraw" :order="order" :payload="payload" @charge="order.fishState='1'"></DrawPrize>
  </div>
</template>

<script>
import { Indicator, Toast } from 'mint-ui'
import PrizeItem from '@/pages/prize/PrizeItem'
import DrawPrize from '@/pages/prize/DrawPrize'

export default {
  props: {
    setting: {
      type: Object
    }
  },
  components: {
    PrizeItem,
    DrawPrize
  },
  data () {
    return {
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
    }
  },
  watch: {
    currentTab (val, oldVal) {
      this.orderList = []
      this.currentPage = 1
      this.noMore = false
      if (this.currentTab === 'charge') {
        this.type = '1'
        this.status = ''
      } else if (this.currentTab === 'card') {
        this.type = '2'
        this.status = ''
      } else if (this.currentTab === 'notpay') {
        this.type = ''
        this.status = '1'
      } else {
        this.type = ''
        this.status = ''
      }
      this.loadOrder()
    }
  },
  methods: {
    async getOldOrder () {
      let rs = await this.$post('/api/old_sys/order_search/path/get', {
        tel: this.$store.state.cust.tel,
        admin_id: this.$store.state.payload.oldSysId
      })
      if (rs.status == 200) {
        window.location.href = rs.payload
      } else {
        Toast(rs.error)
      }
    },
    async drawOrder (order) {
      this.order = order
      this.showDraw = true
    },
    async loadOrder () {
      Indicator.open()
      this.loading = true

      let rs = await this.$post('/api/getOrderList?', {
        type: this.type,
        status: this.status,
        actType: '2,4,5',
        pageSize: 10,
        currentPage: this.currentPage
      })

      if (rs.status === 200) {
        let list = rs.payload.list

        if (!list || list.length === 0) {
          this.noMore = true
        } else {
          list.forEach((item) => {
            this.orderList.push(item)
          })
        }
        this.currentPage++
      }

      this.loading = false
      Indicator.close()
    }
  },
  created () {
    this.loadOrder()
  }
}
</script>

<style scoped>
.order {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
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

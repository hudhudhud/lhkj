<template>
  <div class="details-wrapper">
    <cbbHeader title="详情"></cbbHeader>
    <div class="tab-title-wrapper">
      <div
        class="table-title-item"
        :class="{'active':currentTab=='receive'}"
        @click="currentTab='receive'"
      >
        <span class="tt-item-text">积分获得明细</span>
      </div>
      <div
        class="table-title-item"
        :class="{'active':currentTab=='spend'}"
        @click="currentTab='spend'"
      >
        <span class="tt-item-text">积分使用明细</span>
      </div>
    </div>
    <div
      class="tab-content-wrapper"
      v-infinite-scroll="loadDataList"
      infinite-scroll-immediate-check="false"
      infinite-scroll-disabled="noMore"
      infinite-scroll-distance="10"
    >
      <div class="tab-content" v-for="(point, ind) in orderList" :key="'point'+ind">
        <!-- <div class="no-data-info">暂无数据~</div> -->
        <div class="tab-content-inner">
          <div class="points-item">
            <div class="pointes-border">
              <div class="points-item-left">
                <div class="points-source">{{point.comment}}</div>
                <div class="points-time">{{point.recordTime}}</div>
              </div>
              <div class="points-item-right">
                <div v-if="currentTab=='receive'" class="points-dig">+{{point.creditChange}}</div>
                <div v-else class="points-dig">-{{point.creditChange}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="noMore" class="order-nomore">没有更多了</div>
    </div>
  </div>
</template>

<script>
// import { Indicator } from 'mint-ui'
import cbbHeader from '@/components/cbbHeader';
import { loadDataList } from '../share/api/api.js';
export default {
  data () {
    return {
      currentTab: 'receive',
      currentPage: 1,
      recordType: 1,
      pageSize: 10,
      noMore: false,
      orderList: []
    };
  },
  components: {
    cbbHeader
  },
  watch: {
    currentTab (val, oldVal) {
      this.orderList = [];
      this.currentPage = 1;
      this.noMore = false;
      if (val === 'receive') {
        this.recordType = '1';
      } else if (val === 'spend') {
        this.recordType = '2';
      }
      loadDataList(this, 'loadCredit');
    }
  },
  methods: {
    loadDataList () {
      loadDataList(this, 'loadCredit');
    }
  },
  created () {
    // Indicator.open()
    loadDataList(this, 'loadCredit');
  }
};
</script>

<style scoped>
.details-wrapper {
  width: 100%;
  min-height: 100%;
  background: #f5f5f9;
  overflow: hidden;
}

.tab-title-wrapper {
  margin-bottom: 0.2rem;
  display: flex;
  width: 100%;
  background: #fff;
}

.table-title-item {
  flex: 1;
  line-height: 1rem;
  font-size: 0.3rem;
  text-align: center;
  color: #999999;
}

.table-title-item.active {
  color: #477ef0;
}

.table-title-item.active .tt-item-text {
  display: inline-block;
  border-bottom: 4px solid #477ef0;
}

.tab-content-wrapper {
  position: absolute;
  top: 2rem;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
}

.no-data-info {
  padding-top: 0.8rem;
  font-size: 0.4rem;
  color: #3c3c3c;
  text-align: center;
}

.points-item {
  padding: 0 0.28rem;
  background: #fff;
}

.pointes-border {
  padding: 0.2rem 0;
  line-height: 0.5rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d8d8d8; /*no*/
}

.points-item:last-child .pointes-border {
  border-bottom: 0;
}

.points-source {
  font-size: 0.3rem;
  color: #000000;
}

.points-time {
  font-size: 0.26rem;
  color: #999999;
}

.points-item-right {
  display: flex;
  align-items: center;
}

.points-dig {
  font-size: 0.36rem;
  color: #ef0000;
}
.order-nomore {
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: #999;
}
</style>

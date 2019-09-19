<template>
  <div class="recommended-detail-wrapper">
    <cbbHeader title="详情"></cbbHeader>

    <!-- <div class="no-data-info">暂无数据~</div> -->
    <div
      class="recommended-detail-container"
      v-infinite-scroll="loadDataList"
      infinite-scroll-immediate-check="false"
      infinite-scroll-disabled="noMore"
      infinite-scroll-distance="10"
    >
      <div class="recommended-detail-item" v-for="(point, ind) in orderList" :key="'point'+ind">
        <div class="rec-detail-left">
          <p>
            <span class="rec-detail-name">受邀人手机号：</span>
            {{point.sharedmobile | formatPhone}}
          </p>
          <p>
            <span class="rec-detail-name">受邀时间：</span>
            {{point.bindTime}}
          </p>
          <p>
            <span class="rec-detail-name">核实时间：</span>
            {{point.audit_time}}
          </p>
        </div>
        <div class="rec-detail-right">
          <!--  <a v-if="point.isSuccess == 1" class="res-detail-status" href="javascript:void(0)">营销成功</a>
          <a v-else class="res-detail-status" href="javascript:void(0)">未完成</a>-->
        </div>
      </div>
      <div v-if="noMore" class="order-nomore">没有更多了</div>
    </div>
  </div>
</template>

<script>
import { getRefereeChildren } from '../share/api/api.js';
import cbbHeader from '@/components/cbbHeader';

export default {
  data () {
    return {
      orderList: [],
      noMore: false,
      customId: this.$store.state.cust.id,
      type: '0'
    };
  },
  components: {
    cbbHeader
  },
  methods: {
    loadDataList () {
      getRefereeChildren(this);
    }
  },
  created () {
    // Indicator.open()
    getRefereeChildren(this);
  }
};
</script>

<style scoped>
.recommended-detail-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  background: #f5f5f9;
  overflow-y: auto;
}

.no-data-info {
  padding-top: 0.4rem;
  font-size: 0.4rem;
  color: #3c3c3c;
  text-align: center;
}
.recommended-detail-container {
  padding-top: 0.1rem;
}

.recommended-detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.1rem;
  padding: 0.3rem;
  background: #fff;
}

.rec-detail-left {
  line-height: 1.8;
  font-size: 0.28rem;
  color: #000;
}

.rec-detail-name {
  color: #444444;
}

.res-detail-status {
  border-radius: 0.1rem;
  padding: 0.12rem 0.24rem;
  font-size: 0.26rem;
  color: #fff;
  background: #396def;
}

.rec-count-dig {
  color: #555555;
  font-size: 0.26rem;
  text-align: center;
}

.rec-count-dig .red-text {
  padding: 0 0.04rem;
  font-size: 0.34rem;
}

.red-text {
  color: #e72a17;
}
.order-nomore {
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: #999;
}
</style>

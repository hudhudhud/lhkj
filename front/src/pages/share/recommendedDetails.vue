<template>
  <div class="recommended-detail-wrapper">
    <!-- <div class="no-data-info">暂无数据~</div> -->
    <div class="recommended-detail-container" v-infinite-scroll="loadDataList" infinite-scroll-immediate-check="false"
         infinite-scroll-disabled="noMore" infinite-scroll-distance="10">
      <div class="recommended-detail-item" v-for="(point, ind) in orderList" :key="'point'+ind">
        <div class="rec-detail-left">
          <p>
            <span class="rec-detail-name">受邀人手机号：</span>{{point.mobile | formatPhone}}</p>
          <p>
            <span class="rec-detail-name">受邀时间：</span>{{point.bindTime}}</p>
          <p>
            <span class="rec-detail-name">核实时间：</span>{{point.updateTime}}</p>
          <p v-if="type">
            <span class="rec-detail-name">备注：</span>{{point.remark}}</p>
        </div>
        <div class="rec-detail-right">
          <a v-if="point.yxstate == '1' || point.yxstate == '2'" class="res-detail-status" href="javascript:void(0)">营销成功</a>
          <a v-else class="res-detail-status" href="javascript:void(0)">未完成</a>
          <div class="res-detail-status" style="margin-top: 0.5rem" v-if="type" @click="etid(point)">备注</div>
        </div>
      </div>
      <div v-if="noMore" class="order-nomore">没有更多了</div>
    </div>
    <div v-if="showBox">
      <div class="box" @click="showBox = false"></div>
      <div class="tanc">
        编辑备注
        <textarea v-model="item.remark"/>
        <div class="sub_btn" @click="save">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
import {getRefereeChildren} from './api/api.js'
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      orderList: [],
      noMore: false,
      customId: this.$store.state.cust.id,
      type: '',
      showBox: false,
      item: {}
    }
  },
  methods: {
    etid (item) {
      this.showBox = true
      this.item = item
    },
    async save () {
      let rs = await this.$post('api/referee/updateRemark', {
        cusId: this.item.customId,
        remark: this.item.remark
      });
      if (rs.status == 200) {
        Toast('保存成功')
      } else {
        Toast('保存失败')
      }
      this.showBox = false
    },
    loadDataList () {
      getRefereeChildren(this)
    },
    async getRefereeInfo () {
      let rs = await this.$get('api/referee/getRefereeInfo/' + this.customId);
      if (rs.status == 200) {
        this.type = rs.payload.type;
      }
    }
  },
  created () {
    this.getRefereeInfo();
    getRefereeChildren(this)
  }
}
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
    text-align: center;
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

  .box {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    z-index: 2;
  }

  .tanc {
    position: fixed;
    background: white;
    width: 5rem;
    height: 4.5rem;
    border-radius: 0.16rem;
    padding: 0.5rem;
    text-align: center;
    color: #666666;
    font-size: 0.3rem;
    z-index: 5;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
  }

  .tanc textarea {
    border: #cccccc 0.01rem solid;
    font-size: 0.26rem;
    padding: 0.1rem;
    text-align: left;
    margin-top: 0.2rem;
    width: 4rem;
    height: 2rem;
    resize: none;
  }

  .sub_btn {
    padding: 0.2rem 0.4rem;
    color: white;
    background: #396def;
    margin: 0.2rem auto;
    width: 3rem;
  }
</style>

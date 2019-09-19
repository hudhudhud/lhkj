<template>
  <div v-if="timeStatusMap">
    <div
      class="plate-time"
      v-if="timeStatusMap[std.id]"
    >
      <div
        class="seckill-title"
        v-if="timeStatusMap[std.id].isInTime"
      >活动剩余时间
        <div
          class="time-item"
          v-for="(item, ind) in timeStatusMap[std.id].timeText"
          :key="ind"
        >
          <div class="time-bg">{{item.time}}</div>
          <div>{{item.unit}}</div>
        </div>
      </div>
      <div
        class="seckill-title"
        v-if="!timeStatusMap[std.id].isInTime && timeStatusMap[std.id].time>0"
      >距离抢购开始还有
        <div
          class="time-item"
          v-for="(item, ind) in timeStatusMap[std.id].timeText"
          :key="ind"
        >
          <div class="time-bg">{{item.time}}</div>
          <div>{{item.unit}}</div>
        </div>
      </div>
      <!-- <div class="seckill-title" v-if="!timeStatusMap[std.id].isInTime && timeStatusMap[std.id].time==0">活动已结束</div> -->
      <div
        class="seckill-title"
        v-if="!timeStatusMap[std.id].isInTime && timeStatusMap[std.id].time==0"
      >活动未开始</div>
    </div>
  </div>
</template>
<script>
import { Indicator, Toast } from 'mint-ui';

export default {
  name: 'TimerMap',
  props: {
    timeStatusMap: {
      type: Object,
      require: true
    },
    std: {
      type: Object,
      require: true
    }
  },
  data () {
    return {};
  },
  methods: {},
  created () {}
};
</script>
<style lang="scss" scoped>
.seckill-title {
  padding-left: 0.2rem;
  white-space: nowrap;
  line-height: 0.6rem;
  font-size: 0.28rem;
  color: #fff;
  .time-item {
    display: inline-block;
    font-size: 0;
    div {
      display: inline-block;
      text-align: center;
      width: 0.44rem;
      height: 0.4rem;
      line-height: 0.44rem;
      font-size: 0.26rem;
      &.time-bg {
        color: #333;
        background: #fff;
      }
    }
  }
}
</style>

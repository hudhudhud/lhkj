<template>
  <div>
    <div class="plate-time">
      <div
        class="seckill-title"
        v-if="timeStatus.isInTime"
      >结束倒计时:
        <div
          class="time-item"
          v-for="(item, ind) in timeStatus.timeText"
          :key="ind"
        >
          <div class="time-bg">{{item.time}}</div>
          <div>{{item.unit}}</div>
        </div>
      </div>
      <div
        class="seckill-title"
        v-if="!timeStatus.isInTime && !timeStatus.timeover && timeStatus.timeText[0].time==0"
      >开启倒计时:
        <div
          class="time-item"
          v-for="(item, ind) in timeStatus.timeText"
          :key="ind"
        >
          <div class="time-bg">{{item.time}}</div>
          <div>{{item.unit}}</div>
        </div>
      </div>
      <div
        class="seckill-title"
        v-if="!timeStatus.isInTime && !timeStatus.timeover && timeStatus.timeText[0].time>0"
      >活动未开始！
      </div>
      <!-- <div class="seckill-title" v-if="!timeStatusMap[std.id].isInTime && timeStatusMap[std.id].time==0">活动已结束</div> -->
      <div
        class="seckill-title"
        v-if="timeStatus.timeover"
      >活动已结束！下周六再来</div>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
export default {
  name: 'TimerMap',
  props: {
    act: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      timer: null,
      timeStatus: {},
      startTime: '',
      endTime: ''
    };
  },
  methods: {
    getSecondTimeFomate (a) {
      var d = parseInt(a / 3600 / 24);
      if (d.toString().length == 1) {
        d = '0' + d;
      }
      var h = parseInt((a / 3600) % 24);
      if (h.toString().length == 1) {
        h = '0' + h;
      }
      var m = parseInt((a / 60) % 60);
      if (m.toString().length == 1) {
        m = '0' + m;
      }
      var s = parseInt(a % 60);
      // var s = (a - 3600 * h - 60 * m)
      if (s.toString().length == 1) {
        s = '0' + s;
      }
      return [
        { time: d, unit: '天' },
        { time: h, unit: '时' },
        { time: m, unit: '分' },
        { time: s, unit: '秒' }
      ];
    },
    calcTime () {
      let timeStatus = {};
      let now = Date.now();
      let startTime = moment(this.startTime).valueOf();
      let endTime = moment(this.endTime).valueOf();
      timeStatus.timeover = false;
      if (now < startTime) {
        timeStatus.isInTime = false;
        timeStatus.time = startTime - now;
        timeStatus.startTime = false;
      } else if (now > startTime && now < endTime) {
        timeStatus.isInTime = true;
        timeStatus.time = endTime - now;
        timeStatus.startTime = startTime;
      } else if (now > endTime) {
        timeStatus.timeover = true;
      }
      timeStatus.timeText = this.getSecondTimeFomate(timeStatus.time / 1000);
      this.timeStatus = timeStatus;
      this.$emit('open-message', this.timeStatus);
      this.timer = setTimeout(this.calcTime, 1000);
    }
  },
  created () {
    if (this.act) {
      this.startTime = this.act.startTime;
      this.endTime = this.act.endTime;
      this.calcTime();
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer);
  }
};
</script>
<style lang="scss" scoped>
.seckill-title {
  white-space: nowrap;
  line-height: 0.6rem;
  font-size: 0.32rem;
  color: #168073;
  text-align: center;
  .time-item {
    display: inline-block;
    font-size: 0;
    div {
      display: inline-block;
      text-align: center;
      width: 0.44rem;
      height: 0.4rem;
      line-height: 0.44rem;
      font-size: 0.32rem;
      &.time-bg {
        color: #2b2c2c;
        background-image: linear-gradient(
          0deg,
          #cacaca 0%,
          #e0e0e0 26%,
          #f5f5f5 51%,
          #cacaca 100%
        );
        box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.26);
      }
    }
  }
}
</style>

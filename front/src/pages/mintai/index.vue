<template>
  <div class="page">
    <div
      class="page-rule"
      @click="openDialog"
    >活动规则</div>
    <div>
      <div
        class="wrapper"
        v-for="(act,idx) in actGroup"
        :key="'act'+idx"
      >
        <section
          v-for="(item,index) in act.productList"
          :key="index"
        >
          <div class="page-title">
            <img
              :src="item.iconUrl"
              alt=""
            >
          </div>
          <div
            class="page-detail"
            v-for="(standard,i) in item.standardList"
            :key="i"
            @click="kill(standard,idx)"
          >
            <img
              :src="standard.standardActUrl"
              alt=""
            >
            <div class="dialog" v-if="storeMap[idx][standard.id] == 0 && storeMap[idx][standard.id+'_pay'] == 0">已售罄</div>
          </div>
        </section>
      </div>
    </div>
    <ruleDialog
      :size="dialogSize"
      ref="ruleDialog"
      @confirm="confirm"
    ></ruleDialog>
  </div>
</template>

<script>
import { kill, getSeckillToken } from '@/lib/api';
import ruleDialog from './component/dialog';

export default {
  name: 'mintaiIndex',
  components: {
    ruleDialog
  },
  data () {
    return {
      actIdGroup:
        process.env.PUBLISH_ENV == 'prod'
          ? [
            { actId: 557304314, seckillToken: '' },
            { actId: 557305055, seckillToken: '' }
          ]
          : [
            { actId: 557195612, seckillToken: '' },
            { actId: 557214479, seckillToken: '' }
          ],
      act: {},
      actGroup: [],
      pic1: '',
      dialogSize: 'big',
      storeMap: [],
      timeMap: [],
      timeStatusMap: {}
    };
  },
  mounted () {
    this.actIdGroup.forEach(element => {
      getSeckillToken(element.actId, rs => {
        element.seckillToken = rs.payload.token;
      });
    });
    this.getActGroup();
    this.getSeckillTime();
  },
  methods: {
    async getActGroup () {
      let i = 0;
      let arr = this.actIdGroup;
      for (; i < arr.length;) {
        await this.loadAct(arr[i].actId);
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
    openDialog () {
      // this.dialogSize = 'small'
      this.$refs.ruleDialog.setDetail(this.actGroup[0].detail);
      this.$refs.ruleDialog.open();
    },
    confirm () {
      this.$refs.ruleDialog.close();
    },
    kill (std, idx) {
      this.running = true;
      let act = this.actIdGroup[idx];
      kill(std, act.actId, act.seckillToken, rs => {
        this.running = false;
      });
    },
    calcTime () {
      let timeStatusMap = {};
      this.actGroup.forEach((act, index) => {
        act.productList.forEach(product => {
          product.standardList.forEach(standard => {
            let timeStatus = {};
            let now = Date.now();
            timeStatus.time = 0;
            timeStatus.isInTime = false;
            let timeList = this.timeMap[index][standard.id];
            if (!timeList) {
              return;
            }
            for (let i = 0; i < timeList.length; i++) {
              let actTime = timeList[i];
              let startTime = actTime.startTime;
              let endTime = actTime.endTime;
              if (now < startTime) {
                timeStatus.isInTime = false;
                timeStatus.time = startTime - now;
                timeStatus.startTime = false;
                break;
              }
              if (now > startTime && now < endTime) {
                timeStatus.isInTime = true;
                timeStatus.time = endTime - now;
                timeStatus.startTime = startTime;
                break;
              }
            }
            timeStatusMap[standard.id] = timeStatus;
          });
        });
      })
      this.timeStatusMap = timeStatusMap;
      this._ind = setTimeout(this.calcTime, 1000);
    },
    async getSeckillTime () {
      this.timeMap = [];
      for (let i = 0; i < this.actIdGroup.length; i++) {
        let rs = await this.$get('api/seckill/time/' + this.actIdGroup[i].actId);
        if (rs.status == 200) {
          this.timeMap.push(rs.payload);
          this._ind = this.calcTime();
          this.getSeckStore();
        } else {
          this.$toast(rs.error);
        }
      }
    },
    async getSeckStore () {
      let delay = 5000;
      this.storeMap = [];
      if (this._indexStore) {
        clearTimeout(this._indexStore);
      }
      for (let i = 0; i < this.actIdGroup.length; i++) {
        let rs = await this.$post(
          'api/seckill/store/' + this.actIdGroup[i].actId,
          this.timeStatusMap
        );
        if (rs.status == 200) {
          this.storeMap.push(rs.payload);
        } else {
          delay = 10000;
        }
      }
      this._indexStore = setTimeout(this.getSeckStore, delay);
    },
    beforeDestroy () {
      if (this._ind) {
        clearTimeout(this._ind);
      }
      if (this._indexStore) {
        clearTimeout(this._indexStore);
      }
    }
  }
};
</script>

<style scoped lang="scss">
.page {
  background-image: url("./img/bg.jpg");
  background-size: 100% 100%;
  height: 29.5rem;
  overflow: hidden;
  position: relative;

  &-rule {
    position: absolute;
    text-align: center;
    color: #fff;
    font-size: 0.28rem;
    top: 0.5rem;
    right: 0;
    width: 1.5rem;
    height: 0.6rem;
    line-height: 0.6rem;
    background-color: #fe637d;
    border-radius: 0.3rem 0 0 0.3rem;
  }

  &-title {
    text-align: center;
    margin-bottom: 0.2rem;

    img {
      width: 4.25rem;
    }
  }

  &-detail {
    text-align: center;
    margin-bottom: 0.4rem;
    position: relative;
    img {
      width: 6.4rem;
    }
    .dialog{
      position: absolute;
      width:6.4rem;
      height: 3.35rem;
      background: rgba(0,0,0,0.5);
      top: 0;
      left: 50%;
      margin-left: -3.2rem;
      line-height: 3.35rem;
      color: #fff;
      font-size: 0.3rem;
      border-radius: 0.3rem;
    }
  }
}

.wrapper {
  &:first-child {
    margin-top: 7.62rem;
  }
}
</style>

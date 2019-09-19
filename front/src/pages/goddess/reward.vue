<template>
  <div class="reward">
    <div v-if="list.length">
      <div class="reward-item" v-for="(item,index) in list" :key="index">
        <div class="reward-item-content">
          <div class="reward-item-content-icon">
            <img :src="item.standardImgUrl" alt="">
          </div>
          <div class="reward-item-content-desc">
            <p>{{item.proStandardName}}</p>
            <p>请至中国建设银行app-悦享生活-惠聚广东-女神节活动处兑换</p>
          </div>
        </div>
        <!--<div class="reward-item-action"></div>-->
      </div>
    </div>
    <div class="empty" v-else>
      <p class="empty-txt">{{emptyTxt}}</p>
    </div>
  </div>
</template>

<script>
import {Indicator} from 'mint-ui';

export default {
  name: 'reward',
  data () {
    return {
      // 扫脸抽奖，4次抽奖，抽完领券
      actId: process.env.PUBLISH_ENV == 'prod' ? '551876916,551948250,551949928' : '551753187,551753855,551754381',
      list: [],
      emptyTxt: '您还没获得津贴，赶快参与游戏获得津贴吧'
    }
  },
  created () {
    this.loadOrder();
  },
  methods: {
    async loadOrder () {
      Indicator.open();
      // this.loading = true;

      let rs = await this.$post('/api/getOrderList?', {
        actId: this.actId || '',
        isHidden: 1,
        status: '2',
        pageSize: 100,
        currentPage: 1
      });

      if (rs.status === 200) {
        let list = rs.payload.list;

        if (!list || list.length === 0) {
          this.list = [];
        } else {
          list.forEach(item => {
            this.list.push(item);
          });
        }
        this.currentPage++;
      }

      // this.loading = false;
      Indicator.close();
    }
  }
}
</script>

<style scoped lang="scss">
  .reward {
    background: #fff;

    &-item {
      display: flex;
      align-items: center;
      padding: 0.25rem 0.3rem 0.2rem 0.3rem;

      &:last-child {
        border-bottom: 0.01rem solid #f2f2f2;
      }

      &-content {
        display: flex;
        flex-grow: 1;
        justify-content: stretch;

        &-icon {
          flex: none;
          width: 1.7rem;
          height: 1.7rem;

          img {
            width: 100%;
          }
        }

        &-desc {
          margin-left: 0.3rem;
          color: #333;
          flex-grow: 1;
        }

        p {
          line-height: 1.5;
          font-size: 0.3rem;

          &:last-child {
            font-size: 0.22rem;
            margin-top: 0.2rem;
          }
        }
      }

      &-action {
        flex: none;
        width: 1.8rem;
        height: 0.6rem;
        background-image: url("./img/reward/usetips.png");
        background-size: 100% 100%;
      }
    }
  }

  .empty {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;

    &-txt {
      font-size: 0.3rem;
    }
  }
</style>

<template>
  <div>
    <div class="branch-container">
      <div class="hiddenScroll">
        <div class="branch-banks">
          <div v-for="(item, ind) in bankBranchlist" :key="item.id" :id="item.id" :class="{'active': index == ind}"
            @click="getLocalBanksAct(item.id, ind)">{{ item.localName}}</div>
        </div>
      </div>

      <div class="actlist">
        <div class="actlist-item" v-for="(item,ind) in actList" :key="ind" @click="openTarget(item.actId)">
          <img :src="item.actUrl" alt="">
        </div>
        <div v-show="noMore" class="order-nomore">
          <img @click="openTarget()" src="./img/nomore.png" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      index: 0,
      merchantId: this.$store.state.merchantId,
      bankBranchlist: [],
      actList: [],
      noMore: false
    };
  },
  methods: {
    openTarget (actId) {
      if (actId) {
        this.$router.push(
          '/' + this.$store.state.merchantAppid + '/merchant/index/act/' + actId
        );
      } else {
        this.$toast('敬请期待');
      }
    },
    async getLocalBanks () {
      let rs = await this.$post('api/activity/get_first_institution', {
        merchantId: this.merchantId
      });

      this.bankBranchlist = rs.payload;
      this.$nextTick(() => {
        this.getLocalBanksAct(this.bankBranchlist[0].id, 0);
      });
    },
    async getLocalBanksAct (id, i) {
      let rs = await this.$post('api/activity/get_act', {
        institutionNum: id
      });
      if (rs.status == 200) {
        this.index = i;
        if (rs.payload.length < 1) {
          this.noMore = true;
        } else {
          this.noMore = false;
        }
        this.actList = rs.payload;
      }
    }
  },
  created () {
    this.getLocalBanks();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
::-webkit-scrollbar {
  width: 0px;
}
.branch-container {
  .hiddenScroll {
    height: 0.59rem;
    overflow: hidden;
    margin-bottom: 0.58rem;
  }
  .branch-banks {
    display: flex;
    flex-wrap: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    height: 0.79rem;
    //justify-content: center;
    color: rgb(51, 51, 51);
    font-size: 0.3rem;
    div {
      flex-shrink: 0;
      width: 1.38rem;
      white-space: nowrap;
      margin: 0 0.2rem;
      height: 0.59rem;
      line-height: 0.59rem;
      border-radius: 0.05rem;
      &.active {
        color: #ffffff;
        background: rgb(247, 37, 57);
      }
    }
  }
}
.actlist {
  min-height: 2rem;
  &-item {
    img {
      width: 100%;
      margin-bottom: 0.3rem;
    }
  }
}
.order-nomore {
  img {
    width: 100%;
    margin-bottom: 0.3rem;
  }
}
</style>

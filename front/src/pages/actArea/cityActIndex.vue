<template>
  <div class="main">
    <cbbHeader :title="$route.query.city.split('市')[0] +'活动专区'"></cbbHeader>
    <img src="./img/yhzj.png" alt class="banner">
    <div class="area-title">
      <img src="./img/gps.png" alt>
      {{$route.query.city| getCityName}}活动专区
    </div>
    <div class="title">
      分行活动专区
      <a href="javascript:" @click="$href('/index/actArea/localBanksList')">
        <img src="./img/more.png" alt>
      </a>
    </div>

    <div class="wrap">
      <div class="back-tab">{{$route.query.city| getCityName}}分行</div>
      <template v-if="!actlist.length">
        <div class="waiting">
          <img src="./img/waiting.png" alt>
          <div>更多活动敬请期待</div>
        </div>
      </template>
      <div class="bank-act">
        <div class="act">
          <img
            :src="item.actUrl"
            alt
            class="item"
            v-for="(item, index) in actlist"
            :key="index"
            @click="$href(`/index/act/${item.actId}`)"
            :class="{'mL3': (index+1)%2 ==0}"
          >
        </div>
      </div>
    </div>
    <p class="line"></p>
    <div class="title">地方支行活动专区</div>
    <div class="branch-container">
      <div class="branch-banks">
        <div
          v-for="(item, ind) in bankBranchlist"
          :key="item.id"
          :id="item.id"
          @click="getBranchBanksAct(item.id, ind)"
          :class="{'active': index == ind}"
          ref="branch"
        >{{ item.localName }}支行</div>
      </div>
      <template v-if="!bankBranchlist.length">
        <div class="waiting">
          <img src="./img/waiting.png" alt>
          <div>更多活动敬请期待</div>
        </div>
      </template>
      <div class="wrap">
        <div class="branch-act">
          <div class="act">
            <img
              v-for="(item, index) in actlistBranch"
              :key="item.id"
              :src="item.actUrl"
              @click="$href(`/index/act/${item.actId}`)"
              :class="{'mL3': (index+1)%2 ==0}"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cbbHeader from '@/components/cbbHeader';

export default {
  data () {
    return {
      index: localStorage.getItem('currentBranchBankIndex') || 0,
      merchantId: this.$store.state.merchantId,
      actlist: [],
      actlistBranch: [],
      bankBranchlist: []
    };
  },
  components: {
    cbbHeader
  },
  methods: {
    async getLocalBanksAct () {
      let rs = await this.$post('api/activity/get_act', {
        institutionNum: this.$route.query.id
      });
      this.actlist = rs.payload;
    },
    async getBranchBanksAct (id, i) {
      if (i >= 0) {
        this.index = i;
        localStorage.setItem('currentBranchBankIndex', i);
      }
      let rs = await this.$post('api/activity/get_act', {
        institutionNum: id
      });
      this.actlistBranch = [];
      this.actlistBranch = rs.payload;
    },
    async getLocalBanksBranch () {
      let rs = await this.$post('api/activity/get_sub_institution', {
        higherInstitution: this.$route.query.id
      });
      this.bankBranchlist = rs.payload;
      this.$nextTick(() => {
        this.getBranchBanksAct(this.$refs.branch[this.index].id, this.index);
      });
    }
  },
  created () {
    this.getLocalBanksAct();
    this.getLocalBanksBranch();
  },
  mounted () {
    console.log(this.$route.query.id);
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.main {
  background: #fff;
  padding-bottom: 0.41rem;
}
.banner {
  display: block;
  width: 100%;
}
.area-title {
  height: 0.82rem;
  line-height: 0.92rem;
  background: #ebf2f7;
  color: rgb(77, 77, 77);
  text-align: center;
  img {
    width: 0.4rem;
    margin-right: 0.1rem;
    vertical-align: -0.1rem;
  }
}
.title {
  margin: 0.34rem 0;
  line-height: 0.44rem;
  border-left: 0.1rem solid #09b6f2;
  color: rgb(77, 77, 77);
  font-size: 0.3rem;
  padding-left: 0.24rem;
  a {
    float: right;
    margin-right: 0.3rem;
    img {
      width: 0.8rem;
    }
  }
}
.wrap {
  margin: 0 0.2rem;
}
.back-tab {
  width: 1.24rem;
  line-height: 0.56rem;
  border-radius: 0.1rem;
  text-align: center;
  background: #09b6f2;
  color: #fff;
  font-size: 0.26rem;
  margin-bottom: 0.4rem;
}
.waiting {
  text-align: center;
  img {
    width: 3.68rem;
  }
  div {
    margin: 0.4rem 0;
    font-size: 0.22rem;
    color: rgb(196, 196, 196);
  }
}
.bank-act {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  img {
    display: inline-block;
    width: 48.5%;
    height: 1.4rem;
    margin-bottom: 0.28rem;
  }
}
.line {
  height: 0.14rem;
  background: #ebf2f7;
}
.branch-container {
  .branch-banks {
    display: flex;
    flex-wrap: wrap;
    background: #ebf2f7;
    color: rgb(77, 77, 77);
    font-size: 0.26rem;
    margin-bottom: 0.34rem;
    text-align: center;
    div {
      flex: 1;
      max-width: 1.8rem;
      white-space: nowrap;
      margin: 0 0.2rem;
      height: 0.68rem;
      line-height: 0.68rem;
      &.active {
        color: #09b6f2;
        border-bottom: 3px solid #09b6f2;
      }
    }
  }
  .branch-act {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    img {
      display: inline-block;
      width: 48.5%;
      height: 1.4rem;
      margin-bottom: 0.28rem;
    }
  }
}
.mL3 {
  margin-left: 3%;
}
</style>

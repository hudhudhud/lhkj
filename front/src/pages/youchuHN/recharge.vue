<template>
  <div class="youchu" :class="{active:setShowPop}">
    <back></back>
    <div class="swiper">
      <div class="swiper-wrapper">
        <div class="swipe-wrapper">
          <mt-swipe :auto="4000">
            <mt-swipe-item v-for="(img, ind0) in bannerList" :key="'img_' +ind0">
              <img :src="img.url" alt>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
    </div>
    <!-- 话费充值专区 -->
    <template v-if="type==1">
      <div class="refill">
        <div class="tiptop"> <img src="./imgs/telpayicon.jpg" alt=""> 话费优惠充</div>
        <template v-if="setting.actId">
          <legoCharge :setting="setting" :settingAll="settingAll"></legoCharge>
        </template>

      </div>
    </template>

    <!-- 生活缴费专区 -->
    <template v-else>
      <div class="pay">
        <!-- <div class="tiptop"> <img
            src="./imgs/lifeicon.png"
            alt=""
          > 生活缴费</div> -->
        <template v-if="setting2.actId">
          <legopayment :setting="setting2" :settingAll="settingAll" :type="$route.params.type"></legopayment>
        </template>
      </div>
    </template>

    <div class="rule">
      温馨提示：
      <div class="content">
        每周六周日上午9点起，使用湖南邮储银行卡支付，有机会享受68折优惠。先到先得，用完即止，每人每月可享受1次优惠！请提前在微信上绑定好您的湖南邮储卡哦。
      </div>
    </div>

  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'mint-ui';
import cbbHeader from '@/components/cbbHeader';
import banner from './imgs/banner.png';
import legoCharge from './LegoChargeYc/Index';
import legopayment from './LegoPaymentBusiness/Index';
import { gotoAuth } from '../../router/index';
export default {
  data () {
    return {
      type: this.$route.params.type,
      bannerList: [
        {
          url: banner
        },
        {
          url: banner
        }
      ],
      setting: {
        actId: '',
        couponSurport: false
      },
      setting2: {
        actId: ''
      },
      settingAll: '',
      Act1: process.env.PUBLISH_ENV == 'prod' ? '556611950' : '555913588',
      Act2: process.env.PUBLISH_ENV == 'prod' ? '559283508' : '556588734',
      limitAct: process.env.PUBLISH_ENV == 'prod' ? '559289901' : '559293163',
      limitAct2: process.env.PUBLISH_ENV == 'prod' ? '559289397' : '559293996'
    };
  },
  computed: {
    setShowPop () {
      console.log('mmm', this.$store.getters.getShowPop);
      return this.$store.getters.getShowPop;
    }
  },
  components: {
    cbbHeader,
    Swipe,
    SwipeItem,
    legoCharge,
    legopayment
  },
  methods: {
    async determine () {
      let token = this.$store.state.token;
      if (!token) {
        gotoAuth();
        return;
      }
      let rs = await this.$post('api/act/limit/', { actId: this.limitAct });
      if (rs.status == 200) {
        this.setting.actId = this.limitAct;
        this.setting2.actId = this.limitAct2;
        this.settingAll = this.limitAct + ',' + this.limitAct2;
      } else if (rs.status === 6001) {
        this.setting.actId = this.Act1;
        this.setting2.actId = this.Act2;
        this.settingAll = this.Act1 + ',' + this.Act2;
      }
    }
  },
  created () {
    this.determine();
  }
};
</script>
<style lang="scss" scoped>
.youchu {
  background: #fff;
}
.active {
  width: 100%;
  height: calc(100vh - 1rem);
  overflow: hidden;
}
.swiper-wrapper {
  .swipe-wrapper {
    height: 3rem;
    width: 100%;
    margin: 0 auto 0.2rem;
    img {
      width: 100%;
    }
  }
}
.tiptop {
  width: 95%;
  height: 0.8rem;
  margin: 0.1rem auto;
  border-bottom: 0.01rem solid #eee;
  line-height: 0.8rem;
  padding-left: 1rem;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0.2rem;
    bottom: 0;
    margin: auto;
    width: 0.36rem;
    height: 0.36rem;
  }
}
.rule {
  width: 100%;
  padding: 0.2rem;
  margin: 0.2rem auto 0;
  background: #f9fafc;
  .content {
    width: 6.9rem;
    margin: 0.15rem auto 0;
    font-size: 0.3rem;
    color: #2f2f2f;
    line-height: 0.45rem;
    text-indent: 0.4rem;
  }
}
</style>

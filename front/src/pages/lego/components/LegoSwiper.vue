<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item,ind) in setting.list"
        :key="'slid_item_'+ind"
      >
        <img
          :src="item.url"
          v-if="item.url"
          alt=""
        >
        <div
          v-else
          class="swiper-default-el"
        >
          <div class="swiper-default-el-text">Slide</div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import { Toast, Indicator, MessageBox } from 'mint-ui';

export default {
  props: {
    setting: {
      type: Object
    }
  },
  data () {
    return {
      swiper: null
    };
  },
  watch: {
    setting: {
      deep: true,
      handler: function (val) {
        this.$nextTick(() => {
          this.clear();
          this.init();
        });
      }
    }
  },
  methods: {
    async validUser (actId) {
      Indicator.open();
      let rs = await this.$post('api/act/limit', {
        actId: actId
      });
      if (rs != undefined) {
        return rs;
      }
    },
    init () {
      var vm = this;
      this.swiper = new window.Swiper(this.$el, {
        autoplay: {
          delay: this.setting.delay ? parseInt(this.setting.delay) : 2000
        },
        speed: this.setting.speed ? parseInt(this.setting.speed) : 300,
        loop: true,
        pagination: {
          el: this.$el.querySelector('.swiper-pagination')
        },
        on: {
          tap: async function (event, ind) {
            let onClick = vm.setting.list[this.realIndex].action;
            if (!onClick || !onClick.type) {
              return;
            }
            if (onClick.type == 'msg') {
              Toast(onClick.action);
              event.stopPropagation();
            } else if (onClick.type == 'url') {
              if (onClick.isReplace) {
                window.location.replace(onClick.action);
              } else {
                window.location.href = onClick.action;
              }
              event.stopPropagation();
            } else if (onClick.type == 'act') {
              let response = await vm.validUser(onClick.action);
              if (response != undefined) {
                Indicator.close();
              }
              if (response.status == 6001) {
                MessageBox({
                  message: response.error,
                  title: '温馨提示',
                  showCancelButton: false,
                  confirmButtonText: '确定'
                });
                return;
              }
              if (onClick.isReplace) {
                vm.$router.replace(
                  `/${vm.$store.state.merchantAppid}/merchant/index/act/${
                    onClick.action
                  }`
                );
              } else {
                vm.$router.push(
                  `/${vm.$store.state.merchantAppid}/merchant/index/act/${
                    onClick.action
                  }`
                );
              }
              event.stopPropagation();
            } else if (onClick.type == 'page') {
              if (onClick.isReplace) {
                vm.$router.replace(
                  `/${vm.$store.state.merchantAppid}/merchant/lego/${
                    onClick.action
                  }`
                );
              } else {
                vm.$router.push(
                  `/${vm.$store.state.merchantAppid}/merchant/lego/${
                    onClick.action
                  }`
                );
              }
              event.stopPropagation();
            } else if (onClick.type == 'module') {
              if (onClick.isReplace) {
                vm.$router.replace(
                  `/${vm.$store.state.merchantAppid}/merchant/${onClick.action}`
                );
              } else {
                vm.$router.push(
                  `/${vm.$store.state.merchantAppid}/merchant/${onClick.action}`
                );
              }
              event.stopPropagation();
            } else if (onClick.type == 'back') {
              window.history.go(onClick.action ? parseInt(onClick.action) : -1);
              event.stopPropagation();
            }
          }
        }
      });
    },
    clear () {
      if (this.swiper && this.swiper.destroy) {
        this.swiper.destroy(true, true);
        this.swiper = null;
      }
    }
  },
  mounted () {
    this.init();
  },
  beforeDestroy () {
    this.clear();
  }
};
</script>

<style scoped>
.swiper-slide img {
  max-width: 100%;
}
.swiper-default-el {
  position: relative;
  width: 100%;
  padding-bottom: 30%;
  background: cadetblue;
}
.swiper-default-el-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 30px;
}
</style>

<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,ind) in setting.list" :key="'slid_item_'+ind">
        <img :src="item.url" v-if="item.url" alt="">
        <div v-else class="swiper-default-el">
          <div class="swiper-default-el-text">Slide</div>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper"
import "swiper/dist/css/swiper.min.css"

export default {
  props: {
    setting: {
      type: Object
    }
  },
  data () {
    return {
      swiper: null
    }
  },
  watch: {
    setting: {
      deep: true,
      handler: function (val) {
        this.$nextTick(() => {
          this.clear()
          this.init()
        })
      }
    }
  },
  methods: {
    init () {
      this.swiper = new Swiper(this.$el, {
        autoplay: {
          delay: this.setting.delay ? parseInt(this.setting.delay) : 2000
        },
        speed: this.setting.speed ? parseInt(this.setting.speed) : 300,
        loop: true,
        pagination: {
          el: this.$el.querySelector(".swiper-pagination")
        },
        on: {
          tap: function (event) {
          }
        }
      })
    },
    clear () {
      if (this.swiper && this.swiper.destroy) {
        this.swiper.destroy(true, true)
        this.swiper = null
      }
    }
  },
  mounted () {
    this.init()
  },
  beforeDestroy () {
    this.clear()
  }
}
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

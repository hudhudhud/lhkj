<template>
  <div>
    <mt-popup
      v-model="show"
      lockScroll="true"
      pop-transition="popup-fade"
      modal="false"
      :closeOnClickModal="true"
    >
      <div class="chance">
        <div
          class="chance-wrap"
          style="text-align:center;"
        >
          <div class="chance-img">
            <img
              src="./img/chance.png"
              alt=""
              width="100%"
            >
          </div>
          <div
            class="chance-btn"
            @click="pay"
          >立即购买</div>
        </div>

      </div>

    </mt-popup>
  </div>
</template>
<script>
import { payForChance } from '@/lib/api';

export default {
  name: 'BuyChance',
  props: ['payload'],
  data () {
    return {
      show: false
    };
  },
  watch: {
    payload: function (val) {
      if (val) {
        this.show = true;
      }
    }
  },
  methods: {
    pay () {
      payForChance(this.payload.prepayId, `index/act/${this.payload.actId}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.chance {
  width: 5.1rem;
  height: 4.77rem;
  background: url(./img/buy-chancebg.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 1.6rem;

  &-img {
    width: 3.96rem;
    margin: 0 auto;
  }
  &-btn {
    width: 3.56rem;
    height: 0.97rem;
    margin: 0.1rem auto;
    text-align: center;
    line-height: 0.97rem;
    font-size: 0.34rem;
    color: #b72100;
    background: url(./img/buy-chancebtn.png) no-repeat;
    background-size: 100% 100%;
  }
}
/deep/ .mint-popup {
  top: 50%;
  background: transparent;
}
</style>

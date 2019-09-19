<template>
  <div>
    <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">{{item.label}}</div>

    <div
      class="input-label selector-form"
      @click="showSelector = true"
      :style="item.inputStyle"
    >{{value || item.label}}
      <!-- <div class="point"></div> -->
      <span :style="item.iconStyle"></span>
    </div>
    <transition name="slide">
      <BankSelector
        v-if="showSelector"
        @close="showSelector = false"
        :item="item"
        @select="onSelect"
      ></BankSelector>
    </transition>
  </div>
</template>
<script>
import BankSelector from "@/components/base/selector";

export default {
  props: ["item", "value"],
  data() {
    return {
      showSelector: false,
      currentBank: null
    };
  },
  components: { BankSelector },
  model: {
    prop: "value",
    event: "parent-event" //这个字段，是指父组件监听 parent-event 事件
  },
  methods: {
    onSelect(bank) {
      this.$emit("parent-event", bank.bankName);
      this.$store.state.higherBank = bank.higherBank;
    }
  }
};
</script>
<style scoped>
.selector-form {
  border: 1px solid rgb(200, 201, 202);
  border-radius: 0.6rem;
  line-height: 0.86rem;
  line-height: 0.86rem;
  font-size: 0.28rem;
  /* color: #333; */
  margin: 0.3rem 0;
  padding-left: 0.2rem;
  position: relative;
}
.selector-form {
  /* color: #fff; */
  width: 4.2rem;
  border-radius: 0.2rem;
  text-align: left;
  border-color: #fff;
  padding-left: 0;
}
.point {
  display: inline-block;
  border-top: 2px solid #3170d5;
  border-right: 2px solid #3170d5;
  height: 10px;
  width: 10px;
  transform: rotate(45deg);
  position: absolute;
  top: 13px;
  right: 20px;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0.5;
}
</style>

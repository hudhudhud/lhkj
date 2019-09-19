<template>
  <div>
    <div v-show="!item.hidden">
      <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">{{item.label}}</div>
      <div class="input-box" :style="item.inputStyle">
        <input
          v-if="value==''"
          type="text"
          :value="$store.state.higherBank"
          :placeholder="'请输入'+item.label"
          :class="item.placeholderClass"
        />
        <input
          v-else
          type="text"
          :value="value"
          :placeholder="'请输入'+item.label"
          :class="item.placeholderClass"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item", "value"],
  model: {
    prop: "value",
    event: "parent-event" //这个字段，是指父组件监听 parent-event 事件
  },
  watch: {
    "$store.state.higherBank": function(val) {
      this.$emit("parent-event", val);
    }
  },
  methods: {
    checkval(){
      if(this.item.verifyRegex){
        let reg = this.item.verifyRegex;
        let re = new RegExp(reg);
        if(!re.test(this.value)){
          this.$toast(this.item.label + '输入格式错误');
        }
      }
    }
  }
};
</script>

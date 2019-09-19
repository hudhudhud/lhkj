
<template>

  <div>
    <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">{{item.label}}</div>
    <div class="input-box" :style="item.inputStyle">
      <input
        type="text"
        :value="value"
        :placeholder="item.showPlaceHolder?'请输入'+item.label:''"
        @input="$emit('input', $event.target.value)"
        :class="item.placeholderClass"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ["item", "value"],
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

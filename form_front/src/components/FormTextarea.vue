
<template>

  <div>
    <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">{{item.label}}</div>
    <div class="textarea-box" :style='item.inputStyle'>
      <textarea
        :value="value"
        @input="$emit('input', $event.target.value)"
        :rows='item.rows?item.rows:4'
        :cols="item.cols?item.cols:30"
        :class="item.placeholderClass"
         @blur="fixScroll"
         @focus="focus"
      />
    </div>
  </div>
</template>
<script>
export default {
  props: ["item", "value"],
  data(){
    return {
      height:0,
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
    },
    //fix iphone端软键盘弹回后页面留白问题
    fixScroll() {
      let u = navigator.userAgent;
      let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        window.scrollTo(0, this.height);
      }
    },
    focus(){
      this.height = document.body.scrollHeight
    }
  }
};
</script> 
<style scoped lang='scss'>
textarea{
    display: inline-block;
    width:100%;
    height:100%;
    outline:none;
    border:none;
    
}
</style>

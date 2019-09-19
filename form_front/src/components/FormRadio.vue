
<template>

  <div>
    <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">{{item.label}}</div>
    <div v-for="(info,index) in item.options" :key="index" class="input-radio" :style="item.inputStyle">
      <span :style="value==info?item.radioChkStyle:item.radioStyle">
        <input type="radio" 
          :value="info" 
          :name="item.dataKey" 
          :id="item.dataKey+index" 
          :style="{opacity:(item.radioStyle?0:1)}"
          @change="$emit('parent-event',$event.target.value)">
      </span>
      <label :for="item.dataKey+index" :style="item.radiolabelStyle">{{info}}</label>
      
      <!-- <input
        type="text"
        :value="value"
        :placeholder="'请输入'+item.label"
        @input="$emit('input', $event.target.value)"
        :class="item.placeholderClass"
      /> -->
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
  methods: {

  }
};
</script> 
<style lang="scss" scoped>
.input-radio{
  position: relative;
  input{
    width: 100%;
    height: 100%;
    display: block;
  }
  span{
    position: absolute;
    width: 0.3rem;
    height: 0.3rem;
    border-radius: 50%;
    top: 3px;
    left: 0;
    display: block;
    border: 1px solid rgb(248,228,168);
  }
}
</style>


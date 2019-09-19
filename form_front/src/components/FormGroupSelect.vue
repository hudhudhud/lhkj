<template>
  <div class="group-select">
    <div class="labels"> 
        <div class="input-label" :style="item.labelStyle+'width:'+width+'%'" :class="item.labelBlock?'labelBlock':''"
        v-for="(label,i) in this.labels" :key='i'>{{label}}</div>
    </div>
    <div class="main">
      <div class="inputtext" :style='"width:"+width+"%"' v-for='(option,ind) in item.options' :key='ind'>
        <select  @change="change" v-model='vals[ind]'> 
          <option v-for='(item,i) in option' :value='item.value' :key='i'>{{item.name}}</option>
        </select>
        <img src="./img/select-arrow.png" alt class="arrow">
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
  data () {
    return {
      vals:(new Array(this.item.options.length)).fill(''),
      width:Math.floor((100/this.item.options.length))-1,
      labels:this.item.label.split(',')
    };
  },
  watch:{
    value:{
        handler(v){
            if(v){
                let ary=v.split(',')
                if(ary.length>0){
                    ary.forEach((item,i)=>{
                        this.vals[i]=item
                        this.$set(this.vals,i,item)
                    })
                }
            }
        },
        immediate:true,
    },
  },
  created () {
  },
  methods: {
    change () {
      if(this.vals.some(item=>item)){
        this.$emit("parent-event", this.vals.join());
      }
      else{
          this.$emit("parent-event", '');
      }
    },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.group-select {
    .labels{
        width:100%;
        display: flex;
        justify-content: space-between;
    }
  .main {
    width:100%;
    height:.86rem;
    display: flex;
    justify-content: space-between;
    .inputtext {
      position:relative;
      width:30%;
      input,select{
            position:absolute;
            width:100%;
            top:0;
            height:.86rem;
            border-radius: .1rem;
            font-size:.3rem;
            border:.02rem solid rgb(169,167,180);
            box-sizing: border-box;
            outline: none;
            line-height: .86rem;
            padding:0 .1rem;
        }
       img.arrow{
            position:absolute;
            right:.28rem;
            top:.34rem;
            width:.26rem;
            height:.18rem;
        }
    }
  }
   select{
      appearance:none;   
      -moz-appearance:none;   
      -webkit-appearance:none; /*兼容苹果手机*/
      -ms-appearance:none; 
      outline:none;      
      -webkit-tap-highlight-color: #fff;
      // border: rem(1) solid #EBEBEB;
      // width:rem(100);
      // height: rem(50);
      // line-height: rem(50);
      /*防止紧紧靠在边上*/
      text-indent:rem(4);
      background-color: transparent;
  }
}
</style>

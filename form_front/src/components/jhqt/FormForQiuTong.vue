<template>
  <div class="group-select">
    <div class="labels"> 
        <div class="input-label" :style="item.labelStyle+'width:32%'">球衣颜色</div>
        <div class="input-label" :style="item.labelStyle+'width:32%'">球衣尺寸</div>
        <div class="input-label" :style="item.labelStyle+'width:32%'">球衣展示</div>
    </div>
    <div class="main">
        <div class="inputtext">
            <select  @change="change" v-model='color'> 
            <option v-for='(item,i) in optionColor' :value='item.value' :key='i'>{{item.name}}</option>
            </select>
            <img src="../img/select-arrow.png" alt class="arrow">
        </div>
        <div class="inputtext" >
            <select  @change="change" v-model='size'> 
            <option v-for='(item,i) in optionSize' :value='item.value' :key='i'>{{item.name}}</option>
            </select>
            <img src="../img/select-arrow.png" alt class="arrow">
        </div>
        <div class="inputtext imgs" @click='popupVisible=true'>
            <img src="./img/white.png" alt="" v-if='color==="white"'>
            <img src="./img/gray.png" alt="" v-else-if='color==="gray"'>
        </div>
    </div>
    <mt-popup v-model="popupVisible" position="middle" popup-transition="popup-fade">
      <div class="pop-content">
        <img src="./img/white.png" alt="" v-if='color==="white"' class="pop-img">
        <img src="./img/gray.png" alt="" v-else-if='color==="gray"' class="pop-img">
        <img src="./img/close.png" alt="" class='close' @click="popupVisible=false">
      </div>
    </mt-popup>
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
      color:'',
      size:'',
      optionColor:[{value:'white',name:'白色'},{value:'gray',name:'灰色'}],
      optionSize:[
        {value:'S',name:'S(165cm)'},
        {value:'M',name:'M(170cm)'},
        {value:'L',name:'L(175cm)'},
        {value:'XL',name:'XL(180cm)'}
      ],
      popupVisible:false,
    };
  },
  watch:{
    value:{
        handler(v){
            if(v){
                let ary=v.split(',')
                    if(ary.length>0){
                        this.color=ary[0]?ary[0]:''
                        this.size=ary[1]?ary[1]:''
                    }
                }
        },
        immediate:true,
    },
  },
  methods: {
    change () {
      if(this.color&&this.size){
        this.$emit("parent-event", [this.color,this.size].join());
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
        .input-label{color:#000;text-align: left;}
    }
  .main {
    width:100%;
    height:.86rem;
    display: flex;
    justify-content: space-between;
    .inputtext {
      position:relative;
      width:32%;
      select{
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
        &.imgs{
          text-align:left;
          img{
            border:.02rem solid rgb(169,167,180);
            border-radius: .1rem;
            width:1.2rem;
            max-height:1.2rem;
          }
        }
    }
  }
  .pop-content{
    position:relative;
    .pop-img{
      width:6rem;
    }
    .close{
        width:.63rem;
        height:.63rem;
        position:absolute;
        top:7.5rem;
        left:50%;
        transform:translateX(-50%);
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

<template>
  <div class="address">
    <div class="input-label" :style="item.labelStyle" :class="item.labelBlock?'labelBlock':''">{{item.label}}</div>
    <div class="main">
      <div class="inputtext"   >
        <select  @change="onProvinceChange"   ref='province' v-model='province'> 
          <option v-for='(item,i) in provinceList' :value='item.id' :key='i'>{{item.name}}</option>
        </select>
        <img src="./img/select-arrow.png" alt class="arrow">
      </div>
      <div class="inputtext"  >
        <select  @change="onCityChange" ref='city' v-model='city' > 
          <option v-for='(item,i) in cityList' :value='item.id' :key='i'>{{item.name}}</option>
        </select>
        <img src="./img/select-arrow.png" alt class="arrow">
      </div>
      <div class="inputtext">
        <select  @change="onAreaChange"   ref='area' v-model='area'>
          <option v-for='(item,i) in areaList' :value='item.id' :key='i'>{{item.name}}</option>
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
      province: '',
      city: '',
      area: '',
      provinceList: [
        {id:'',name:'省'},
      ],
      cityList: [
         {id:'',name:'市'},
      ],
      areaList: [
         {id:'',name:'区'},
      ],
    };
  },
  watch:{
    value:{
      handler(v){
            if(v){
              let ary=v.split(',')
              if(ary.length>0){
                this.province=ary[0]
                this.city=ary[1]?ary[1]:''
                this.area=ary[2]?ary[2]:''
              }
            }
        },
        immediate:true,
    },
    province: async function () {
      await this.getCityArea();
    },
    city: async function () {
      await this.getArea();
    }
  },
  async mounted () {
    this.getProvinceArea();
    console.log(this.province,this.area,this.city)
  },
  methods: {
    onProvinceChange () {
      this.city=''
      this.area=''
      this.$emit("parent-event",[this.province , this.city, this.area].join());
    },
    onCityChange () {
      this.area=''
      this.$emit("parent-event",[this.province , this.city, this.area].join());
    },
    onAreaChange () {
      this.$emit("parent-event",[this.province , this.city, this.area].join());
    },
    async getProvinceArea () {
      this.provinceList=[{id:'',name:'省'},]
      let rs = await this.$get('/formResources/querySonCityArea',{params:{pid:0}});
      if (rs.status == 200) {
        rs.payload.sonCityArea.forEach((item) => {
          this.provinceList.push({name:item.name,id:item.id});
        });
      }
    },
    async getCityArea () {
      this.cityList=[{id:'',name:'市'}]
      let rs = await this.$get('/formResources/querySonCityArea' , {params:{pid:this.province}});
      if (rs.status == 200) {
        rs.payload.sonCityArea.forEach(item => {
          this.cityList.push({name:item.name,id:item.id});
        });
      }
    },
    async getArea () {
      this.areaList=[{id:'',name:'区'}]
      let rs = await this.$get('/formResources/querySonCityArea' , {params:{pid:this.city}});
      if (rs.status == 200) {
        rs.payload.sonCityArea.forEach(item => {
          this.areaList.push({name:item.name,id:item.id});
        });
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.address {
  .main {
    width:100%;
    height:.86rem;
    display: flex;
    justify-content: space-between;
    .inputtext {
      position:relative;
      width:32%;
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

<template>
  <div class="address">
    <div class="main">
      <div class="login-input">
        <div class="select">
          <select v-model="cityCode">
            <option :value="''" selected disabled>请选择城市</option>
            <option v-for="(city,Idx) in citySlots" :value="city.id" :key="'city'+Idx">
              {{city.name}}</option>
          </select>
        </div>
      </div>
      <div class="login-input">
        <div class="select">
          <select v-model="companyCode">
            <option value selected disabled>请选择公司</option>
            <option v-for="(company,Idx) in companySlots" :key="'company'+Idx" :value="company.id">{{company.name}}
            </option>
          </select>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
// import { getCurrentLocation } from '@/utils/index';
export default {
  name: 'picker',
  props: {
    labelArr: {
      type: Array,
      require: true
    },
    province: {
      type: String,
      require: true
    },
    proStandardId: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      payload: '',
      address: null,
      isDefault: 1,
      setaddress: false,
      showToolbar: true,
      // provinceCode: '',
      cityCode: '',
      companyCode: '',
      ApiModelProperty: '',
      AllprovinceArea: [],
      AllcityArea: [],
      AllCompany: [],
      city: '',
      company: '',
      detailAddress: '',
      citySlots: [],
      companySlots: []
      // provinceVisible: false,
    };
  },

  methods: {
    async getPaymentType (value, action, bindValue) {
      let vm = this;
      if (action == 'queryCity') {
        this.citySlots.splice(0);
      }
      if (action == 'queryProduct') {
        this.companySlots.splice(0);
      }
      let rs = await this.$post('api/search/wec', {
        value: value,
        action: action,
        proStandardId: this.proStandardId
      });
      if (rs.status == 200) {
        this.payload = rs.payload;
        let payload = JSON.parse(rs.payload);
        if (payload.list.length == 0 && bindValue == 'companySlots') {
          vm.companyCode = '';
        }
        if (action == 'queryCity') {
          payload.list.forEach((item, index) => {
            vm.citySlots.push(item);
          });
        }
        if (action == 'queryProduct') {
          payload.list.forEach((item, index) => {
            vm.companySlots.push(item);
          });
        }
      } else {
        this.$toast(rs.error);
      }
    },
    updateMachine (values, slots, itemCode, itemName) {
      itemName = values;
      console.log(values);
      console.log(slots);
      let idx = slots.values.indexOf(values[0]);
      console.log(idx);
      itemCode = slots.id[idx];
    }
  },
  watch: {
    async cityCode (val) {
      if (val) {
        this.companyCode = '';
        await this.getPaymentType(val, 'queryProduct', 'companySlots');
      }
    },
    companyCode (val) {
      if (val) {
        this.$emit('eimt-companyCode', val);
      }
    }
  },
  async created () {
    await this.getPaymentType(this.province, 'queryCity', 'citySlots');
    /*  getCurrentLocation(result => {
      var name = result.name.split('市')[0];
      this.citySlots.forEach(element => {
        if (element.name == name) {
          this.cityCode = element.id;
        }
      });
    }); */
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.address {
  .main {
    position: relative;
    // height: 3.5rem;
    overflow: hidden;
    padding-left: 0.3rem;
    .inputtext {
      position: relative;
      // height: 0.8rem;
      display: flex;
      // line-height: 0.8rem;
      padding-left: 1.2rem;
      // font-size: 0.3rem;
      // border-bottom: 1px solid #ccc;
      // color: #333;

      width: 6.9rem;
      height: 0.88rem;
      background-color: #f9fafc;
      border-radius: 0.16rem;
      border: solid 0.01rem #d7d7d7;
      line-height: 0.88rem;
      margin: 0.2rem auto;
      font-size: 0.3rem;
      color: #888;
      input {
        width: 90%;
        background-color: #f9fafc;
        outline: none;
        height: 0.8rem;
        margin-top: 0.02rem;
      }
      .title {
        position: absolute;
        left: 0.28rem;
        top: 0;
      }
      .arrow {
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        right: 0.3rem;
        img {
          width: 100%;
        }
      }
    }
    .setaddress {
      height: 1rem;
      display: flex;
      line-height: 1rem;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.28rem 0 0.28rem;
      .button {
        width: 0.86rem;
        height: 0.48rem;
        img {
          width: 100%;
          vertical-align: top;
        }
      }
    }
    .picker-toolbar-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      padding: 0 0.3rem;
      .usi-btn-cancel,
      .usi-btn-sure {
        color: #ff6600;
      }
    }
  }
  .save {
    width: 6rem;
    height: 0.96rem;
    background-color: rgb(40, 173, 57);
    line-height: 0.96rem;
    text-align: center;
    color: #fff;
    font-size: 0.36rem;
    margin: 0.5rem auto;
    border-radius: 0.08rem;
  }
}
.login-input {
  position: relative;
  width: 6rem;
  height: 0.88rem;
  border: 1px solid #ccc;
  margin-bottom: 0.2rem;
  border-radius: 0.09rem;
  .titlepic {
    position: absolute;
    top: 50%;
    margin-top: -0.14rem;
    left: 0.2rem;
    width: 0.28rem;
    height: 0.28rem;
    img {
      width: 100%;
    }
  }
  input {
    width: 100%;
    height: 100%;
  }
}
.select {
  //用div的样式代替select的样式
  margin: 0 auto;
  width: 5.3rem;
  height: 100%;
  line-height: 0.7rem;
  // border-radius: 0.1rem;
  //盒子阴影修饰作用,自己随意
  // border: 1px solid #ccc;
  position: relative;
  select {
    //清除select的边框样式
    width: 4.38rem;
    border: none;
    height: 100%;
    font-size: 0.3rem;
    // line-height: 100%;
    //清除select聚焦时候的边框颜色
    outline: none;
    //将select的宽高等于div的宽高
    width: 100%;
    //隐藏select的下拉图标
    appearance: none;
    //通过padding-left的值让文字居中
    // padding-left: 0.2rem;
    background: #fff !important;
    // color: #9c9c9c;
  }
  &:after {
    content: "";
    width: 0.28rem;
    height: 0.28rem;
    background: url(./imgs/select-icon.png) no-repeat center;
    //通过定位将图标放在合适的位置
    background-size: 100% 100%;
    position: absolute;
    right: 0.1rem;
    top: 34%;
    //给自定义的图标实现点击下来功能
    pointer-events: none;
  }
}
</style>

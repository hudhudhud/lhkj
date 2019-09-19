<template>
  <div
    class="address"
    v-if="paymentId"
  >
    <div class="main">
      <div
        class="inputtext"
        @click="ShowProvince"
      >
        <div class="title name">省份</div>
        <input
          type="text"
          placeholder="请选择省份"
          v-model="province"
          readonly
        >
        <div class="arrow">
          <img
            src="./imgs/arrow.png"
            alt
          >
        </div>
      </div>
      <div
        class="inputtext"
        @click="ShowCity"
      >
        <div class="title name">城市</div>
        <input
          type="text"
          placeholder="请选择城市"
          v-model="city"
          readonly
        >
        <div class="arrow">
          <img
            src="./imgs/arrow.png"
            alt
          >
        </div>
      </div>
      <div
        class="inputtext"
        @click="ShowCompany"
      >
        <div class="title name">公司</div>
        <input
          type="text"
          placeholder="请选择地区"
          v-model="company"
          readonly
        >
        <div class="arrow">
          <img
            src="./imgs/arrow.png"
            alt
          >
        </div>
      </div>

      <!-- 省份 -->
      <mt-popup
        v-model="provinceVisible"
        popup-transition="popup-fade"
        closeOnClickModal="true"
        position="bottom"
      >
        <mt-picker
          :slots="provinceSlots"
          @change="onProvinceChange"
          style="width: 7.5rem;"
          showToolbar
        >
          <div class="picker-toolbar-title">
            <div
              class="usi-btn-cancel"
              @click="provinceVisible = !provinceVisible"
            >取消</div>
            <div
              class="usi-btn-sure"
              @click="provinceVisible = !provinceVisible"
            >确定</div>
          </div>
        </mt-picker>
        <!-- <mtPicker></mtPicker> -->
      </mt-popup>

      <!-- 城市 -->
      <mt-popup
        v-model="cityVisible"
        popup-transition="popup-fade"
        closeOnClickModal="true"
        position="bottom"
      >
        <mt-picker
          :slots="citySlots"
          style="width: 7.5rem;"
          @change="onCityChange"
          showToolbar
        >
          <div class="picker-toolbar-title">
            <div
              class="usi-btn-cancel"
              @click="cityVisible = !cityVisible"
            >取消</div>
            <div
              class="usi-btn-sure"
              @click="cityVisible = !cityVisible"
            >确定</div>
          </div>
        </mt-picker>
      </mt-popup>
      <!-- 公司 -->
      <mt-popup
        v-model="companyVisible"
        popup-transition="popup-fade"
        closeOnClickModal="true"
        position="bottom"
      >
        <mt-picker
          :slots="companySlots"
          @change="onCompanyChange"
          style="width: 7.5rem;"
          showToolbar
        >
          <div class="picker-toolbar-title">
            <div
              class="usi-btn-cancel"
              @click="companyVisible = !companyVisible"
            >取消</div>
            <div
              class="usi-btn-sure"
              @click="companyVisible = !companyVisible"
            >确定</div>
          </div>
        </mt-picker>
      </mt-popup>
    </div>

  </div>
</template>

<script>
import { Picker, Popup } from 'mint-ui';
import mtPicker from '@/components/selectadd';
export default {
  name: 'picker',
  props: {
    labelArr: {
      type: Array,
      require: true
    },
    paymentId: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      address: null,
      isDefault: 1,
      setaddress: false,
      showToolbar: true,
      provinceCode: '',
      cityCode: '',
      companyCode: '',
      ApiModelProperty: '',
      AllprovinceArea: [],
      AllcityArea: [],
      AllCompany: [],
      province: '',
      city: '',
      company: '',
      detailAddress: '',
      provinceSlots: [
        {
          values: ['选择'],
          id: [null]
        }
      ],
      citySlots: [
        {
          values: ['选择'],
          id: [null]
        }
      ],
      companySlots: [
        {
          values: ['选择'],
          id: [null]
        }
      ],
      provinceVisible: false,
      cityVisible: false,
      companyVisible: false
    };
  },
  methods: {
    async getPaymentType (value, action, bindValue) {
      let rs = await this.$post('api/search/wec', {
        value: value,
        action: action
      });
      if (rs.status == 200) {
        let payload = JSON.parse(rs.payload);
        bindValue[0].values = ['选择'];
        bindValue[0].id = [null];
        payload.list.forEach((item, index) => {
          bindValue[0].values.push(item.name);
          bindValue[0].id.push(item.id);
        });
      }
    },
    ShowProvince () {
      this.provinceVisible = true;
    },
    ShowCity () {
      this.cityVisible = true;
    },
    ShowCompany () {
      this.companyVisible = true;
    },
    onProvinceChange (picker, values) {
      this.province = values;
      let list = this.provinceSlots[0];
      let idx = list.values.indexOf(values[0]);
      this.provinceCode = list.id[idx];
    },
    onCityChange (picker, values) {
      this.city = values;
      let list = this.citySlots[0];
      let idx = list.values.indexOf(values[0]);
      this.cityCode = list.id[idx];
    },
    onCompanyChange (picker, values) {
      this.company = values;
      let list = this.companySlots[0];
      let idx = list.values.indexOf(values[0]);
      this.companyCode = list.id[idx];
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
  components: {
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    mtPicker
  },
  watch: {
    paymentId (val) {
      this.getPaymentType(val, 'queryProvince', this.provinceSlots);
    },
    provinceCode (val) {
      if (val) {
        this.getPaymentType(val, 'queryCity', this.citySlots);
      }
    },
    cityCode (val) {
      if (val) {
        this.getPaymentType(val, 'queryProduct', this.companySlots);
      }
    },
    companyCode (val) {
      if (val) {
        this.$emit('eimt-companyCode', val);
      }
    }
  },
  async mounted () {
    if (this.paymentId) {
      this.getPaymentType(this.paymentId, 'queryProvince', this.provinceSlots);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.address {
  .main {
    .inputtext {
      position: relative;
      height: 0.8rem;
      display: flex;
      line-height: 0.8rem;
      padding-left: 1.2rem;
      font-size: 0.3rem;
      border-bottom: 1px solid #ccc;
      color: #333;
      input {
        width: 90%;
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
</style>

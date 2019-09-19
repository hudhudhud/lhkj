<template>
  <div class="address">
    <headerBar title="编辑收货地址"></headerBar>
    <div class="main">
      <div class="inputtext">
        <div class="title name">姓名</div>
        <input
          type="text"
          placeholder="请输入姓名"
          v-model="name"
        >
      </div>
      <div class="inputtext">
        <div class="title phone">手机号</div>
        <input
          type="text"
          placeholder="请输入手机号"
          v-model="phone"
        >
      </div>
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
        @click="ShowArea"
      >
        <div class="title name">地区</div>
        <input
          type="text"
          placeholder="请选择地区"
          v-model="area"
          readonly
        >
        <div class="arrow">
          <img
            src="./imgs/arrow.png"
            alt
          >
        </div>
      </div>
      <div class="addressdetail">
        <div>详细地址</div>
        <input
          type="text"
          placeholder="请输入详细地址"
          v-model="detailAddress"
        >
      </div>
      <div class="setaddress">
        <div>设置默认地址</div>
        <div
          class="button"
          @click="setDefault"
        >
          <img
            src="./imgs/on.png"
            alt
            v-if="isDefault == 1"
          >
          <img
            src="./imgs/off.png"
            alt
            v-else
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
          @change="onCityChange"
          style="width: 7.5rem;"
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
      <!-- 地区 -->
      <mt-popup
        v-model="areaVisible"
        popup-transition="popup-fade"
        closeOnClickModal="true"
        position="bottom"
      >
        <mt-picker
          :slots="areaSlots"
          @change="onAreaChange"
          style="width: 7.5rem;"
          showToolbar
        >
          <div class="picker-toolbar-title">
            <div
              class="usi-btn-cancel"
              @click="areaVisible = !areaVisible"
            >取消</div>
            <div
              class="usi-btn-sure"
              @click="areaVisible = !areaVisible"
            >确定</div>
          </div>
        </mt-picker>
      </mt-popup>
    </div>
    <div
      class="save"
      @click="savaAddress"
    >保存地址</div>
  </div>
</template>

<script>
import { Picker, Popup, Toast, Indicator } from 'mint-ui';
import headerBar from '@/components/headerBar';
import mtPicker from '@/components/selectadd';
export default {
  data () {
    return {
      address: null,
      isDefault: 1,
      setaddress: false,
      showToolbar: true,
      provinceCode: '',
      cityCode: '',
      areaCode: '',
      ApiModelProperty: '',
      AllprovinceArea: [],
      AllcityArea: [],
      AllArea: [],
      province: '',
      city: '',
      area: '',
      name: '',
      phone: '',
      detailAddress: '',
      provinceSlots: [
        {
          values: [
            '省份选择'
            // '浙江省',
            // '北京市',
            // '上海市',
            // '天津市',
            // '江苏省',
            // '广东省'
          ]
        }
      ],
      citySlots: [
        {
          values: ['城市选择']
        }
      ],
      areaSlots: [
        {
          values: ['地区选择']
        }
      ],
      provinceVisible: false,
      cityVisible: false,
      areaVisible: false
    };
  },

  methods: {
    async queryAddress (id) {
      let rs = await this.$get(`api/cityArea/custom/queryAddress/?id=${id}`);
      if (rs.status == 200) {
        if (rs.payload.length > 0) {
          this.address = rs.payload[0];
        }
      }
    },
    async ShowProvince () {
      this.provinceVisible = true;
    },
    async ShowCity () {
      this.cityVisible = true;
    },
    async ShowArea () {
      this.areaVisible = true;
    },
    async onProvinceChange (picker, values) {
      this.province = values;
      this.AllprovinceArea.forEach(item => {
        if (item.name == this.province) {
          console.log('this.province', this.province);
          this.provinceCode = item.id;
        }
      });
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    async onCityChange (picker, values) {
      if (!this.province) return;
      this.city = values;
      this.AllcityArea.forEach(item => {
        if (item.name == this.city) {
          console.log('this.city', this.city);
          this.cityCode = item.id;
        }
      });
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    onAreaChange (picker, values) {
      this.area = values;
      this.AllArea.forEach(item => {
        if (item.name == this.area) {
          console.log('this.city', this.area);
          this.areaCode = item.id;
        }
      });
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
      this.$emit('emit-address', this.province + this.city + this.area);
    },
    async getProvinceArea () {
      let rs = await this.$get('/api/cityArea/querySonCityArea/0');
      if (rs.status == 200) {
        this.AllprovinceArea = rs.payload.sonCityArea;
        rs.payload.sonCityArea.forEach((item, index) => {
          this.provinceSlots[0].values.push(item.name);
          if (this.address && item.id == this.address.provinceCode) {
            this.provinceSlots[0].values = [this.address.provinceName];
          }
        });
      }
    },
    async getCityArea () {
      let rs = await this.$get(
        '/api/cityArea/querySonCityArea/' + this.provinceCode
      );
      console.log(this.cityCode);
      if (rs.status == 200) {
        this.AllcityArea = rs.payload.sonCityArea;
        this.citySlots[0].values = ['城市选择'];
        rs.payload.sonCityArea.forEach(item => {
          this.citySlots[0].values.push(item.name);
          if (this.address && item.id == this.address.cityCode) {
            this.citySlots[0].values = [this.address.cityName];
          }
        });
      }
    },
    async setDefault () {
      this.isDefault = this.isDefault == 1 ? 0 : 1;
    },
    async getArea () {
      let rs = await this.$get(
        '/api/cityArea/querySonCityArea/' + this.cityCode
      );
      if (rs.status == 200) {
        console.log('rs111', rs.payload.sonCityArea);
        this.AllArea = rs.payload.sonCityArea;
        this.areaSlots[0].values = ['地区选择'];
        rs.payload.sonCityArea.forEach(item => {
          this.areaSlots[0].values.push(item.name);
          if (this.address && item.id == this.address.areaCode) {
            this.areaSlots[0].values = [this.address.areaName];
          }
        });
      }
    },
    async savaAddress () {
      if (
        this.name == '' ||
        this.phone == '' ||
        this.provinceCode == '' ||
        this.cityCode == '' ||
        this.areaCode == '' ||
        this.detailAddress == ''
      ) {
        Toast('请检查信息是否输入完整');
        return;
      }
      let phoneReg = /^1[3456789]\d{9}$/;
      if (!phoneReg.test(this.phone)) {
        Toast('手机号输入有误');
        return;
      }
      Indicator.open();
      let rs = await this.$post('api/cityArea/custom/saveOrUpdate', {
        customId: this.customId,
        name: this.name,
        phone: this.phone,
        provinceCode: this.provinceCode,
        provinceName: this.province[0],
        cityCode: this.cityCode,
        cityName: this.city[0],
        areaCode: this.areaCode,
        areaName: this.area[0],
        detailAddress: this.detailAddress,
        id: this.address ? this.address.id : null,
        isDefault: this.isDefault
      });
      if (rs.status == 200) {
        Indicator.close();
        Toast('保存成功');
        setTimeout(() => {
          window.history.go(-1);
        }, 2000);
      } else {
        Toast(rs.error);
      }
      Indicator.close();
    }
  },
  computed: {
    customId () {
      return this.$store.state.cust ? this.$store.state.cust.id : '';
    }
  },
  watch: {
    address (val) {
      this.name = val.name;
      this.phone = val.phone;
      this.detailAddress = val.detailAddress;
      this.isDefault = val.isDefault;
      this.areaCode = val.areaCode;
      this.cityCode = val.cityCode;
      this.provinceCode = val.provinceCode;
      this.area = val.areaName;
      this.city = val.cityName;
      this.province = val.provinceName;
    },
    provinceCode: async function (newvalue) {
      await this.getCityArea();
    },
    cityCode: async function (newvalue) {
      await this.getArea();
    }
  },
  components: {
    headerBar,
    [Popup.name]: Popup,
    [Picker.name]: Picker,
    mtPicker
  },
  async mounted () {
    let id = this.$route.query.id;
    if (id) {
      await this.queryAddress(id);
      this.getProvinceArea();
    } else {
      this.getProvinceArea();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.address {
  background-color: #f5f8fa;
  position: absolute;
  overflow: auto;
  width: 100%;
  height: 100%;
  min-height: 100%;
  .main {
    margin-top: 0.94rem;
    background-color: #fff;
    .inputtext {
      position: relative;
      height: 0.8rem;
      display: flex;
      line-height: 0.8rem;
      padding-left: 2rem;
      font-size: 0.3rem;
      border-bottom: 1px solid #f5f8fa;
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
    .addressdetail {
      margin-top: 0.3rem;
      font-size: 0.3rem;
      border-bottom: 1px solid #f5f8fa;
      padding: 0 0 0 0.28rem;
      input {
        margin-top: 0.2rem;
        width: 100%;
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

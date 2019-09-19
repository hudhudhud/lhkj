<template>
  <div class="ecard">
    <headerBar title="收货地址" :bgColor="'#5FB534'"></headerBar>
    <div class="container">
      <div class="address">
        <div class="addinfo" v-for="(address,ind) in addressList" :key="'address_'+ind">
          <div class="info" @click="goUrl(address.id)">
            <div class="add">
              {{address.name}}
              <span>{{address.phone}}</span>
              <span v-if="address.isDefault ==1" class="pretermit">默认</span>

              <p>{{address.provinceName}}{{address.cityName}}{{address.areaName}}{{address.detailAddress}}</p>
            </div>
          </div>
          <div class="editor">
            <img
              src="./imgs/editor.png"
              alt
              @click="$router.push(`address?id=${address.id}#enableSearch`)"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="add-btn" @click="$router.push(`address`)">
      <b>+</b>新增
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/headerBar';
export default {
  data () {
    return {
      isDefault: '',
      name: '',
      cityName: '',
      provinceName: '',
      areaName: '',
      detailAddress: '',
      phone: '',
      addressList: []
    };
  },
  components: {
    headerBar
  },
  methods: {
    goUrl (id) {
      this.$router.push(
        `/${this.$store.state.merchantAppid}/merchant/youchu/card/${
          this.$route.query.standardId
        }/${this.$route.query.actId}?addressId=${id}#enableSearch`
      );
    },
    async queryAddress () {
      let rs = await this.$get('api/cityArea/custom/queryAddress');
      if (rs.status == 200) {
        this.addressList = rs.payload;
      }
    },
    setAddressId (id) {
      this.$store.commit('setAddressId', id);
    },
    async getDefaultAdd () {
      let rs = await this.$get('/api/cityArea/custom/queryAddress');
      console.log(rs);
      if (rs.status == 200) {
        this.name = rs.payload.name;
        this.provinceName = rs.payload.provinceName;
        this.cityName = rs.payload.cityName;
        this.areaName = rs.payload.areaName;
        this.detailAddress = rs.payload.detailAddress;
        this.phone = rs.payload.phone;
        this.isDefault = rs.payload.status;
      }
    }
  },
  async mounted () {
    // await this.getDefaultAdd();
    this.queryAddress();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
/* .ecard {
  position: absolute;
  width: 100%;
  height: 100%;
} */
.container {
  .pro {
    position: relative;
    margin: 0 auto 0.38rem;
    width: 2.82rem;
    height: 2.82rem;
    background: url("./imgs/probg.png") no-repeat;
    background-size: 100% 100%;
    text-align: center;
    img {
      width: 1.86rem;
      position: absolute;
      top: 50%;
      margin-top: -0.5rem;
      left: 50%;
      margin-left: -0.95rem;
    }
  }
  .title {
    text-align: center;
    font-size: 0.36rem;
    color: rgb(51, 51, 51);
    margin-bottom: 0.22rem;
  }
  .point {
    text-align: center;
    font-size: 0.32rem;
    color: rgb(255, 119, 45);
    margin-bottom: 0.64rem;
  }
  .inputinfo {
    width: 6rem;
    height: 0.9rem;
    margin: 0 auto;
    margin-bottom: 0.32rem;
    input {
      width: 100%;
      height: 100%;
      font-size: 0.32rem;
      padding-left: 0.32rem;
      border: 1px solid rgb(177, 184, 193);
      border-radius: 0.08rem;
    }
  }
  .exchange {
    width: 6rem;
    height: 0.96rem;
    background-color: rgb(40, 173, 57);
    line-height: 0.96rem;
    text-align: center;
    color: #fff;
    font-size: 0.36rem;
    margin: 0.5rem auto 0.64rem;
    border-radius: 0.08rem;
  }
  .address {
    padding: 0.32rem;
    overflow-y: scroll;
    p {
      font-size: 0.28rem;
      color: rgb(51, 51, 51);
      margin-bottom: 0.25rem;
    }
    .addinfo {
      display: flex;
      justify-content: space-between;
      align-items: center;
      min-height: 1.4rem;
      font-size: 0.3rem;
      color: rgb(51, 51, 51);
      .info {
        display: flex;
        .add {
          margin-left: 0.16rem;
          span {
            font-size: 0.28rem;
            color: rgb(179, 182, 188);
          }
          .pretermit {
            display: inline-block;
            width: 0.68rem;
            height: 0.38rem;
            margin-left: 0.2rem;
            color: rgb(232, 81, 81);
            background-color: rgb(248, 227, 220);
            text-align: center;
            line-height: 0.38rem;
            font-size: 0.24rem;
          }
          p {
            margin-top: 0.16rem;
            padding-right: 0.2rem;
            line-height: 0.36rem;
          }
        }
      }
    }
    .editor {
      width: 0.48rem;
      img {
        width: 0.48rem;
      }
    }
  }
}
.add-btn {
  width: 3.6rem;
  border-radius: 0.4rem;
  height: 0.7rem;
  color: #fff;
  font-size: 0.3rem;
  line-height: 0.7rem;
  background: #5fb534;
  text-align: center;
  margin: 0 auto 0.3rem;
}
</style>

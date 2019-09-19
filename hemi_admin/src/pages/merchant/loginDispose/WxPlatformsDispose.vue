// 微信开放平台
<template>
  <LayoutForm>
    <el-form ref="form" :model="form" label-width="150px">
      <el-form-item label="短信模板">
        <el-input v-model="form.smsModel"></el-input>
      </el-form-item>
      <!-- <el-form-item label="开放平台">
        <div v-for="component in form.componentList" :key="component.id">
          {{component.name}}
          <el-button v-if="component.isBind" @click="bind(component)" :loading="loading">绑定</el-button>
          <el-button v-if="!component.isBind" @click="unbind(component)" :loading="loading">解绑</el-button>
          <input v-model="form.platformName" v-if="component.isBind" placeholder="绑定需输入平台名" size="25">
          <el-select v-else v-model="form.unknown" placeholder="解绑需选择***">
            <el-option label="不晓得" value="1">不晓得</el-option>
            <el-option label="真的不晓得" value="2">真的不晓得</el-option>
            <el-option label="真的真的不晓得" value="3">真的真的不晓得</el-option>
          </el-select>
        </div>
      </el-form-item> -->
      <el-form-item label="开放平台配置">
        <el-select v-model="form.configId" placeholder="请选择开放平台模版">
          <el-option v-for="item in configList" :key="item.id" :label="item.mpName" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地区限制白名单">
        <el-switch v-model="form.locationLimit" inactive-text="关闭" active-text="开启" active-value='1' inactive-value='0'>
        </el-switch>
      </el-form-item>
      <el-form-item label="省" v-if="form.locationLimit=='1'">
        <template>
          <el-transfer v-model="form.provinceList" filterable @change="setProvinceList" target-order="push" :titles="['可选省份','已选省份']" :props="{key:'id',label:'province'}" :data="provinceList"></el-transfer>
        </template>
      </el-form-item>
      <el-form-item label="市" v-if="form.locationLimit=='1'">
        <el-transfer v-model="form.cityList" filterable :titles="['可选市','已选市']" target-order="push" :props="{key:'id',label:'city'}" :data="cityList"></el-transfer>
      </el-form-item>
      <el-form-item label="是否支持匿名登陆">
        <el-switch v-model="form.skipLogin" inactive-text="不支持" active-text="支持" active-value="1" inactive-value="0">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
    <LayoutDialog class="p-w30" title="二维码信息" v-model="showCode">
      <Code :text="qrcode" :merchantId="merchantId" :name="form.platformName" @close="showCode=false" @success="showCode=false"></Code>
    </LayoutDialog>
  </LayoutForm>
</template>
<script>

import Code from "../Code"
export default {
  components: {
    Code
  },
  data () {
    return {
      qrcode: "",
      showCode: false,
      loading: false,
      merchantId: this.$route.params.id,
      provinceList: [],
      cityList: [],
      configList: [],
      form: {
        cityList: [],
        provinceList: [],
        configId: "",
        skipLogin: "0",
        locationLimit: "0",
        merchantId: this.$route.params.id,
        // id: this.$route.params.lid,
        authType: "1",
        smsModel: ""
      }
    }
  },
  methods: {
    // 查看详情
    async getDetails () {
      let rs = await this.$post("loginConfig/getMerchantLoginConfig", {
        merchantId: this.$route.params.id,
        authType: "1"
      })
      if (rs.status == "200") {
        var merchantDetailsString = rs.payload.configApiResult.merchantDetails
        var authConfigDetailsString = rs.payload.configApiResult.authConfigDetails
        if (merchantDetailsString) {
          let merchantDetails = JSON.parse(merchantDetailsString)
          this.form.skipLogin = merchantDetails.skipLogin + ""
          this.form.locationLimit = merchantDetails.locationLimit + ""
          this.form.smsModel = merchantDetails.smsModel
        }
        if (authConfigDetailsString) {
          let authConfigDetails = JSON.parse(authConfigDetailsString)
          this.form.configId = authConfigDetails.id
        }

        this.provinceList = rs.payload.provinceList
        this.cityList = rs.payload.cityList
        if (rs.payload.myProvinceList) {
          rs.payload.myProvinceList.forEach(element => {
            this.form.provinceList.push(element.id)
          })
        }
        if (rs.payload.myCityList) {
          rs.payload.myCityList.forEach(element => {
            this.form.cityList.push(element.id)
          })
        }
      }
    },
    async setProvinceList (props) {
      this.form.cityList = []
      this.cityList = []
      if (this.form.provinceList == "" || this.form.provinceList == [] || this.form.provinceList == null) {
        return false
      }
      let rs = await this.$post("loginConfig/getCityById", {list: this.form.provinceList})
      this.cityList = rs.payload.list
    },
    async getConnectionConfig () {
      let rs = await this.$post("loginConfig/getConnectionConfig")
      if (rs.status == "200") {
        this.configList = rs.payload
      }
    },
    async getCity () {
      this.form.codeId = ""
      let rs = await this.$post("loginConfig/getCityByProvince", {province: this.form.province})
      if (rs.status == "200") {
        this.cityList = rs.payload.list
      }
    },
    async getProvince () {
      let rs = await this.$post("loginConfig/getAllProvince")
      if (rs.status == "200") {
        this.provinceList = rs.payload.list
      }
    },
    // 绑定开放平台
    async bind (component) {
      this.loading = true
      if (this.form.platformName == "") {
        this.$message.console.error("请输入平台名")
        this.loading = false
        return false
      }
      let rs = await this.$post("merchant/bind/" + this.$route.params.id + "/" + component.appId + "/" + this.form.platformName)
      if (rs.status == "200") {
        this.qrcode = rs.payload
        this.showCode = true
      }
      this.loading = false
    },
    // 解绑
    async unbind (component) {
      this.loading = true
      if (this.form.unknown == "") {
        this.$message.error("请选择***")
        this.loading = false
        return false
      }
      this.loading = false
    },
    async onSubmit () {
      if (this.form.smsModel == "" || this.form.smsModel == null) {
        this.$message.error("请先配置模版")
        return false
      }
      if (this.form.locationLimit == "1") {
        if (this.form.cityList == [] || this.form.provinceList == []) {
          this.$message.error("请选择省,市")
          return false
        }
      }
      let rs = await this.$post("loginConfig/saveWxPlatformsDispose", this.form)
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "保存成功"
        })
        this.back()
      } else {
        this.$message.error(rs.message)
      }
    },
    back () {
      this.$router.go(-1)
    },
    // 获取第三方平台
    // async getWechatComponents () {
    //   let rs = await this.$post("merchant/getWechatComponents/" + this.$route.params.id)
    //   if (rs.status === 200) {
    //     this.form.componentList = rs.payload.list
    //   } else {
    //     this.$message("获取所有第三方平台失败")
    //   }
    // },
    // 获取短信模版
    async getSmsModel () {
      let rs = await this.$get("merchant/getSmsModel/" + this.$route.params.id)
      if (rs.status == "200") {
        this.form.smsModel = rs.payload
      }
    }
  },
  created () {
    this.getConnectionConfig()
    var configId = this.$route.params.configId
    if (configId) {
      this.getDetails()
    } else {
      this.getProvince()
    }
    // this.getWechatComponents()
    // 查询模版
  }

}
</script>
<style>
</style>

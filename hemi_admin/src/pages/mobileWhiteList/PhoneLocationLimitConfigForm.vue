<template>
  <LayoutForm>
    <el-form>
      <el-form-item label="省">
        <template>
          <el-transfer v-model="form.provinceList" filterable @change="setProvinceList" target-order="push" :titles="['可选省份','已选省份']" :props="{key:'id',label:'province'}" :data="provinceList"></el-transfer>
        </template>
      </el-form-item>
      <el-form-item label="市">
        <el-transfer v-model="form.cityList" filterable :titles="['可选市','已选市']" target-order="push" :props="{key:'id',label:'city'}" :data="cityList"></el-transfer>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>
<script>

export default {
  data () {
    return {
      loading: false,
      merchantId: this.$route.params.id,
      provinceList: [],
      cityList: [],
      configList: [],
      form: {
        id: "",
        cityList: [],
        provinceList: [],
        defId: this.$route.params.defId
      }
    }
  },
  methods: {
    // 查看详情
    async getDetails (id) {
      let rs = await this.$post("mobileWhiteList/getPhoneLocationLimitConfigByDefId", {defId: id})
      if (rs.status == "200") {
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
        this.form.id = rs.payload.id
      }
    },
    async setProvinceList (props) {
      this.form.cityList = []
      this.cityList = []
      if (this.form.provinceList == "" || this.form.provinceList == [] || this.form.provinceList == null) {
        return false
      }
      let rs = await this.$post("mobileWhiteList/getCityById", {list: this.form.provinceList})
      this.cityList = rs.payload.list
    },
    async getProvince () {
      let rs = await this.$post("mobileWhiteList/getAllProvince")
      if (rs.status == "200") {
        this.provinceList = rs.payload.list
      }
    },
    async onSubmit () {
      if (this.form.cityList == [] || this.form.provinceList == []) {
        this.$message.error("请选择省,市")
        return false
      }
      let rs = await this.$post("mobileWhiteList/savePhoneLocationLimitConfig", this.form)
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
    }
  },
  created () {
    var defId = this.$route.params.defId
    if (defId) {
      this.getDetails(defId)
    }
  }

}
</script>
<style>
</style>

// 手机
<template>
  <LayoutForm>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="短信模板">
        <el-input v-model="form.smsModel"></el-input>
      </el-form-item>
      <el-form-item label="是否验证">
        <template>
          <el-radio v-model="form.isValidate" label="1">是</el-radio>
          <el-radio v-model="form.isValidate" label="0">否</el-radio>
        </template>
      </el-form-item>
      <el-form-item label="省行" v-if="form.isValidate=='1'">
        <template>
          <el-select v-model="form.province" @change="getCityList()" placeholder="请选择省行">
            <el-option v-for="province in provinceList" :key="province.id" :value="province.id" :label="province.province">{{province.province}}</el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item label="市行" v-if="form.isValidate=='1'">
        <template>
          <el-select v-model="form.city" placeholder="请选择省行">
            <el-option v-for="city in cityList" :key="city.id" :value="city.id" :label="city.city">{{city.city}}</el-option>
          </el-select>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>
<script>
export default {
  data () {
    return {
      provinceList: [],
      cityList: [],
      form: {
        merchantId: this.$route.params.id,
        id: this.$route.params.lid,
        authType: 0,
        smsModel: "",
        isValidate: "1",
        province: "",
        city: "",
        area: ""
      }
    }
  },
  methods: {
    async getCityList (province) {
      console.log(province)
    },
    async onSubmit () {
      if (this.form.smsModel == "" || this.form.smsModel == null) {
        alert("请先配置模版")
        return false
      }
      let rs = this.$post("merchant/handsetLoginDispose", this.form)
      if (rs.status == "200") {
        this.$message("保存成功")
        this.back()
      } else {
        this.$message(rs.message)
      }
    },
    back () {
      this.$router.go(-1)
    }
  },
  created () {
  }

}
</script>
<style>
</style>

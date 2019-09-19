<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="券名称" prop="standardName">
        <el-input v-model="form.standardName"></el-input>
      </el-form-item>
      <el-form-item label="原始商品名称" prop="baseProId">
        <el-select v-model="form.baseProId" filterable clearable @change="loadBaseStandardCode" placeholder="请选择">
          <el-option v-for="basePro in baseProList" :key="basePro.id" :label="basePro.name" :value="basePro.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原始商品规格" prop="baseStandardCode">
        <el-select v-model="form.baseStandardCode" @change="initMerchantPrice" placeholder="请选择">
          <el-option v-for="baseStandard in baseStandardCodeList" :key="baseStandard.id" :label="baseStandard.name" :value="baseStandard.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="券类型" prop="proType">
        <el-select v-model="form.proType" placeholder="请选择">
          <el-option v-for="proType in proTypeList" :key="proType.id" :label="proType.type" :value="proType.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.prizeType!=3" label="商户结算价格" prop="merchantPrice">
        <el-input type="number" v-model="form.merchantPrice"></el-input>
      </el-form-item>
      <el-form-item label="券排序" prop="staSord">
        <template>
          <el-input-number v-model="form.staSord" :min="1" :max="99"></el-input-number>
        </template>
      </el-form-item>

      <el-form-item label="库存 " prop="limitTotal ">
        <el-input type="number" v-model.number="form.limitTotal">
        </el-input>
      </el-form-item>
      <el-form-item label="券图片 " prop="homeImgList ">
        <UploadImages v-model="homeImgList " action="file/upload "></UploadImages>
      </el-form-item>

      <el-form-item>
        <el-button type="primary " @click="validForm" :loading="submiting ">保存</el-button>
        <el-button @click="close " v-if="!submiting ">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>

import UploadImages from "@/components/UploadImages"

export default {
  components: {
    UploadImages
  },

  data () {
    return {
      form: {
        proId: this.$route.params.proId,
        standardId: this.$route.params.id,
        actId: this.$route.params.actId,
        proType: "",
        standardName: "",
        baseProId: "",
        baseStandardCode: "",
        staSord: "",
        standardImgUrl: "",
        limitTotal: "",
        merchantPrice: ""
      },
      homeImgList: [],
      submiting: false,
      baseProList: [],
      baseStandardCodeList: [],
      proTypeList: [

        {
          id: "2",
          type: "卡密"
        }
      ],
      rules: {

        standardName: [
          { required: true, message: "请输入券名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ],
        baseProId: [
          { required: true, message: "请选择原始商品名称", trigger: "blur" }
        ],
        baseStandardCode: [
          { required: true, message: "请选择原始商品规格", trigger: "blur" }
        ],
        proType: [
          { required: true, message: "请选择券类型", trigger: "blur" }
        ],
        limitTotal: [
          { required: true, message: "请输入库存", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    initMerchantPrice (code) {
      for (let item of this.baseStandardCodeList) {
        if (item.code == code) {
          this.form.merchantPrice = item.value * item.price_discount / 10000
        }
      }
    },
    validForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.doSubmit()
        } else {
          return false
        }
      })
    },

    async loadTicket (standardId) {
      this.submiting = true
      let rs = await this.$post("product/get_standard_one", {standardId: standardId})
      if (rs.status == "200") {
        // this.form.standardId = rs.payload.standardId
        this.form.standardName = rs.payload.standardName
        this.form.proType = rs.payload.proType
        this.form.baseProId = rs.payload.baseProId
        this.loadBaseStandardCode(this.form.baseProId)
        this.form.baseStandardCode = rs.payload.baseStandardCode
        this.form.limitTotal = rs.payload.limitTotal
        this.form.staSord = rs.payload.standardSort
        this.form.merchantPrice = rs.payload.merchantPrice
        this.homeImgList = [{url: rs.payload.standardImgUrl}]
      }
      this.submiting = false
    },
    async loadBasePro () {
      this.submiting = true
      let rs = await this.$post("product/get_base_pro")
      if (rs.status == "200") {
        for (let i = 0; i < rs.payload.length; i++) {
          if (rs.payload[i].param_type == "1") {
            this.baseProList.push(rs.payload[i])
          }
        }
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    async loadBaseStandardCode (baseStandardCode) {
      this.form.baseStandardCode = null
      let code = baseStandardCode

      console.info("code:" + code)
      this.submiting = true
      let rs = await this.$post("product/get_base_standard", {id: code})
      if (rs.status == "200") {
        this.baseStandardCodeList = rs.payload
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    async doSubmit () {
      this.submiting = true
      if (this.homeImgList != "") {
        if (this.homeImgList[0].url) {
          this.form.standardImgUrl = this.homeImgList[0].url
        }
      }

      let rs = await this.$post("product/save_ticket", this.form)
      if (rs.status == "200") {
        console.info("rs===" + rs.message)
        this.$message({
          message: rs.message,
          type: "success"
        })
        this.$emit("success", this.form)
        this.$router.go(-1)
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    close () {
      this.$router.go(-1)
    }
  },
  created () {
    let standardId = this.$route.params.id
    if (standardId) {
      this.loadTicket(standardId)
      this.loadBasePro()
      // this.loadBaseStandardCode(this.form.baseStandardCode)
    } else {
      this.loadBasePro()
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>

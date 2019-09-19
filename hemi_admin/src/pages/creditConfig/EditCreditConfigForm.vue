<template>
    <div class="form">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="积分量" prop="changeCredit">
                <el-input-number v-model="form.changeCredit" :min="1" controls></el-input-number>
            </el-form-item>
            <el-form-item label="商户" prop="merchantId">
                <el-select v-model="form.merchantId" placeholder="请选择">
                    <el-option v-for="merchant in merchantList" :key="merchant.id" :label="merchant.name" :value="merchant.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="规则" prop="creditDefId">
                <el-select v-model="form.creditDefId" placeholder="请选择">
                    <el-option v-for="merchant in creditDefList" :key="merchant.id" :label="merchant.defName" :value="merchant.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="重复发放">
                <el-switch v-model="form.isRepeat" inactive-text="不支持" active-text="支持" active-value="1" inactive-value="0">
                </el-switch>
            </el-form-item>
            <el-form-item label="参与上限" prop="apartTimes" v-if="form.isRepeat=='1'">
                <el-input-number v-model="form.apartTimes" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
                <el-button @click="close" v-if="!submiting">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  props: {
    creditConfig: {
      require: true,
      type: Object
    }
  },
  data () {
    let form = {}
    form = {
      id: this.creditConfig.id,
      changeCredit: this.creditConfig.changeCredit,
      merchantId: this.creditConfig.merchantId,
      creditDefId: this.creditConfig.creditDefId,
      isRepeat: this.creditConfig.isRepeat,
      apartTimes: this.creditConfig.apartTimes
    }
    return {
      merchantList: [],
      creditDefList: [],
      submiting: false,
      form: form,
      rules: {
        defName: [
          { required: true, message: "请输入名称", trigger: "change" },
          {
            min: 1,
            trigger: "change"
          }
        ],
        defType: [
          { required: true, message: "请输入type", trigger: "change" },
          {
            min: 1,
            trigger: "change"
          }
        ]
      }
    }
  },
  methods: {
    async  getMerchant () {
      var rs = await this.$post("creditConfig/getMerchant")
      this.merchantList = rs.payload.list
    },
    async  getCreditDef () {
      var rs = await this.$post("creditConfig/getCreditDef")
      this.creditDefList = rs.payload.list
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
    async doSubmit () {
      this.submiting = true
      let rs = await this.$post("/creditConfig/save", this.form)
      if (rs.status == "200") {
        this.$message({
          message: "保存成功",
          type: "success"
        })
        this.$emit("success", this.form)
        this.close()
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    close () {
      this.$emit("close")
    }
  },
  created () {
    this.getMerchant()
    this.getCreditDef()
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>

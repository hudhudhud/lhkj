<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="130px">
      <el-form-item label="订单号" prop="orderId">
        <el-input v-model="form.orderId" disabled></el-input>
      </el-form-item>
      <el-form-item label="预支付订单号" prop="preOrderId">
        <el-input v-model="form.preOrderId" disabled></el-input>
      </el-form-item>
      <el-form-item label="支付金额(元)" prop="amount">
        <el-input v-model="form.amount" :disabled='true'></el-input>
      </el-form-item>
      <el-form-item label="审核处理" prop="applyStatus">
        <el-radio v-model="form.applyStatus" label="1">通过</el-radio>
        <el-radio v-model="form.applyStatus" label="2">驳回</el-radio>
        <!-- <el-switch v-model="form.applyStatus" active-value='1' inactive-value='2' active-text="通过" inactive-text="驳回">
        </el-switch> -->
      </el-form-item>
      <el-form-item label="驳回原因" v-if="form.applyStatus == '2'">
        <el-input v-model="form.refuseReason" type="textarea" rows="3"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">提交</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    preOrder: {
      require: true,
      type: Object
    }
  },
  data () {
    let form = null
    form = this.preOrder
    return {
      submiting: false,
      form: form,
      rules: {
        orderId: [
          {
            required: true,
            message: "订单号不能为空",
            trigger: "change"
          }
        ],
        preOrderId: [
          {
            required: true,
            message: "预支付订单号不能为空",
            trigger: "change"
          }
        ],
        amount: [
          {
            required: true,
            message: "金额不能为空",
            trigger: "change"
          }
        ],
        applyStatus: [
          {
            required: true,
            message: "请选择审核处理类型",
            trigger: "change"
          }
        ]
      }
    }
  },
  methods: {
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
      let rs = null
      if (this.form.applyStatus == "1") {
        rs = await this.$post("refund_apply/refund_apply/pass", this.form)
      } else if (this.form.applyStatus == "2") {
        rs = await this.$post("refund_apply/overrule", this.form)
      } else {
        this.$message.error("请选择审核处理类型")
      }
      if (rs.status == "200") {
        this.$message({
          message: "审核完成",
          type: "success"
        })
        this.$emit("success", this.form)
        this.close()
      } else {
        this.submiting = false
        this.$message.error(rs.message)
      }
      this.submiting = false
    },
    close () {
      this.$emit("close")
    }
  },
  activated () {}
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>

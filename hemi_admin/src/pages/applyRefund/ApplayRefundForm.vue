<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="130px">
      <el-form-item label="订单号" prop="orderId">
        <el-input v-model="form.orderId" disabled></el-input>
      </el-form-item>
      <el-form-item label="预支付订单号" prop="preOrderId">
        <el-input v-model="form.preOrderId" disabled></el-input>
      </el-form-item>
      <el-form-item label="支付金额" prop="amount">
        <el-input v-model="form.amount" :disabled='true'></el-input>
      </el-form-item>
      <el-form-item label="订单处理">
        <el-switch v-model="form.needCancelOrder" active-value='1' inactive-value='0' active-text="取消订单" inactive-text="不取消订单">
        </el-switch>
      </el-form-item>
      <el-form-item label="退款原因" prop="applyReason">
        <el-input v-model="form.applyReason" type="textarea" rows="3"></el-input>
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
    console.log(form)
    return {
      submiting: false,
      form: form,
      rules: {
        applyReason: [
          {
            required: true,
            message: "请输入50字内的退款原因",
            trigger: "change"
          },
          {
            min: 1,
            max: 50,
            trigger: "change"
          }
        ],
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
      let rs = await this.$post("refund_apply/commit", this.form)
      if (rs.status == "200") {
        this.$message({
          message: "保存成功",
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

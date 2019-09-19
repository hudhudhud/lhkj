<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="订单号" prop="orderCode" hidden>
        <el-input v-model="form.orderCode"></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="recharge">
        <el-input type="textarea" v-model="form.recharge"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">确定</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    order: {
      require: true,
      type: Object
    }
  },
  data () {
    // 如果有参数传入,则使用参数,否则使用默认值
    let form = null
    if (this.order) {
      form = {
        orderCode: this.order.orderCode.toString(),
        recharge: this.order.rechargeAccount
      }
    }
    return {
      submiting: false,
      form: form,
      rules: {
        orderCode: [
          { required: true, message: "订单号", trigger: "change" },
          {
            min: 3,
            max: 40,
            message: "长度在 3 到 40 个字符",
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
      this.form.roleList = this.roleList
      let rs = await this.$post("order/re_send_order", this.form)
      if (rs.status == "200") {
        this.$message({
          message: "发起成功,直冲类请等待充值成功",
          type: "success"
        })
        this.$emit("success", this.form)
        this.close()
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    close () {
      this.$emit("close")
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>

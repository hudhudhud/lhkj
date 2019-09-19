<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" style="margin-top:15px;">
      <el-form-item label="订单号:" prop="orderId">
        <el-input v-model="form.orderId"></el-input>
      </el-form-item>
      <el-form-item label="商户" prop="merchantId">
        <el-select v-model="form.merchantId" placeholder="请选择">
          <el-option v-for="item in merchantList" :key="item.id" :value="item.id" :label="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">查询</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
export default {

  data () {
    return {
      submiting: false,
      form: {},
      merchantList: [],
      rules: {
        orderId: [
          { required: true, message: "请输入订单号", trigger: "blur" }
        ],
        merchantId: [
          {required: true, message: "请选择商户", trigger: "blur"}
        ]
      }
    }
  },
  methods: {
    validForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.get()
        } else {
          return false
        }
      })
    },
    async get () {
      let rs = await this.$post("queryOrder/get", this.form)
      if (rs.status == "200") {
        let pay = JSON.parse(rs.payload)
        console.log(pay)

        // let pay = (rs.payload).parseJSON()
        if (pay.orderPayStatus == "2") {
        // 查询订单详情
          let res = await this.$post("queryOrder/getByPreOrderId", {
            preOrderId: pay.preOrderId
          })
          if (res.payload) {
            this.$alert("预支付订单号：" + res.payload.preOrderId + "\n" +
            "商品描述:" + res.payload.proDescribe + "\n" +
            "价格:" + res.payload.totalFee + "\n" +
            "下单时间:" + res.payload.ordertime
              , "已支付订单详情", {
              confirmButtonText: "确定"
            })
          } else {
            alert("未查询到对应预支付订单详情")
          }
        } else {
          this.$alert("预支付订单号：" + pay.preOrderId, "该订单未支付", {
            confirmButtonText: "确定"
          })
        }
      }
    },
    async  getMerchant () {
      let rs = await this.$post("queryOrder/getMerchant")
      this.merchantList = rs.payload
    }
  },
  created () {
    this.getMerchant()
  }
}
</script>

<style scoped>
</style>

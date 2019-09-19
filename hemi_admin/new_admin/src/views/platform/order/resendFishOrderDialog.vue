<template>
  <div class="form">
      <el-dialog :visible.sync="diaVisible" title='飞鱼订单重新发起' @closed='closed' >
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
          <el-form-item label="订单号" prop="orderCode" hidden>
            <el-input v-model="form.orderCode"></el-input>
          </el-form-item>
          <el-form-item label="账号" prop="recharge">
            <el-input type="textarea" v-model="form.recharge"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="validForm" :loading="submiting">确定</el-button>
            <el-button @click="closed" v-if="!submiting">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>
import { OrderApi } from "@/api";
export default {
  props: {
    order: {
      require: true,
      type: Object
    },
    visible:Boolean,
  },
  watch:{
    visible(val){
      this.diaVisible=val
    },
    order:{
      handler(val){
        if(this.visible){
          this.form.orderCode=val.orderCode
          this.form.recharge=val.rechargeAccount
        }
      },
      deep:true,
    }
  },
  data () {
    return {
      submiting: false,
      form: {},
      diaVisible:this.visible,
      rules: {
        recharge: [
          { required: true, message: "账号", trigger: "change" },
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
      let rs = await OrderApi.batchSendFishUsingGET(this.form)
      if (rs.status == "200") {
        this.$message({
          message: "发起成功,直冲类请等待充值成功",
          type: "success"
        })
        this.closed()
      } else {
        this.submiting = false
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    closed () {
      this.diaVisible=false
      this.$emit("update:visible",false)
      this.$emit("update:orderCode",null)
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>

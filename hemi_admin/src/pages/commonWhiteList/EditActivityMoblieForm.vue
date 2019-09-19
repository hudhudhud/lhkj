<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="活动id" prop="actId" hidden>
        <el-input v-model="form.actId"></el-input>
      </el-form-item>
      <el-form-item label="defId" prop="defId" hidden>
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="form.mobile"></el-input>
      </el-form-item>
      <el-form-item label="抽奖赠送次数" prop="mobile">
        <el-input v-model="form.freeNum"></el-input>
      </el-form-item>
      <el-form-item label="购买次数" prop="mobile">
        <el-input v-model="form.buyNum"></el-input>
      </el-form-item>
      <el-form-item label="抽奖中非默认奖品次数" prop="mobile">
        <el-input v-model="form.nonDefaultTotal"></el-input>
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
    whiteOne: {
      require: true,
      type: Object
    }
  },
  data () {
    let form = null
    if (this.whiteOne.actRecord) {
      form = {
        id: this.whiteOne.actRecord.id,
        defId: this.whiteOne.defId,
        mobile: this.whiteOne.actRecord.account,
        freeNum: this.whiteOne.actRecord.freeNum,
        buyNum: this.whiteOne.actRecord.buyNum,
        nonDefaultTotal: this.whiteOne.actRecord.nonDefaultTotal,
        type: this.whiteOne.actRecord.type,
        actId: this.whiteOne.actId
      }
    } else {
      form = {
        id: "",
        mobile: "",
        defId: this.whiteOne.defId,
        type: "",
        actId: this.whiteOne.actId
      }
    }
    return {
      submiting: false,
      form: form,
      rules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "change" },
          {
            min: 1,
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
      let rs = await this.$post("mobileWhiteList/save_act_reocrd", this.form)
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
  activated () {
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>

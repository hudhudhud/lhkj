<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="模版名" prop="defName">
        <el-input v-model="form.defName"></el-input>
      </el-form-item>
      <el-form-item label="模版类型">
        <el-radio v-model="form.type" label='1'>地区白名单</el-radio>
        <el-radio v-model="form.type" label='2'>号码白名单</el-radio>
        <el-radio v-model="form.type" label='3'>号码黑名单</el-radio>
        <el-radio v-model="form.type" label='4'>API限制(白名单)</el-radio>
        <el-radio v-model="form.type" label='5'>API限制(黑名单)</el-radio>
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
    listDef: {
      require: true,
      type: Object
    }
  },
  data () {
    let form = null
    if (this.listDef) {
      form = {
        id: this.listDef.id,
        defName: this.listDef.defName,
        type: this.listDef.type + ""
      }
    }
    return {
      submiting: false,
      form: form,
      rules: {
        defName: [
          { required: true, message: "请输入模版名", trigger: "change" },
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
      if (!this.form.type) {
        this.$message.error("请选择模版类型")
        this.submiting = false
        return false
      }
      let rs = await this.$post("mobileWhiteList/saveListDel", this.form)
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

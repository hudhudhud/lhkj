<template>
    <div class="form">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px">
            <el-form-item label="名称" prop="defName">
                <el-input v-model="form.defName"></el-input>
            </el-form-item>
            <el-form-item label="type" prop="defType">
                <el-input v-model="form.defType"></el-input>
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
    creditDef: {
      require: true,
      type: Object
    }
  },
  data () {
    let form = {}
    form = {
      id: this.creditDef.id,
      defName: this.creditDef.defName,
      defType: this.creditDef.defType
    }
    return {
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
      var reg = /^[a-zA-Z]{0,}$/
      if (!reg.test(this.form.defType)) {
        this.submiting = false
        this.$message({
          message: "type必须为全英文",
          type: "error"
        })
        return false
      }
      let rs = await this.$post("creditDef/save", this.form)
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

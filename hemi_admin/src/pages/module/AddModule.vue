<template>
  <LayoutForm>
    <div class="form">
      <el-form :model="form" ref="form" label-width="100px">
        <el-form-item label="mid" prop="mid">
          <el-input v-model="form.mid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="pmid" prop="pmid">
          <el-input v-model="form.pmid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="level" prop="level">
          <el-input v-model="form.level" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="模块名称" prop="mname">
          <el-input v-model="form.mname"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <template slot-scope="props">
            <el-radio v-model="form.type" label="NODE" border @change="node()">NODE</el-radio>
            <el-radio v-model="form.type" label="URL" border @change="url()">URL</el-radio>
            <el-radio v-model="form.type" label="HIDDEN" border @change="hidden()">HIDDEN</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="API路由" prop="path" v-show="showPath">
          <el-input v-model="form.path"></el-input>
        </el-form-item>
        <el-form-item label="前端路由" prop="router" v-show="showRouter">
          <el-input v-model="form.router"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
          <el-button @click="close" v-if="!submiting">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </LayoutForm>
</template>

<script>
export default {
  data () {
    return {
      showPath: true,
      showRouter: true,
      submiting: false,
      mod: null,
      form: {
        pmid: "",
        level: "",
        mname: "",
        path: "",
        router: ""
      }
    }
  },
  methods: {
    node () {
      this.showPath = false
      this.showRouter = false
      this.form.path = ""
      this.form.router = ""
    },
    url () {
      this.showPath = true
      this.showRouter = true
    },
    hidden () {
      this.showPath = true
      this.showRouter = false
      this.form.router = ""
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
      this.form.roleList = this.roleList
      let rs = await this.$post("module/save", this.form)
      if (rs.status == "200") {
        this.form.mname = ""
        this.form.type = ""
        this.form.path = ""
        this.form.router = ""
        this.$message({
          message: "保存成功",
          type: "success"
        })
        this.close()
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    close () {
      this.$router.go(-1)
      this.form.mname = ""
      this.form.type = ""
      this.form.path = ""
      this.form.router = ""
    }
  },
  activated () {
    this.form.pmid = this.$route.params.mid
    this.form.level = this.$route.params.level + 1
    console.log(this.$route.params.level)
    console.log(this.$route.params.mid)
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>

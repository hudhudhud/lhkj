<template>
  <LayoutForm>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="id" prop="id">
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="pageName">
        <el-input v-model="form.pageName"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="pageDesc">
        <el-input v-model="form.pageDesc" type="textarea" :rows="4"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
export default {
  data () {
    return {
      merchantList: [],
      form: {
        id: null,
        proId: null,
        pageName: "",
        version: 1,
        pageDesc: ""
      },
      rules: {
        pageName: [
          { required: true, message: "请输入页面名称", trigger: "blur" }
        ]
      },
      submiting: false
    }
  },
  watch: {
    "$route.params.pageId": function (val) {
      if (this.$route.params.pageId && this.$route.params.pageId != "add") {
        this.form = {}
        this.loadForm(this.$route.params.pageId)
      } else {
        this.form = {
          id: null,
          proId: null,
          pageName: "",
          pageDesc: ""
        }
      }
    }
  },
  methods: {
    async loadForm (pageId) {
      let rs = await this.$get("lego/getById/" + pageId)
      if (rs.status == 200) {
        this.form = rs.payload
      }
    },
    async onSubmit () {
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
      if (this.$route.query.proId) {
        this.form.proId = this.$route.query.proId
      }
      let rs = await this.$post("lego/save", this.form)
      if (rs.status == 200) {
        this.$message({
          message: "保存成功",
          type: "success"
        })
        this.close()
      } else {
        this.$message.error(rs.error)
      }
      this.submiting = false
    },
    close () {
      this.$router.go(-1)
    }
  },
  created () {
    if (this.$route.params.pageId && this.$route.params.pageId != "add") {
      this.loadForm(this.$route.params.pageId)
    }
  }
}
</script>

<style scoped>
.el-textarea,
.el-input {
  width: 40%;
}
</style>

<template>
  <div class="form">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="用户ID" prop="id">
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="id">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户名称" prop="id">
        <el-input v-model="form.nickname" disabled></el-input>
      </el-form-item>
      <el-form-item label="商户列表">
        <template>
          <el-transfer filterable :filter-method="filterMethod" :titles="['未授权商户', '已授权商户']" filter-placeholder="请输入商户名称" v-model="form.merchantAuthList" :data="merchantList">
          </el-transfer>
        </template>
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
    user: {
      require: true,
      type: Object
    }
  },
  data () {
    // 如果有参数传入,则使用参数,否则使用默认值
    let form = {
      id: this.user.id.toString(),
      username: this.user.username,
      nickname: this.user.nickname,
      merchantAuthList: []
    }
    return {
      merchantList: [],
      filterMethod (query, item) {
        return item.name.indexOf(query) > -1
      },
      submiting: false,
      form: form,
      rules: {
        id: [
          { required: true, message: "请输入用户ID", trigger: "change" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
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
    async loadMerchant () {
      this.submiting = true
      let rs = await this.$post("user/get_user_merchant_list", this.user || {})
      if (rs.status == "200") {
        rs.payload.forEach(merchant => {
          if (merchant.userId) {
            this.form.merchantAuthList.push(merchant.id)
          }
        })
        this.merchantList = rs.payload.map(item => {
          item.label = item.name
          item.key = item.id
          return item
        })
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    async doSubmit () {
      this.submiting = true
      let rs = await this.$post("user/merchantAuth", this.form)
      if (rs.status == "200") {
        this.$message({
          message: "保存成功",
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
  },
  created () {
    this.loadMerchant()
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>

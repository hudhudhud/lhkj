<template>
  <LayoutForm>
    <el-form v-if="form" :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="角色ID" prop="rid">
        <el-input v-model="form.rid" :disabled="!isAdd"></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="rname">
        <el-input v-model="form.rname"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="state">
        <el-radio v-model="form.state" label="1" border>正常</el-radio>
        <el-radio v-model="form.state" label="0" border>禁用</el-radio>
      </el-form-item>
      <el-form-item label="模块管理">
        <template>
          <el-tree ref="mytree" :data="data" :check-strictly="true" :props="props" show-checkbox node-key="mid" :default-checked-keys="checkedIds">
            <div slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
            </div>
          </el-tree>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="validForm" :loading="submiting">保存</el-button>
        <el-button @click="close" v-if="!submiting">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>

<script>
export default {
  data () {
    // 如果有参数传入,则使用参数,否则使用默认值
    return {
      props: {
        label: "mname",
        children: "children"
      },
      checkedIds: [],
      data: [],
      submiting: false,
      form: null,
      isAdd: false,
      rules: {
        rid: [
          { required: true, message: "请输入角色ID", trigger: "change" },
          {
            min: 4,
            max: 20,
            message: "长度在 4 到 20 个字符",
            trigger: "change"
          }
        ],
        rname: [
          { required: true, message: "请输入角色名称", trigger: "change" },
          {
            min: 3,
            max: 50,
            message: "长度在 3 到 50 个字符",
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
      let checkedMids = this.$refs.mytree.getCheckedKeys()
      this.form.checkedMids = checkedMids
      this.submiting = true
      this.form.isAdd = this.isAdd
      let rs = await this.$post("role/save", this.form)
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
      this.$router.go(-1)
    },
    async loadRole (rid) {
      let rs = await this.$get("role/getRoleByRid/" + rid)
      if (rs.status == "200") {
        this.form = rs.payload.role
        this.data = rs.payload.list
        this.checkedIds = rs.payload.checkedIds
      }
    },
    async loadModule () {
      let rs = await this.$post("role/getModuleTree")
      if (rs.status == "200") {
        this.data = rs.list
        this.checkedIds = []
      }
    }
  },
  activated () {
    let rid = this.$route.params.rid
    this.isAdd = !rid
    if (rid) {
      this.loadRole(rid)
    } else {
      this.loadModule()
      this.form = {
        rid: "",
        rname: "",
        state: ""
      }
    }
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>

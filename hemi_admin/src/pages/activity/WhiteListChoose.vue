<template>
  <LayoutForm>
    <div class="form">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="活动id" prop="id">
          <el-input v-model="form.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="actName">
          <el-input v-model="form.actName" disabled></el-input>
        </el-form-item>
        <el-form-item label="提示用户信息" prop="returnMsg">
          <el-input v-model="form.returnMsg"></el-input>
        </el-form-item>
        <el-form-item label="白名单列表">
          <template>
            <el-transfer filterable :filter-method="filterMethod" :titles="['未选择白名单', '已选择白名单']" filter-placeholder="请输入白名单名称" v-model="form.whiteChooseList" :data="whiteList">
            </el-transfer>
          </template>
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
    // 如果有参数传入,则使用参数,否则使用默认值
    let form = {
      id: this.$route.params.actId.toString(),
      actName: this.$route.params.actName.toString(),
      returnMsg: "",
      whiteChooseList: []
    }
    return {
      whiteList: [],
      filterMethod (query, item) {
        return item.defName.indexOf(query) > -1
      },
      submiting: false,
      form: form,
      rules: {
        id: [
          { required: true, message: "请输入活动id", trigger: "change" },
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
    async loadWhiteList () {
      this.submiting = true
      let rs = await this.$get("activity/get_activity_whitelist/" + this.$route.params.actId.toString(), {})
      if (rs.status == "200") {
        rs.payload.whiteChooList.forEach(whiteId => {
          this.form.whiteChooseList.push(Number(whiteId))
        })
        this.whiteList = rs.payload.whiteList.map(item => {
          item.label = item.defName
          item.key = item.id
          return item
        })
        this.form.returnMsg = rs.payload.whiteReturnMsg
      } else {
        this.$message.error(rs.msg)
      }
      this.submiting = false
    },
    async doSubmit () {
      this.submiting = true
      let rs = await this.$post("activity/save/activity_whiteIds", this.form)
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
    this.loadWhiteList()
  }
}
</script>

<style scoped>
.form {
  position: relative;
}
</style>

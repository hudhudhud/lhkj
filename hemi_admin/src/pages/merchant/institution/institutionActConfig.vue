<template>
  <LayoutForm>
    <el-form>
      <el-form-item label="活动">
        <template>
          <el-transfer v-model="form.actList" filterable target-order="push" :titles="['可选活动','已选活动']" :props="{key:'id',label:'actName'}" :data="actList"></el-transfer>
        </template>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
        <el-button @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </LayoutForm>
</template>
<script>

export default {
  data () {
    return {
      loading: false,
      actList: [],
      form: {

        actList: [],
        id: this.$route.params.id

      }
    }
  },
  methods: {
    // 查看详情
    async getDetails (id) {
      let rs = await this.$get("activity/get_act_list/" + id)
      if (rs.status == "200") {
        this.actList = rs.payload
      }
    },
    async getActList (id) {
      let rs = await this.$post("activity/get_local_act/", {institutionNum: id})
      if (rs.status == "200") {
        let list = rs.payload
        list.forEach(element => {
          this.form.actList.push(element.actId)
        })
        console.log("-----" + this.form.actList)
      }
    },

    async onSubmit () {
      if (this.form.actList == []) {
        this.$message.error("请选择活动")
        return false
      }
      console.info("===" + this.form.actList)
      let rs = await this.$post("activity/save_local_act", this.form)
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "保存成功"
        })
        this.back()
      } else {
        this.$message.error(rs.message)
      }
    },
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    let merchantId = this.$route.params.merchantId
    let id = this.$route.params.id
    if (merchantId) {
      this.getDetails(merchantId)
    }
    if (id) {
      this.getActList(id)
    }
  }

}
</script>
<style>
</style>

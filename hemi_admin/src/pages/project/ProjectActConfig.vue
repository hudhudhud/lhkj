<template>
  <LayoutForm>
    <el-form>
      <el-form-item label="活动">
        <template>
          <el-transfer v-model="form.actList" filterable target-order="push" :titles="['可选活动','已选活动']" :props="{key:'id',label:'actName'}"
            :data="actList"></el-transfer>
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
  data() {
    return {
      loading: false,
      actList: [],
      form: {
        actList: [],
        projectId: this.$route.params.projectId
      }
    };
  },
  methods: {
    // 查看详情
    async getDetails() {
      let rs = await this.$get("activity/get_all_act_list/");
      if (rs.status == "200") {
        this.actList = rs.payload;
      }
    },
    async getActList(projectId) {
      let rs = await this.$post("activity/get_actId_by_projectId/", {
        projectId: projectId
      });
      if (rs.status == "200") {
        let list = rs.payload;
        list.forEach(element => {
          this.form.actList.push(element.actId);
        });
        console.log("-----" + this.form.actList);
      }
    },

    async onSubmit() {
      if (this.form.actList == []) {
        this.$message.error("请选择活动");
        return false;
      }
      console.info("===" + this.form.actList);
      let rs = await this.$post("activity/save_projectId/", this.form);
      if (rs.status == "200") {
        this.$message({
          type: "success",
          message: "保存成功"
        });
        this.back();
      } else {
        this.$message.error(rs.message);
      }
    },
    back() {
      this.$router.go(-1);
    }
  },
  created() {
    let projectId = this.$route.params.projectId;
    this.getDetails();
    if (projectId) {
      this.getActList(projectId);
    }
  }
};
</script>
<style>
</style>
